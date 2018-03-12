const webpack = require('webpack');
const path = require('path');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');


module.exports = env => {
  const dev = (env && env.NODE_ENV) !== "production";

  let plugins = [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(!dev),
      'HOST': JSON.stringify(env && env.HOST) || "http://localhost:4203"
    }),
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, '../src')
    )
  ]
  
  if (!dev) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ sourcemap: false }));
  }

  const commonConfig = {
    context: __dirname,
    devtool: dev ? "inline-sourcemap" : false,
    module: { 
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ["es2015","stage-0"]
          }
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: path.resolve(__dirname, 'src', 'tsconfig.app.json') }
            } , 'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          exclude: /node_modules/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },

        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'raw-loader'
        },
        
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: 'json-loader'
        }
      ],
    },
    resolve: {
      "extensions": [
          ".ts",
          ".js"
      ],
      modules: [
        __dirname,
        'node_modules',
      ],
    },
    plugins: plugins,
  }

  return [
    Object.assign({
      entry: { 
        loader: "./loader.js"
      },
      output: {
        path: __dirname + "/lib",
        filename: "[name].js",
        libraryTarget: 'amd'
      }

    }, commonConfig),
    Object.assign({
      entry: {
        //add here extra packages when needed, add it in the scripts_list_creator files filter to exclude it from the build
        menu: "./src/dev-apps/menu.ts"
      },
      output: {
        path: __dirname + "/lib",
        filename: "[name].js",
        
      },
    }, commonConfig)
  ] 
};
