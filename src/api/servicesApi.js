import axiosInstance from './axiosInstance';

export function getServices(org_id, limit, page) {
  const params = {
    limit: limit,
    page: page
  };
  // Формирование URL с использованием id
  const url = `/orgs/${org_id}/services`;

  return axiosInstance.get(url, { params })
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);


        if (!response.data || response.data.length === 0) {
          console.log("Ответ содержит пустой массив. Нет доступных услуг.");
          return {
            services: [],
            found: 0,  // Количество страниц
          };
        }

        // Преобразуем ответ в нужную структуру
        const services = response.data.service_list.map(service => ({
          org_id: service.org_id,
          service_id: service.service_id,
          cost: service.service_info.cost,
          description: service.service_info.description,
          name: service.service_info.name,
        }));
        return {
          services: services,
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

export function getService(org_id, service_id) {

  const url = `/orgs/${org_id}/services/${service_id}`;

  return axiosInstance.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log("Успешный ответ:", response.data);

        const service = {
          org_id: response.data.org_id,
          service_id: response.data.service_id,
          cost: response.data.service_info.cost,
          description: response.data.service_info.description,
          name: response.data.service_info.name,
        }
        return service
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

export function createService(org_id, service) {

  const data = {
    org_id: Number(org_id),
    service_info: {
      cost: service.cost,
      name: service.name,
      description: service.description
    }
  };
  // Формирование URL с использованием id
  const url = `/orgs/services`;

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

export function updateService(org_id, service_id, service) {

  const data = {
    org_id: Number(org_id),
    service_id: Number(service_id),
    service_info: {
      cost: service.cost,
      name: service.name,
      description: service.description
    }
  };
  // Формирование URL с использованием id
  const url = `/orgs/services`;

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

export function deleteService(org_id, service_id) {

  // Формирование URL с использованием id
  const url = `/orgs/${org_id}/services/${service_id}`;

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

export function getServiceWorkers(org_id, service_id) {

  // Формирование URL с использованием id
  const url = `/orgs/${org_id}/services/${service_id}/workers`;

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
          degree: worker.worker_info.degree,
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

export function assignWorker(org_id, worker_id, service_id) {

  const data = {
    org_id: Number(org_id),
    service_id: Number(service_id),
    worker_id: Number(worker_id),
  };
  // Формирование URL с использованием id
  const url = `/orgs/workers/service`;

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

export function unsignWorker(org_id, worker_id, service_id) {

  // Формирование URL с использованием id
  const url = `orgs/${org_id}/workers/${worker_id}/service/${service_id}`;

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