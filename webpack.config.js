const path = require('path')
const webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: ['./index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/src',
	historyApiFallback: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                }],
            },
    	    {
        		test: /\.css$/,
        		use: ["style-loader", "css-loader", 'resolve-url-loader'],
    	    },
    	    {
        		test: /\.scss$/,
        		use: ['style-loader', 'css-loader', 'resolve-url-loader','sass-loader']
    	    },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        name: '[name]-[hash].[ext]',
                    },
                }],
            },
        ]
    }
}
