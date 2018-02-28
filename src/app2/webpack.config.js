const webpack = require('webpack');

module.exports = env => {
  const dev = (env && env.NODE_ENV) !== "production";

  let plugins = [new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(!dev)
  })]
  
  if (!dev) {
    plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]);
  }
  return {
    context: __dirname,
    devtool: dev ? "inline-sourcemap" : false,
    entry: {
      loader: "./loader.js"
    },
    output: {
      path: __dirname + "/lib",
      filename: "loader.js",
      libraryTarget: 'amd'
    },
    plugins: plugins,
  }
};