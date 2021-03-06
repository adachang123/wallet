const path = require('path');

var config = {
   entry: './src/main.js',
   mode: 'development',
   output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }
      ]
   }
}
module.exports = config;

