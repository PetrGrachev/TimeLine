import axiosInstance from './axiosInstance';

export function getWorkers(org_id) {

    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/workers`;
  
    return axiosInstance.get(url)
      .then(response => {
        if (response.status === 200) {
          console.log("Успешный ответ:", response.data);
  
          // Проверка на наличие ключа "orgs" и его длину
          if (!response.data || response.data.length === 0) {
            console.log("Ответ содержит пустой массив. Нет доступных работников.");
            return [];
          }
  
          // Преобразуем ответ в нужную структуру
          const workers = response.data.map(worker => ({
            org_id: worker.org_id,
            worker_id: worker.worker_id,
            degree: worker.worker_info.Degree,
            first_name: worker.worker_info.first_name,
            last_name: worker.worker_info.last_name,
            position: worker.worker_info.position,
          }));
          return workers;
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