export const isDev = process.env.NODE_ENV === 'development'

export const APP = {
    name: 'howion.com',
    shortName: 'howion',
    description: 'Personal website v2 of Mert "howion" Coskun',
    // display: 'standalone', // "standalone" | "fullscreen" | "minimal-ui" | "browser" | undefined
    site: 'https://www.howion.com',

    themeColor: '#10100E',
    backgroundColor: '#10100E',

    // Set quick development mode to true to hinder or disable some stuff. This
    // includes but not limited to: post-effects, fancy-cursor and possibly
    // your loaders that you will possibly conditionally hide from now on.
    quickDevelopmentMode: isDev && false,

    // enable critters for production builds
    enableCritters: false,

    jsx: {
        enabled: true,
        preact: {
            enabled: true,
            compat: false,
            devtools: false
        }
    }
} as const

export const SEO_DEFAULTS = {
    title: 'Mert Coskun (howion) | Software Developer, Researcher, Builder',
    description:
        'Personal website of Mert "howion" Coskun featuring software development, research interests, selected work, notes, and contact details.',
    keywords: [
        'Mert Coskun',
        'Omer Mert Coskun',
        'howion',
        'howion.com',
        'software developer',
        'web developer',
        'researcher'
    ],
    locale: 'en_US',
    ogImage: '/og.png',
    ogImageAlt: 'howion.com screenshot'
} as const
