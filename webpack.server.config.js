var fs = require('fs')
var path = require('path')
var production = process.env.NODE_ENV === 'production'
var webpack = require('webpack')

var config = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/backend/server.js')],
  devtool: "source-map",

  output: {
    filename: 'server.bundle.js',
    path: 'dist/build',
    publicPath: '/build/'
  },

  resolve: {
    extensions: ["", ".es", ".js"],
    modulesDirectories: ['node_modules', 'src']
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

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
        test: /\.eot$|\.woff$|\.woff2$|\.ttf$|\.static\.json$/,
        loader: "file"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?name=[name].[ext]!img?minimize&optimizationLevel=5&progressive=true'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_FRONTEND_BUILD: false
    })
  ]
}

var configDev = {}

module.exports = production ? config : Object.assign(config, configDev);