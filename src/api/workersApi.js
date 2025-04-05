import axiosInstance from './axiosInstance';

export function getWorkers(org_id, limit, page) {

  const params = {
    limit: limit,
    page: page
  };
  // Формирование URL с использованием id
  const url = `/orgs/${org_id}/workers`;

  return axiosInstance.get(url, { params })
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        // Проверка на наличие ключа "orgs" и его длину
        if (!response.data || response.data.length === 0) {
          console.log("Ответ содержит пустой массив. Нет доступных работников.");
          return {
            workers: [],
            found: 0,  // Количество страниц
          };
        }

        // Преобразуем ответ в нужную структуру
        const workers = response.data.worker_list.map(worker => ({

          org_id: worker.org_id,
          worker_id: worker.worker_id,
          degree: worker.worker_info.degree,
          first_name: worker.worker_info.first_name,
          last_name: worker.worker_info.last_name,
          position: worker.worker_info.position,
          uuid: worker.worker_info.uuid,
        }));
        return {
          workers: workers,
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

export function getWorker(org_id, worker_id) {

  const url = `/orgs/${org_id}/workers/${worker_id}`;

  return axiosInstance.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        const worker = {
          org_id: response.data.org_id,
          worker_id: response.data.worker_id,
          degree: response.data.worker_info.degree,
          first_name: response.data.worker_info.first_name,
          last_name: response.data.worker_info.last_name,
          position: response.data.worker_info.position,
          uuid: response.data.worker_info.uuid,
        }
        return worker
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

export function deleteWorker(org_id, worker_id) {

  // Формирование URL с использованием id
  const url = `/orgs/${org_id}/workers/${worker_id}`;

  return axiosInstance.delete(url)
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

export function createWorker(org_id, employee) {

  const data = {
    org_id: Number(org_id),
    worker_info: {
      degree: employee.degree,
      first_name: employee.first_name,
      last_name: employee.last_name,
      position: employee.position
    }
  };
  // Формирование URL с использованием id
  const url = `/orgs/workers`;

  return axiosInstance.post(url, data)
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

export function updateWorker(org_id, worker_id, employee) {

  const data = {
    org_id: Number(org_id),
    worker_id: Number(worker_id),
    worker_info: {
      degree: employee.degree,
      first_name: employee.first_name,
      last_name: employee.last_name,
      position: employee.position
    }
  };
  // Формирование URL с использованием id
  const url = `/orgs/workers`;

  return axiosInstance.put(url, data)
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
