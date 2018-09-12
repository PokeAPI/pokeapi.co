module.exports = {
    siteMetadata: {
        title: 'Pokéapi',
        url: 'https://pokeapi.co',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                includePaths: ['src/theme'],
            },
        },
        {
            resolve: `gatsby-plugin-react-css-modules`,
            options: {
                // *.css files are included by default
                filetypes: {
                    '.scss': {syntax: `postcss-scss`},
                },

                // Exclude global styles from the plugin using a RegExp:
                // exclude: `\/global\/`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'PokéAPI',
                short_name: 'PokéAPI',
                start_url: '/',
                background_color: '#000000',
                theme_color: '#EF5350',
                display: 'minimal-ui',
                icon: 'src/images/icon.png', // This path is relative to the root of the site.
            },
        },
        'gatsby-plugin-offline',
    ],
};
