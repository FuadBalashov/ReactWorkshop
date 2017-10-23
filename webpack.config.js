var config = {
  entry: './main.js',

  output: {
    path: __dirname,
    filename: 'index.js'
  },

  devServer: {
    inline: true,
    port: 8081
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        enforce: 'pre',
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets:
          [
            ['env', {
              'targets': {
                'browsers': ['last 2 versions']
              }
            }],
            'es2015',
            'react',
            'stage-2'
          ]
        }
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
};

module.exports = config;
