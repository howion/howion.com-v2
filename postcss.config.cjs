const isDev = process.env.NODE_ENV === 'development'

const plugins = [
    require('postcss-import'),
    require('postcss-for'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-will-change'),
    require('postcss-hexrgba'),
    require('postcss-color-hex-alpha'),
    require('postcss-calc'),
    require('postcss-combine-duplicated-selectors'),

    // prod but keep it just in case of any incompatibility
    require('autoprefixer')
]

if (!isDev) { // isProd
    plugins.push(...[
        require('cssnano')
    ])
}

module.exports = { plugins }
