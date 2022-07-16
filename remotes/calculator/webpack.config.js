/* eslint-disable @typescript-eslint/no-var-requires */
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { remotes } = require('../../remote.config');

const webpackConfig = ({ standalone, env }) => {
  const { name, port } = remotes['calculator'];

  const isStandalone = Boolean(standalone);

  const plugins = [];

  if (isStandalone) {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
        },
        hash: false,
      })
    );
  } else {
    plugins.push(
      new ModuleFederationPlugin({
        name,
        filename: 'remoteEntry.js',
        exposes: {
          './Calculator': './src/Calculator.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom'],
          },
        },
      })
    );
  }

  return {
    mode: env,
    entry: isStandalone ? './bootstrap.tsx' : './index.tsx',
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
      port,
      open: isStandalone,
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
    plugins,
  };
};

module.exports = webpackConfig;
