import axiosInstance from './axiosInstance';

function isOK(status) {
    return status >= 200 && status < 300;
  }
  
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