import { LiquidGlass } from '#/scripts/optional/liquid-glass-provider'

const lq = new LiquidGlass(document.querySelector('.liquid-container')!, {
    blur: 1,
    brightness: 2
})

setTimeout(() => {
    lq.update()
}, 1)
