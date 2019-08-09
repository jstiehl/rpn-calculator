const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(env) {
  //env is a JSON.stringified value hence the comparison is '"development"'. yes it is weird.
  let loader =
    env === '"development"' ? 'style-loader' : MiniCssExtractPlugin.loader
  return {
    test: /\.scss$/,
    use: [loader, 'css-loader', 'sass-loader'],
  }
}
