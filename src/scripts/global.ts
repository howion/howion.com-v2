import Lenis from 'lenis'
import { APP } from '##/.boilerrc'

const appWrapper = document.querySelector('#app-wrapper') as HTMLElement
const app = document.querySelector('#app') as HTMLElement

// initialize Lenis
const lenis = new Lenis({
    content: app,
    wrapper: appWrapper,
    infinite: true,
    syncTouch: true,
    anchors: true
})

const parallaxElements = document.querySelectorAll('[data-parallax-speed]') as NodeListOf<HTMLElement>

// main raf loop
function raf(time: number) {
    lenis.raf(time)

    // handle scroll events here
    // const vh = document.documentElement.clientHeight
    // const scrollY = lenis.actualScroll
    // const vw = document.documentElement.clientWidth

    for (const el of parallaxElements) {
        // const viewportTop = el.offsetTop - lenis.actualScroll
        const viewportRest = window.innerHeight - (el.offsetTop - lenis.actualScroll)
        // if (viewportRest < 0) continue // skip elements that are not in view
        // if (viewportRest > window.innerHeight) continue // skip elements that are too far down

        const speed = Number.parseFloat(el.getAttribute('data-parallax-speed')! || '1')

        const offset = viewportRest * (1 - speed)

        if (speed !== 1) {
            el.style.transform = `translateY(${offset}px)`
        }

        const offsetRatio = viewportRest / window.innerHeight

        const opacityOut = Number.parseFloat(el.getAttribute('data-parallax-opacity-out') || '1')
        if (opacityOut < 1) {
            const opacity = 1 + (opacityOut - 1) * offsetRatio
            el.style.opacity = `${Math.max(0, Math.min(1, opacity))}`
        }
    }

    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

if (!APP.quickDevelopmentMode) {
    // scroll to hero onload
    lenis.scrollTo('.scroll-into-view', {})
}

let isMouseDown = false
let clientY = 0
let scrollValue = 0

if (!APP.quickDevelopmentMode) {
    app.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })
}

app.addEventListener('mouseleave', () => {
    if (isMouseDown) {
        isMouseDown = false
    }
})

app.addEventListener('mousedown', (e) => {
    // RMB
    if (e.button === 2) {
        e.preventDefault()
        isMouseDown = true
        scrollValue = lenis.scroll
        clientY = e.clientY
    }
})

app.addEventListener('mouseup', (e) => {
    // RMB
    if (e.button === 2) {
        isMouseDown = false
    }
})

app.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        const deltaX = e.clientY - clientY
        lenis.scrollTo(scrollValue - deltaX)
    }
})
