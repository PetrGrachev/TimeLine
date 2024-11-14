// src/api/errorHandler.js

let appRouter = null; // Переменная для хранения экземпляра роутера

export function setRouter(router) {
  appRouter = router; // Устанавливаем роутер
}

export function handleServerError(error) {
  if (!appRouter) {
    console.error("Router is not set in errorHandler. Use setRouter() to set it.");
    return;
  }

  if (error.response) {
    let routeConfig;

    if (error.response.status === 404) {
      routeConfig = { name: 'NotFound', params: { errorCode: 404, errorMessage: 'Страница не найдена' } };
    } else if (error.response.status === 500) {
      routeConfig = { name: 'NotFound', params: { errorCode: 500, errorMessage: 'Внутренняя ошибка сервера' } };
    } else {
      routeConfig = { name: 'NotFound', params: { errorCode: error.response.status, errorMessage: error.message } };
    }

    // Используем роутер для перенаправления на страницу ошибки
    appRouter.push(routeConfig);
  } else {
    // Если сервер не отвечает
    appRouter.push({ name: 'NotFound', params: { errorCode: 'Ошибка', errorMessage: 'Сервер не отвечает' } });
  }
}
