export const isDev = process.env.NODE_ENV === 'development'

export const APP = {
    name: 'Howion',
    description: 'Personal website of Mert "howion" Coskun, updated to v2.',
    site: 'https://www.howion.com/',

    // Set quick development mode to true to hinder or disable some stuff. This
    // includes but not limited to: post-effects, fancy-cursor and possibly
    // your loaders that you will possibly conditionally hide from now on.
    quickDevelopmentMode: isDev && false,

    // enable critters for production builds
    enableCritters: false
} as const

export const SEO_DEFAULTS = {
    title: APP.name,
    description: APP.description,
    keywords: ['howion', 'howion.com']
} as const
