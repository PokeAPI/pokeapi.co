export default {
    // siteRoot: 'https://pokeapi.co',
    paths: {
        src: 'src',
        temp: 'tmp', // Temp output directory for build files not to be published.
        dist: 'dist', // The production output directory.
        devDist: 'tmp/dev-server', // The development scratch directory.
        public: 'public', // The public directory (files copied to dist during build)
        assets: 'dist', // The output directory for bundled JS and CSS
        buildArtifacts: 'artifacts', // The output directory for generated (internal) resources
    },
    entry: 'index.js', // Relative to paths.src

    minLoadTime: 200,

    getRoutes: async () => {
        return [
            {
                path: '404',
                template: 'src/pages/404.js',
            },
            {
                path: '/',
                template: 'src/pages/index.js',
            },
            {
                path: '/about.html',
                template: 'src/pages/about.html.js',
            },
            {
                path: '/docs/',
                template: 'src/pages/docs.js',
            },
            {
                path: '/docs/v1.html',
                template: 'src/pages/docs/v1.html.js',
            },
            {
                path: '/docs/v2.html',
                template: 'src/pages/docs/v2.html.js',
            },
            {
                path: 'status',
                template: 'src/pages/status.js',
            },
        ];
    },

    plugins: [
        'react-static-plugin-react-router',
        'react-static-plugin-sitemap',
    ],
};
