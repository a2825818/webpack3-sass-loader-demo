var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
      'main': ['./main.js'],
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
        filename: "[name].css",
        disable: process.env.NODE_ENV === "development",
        allChunks: true
    })
  ],
  devtool: "source-map",
  module: {
    rules: [
        {
            test: /\.scss|.sass$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use:[ {
                  loader:'css-loader',
                  options:{
                    url:false,
                    minimize: false,
                    sourceMap: true,
                    importLoaders: 1
                  }
                },
                {
                  loader:'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: (loader) => [
                      require('autoprefixer')({
                        "browsers": ["last 5 versions"]
                      }),
                    ]
                  }
                },
                {
                  loader:'sass-loader'
                }]
            })
        }
    ]
  }
}