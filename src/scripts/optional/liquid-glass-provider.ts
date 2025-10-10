// This is slightly modified code from the original work by Shu Ding
// The original code can be found at https://github.com/shuding/liquid-glass

import { distanceDelta, randomId, smoothStep } from '#/utils/math'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

export interface LiquidGlassOptions {
    /**
     * @default 0.25
     */
    blur?: number

    /**
     * @default 1
     */
    contrast?: number

    /**
     * @default 1.05
     */
    brightness?: number

    /**
     * @default 1.1
     */
    saturate?: number
}

export interface ShaderTexture {
    x: number
    y: number
}

export type Shader = (uvX: number, uvY: number) => ShaderTexture

function roundedRectSDF(x: number, y: number, width: number, height: number, radius: number) {
    const qx = Math.abs(x) - width + radius
    const qy = Math.abs(y) - height + radius
    return Math.min(Math.max(qx, qy), 0) + distanceDelta(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

function defaultUVShader(uvX: number, uvY: number): ShaderTexture {
    const ix = uvX - 0.5
    const iy = uvY - 0.5
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
    const scaled = smoothStep(0, 1, displacement)

    return {
        x: ix * scaled + 0.5,
        y: iy * scaled + 0.5
    }
}

function round(value: number, multiplier = 1): number {
    return Math.ceil(value / multiplier) * multiplier
}

// export function isLiquidGlassSupported(): boolean {
//     // Check if the browser supports SVG filters and canvas
//     return (
//     )
// }

// Main Shader class
export class LiquidGlass {
    readonly container: HTMLElement
    readonly options: Required<LiquidGlassOptions>
    canvasDPI: number = 1

    readonly id: string
    readonly wrapper: HTMLDivElement

    protected width!: number
    protected height!: number

    uvShader: Shader = defaultUVShader

    SVG!: SVGElement
    SVGFeImage!: SVGElement
    SVGFeDisplacementMap!: SVGElement
    SVGFilter!: SVGElement

    bufferCanvas!: HTMLCanvasElement
    bufferContext!: CanvasRenderingContext2D

    constructor(container: HTMLElement, options: LiquidGlassOptions = {}) {
        this.options = {
            blur: 1,
            contrast: 1,
            brightness: 1.05,
            saturate: 1,
            ...options
        }

        this.id = `liquid-shader-${randomId(8)}`

        this.container = container
        this.container.classList.add('liquid-container')
        this.wrapper = document.createElement('div')

        this.createShaderElements()

        window.document.body.appendChild(this.SVG)
        this.container.appendChild(this.wrapper)
    }

    protected updateSpatialData() {
        const rect = this.container.getBoundingClientRect()

        if (rect.width === 0 || rect.height === 0) {
            return
        }

        if (this.width === rect.width && this.height === rect.height) {
            return
        }

        this.width = rect.width
        this.height = rect.height

        this.SVGFilter.setAttribute('width', `${this.width}`)
        this.SVGFilter.setAttribute('height', `${this.height}`)

        this.SVGFeImage.setAttribute('width', `${this.width}`)
        this.SVGFeImage.setAttribute('height', `${this.height}`)

        // Create canvas for displacement map (hidden)
        this.bufferCanvas = document.createElement('canvas')
        this.bufferCanvas.width = this.width * this.canvasDPI
        this.bufferCanvas.height = this.height * this.canvasDPI
        this.bufferCanvas.style.display = 'none'

        this.bufferContext = this.bufferCanvas.getContext('2d')!
    }

    protected createShaderElements() {
        this.wrapper.classList.add('liquid-wrapper')
        this.wrapper.style.backdropFilter =
            `url(#${this.id}_filter) ` +
            `blur(${this.options.blur}px) ` +
            `contrast(${this.options.contrast}) ` +
            `brightness(${this.options.brightness}) ` +
            `saturate(${this.options.saturate})`

        // Create SVG filter
        this.SVG = document.createElementNS(SVG_NAMESPACE, 'svg')
        this.SVG.setAttribute('xmlns', SVG_NAMESPACE)
        this.SVG.setAttribute('width', '0')
        this.SVG.setAttribute('height', '0')
        this.SVG.classList.add('liquid-filter')

        const defs = document.createElementNS(SVG_NAMESPACE, 'defs')
        const filter = document.createElementNS(SVG_NAMESPACE, 'filter')
        filter.setAttribute('id', `${this.id}_filter`)
        filter.setAttribute('filterUnits', 'userSpaceOnUse')
        filter.setAttribute('colorInterpolationFilters', 'sRGB')
        filter.setAttribute('x', '0')
        filter.setAttribute('y', '0')

        this.SVGFilter = filter

        this.SVGFeImage = document.createElementNS(SVG_NAMESPACE, 'feImage')
        this.SVGFeImage.setAttribute('id', `${this.id}_map`)

        this.SVGFeDisplacementMap = document.createElementNS(SVG_NAMESPACE, 'feDisplacementMap')
        this.SVGFeDisplacementMap.setAttribute('in', 'SourceGraphic')
        this.SVGFeDisplacementMap.setAttribute('in2', `${this.id}_map`)
        this.SVGFeDisplacementMap.setAttribute('xChannelSelector', 'R')
        this.SVGFeDisplacementMap.setAttribute('yChannelSelector', 'G')

        filter.appendChild(this.SVGFeImage)
        filter.appendChild(this.SVGFeDisplacementMap)
        defs.appendChild(filter)
        this.SVG.appendChild(defs)
    }

    update(warn = true) {
        this.updateSpatialData()

        if (warn && (this.width === 0 || this.height === 0)) {
            console.warn(
                'LiquidGlassShader: Container dimensions are not set. Please ensure the container is visible and has dimensions before calling update.'
            )
            return
        }

        const w = round(this.width * this.canvasDPI)
        const h = round(this.height * this.canvasDPI)
        const data = new Uint8ClampedArray(round(w * h * 4, 4 * round(w)))

        // if (data.length % 4 !== 0) {
        //     console.warn(
        //         `LiquidGlassShader: For optimal performance, consider using dimensions that are multiples of 4. Current dimensions: ${this.width}x${this.height}`
        //     )
        //     return
        // }

        let maxScale = 0
        const rawValues = []

        for (let i = 0; i < data.length; i += 4) {
            const x = (i / 4) % w
            const y = Math.floor(i / 4 / w)

            const pos = this.uvShader(x / w, y / h)
            const dx = pos.x * w - x
            const dy = pos.y * h - y
            maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
            rawValues.push(dx, dy)
        }

        maxScale *= 0.5

        let index = 0
        for (let i = 0; i < data.length; i += 4) {
            const r = rawValues[index++]! / maxScale + 0.5
            const g = rawValues[index++]! / maxScale + 0.5
            data[i] = r * 255
            data[i + 1] = g * 255
            data[i + 2] = 0
            data[i + 3] = 255
        }

        this.bufferContext.putImageData(new ImageData(data, w, h), 0, 0)
        this.SVGFeImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.bufferCanvas.toDataURL())
        this.SVGFeDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString())
    }
}
