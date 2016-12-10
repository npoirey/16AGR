const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      //SASS Loader
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
        //loaders: ['style', 'css', 'sass']
      },
      // copy images to dist/img/name.png
      {test: /\.png$/, loader: "file-loader?name=img/[name].png"},
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
  ],
  watchOptions: {
    poll: 300,
    aggregateTimeout: 1000
  },
  devServer: {
    //redirect api calls to backend server
    proxy: {
      '/api/*': {
        target: {
          host: "back",
          protocol: 'http:',
          port: 8080
        },
        pathRewrite: {
          '^/api': ''
        },
        ignorePath: false,
        changeOrigin: true,
        secure: false
      }
    }
  }
};


