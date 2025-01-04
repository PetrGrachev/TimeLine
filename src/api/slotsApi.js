import axiosInstance from './axiosInstance';

export function getSlots(org_id, worker_id) {
    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/slots/workers/${worker_id}`;

    return axiosInstance.get(url)
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);


                if (!response.data || response.data.length === 0) {
                    console.log("Ответ содержит пустой массив. Нет доступных услуг.");
                    return []
                }

                // Преобразуем ответ в нужную структуру
                const slots = response.data.map(slot => ({
                    begin: slot.begin,
                    date: slot.date,
                    end: slot.end,
                    slot_id: slot.slot_id,
                    worker_id: slot.worker_id,
                    busy: slot.busy,
                }));
                return slots;
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

export function bookSlot(org_id, worker_id, slot_id) {

    const data = {
        busy: true,
        worker_id: Number(worker_id),
        slot_id: Number(slot_id),
    };
    // Формирование URL с использованием id
    const url = `/orgs/${org_id}/slots`;

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