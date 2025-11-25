import { APP } from "##/.boilerrc";
import { lenis } from "./lenis";

(() => {
    const loader = document.getElementById('loader') as HTMLDivElement

    if (!loader) return

    document.fonts.load(`500 18px "Overused Grotesk"`).then(() => {
        setTimeout(() => {
            window.document.body.classList.add('is-loaded')

            if (!APP.quickDevelopmentMode) {
                setTimeout(() => {
                    lenis.scrollTo('.scroll-into-view', {})
                }, 500);
            }
        }, 4000)
    });
})();
