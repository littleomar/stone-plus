const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname,'../dist'),
    publicPath: "/public/"
  },
  resolve: {
    extensions: ['.js','.jsx'],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },

  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env","@babel/preset-react"],
            plugins: [ ["@babel/plugin-proposal-decorators", { "legacy": true }],["@babel/plugin-proposal-class-properties", { "loose": true }],"@babel/plugin-transform-runtime",'react-hot-loader/babel']
          }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev?'style.css':'style.[hash].css'
    })
  ]
}

module.exports = config
