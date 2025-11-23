import { isMobile } from '#/utils/client.ts'
import './lenis.ts'
import './loader.ts'

if (isMobile()) {
    document.body.classList.add('is-mobile')
}
