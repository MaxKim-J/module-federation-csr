/* eslint-disable @typescript-eslint/no-var-requires */
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { remotes } = require('../remote.config');

const getRemoteEntryUrl = ({ remotes, env }) => {
  const urlType = env === 'production' ? 'prodUrl' : 'devUrl';
  const remotesEntries = Object.keys(remotes).map((key) => [
    key,
    remotes[key][urlType],
  ]);

  return Object.fromEntries(remotesEntries);
};

const webpackConfig = ({ env }) => {
  return {
    mode: env,
    entry: './index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'swc-loader',
          exclude: /node_modules/,
          options: {
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              target: 'es2017',
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
        },
        hash: false,
      }),
      new ModuleFederationPlugin({
        name: 'host',
        remotes: getRemoteEntryUrl({
          remotes,
          env,
        }),
      }),
    ],
  };
};

module.exports = webpackConfig;
