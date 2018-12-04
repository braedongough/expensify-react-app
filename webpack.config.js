const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const absolutePath = path.join(__dirname, 'public')
    const isProduction = env === 'production'
    const CSSExtract = new MiniCssExtractPlugin('styles.css')
    console.log(env)
    return {
        entry: './src/app.js',
        output: {
            path: absolutePath,
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/, //checking if files end in .js, only then will we run them through babel.
                exclude: /node_modules/ //tells webpack to ignore the files in node_modules and not run them through babel.
            }, {
                test: /\.s?css$/, //checking if files end in .css or .scss (? makes s optional)
                use: [
                    MiniCssExtractPlugin.loader,
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
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: absolutePath,
            historyApiFallback: true
        },
        mode: 'development'
    }
}