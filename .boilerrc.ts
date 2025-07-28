export const isDev = process.env.NODE_ENV === 'development'

export const APP = {
    name: 'Howion',
    description: 'Personal website of Mert "howion" Coskun, updated to v2.',
    site: 'https://www.howion.com/',

    // Set quick development mode to true to hinder or disable some stuff. This
    // includes but not limited to: post-effects, fancy-cursor and possibly
    // your loaders that you will possibly conditionally hide from now on.
    quickDevelopmentMode: isDev && true,

    // enable critters for production builds
    enableCritters: false,

    // When enabled, astro will switch to server mode. I haven't tested it yet
    // as I didn't find any use case for it.
    ssr: {
        enabled: false,
        adapter: 'vercel'
    }
} as const

export const SEO_DEFAULTS = {
    title: APP.name,
    description: APP.description,
    keywords: ['howion', 'howion.com']
} as const
