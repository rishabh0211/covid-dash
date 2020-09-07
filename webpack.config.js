const path = require("path");
const { DefinePlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({
    path: './config/.env.test'
  });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: './config/.env.dev'
  });
}

console.log(process.env);

module.exports = () => {
  return {
    mode: "production",
    entry: "./src/app.js",
    // watch: process.env.NODE_ENV === "development",
    // watchOptions: {
    //   aggregateTimeout: 1000
    // },
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.[contentHash].js",
      chunkFilename: "[name].[contentHash].js",
      // publicPath: path.join(__dirname, "public", "dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new TerserPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!projected_maps', '!projected_maps/*']
      }),
      new HtmlWebpackPlugin({
        title: "Covid Dashboard",
        template: `index.html`
      }),
      new DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
    ],
    devtool: "source-map",
    devServer: {
      port: 8000,
      contentBase: path.join(__dirname, "public", "dist"),
      historyApiFallback: true,
    }
  };
};