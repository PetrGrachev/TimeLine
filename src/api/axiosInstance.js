// src/api/axiosInstance.js
import axios from 'axios';
import { refreshToken } from './authApi';


export function getUserLocation() {
  return axios
    .get('https://ipinfo.io/json?token=f50432262e4df6')
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        const location = response.data.loc.split(','); // loc возвращает строку вида "lat,lng"
        return {
          latitude: parseFloat(location[0]),
          longitude: parseFloat(location[1]),
        };
      }
    })
    .catch((error) => {
      console.error("Ошибка получения местоположения:", error.message);
      // Используйте координаты по умолчанию (например, Москва)
      return {
        latitude: 55.7558,
        longitude: 37.6176,
      };
    });
}

const axiosInstance = axios.create({
  baseURL: '/api/v1', // Базовый URL для всех запросов
  timeout: 10000, // Максимальное время ожидания ответа
  headers: { 'Content-Type': 'application/json' }, // Заголовки по умолчанию
});

// Добавляем интерсептор запроса
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Проверка на 401 и чтобы это не был запрос на refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Если уже идет обновление токена — ставим запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (!storedRefreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await refreshToken(storedRefreshToken);
        const newAccessToken = response.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + newAccessToken;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
// Используем интерсептор для обработки ошибок и вызова функции handleServerError
