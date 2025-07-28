import Lenis from 'lenis'

// initialize Lenis
const lenis = new Lenis({
    wrapper: document.querySelector('#app-wrapper') as HTMLElement,
    content: document.querySelector('#app') as HTMLElement,
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
        const style = el.getAttribute('data-parallax-style')!
        const offset = el.offsetTop
        const d = scroll - offset
        el.style.transform = style.replaceAll('$', `${d}px`)
    }

    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// scroll to hero onload
lenis.scrollTo('#section-home', {})
