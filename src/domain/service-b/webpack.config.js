const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals({
        modulesDir: path.resolve(__dirname, '../../../node_modules')
    })]
}
