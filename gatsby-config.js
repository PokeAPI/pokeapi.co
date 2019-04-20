module.exports = {
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                includePaths: ['src/theme'],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-53299289-1',
                head: false,
                anonymize: true,
                respectDNT: true,
            },
        },
        'gatsby-plugin-react-svg',
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
    ],
};
