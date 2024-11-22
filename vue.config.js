const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8100', // Ваш бэкенд-сервер
        changeOrigin: true, // Меняет origin заголовка на целевой сервер
        pathRewrite: { '^/api': '' }, // Убирает префикс /api из пути
      },
    },
  },
});
