// src/api/axiosInstance.js
import axios from 'axios';
import { handleServerError } from '@/api/errorHandler';


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

export function login(email, password, is_org) {
  const data = {
    email: email,
    is_org: is_org,
    password: password
  };

  return axiosInstance.post('/auth/login', data)
    .then(response => {
      if (isOK(response.status)) {
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

export function refreshToken(refresh_token){
  const data = {
    refresh_token: refresh_token
  };
  return axiosInstance.put('/auth/tokens/refresh', data)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);
        const accessToken = response.data.access_token;

        // Сохраняем токен в localStorage
        localStorage.setItem('accessToken', accessToken);

        console.log("Токены успешно сохранены в localStorage.");
        return { accessToken};
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        console.log("Ошибка 400:", error.response.data);
        throw new Error(error.response.data);
      } else if (error.response && error.response.status === 401) {
        console.log("Ошибка 401:", error.message);
        throw new Error(error.response.data);
      } else {
        console.log("Другая ошибка:", error.message);
        throw new Error("Произошла ошибка запроса");
      }
    });    
}

export function registerOrg(address, city, email, lat, long, name, password, type, telephone){
  const data = {
    address: address,
    city: city,
    email: email,
    lat: lat,
    long: long,
    name: name,
    password: password,
    type: type,
    about: "",
    telephone: telephone
  };
  console.log("Запрос", data);
  return axiosInstance.post('/auth/orgs', data)
    .then(response => {
      if (isOK(response.status)) {
        console.log("Успешный ответ:", response.data);
        const id = response.data.id;
        localStorage.setItem('id', id);
        return  id ;
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

export function registerUser(email, name, last_name, city, password){
  const data = {
    email: email,
    first_name: name,
    last_name: last_name,
    city: city,
    password: password,
    about: "",
    telephone: "+70000000000" 
  };
  console.log("Запрос", data);
  return axiosInstance.post('/auth/users', data)
    .then(response => {
      
        console.log("Успешный ответ:", response.data);
        const id = response.data.id;
        localStorage.setItem('id', id);
        return  id ;
      
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

export function verifyCode(code, email, id, is_org){
  const data = {
    code: code,
    email: email,
    id: id,
    is_org: is_org,
  };

  return axiosInstance.post('/auth/codes/verify', data)
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

export function sendCode(email, id, is_org){
  const data = {
    email: email,
    id: id,
    is_org: is_org,
  };
  console.log("Отправка запроса", data);
  return axiosInstance.post('/auth/codes/send', data)
    .then(response => {
      if (response.status === 201) {
        console.log("Успешный ответ:", response.data);
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

function isOK(status) {
  return status >= 200 && status < 300;
}

export function showMap(southWest, northEast) {
  const params = {  
      min_lat: southWest.lat,
      min_long: southWest.lng, 
      max_lat: northEast.lat,
      max_long: northEast.lng
    }

  return axiosInstance.get('/users/map/orgs', {params}) 
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);


      // Проверка на наличие ключа "map_orgs" и его длину
      if (!response.data.map_orgs || response.data.map_orgs.length === 0) {
        console.log("Ответ содержит пустой массив. Нет доступных организаций на карте.");
        return []; // Можно вернуть пустой массив или обработать как нужно
      }

      // Преобразуем ответ в нужную структуру
      const mapOrgs = response.data.map_orgs.map(org => ({
        name: org.name,
        org_id: org.org_id,
        rating: org.rating,
        type: org.type,
        coords: [org.coords.lat, org.coords.long]
      }));

      return mapOrgs;
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

export function findOrgs(limit, page, name, type) {
  const params = {  
      limit: limit,
      page: page, 
      name: name,
      type: type
    }

    return axiosInstance.get('/users/search/orgs', { params })
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        // Проверка на наличие ключа "orgs" и его длину
        if (!response.data.orgs || response.data.orgs.length === 0) {
          console.log("Ответ содержит пустой массив. Нет доступных организаций.");
          return []; // Можно вернуть пустой массив или обработать как нужно
        }

        // Преобразуем ответ в нужную структуру
        const orgs = response.data.orgs.map(org => ({
          id: org.id,
          about: org.info.about,
          address: org.info.address,
          city: org.info.city,
          lat: org.info.lat,
          long: org.info.long,
          name: org.info.name,
          rating: org.info.rating,
          telephone: org.info.telephone,
          type: org.info.type,
        }));
        return orgs;
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

export function getUser(id) {
  
  // Проверка, что id существует
  if (!id) {
    console.error("ID пользователя отсутствует в localStorage");
    return Promise.reject(new Error("ID пользователя отсутствует в localStorage"));
  }

  // Формирование URL с использованием id
  const url = `/users/info/${id}`;

  return axiosInstance.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        // Преобразуем ответ в нужную структуру
        const user = {
          about: response.data.about,
          city: response.data.city,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          telephone: response.data.telephone,
          user_id: response.data.user_id
        };

        return user;
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

export function updateUser(about, first_name, last_name, city, telephone, id){
  const data = {
    first_name: first_name,
    last_name: last_name,
    city: city,
    about: about,
    telephone: telephone,
    id: id,
  };

  return axiosInstance.put("/users/update", data)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);
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

export function getOrg(id) {
  
  // Проверка, что id существует
  if (!id) {
    console.error("ID пользователя отсутствует в localStorage");
    return Promise.reject(new Error("ID пользователя отсутствует в localStorage"));
  }

  // Формирование URL с использованием id
  const url = `/orgs/info/${id}`;

  return axiosInstance.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        // Преобразуем ответ в нужную структуру
        const org = {
            about: response.data.info.about,
            address: response.data.info.address,
            city: response.data.info.city,
            lat: response.data.info.lat,
            long: response.data.info.long,
            name: response.data.info.name,
            org_id: response.data.id,
            telephone: response.data.info.telephone,
            type: response.data.info.type
          };

        return org;
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

export function updateOrg(about, address, name, city, telephone, id, lat, long, type){
  const data = {
    name: name,
    city: city,
    about: about,
    telephone: telephone,
    org_id: id,
    address: address,
    lat: lat,
    long: long,
    type,
  };

  return axiosInstance.put("/orgs/update", data)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);
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
