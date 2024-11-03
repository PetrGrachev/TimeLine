// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Базовый URL для всех запросов
  timeout: 10000, // Максимальное время ожидания ответа
  headers: { 'Content-Type': 'application/json' }, // Заголовки по умолчанию
});

// Экспортируйте экземпляр, чтобы использовать его в любом компоненте
export default axiosInstance;