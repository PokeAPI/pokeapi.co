module.exports = {
    siteMetadata: {
        title: 'Pokéapi',
        siteUrl: 'https://pokeapi.co',
    },
    plugins: [
        // `gatsby-plugin-sass`,
        // 'gatsby-plugin-react-helmet',
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
