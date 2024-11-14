// src/api/axiosInstance.js
import axios from 'axios';
import { handleServerError } from '@/api/errorHandler';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Базовый URL для всех запросов
  timeout: 1000, // Максимальное время ожидания ответа
  headers: { 'Content-Type': 'application/json' }, // Заголовки по умолчанию
});

function postLogin(email, password, is_org) {
  const data = {
    email: email,
    is_org: is_org,
    password: password
  };

  return axiosInstance.post('/auth/login', data)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        // Сохраняем токены в localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        console.log("Токены успешно сохранены в localStorage.");
        return { accessToken, refreshToken };
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        console.log("Ошибка 400:", error.response.data);
        throw new Error(error.response.data);
      } else {
        console.log("Ошибка:", error.message);
        throw new Error("Произошла ошибка запроса");
      }
    });
}

// Используем интерсептор для обработки ошибок и вызова функции handleServerError
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleServerError(error); // Передаем ошибку в обработчик ошибок
    return Promise.reject(error);
  }
);

export default axiosInstance;