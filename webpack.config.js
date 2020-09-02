const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

 module.exports = {
   module: {
     rules: [
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
       },
       {
         test: /\.html$/,
         use: [
           {
             loader: 'html-loader',
             options: { minimize: true } 
           }
         ]
       },
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
       {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
     ]
   },
   plugins: [
     new HtmlWebPackPlugin({
       template: './src/index.html',
       filename: './index.html'
     }), 
     new Dotenv()
   ]
 }