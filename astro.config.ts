// @ts-check
import type { RedirectConfig } from 'astro'
import { defineConfig } from 'astro/config'

// official addons
// import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

// other addons
import robotsTxt from 'astro-robots-txt'
import Sonda from 'sonda/astro'
import compress, { Default } from '@playform/compress'
import betterImageService from 'astro-better-image-service'
import critters from 'astro-critters'

// dynamic conf
import { APP } from './.boilerrc.ts'
import { HomeData } from './constants/home-data.ts'

const willAnalyze = process.env.ANALYZE === 'true'

// SOCIAL REDIRECTS START
const socialRedirects: Record<string, RedirectConfig> = {}
for (const [site, url] of Object.entries(HomeData.contactSocials)) {
    socialRedirects[site.toLowerCase()] = {
        status: 301,
        destination: url
    }
}
// SOCIAL REDIRECTS END

export default defineConfig({
    output: 'static', // static | server
    server: {
        port: 3000
    },
    // adapter: cloudflare(), // choose your adapter
    security: {
        // server only
        checkOrigin: false
    },
    site: APP.site,
    trailingSlash: 'always',
    devToolbar: {
        enabled: false
    },
    prefetch: {
        prefetchAll: false,
        defaultStrategy: 'hover'
    },
    vite: {
        build: {
            sourcemap: true
        }
    },
    redirects: socialRedirects,
    integrations: [
        // preact({ compat: true }),
        betterImageService(),
        APP.enableCritters ? critters() : undefined,
        compress({
            ...Default,
            HTML: {
                ...Default.HTML,
                'html-minifier-terser': {
                    removeAttributeQuotes: false,
                    removeTagWhitespace: false,
                    removeComments: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    collapseWhitespace: true // watch out for this, it can break some components
                }
            },
            CSS: false, // postcss cssnano is used instead
            Image: false,
            SVG: false
        }),
        sitemap(),
        robotsTxt({
            sitemap: true,
            policy: [{ allow: '/', userAgent: '*' }]
        }),
        willAnalyze ? Sonda({ server: true }) : undefined
    ]
})
