import { useEffect, useRef } from 'preact/hooks'
import c from 'clsx'

interface SectionTickerProps {
    text: string
    classname?: Classname
    style?: Style
}

const DEFAULT_HEIGHT = 56
const SPEED = 1
const SEPARATOR = '    •    '
const FONT_FAMILY = '"Overused Grotesk", sans-serif'

export function SectionTicker(props: SectionTickerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const didMountRef = useRef(false)

    useEffect(() => {
        if (!canvasRef.current) return
        if (didMountRef.current) return
        didMountRef.current = true

        const canvas = canvasRef.current!
        const ctx = canvasRef.current.getContext('2d')!
        if (!ctx) return

        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = DEFAULT_HEIGHT

        let bufferCanvas: HTMLCanvasElement
        let bufferCtx: CanvasRenderingContext2D
        let textWidth = 0
        let offset = 0

        let fontSize = 18

        function renderBuffer() {
            if (canvas.width < 468) {
                fontSize = 14
            } else if (canvas.width < 1268) {
                fontSize = 16
            } else {
                fontSize = 18
            }

            const repeatedText = (props.text + SEPARATOR).repeat(100)
            textWidth = ctx.measureText(repeatedText).width

            bufferCanvas = document.createElement('canvas')
            bufferCanvas.width = textWidth
            bufferCanvas.height = canvas.height

            bufferCtx = bufferCanvas.getContext('2d')!
            bufferCtx.font = `500 ${fontSize}px ${FONT_FAMILY}`
            bufferCtx.fillStyle = '#FFFFE3'
            bufferCtx.textBaseline = 'middle'
            bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height)
            bufferCtx.fillText(repeatedText, 0, bufferCanvas.height / 2)
        }

        function draw() {
            if (!bufferCanvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(bufferCanvas, -offset, 0)

            // offset += scrollVelocity !== 0 ? scrollVelocity : speed;
            offset += SPEED

            if (offset >= textWidth - canvas.width) {
                offset = textWidth / 2
            }

            requestAnimationFrame(draw)
        }

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width
            renderBuffer()
        }

        window.addEventListener('resize', () => {
            resizeCanvas()
        })

        document.fonts.load(`500 18px ${FONT_FAMILY}`).then(() => {
            resizeCanvas()
            draw()
        })
    }, [canvasRef, didMountRef, props.text])

    return <canvas ref={canvasRef} className={c('section-ticker', props.classname)} height={56}></canvas>
}
