import axiosInstance from './axiosInstance';

export function getFeedback(limit, page, record_id) {
    const params = {};

    if (limit) params.limit = limit;
    if (page) params.page = page;
    if (record_id) params.record_id = record_id;

    return axiosInstance.get('/records/feedbacks', { params })
        .then(response => {
            console.log("Успешный ответ:", response.data);
            const feedbacks = response.data.feedback_list.map(feedback => ({
                feedback: feedback.feedback,
                feedback_id: feedback.feedback_id,
                record_id: feedback.record_id,
                stars: feedback.stars,
                service_name: feedback.service_name,
                worker_first_name: feedback.worker_first_name,
                worker_last_name: feedback.worker_last_name,
                user_first_name: feedback.user_first_name,
                user_last_name: feedback.user_last_name,
                record_date: feedback.record_date,
            }));
            return feedbacks;
        })
        .catch(error => {
            console.error('Ошибка получения данных', error);
        });
}

export function addFeedback(feedback, record_id, stars) {

    const data = {
        feedback: feedback,
        record_id: Number(record_id),
        stars: Number(stars)
    };

    const url = `/records/feedbacks`;

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

export function deleteFeedback(record_id) {
    const url = `/records/feedbacks`
    const params = { record_id: record_id }
    return axiosInstance.delete(url, { params })
        .then(response => {
            console.log("Успешный ответ:", response.data);

        })
        .catch(error => {
            console.error('Ошибка получения данных', error);
        });
}

export function updateFeedback(feedback, record_id, stars) {

    const data = {
        feedback: feedback,
        record_id: Number(record_id),
        stars: Number(stars)
    };

    const url = `/records/feedbacks`;

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
