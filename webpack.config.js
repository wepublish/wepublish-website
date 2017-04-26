require('dotenv').config({silent: true})

var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack')
var production = process.env.NODE_ENV === 'production'
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  devtool: production ? "cheap-module-source-map" : "source-map",

  output: {
    filename: 'bundle.js',
    path: 'dist/build',
    publicPath: '/build/'
  },

  resolve: {
    extensions: ["", ".es", ".js"],
    modulesDirectories: ['node_modules', 'src']
  },

  devServer: {
    contentBase: "/",
    port: 8080,
    host: '0.0.0.0',
    // noInfo: true, //  --no-info option
    // hot: true,
    inline: true
  },

  plugins: getPlugins(production),

  module: {
    loaders: [
      {
        test: /(\.jsw)$/,
        loader: 'worker-loader',
        query: {
          name: '[name].worker.js'
        }
      },
      {
        test: /(\.js)|(\.jsw)$/, exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.scss$/,
        loader: production ? ExtractTextPlugin.extract('style', 'css!postcss-loader!sass') : 'style!css!postcss-loader!sass'
      },
      {
        test: /\.eot$|\.woff$|\.woff2$|\.ttf$|\.static\.json$/,
        loader: "file"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?name=[name].[ext]!img?minimize&optimizationLevel=5&progressive=true'
      },
      {
        test: /\.font\.(js|json)$/,
        loader: "style!css!fontgen"
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  }
}

function getPlugins(production) {
  var result = production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css")
  ] : []

  var definePlugin = new webpack.DefinePlugin({
    WEBPACK_FRONTEND_BUILD: true,
    'process.env': {
      NODE_ENV: `'${process.env.NODE_ENV}'`,
      KARMA_ENDPOINT: `'${process.env.KARMA_ENDPOINT}'`,
      KARMA_DATABASE: `'${process.env.KARMA_DATABASE}'`,
      KARMA_PWD: `'${process.env.KARMA_PWD}'`,
      KARMA_USER: `'${process.env.KARMA_USER}'`
    }
  })

  result.push(definePlugin)
  return result
}