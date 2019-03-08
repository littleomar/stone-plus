const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const BaseConfig = require('./webpack.config.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
const cdnConfig = require('../app.config').cdn

const config = {
  entry: {
    app: path.resolve(__dirname,'../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HTMLPlugin({
      template: path.resolve(__dirname,'../client/index.html'),
      filename: 'template.html'
    }),
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.resolve(__dirname,'../client/server.template.ejs'),
      filename: 'server.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env.__SERVER__SIDE__': 'false'
    })
  ]
}

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    publicPath: '/public/',
    port: 8080,
    hot: true,
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/public/template.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.entry = {
    app: path.resolve(__dirname,'../client/app.js')
  }

  config.output.filename = '[name].[chunkhash].js'

  config.output.publicPath = cdnConfig.host
  config.optimization = {
    minimizer: [new UglifyJsPlugin()],
    // splitChunks: {
    //   name: 'vendor'
    // }
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /(react)|(react-dom)|(react-router-dom)|(mobx)|(mobx-react)|(axios)/,
          chunks:'all'
        }
      }
    }
  }
}


module.exports = merge(BaseConfig,config)




