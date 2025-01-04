import axiosInstance from './axiosInstance';

export function getTimetable(org_id) {

    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/timetable`;

    return axiosInstance.get(url)
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);


                if (!response.data || response.data.length === 0) {
                    console.log("Ответ содержит пустой массив. Нет доступных услуг.");
                    return [];
                }

                // Преобразуем ответ в нужную структуру
                const timetable = response.data.timetable.map(day => ({
                    break_end: day.break_end,
                    break_start: day.break_start,
                    close: day.close,
                    open: day.open,
                    weekday: day.weekday,
                }));
                return timetable;
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

export function updateTimetable(org_id, timetable) {

    const data = {
        org_id: Number(org_id), // Преобразование org_id в число
        timetable: timetable   // Передача расписания
    };
    // Формирование URL с использованием id
    const url = `/orgs/timetable`;

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

export function addTimetable(org_id, timetable) {

    const data = {
        org_id: Number(org_id), // Преобразование org_id в число
        timetable: timetable   // Передача расписания
    };
    // Формирование URL с использованием id
    const url = `/orgs/timetable`;

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

export function deleteTimetable(org_id, weekday) {

    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/timetable`;
    const params = weekday ? { weekday } : {};
    return axiosInstance.delete(url, { params })
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