import axiosInstance from './axiosInstance';

export function getSchedules(org_id, limit, page) {
    const params = {
        limit: limit,
        page: page
    };
    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/schedules`;

    return axiosInstance.get(url, { params })
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);


                if (!response.data || response.data.length === 0) {
                    console.log("Ответ содержит пустой массив. Нет доступных услуг.");
                    return {
                        schedules: [],
                        found: 0,  // Количество страниц
                    };
                }

                // Преобразуем ответ в нужную структуру
                const schedules = response.data.workers.map(schedule => ({
                    org_id: schedule.org_id,
                    schedule: schedule.schedule.map(day => ({
                        over: day.over,
                        start: day.start,
                        weekday: day.weekday,

                    })),
                    session_duration: schedule.session_duration,
                    worker_id: schedule.worker_id,
                }));
                return schedules;
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

export function updateSchedule(org_id, worker_id, schedule, session_duration) {

    const data = {
        org_id: Number(org_id), // Преобразование org_id в число
        worker_id: Number(worker_id),
        schedule: schedule,   // Передача расписания
        session_duration: session_duration,
    };
    // Формирование URL с использованием id
    const url = `/orgs/schedules`;

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

export function AddSchedule(org_id, worker_id, schedule, session_duration) {

    const data = {
        org_id: Number(org_id), // Преобразование org_id в число
        worker_id: Number(worker_id),
        schedule: schedule,   // Передача расписания
        session_duration: session_duration,
    };
    // Формирование URL с использованием id
    const url = `/orgs/schedules`;

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

export function deleteSchedule(org_id, worker_id, weekday) {

    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/schedules/${worker_id}`;
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