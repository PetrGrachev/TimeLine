import axiosInstance from './axiosInstance';

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
          coords: [org.coords.lat, org.coords.long],
          schedule: org.today_schedule
          ? {
            break_end: org.today_schedule.break_end,
            break_start: org.today_schedule.break_start,
            close: org.today_schedule.close,
            open: org.today_schedule.open,
          }
          : null,
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
            return {
              orgs: [],  // Пустой список организаций
              pages: 0,  // Количество страниц
            };
          }
  
          // Преобразуем ответ в нужную структуру
          const orgs = response.data.orgs.map(org => ({
            id: org.org_id,
            address: org.address,
            name: org.name,
            rating: org.rating,
            schedule: org.today_schedule
          ? {
            break_end: org.today_schedule.break_end,
            break_start: org.today_schedule.break_start,
            close: org.today_schedule.close,
            open: org.today_schedule.open,
          }
          : null,
            type: org.type,
          }));
          return {
            orgs: orgs,
            found: response.data.found,
          };
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