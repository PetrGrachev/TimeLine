import axiosInstance from './analyticsInstance';

export function getCancellations(id) {
    if (!id) {
        console.error("ID отсутствует");
        return Promise.reject(new Error("ID отсутствует"));
    }

    const url = `/analytics/cancellations`;

    return axiosInstance.get(url, { params: { org_id: id } }) // передаём org_id как параметр
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);

                return {
                    info: {
                        canceled_records: response.data.info.canceled_records,
                        cancellation_percentage: response.data.info.cancellation_percentage,
                        most_common_cancel_reason: response.data.info.most_common_cancel_reason,
                    },
                    period_start: response.data.period_start,
                    period_end: response.data.period_end
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