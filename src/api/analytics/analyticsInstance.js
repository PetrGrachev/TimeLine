import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/analytics', // Базовый URL для всех запросов
    timeout: 10000, // Максимальное время ожидания ответа
    headers: { 'Content-Type': 'application/json' }, // Заголовки по умолчанию
});

export default axiosInstance;