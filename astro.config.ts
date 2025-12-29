// @ts-check
import type { RedirectConfig } from 'astro'
import { defineConfig } from 'astro/config'

// official addons
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'

// other addons
import robotsTxt from 'astro-robots-txt'
import Sonda from 'sonda/astro'
import compress, { Default } from '@playform/compress'
import betterImageService from 'astro-better-image-service'
import critters from 'astro-critters'
import webmanifest from 'astro-webmanifest'

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
    output: 'static', // default output mode
    server: {
        port: 3000
    },
    adapter: vercel({
        webAnalytics: {
            enabled: false // handled within document
        },
        imageService: false
    }),
    security: {
        // server only
        checkOrigin: false
    },
    site: APP.site,
    trailingSlash: 'ignore',
    devToolbar: {
        enabled: false
    },
    prefetch: {
        prefetchAll: false,
        defaultStrategy: 'hover'
    },
    vite: {
        esbuild: {
            minifyIdentifiers: true,
            treeShaking: true,
            drop: ['console', 'debugger'],
            legalComments: 'none',
            keepNames: false
        },
        build: {
            modulePreload: {
                polyfill: false
            },
            sourcemap: willAnalyze,
            minify: 'esbuild',
            rollupOptions: {
                treeshake: {
                    unknownGlobalSideEffects: false,
                    propertyReadSideEffects: false,
                    tryCatchDeoptimization: false,
                    moduleSideEffects: 'no-external'
                }
            }
        }
    },
    redirects: socialRedirects,
    integrations: [
        APP.jsx.enabled && APP.jsx.preact.enabled
            ? preact({ compat: APP.jsx.preact.compat, devtools: APP.jsx.preact.devtools })
            : undefined,
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
        webmanifest({
            name: APP.name,
            short_name: APP.shortName,
            description: APP.description,
            theme_color: APP.themeColor,
            background_color: APP.backgroundColor,
            categories: ['social', 'utilities'], // see: https://github.com/w3c/manifest/wiki/Categories
            lang: 'en-US',
            dir: 'ltr',

            icons: [
                {
                    src: '/web-app-manifest-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ],
            start_url: '/',
            orientation: 'any',
            screenshots: [
                {
                    src: '/assets/screenshots/howioncom.webp',
                    sizes: '960x540',
                    platform: 'webapp',
                    label: 'howion.com screenshot'
                }
            ]
            // display: APP.display
        }),
        willAnalyze ? Sonda({ server: true, gzip: true }) : undefined
    ]
})
