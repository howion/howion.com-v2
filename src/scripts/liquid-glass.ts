import { LiquidGlass } from '#/scripts/optional/liquid-glass-provider'
import { isMobile } from '#/utils/client'

if (!isMobile()) {
    setTimeout(() => {
        const lq = new LiquidGlass(document.querySelector('.liquid-container')!, {
            blur: 1,
            brightness: 2
        })
        lq.update()
        window.addEventListener('resize', () => lq.update())
    }, 1)
}
