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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                }],
            },
        ]
    }
}
