import axiosInstance from './axiosInstance';

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

        const showcases = response.data.showcases_url || [];

        // Находим баннер (берём первый, если есть)
        const banner = showcases.find(item => item.type === "banner")?.url || null;

        // Находим все изображения из галереи
        const gallery = showcases
          .filter(item => item.type === "gallery")
          .map(item => item.url);

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
          type: response.data.info.type,
          rating: response.data.info.rating,
          timetable: response.data.timetable.map(item => ({
            break_end: item.break_end,
            break_start: item.break_start,
            close: item.close,
            open: item.open,
            weekday: item.weekday,
          })),
          banner,
          gallery,
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

export function updateOrg(about, address, name, city, telephone, id, lat, long, type) {
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
