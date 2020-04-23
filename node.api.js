import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

// Add support for CSS Modules with Sass
// CSS modules must use the file extension ".module.scss" or ".module.sass".

export default () => ({
    webpack: (config, {stage}) => {
        config.module.rules[0].oneOf.unshift({
            test: /\.s(a|c)ss$/,
            use: initLoaders({stage, modules: false}),
        });

        // CSS modules rule must come first in the array
        config.module.rules[0].oneOf.unshift({
            test: /\.module.s(a|c)ss$/,
            use: initLoaders({stage, modules: true}),
        });

        if (
            config.optimization.splitChunks &&
            config.optimization.splitChunks.cacheGroups.styles
        ) {
            config.optimization.splitChunks.cacheGroups.styles.test = /\.(c|sc|sa)ss$/;
        }

        return config;
    },
});

function initLoaders({stage, modules = false}) {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            modules: modules,
            localIdentName: '[name]__[local]--[hash:base64:5]',
            exportOnlyLocals: stage === 'node',
            importLoaders: 1,
            sourceMap: false,
        },
    };
    const sassLoader = {
        loader: require.resolve('sass-loader'),
        options: {
            sassOptions: {includePaths: ['src']},
        },
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
        case 'development':
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
