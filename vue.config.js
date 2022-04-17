const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path');

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      extensions: ['.js', '.ts', '.vue', '.json']
    },
    plugins: [
      // 按需载入
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
}