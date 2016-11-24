// @flow
const merge = require('webpack-merge');

const mainConfig = require('./partials/main.config.js');

const config = merge(
  {
    devtool: 'eval'
  },
  mainConfig
);

module.exports = config;
