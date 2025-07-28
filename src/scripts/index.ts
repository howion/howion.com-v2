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

const parallaxElements = document.querySelectorAll('[data-parallax-style]') as NodeListOf<HTMLElement>

// main raf loop
function raf(time: number) {
    lenis.raf(time)

    // handle scroll events here
    const scroll = lenis.actualScroll

    for (const el of parallaxElements) {
        const h = el.offsetHeight
        const style = el.getAttribute('data-parallax-style')!
        const offset = el.offsetTop
        const d = scroll - offset + 2 * h
        el.style.transform = style.replaceAll('$', `${d}px`)
    }

    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

if (!APP.quickDevelopmentMode) {
    // scroll to hero onload
    lenis.scrollTo('#section-home', {})
}

let isMouseDown = false
let clientY = 0
let scrollValue = 0

app.addEventListener('contextmenu', (e) => {
    e.preventDefault()
})

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
