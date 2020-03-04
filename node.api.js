import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

// Add support for CSS Modules with Sass
// CSS modules must use the file extension ".module.scss" or ".module.sass".

function initLoaders({stage, modules = false}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            modules: modules,
            importLoaders: 1,
            sourceMap: false,
        },
    };
    const sassLoader = {
        loader: 'sass-loader',
        options: {sassOptions: {includePaths: ['src', 'src/theme']}},
    };
    const postCssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({flexbox: 'no-2009'}),
            ],
        },
    };

    switch (stage) {
        case 'dev':
            return [
                {loader: ExtractCssChunks.loader, options: {hot: true}},
                cssLoader,
                postCssLoader,
                sassLoader,
            ];
        case 'node':
            // Don't extract css to file during node build process
            return [cssLoader, postCssLoader, sassLoader];
        default:
            // Prod
            return [
                ExtractCssChunks.loader,
                cssLoader,
                postCssLoader,
                sassLoader,
            ];
    }
}

export default () => ({
    webpack: (config, {stage}) => {
        config.module.rules[0].oneOf = [
            // CSS modules rule must come first
            {
                test: /\.module.s(a|c)ss$/,
                use: initLoaders({stage, modules: true}),
            },
            {
                test: /\.s(a|c)ss$/,
                use: initLoaders({stage, modules: false}),
            },
            ...config.module.rules[0].oneOf,
        ];

        if (
            config.optimization.splitChunks &&
            config.optimization.splitChunks.cacheGroups.styles
        ) {
            config.optimization.splitChunks.cacheGroups.styles.test = /\.(c|sc|sa)ss$/;
        }

        return config;
    },
});
