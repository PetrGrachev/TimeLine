import axiosInstance from './axiosInstance';

export function getFeedback(limit, page, record_id, org_id, user_id) {
    const params = {};

    if (limit) params.limit = limit;
    if (page) params.page = page;
    if (record_id) params.record_id = record_id;
    if (org_id) params.org_id = org_id;
    if (user_id) params.user_id = user_id;

    return axiosInstance.get('/records/feedbacks/info', { params })
        .then(response => {
            console.log("Успешный ответ:", response.data);
            const feedbacks = response.data.feedback_list.map(feedback => ({
                feedback: feedback.feedback,
                feedback_id: feedback.feedback_id,
                record_id: feedback.record_id,
                stars: feedback.stars,
            }));
            return feedbacks;
        })
        .catch(error => {
            console.error('Ошибка получения данных', error);
        });
}