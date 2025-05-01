import axiosInstance from './axiosInstance';

export function getSlots(org_id, worker_id) {
    // Формирование URL с использованием id
    const url = `/orgs/workers/slots`;
    const params = {
        org_id: org_id,
        worker_id: worker_id
    }
    return axiosInstance.get(url, { params })
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