const replace = require('replace-in-file');

replace.sync({
    files: require.resolve('pcf-scripts/webpackConfig.js'),
    from: /ESBuildMinifyPlugin\s*\({\s*target:\s*'es2015'\s*}\s*\)/g,
    to: "ESBuildMinifyPlugin({ target: 'es2015', sourcemap: true})",
});

replace.sync({
    files: require.resolve('pcf-scripts/tasks/startTask.js'),
    from: 'node node_modules/pcf-start/bin/pcf-start\.js',
    to: 'node "${__dirname}/../../pcf-start/bin/pcf-start.js"'
})