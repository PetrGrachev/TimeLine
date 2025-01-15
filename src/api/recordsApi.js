import axiosInstance from './axiosInstance';

export function getRecords(id, isOrg, fresh) {
    let params;
    if (isOrg) {
        params = {
            org_id: id,
            limit: 100,
            page: 1,
            fresh: fresh,
        };
    }
    else {
        params = {
            user_id: id,
            limit: 100,
            page: 1,
            fresh: fresh,
        };
    }
    const url = `/records/list`;

    return axiosInstance.get(url, { params })
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);


                if (!response.data || response.data.length === 0) {
                    console.log("Ответ содержит пустой массив. Нет доступных услуг.");
                    return [];
                }

                // Преобразуем ответ в нужную структуру
                const records = response.data.record_list.map(record => ({
                    record_id: record.record_id,
                    name: record.org.name,
                    reviewed: record.reviewed,
                    type: record.org.type,
                    service: record.service.name,
                    cost: record.service.cost,
                    employee_first_name: record.worker.first_name,
                    employee_last_name: record.worker.last_name,
                    employee_uuid: record.worker.uuid,
                    user_first_name: record.user.first_name,
                    user_last_name: record.user.last_name,
                    user_uuid: record.worker.uuid,
                    date: record.slot.date,
                    time: record.slot.begin,
                }));
                return records;
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

export function addRecord(org_id, service_id, slot_id, user_id, worker_id) {

    const data = {
        org_id: Number(org_id),
        service_id: Number(service_id),
        slot_id: Number(slot_id),
        user_id: Number(user_id),
        worker_id: Number(worker_id),
    };
    // Формирование URL с использованием id
    const url = `/records/creation`;

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
