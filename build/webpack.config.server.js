const path = require('path')
const BaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

const config = {
  target: 'node',
  entry: {
    app: path.resolve(__dirname,'../client/server.entry.js')
  },
  externals: Object.keys(require('../package').dependencies),
  output: {
    filename: 'server-entry.js',
    publicPath: "",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.__SERVER__SIDE__': 'true'
    })
  ]
}

module.exports = merge(BaseConfig,config)



