const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // Прокси для основного API
      '/api': {
        target: 'http://localhost:8100',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      // Прокси для аналитики
      '/analytics': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/analytics': '' },
      },
    },
  },
});