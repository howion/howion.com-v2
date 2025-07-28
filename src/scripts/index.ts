import Lenis from 'lenis'

// initialize Lenis
const lenis = new Lenis({
    wrapper: document.querySelector('#app-wrapper') as HTMLElement,
    content: document.querySelector('#app') as HTMLElement,
    infinite: true,
    syncTouch: true,
    anchors: true
})

const parallaxElements = document.querySelectorAll('[data-parallax-speed]') as NodeListOf<HTMLElement>

// main raf loop
function raf(time: number) {
    lenis.raf(time)

    // handle scroll events here
    const scroll = lenis.actualScroll

    // for (const el of parallaxElements) {
    //     const speed = parseFloat(el.getAttribute('data-parallax-speed')!)
    //     if (Number.isNaN(speed)) continue
    //     const offset = el.getBoundingClientRect().top
    //     const translateY = (scroll - offset) * speed
    //     el.style.transform = `translateY(${translateY}px)`
    // }

    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// scroll to hero onload
lenis.scrollTo('#section-home', {})
