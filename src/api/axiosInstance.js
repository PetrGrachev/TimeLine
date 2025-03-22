// src/api/axiosInstance.js
import axios from 'axios';


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

export default axiosInstance;
// Используем интерсептор для обработки ошибок и вызова функции handleServerError
