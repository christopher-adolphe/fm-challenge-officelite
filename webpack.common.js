const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index.ts'),
    path.resolve(__dirname, 'src/assets/scss/index.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[name][ext]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.(svg|ico|png|webp|gif|jpg|jpeg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Officelite coming soon site',
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Officelite: Sign Up',
      template: path.resolve(__dirname, 'src/sign-up.html'),
      filename: 'sign-up.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Officelite: Design System',
      template: path.resolve(__dirname, 'src/design-system.html'),
      filename: 'design-system.html'
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, 'src/partials/header.html'),
      location: 'header',
      template_filename: ['index.html', 'sign-up.html', 'design-system.html']
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, 'src/partials/footer.html'),
      location: 'footer',
      template_filename: ['index.html', 'sign-up.html']
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css'
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js', '.json']
  }
};
