import axiosInstance from './axiosInstance';

export function getServices(org_id) {

    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/services`;
  
    return axiosInstance.get(url)
      .then(response => {
        if (response.status === 200) {
          console.log("Успешный ответ:", response.data);
  
          
          if (!response.data || response.data.length === 0) {
            console.log("Ответ содержит пустой массив. Нет доступных услуг.");
            return [];
          }
  
          // Преобразуем ответ в нужную структуру
          const services = response.data.map(service => ({
            org_id: service.org_id,
            service_id: service.service_id,
            cost: service.service_info.cost,
            description: service.service_info.description,
            name: service.service_info.name,
          }));
          return services;
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