// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Базовый URL для всех запросов
  timeout: 10000, // Максимальное время ожидания ответа
  headers: { 'Content-Type': 'application/json' }, // Заголовки по умолчанию
});



axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Если сервер вернул ошибку
      if (error.response.status === 404) {
        router.push({ name: 'NotFound', params: { errorCode: 404, errorMessage: 'Страница не найдена' } });
      } else if (error.response.status === 500) {
        router.push({ name: 'NotFound', params: { errorCode: 500, errorMessage: 'Внутренняя ошибка сервера' } });
      } else {
        router.push({ name: 'NotFound', params: { errorCode: error.response.status, errorMessage: error.message } });
      }
    } else {
      // Если сервер не отвечает
      router.push({ name: 'NotFound', params: { errorCode: 'Ошибка', errorMessage: 'Сервер не отвечает' } });
    }
    return Promise.reject(error);
  }
);
// Экспортируйте экземпляр, чтобы использовать его в любом компоненте
export default axiosInstance;