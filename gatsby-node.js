/*
    Modify webpack config to disable source maps in production
*/
exports.onCreateWebpackConfig = ({actions, stage}) => {
    if (stage === 'build-javascript') {
        actions.setWebpackConfig({
            devtool: false,
        });
    }
};
