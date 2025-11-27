import { APP } from "##/.boilerrc";
import { HomeDatFeaturedWorkPicturesPath } from "##/constants/home-data";
import { forcePreloadImage, onIdle } from "#/utils/client";
import { lenis } from "./lenis";

(() => {
    const loader = document.getElementById('loader') as HTMLDivElement

    if (!loader) return

    window.addEventListener('load', () => {
        document.fonts.load(`500 18px "Overused Grotesk"`).then(() => {
            setTimeout(() => {
                window.document.body.classList.add('is-loaded')

                if (!APP.quickDevelopmentMode) {
                    setTimeout(() => {
                        lenis.scrollTo('.scroll-into-view', {})
                    }, 500);
                }
            }, 4000)

            onIdle(() => {
                for (const uri of HomeDatFeaturedWorkPicturesPath) {
                    forcePreloadImage(`/assets/screenshots/${uri}`)
                }
            })
        });
    }, { once: true })
})();
