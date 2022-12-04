/* config-overrides.js */

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
    
    return config;
  }