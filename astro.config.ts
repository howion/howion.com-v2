// @ts-check
import { defineConfig } from 'astro/config'

// official addons
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

// other addons
import robotsTxt from 'astro-robots-txt'
import Sonda from 'sonda/astro'
import compress, { Default } from '@playform/compress'
import betterImageService from 'astro-better-image-service'
import critters from 'astro-critters'

import { APP } from './.boilerrc.ts'

const willAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
    output: APP.ssr ? 'server' : 'static', // static | server
    server: {
        port: 3000
    },
    adapter: vercel(),
    security: {
        // server only
        checkOrigin: false
    },
    site: APP.site,
    trailingSlash: 'never',
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
    markdown: {
        shikiConfig: {
            theme: 'monokai'
        }
    },
    integrations: [
        // preact({ compat: true }),
        betterImageService(),
        APP.enableCritters ? critters() : undefined,
        compress({
            ...Default,
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
