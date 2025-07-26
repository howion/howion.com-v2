export const isDev = process.env.NODE_ENV === 'development'

export const APP = {
    name: 'Howion Boilerplate',
    site: 'https://howion.com',

    // Set quick development mode to true to hinder or disable some stuff. This
    // includes but not limited to: post-effects, fancy-cursor and possibly
    // your loaders that you will possibly conditionally hide from now on.
    quickDevelopmentMode: isDev && true,

    // enable critters for production builds
    enableCritters: false,

    // When enabled, astro will switch to server mode. I haven't tested it yet
    // as I didn't find any use case for it.
    ssr: false
}

export const SEO_DEFAULTS = {
    title: APP.name,
    description: 'Ultime Astro Boiler',
    keywords: ['howion']
}
