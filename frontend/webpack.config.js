const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const path = require('path')

const debugPlugins = []
const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
]

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './js/client.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        },
      },
      // SASS Loader
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap',
        // loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      // copy images to dist/img/name.png
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=img/[name].[ext]',  // <-- retain original file name
      },
      // copy favicon to dist/favicon.ico
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',  // <-- retain original file name
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: 'client.min.js',
  },
  plugins: debug ? debugPlugins : productionPlugins,
  watchOptions: {
    poll: 300,
    aggregateTimeout: 1000,
  },
  devServer: {
    // redirect api calls to backend server
    proxy: {
      '/api/*': {
        target: {
          host: 'back',
          protocol: 'http:',
          port: 8080,
        },
        pathRewrite: {
          '^/api': '',
        },
        ignorePath: false,
        changeOrigin: true,
        secure: false,
      },
    },
  },
}

