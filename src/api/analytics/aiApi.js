import axiosInstance from './analyticsInstance';

export function getAIFeedbacks(id) {
    if (!id) {
        console.error("ID отсутствует");
        return Promise.reject(new Error("ID отсутствует"));
    }

    const url = `/analytics/ai/feedbacks`;

    return axiosInstance.get(url, { params: { org_id: id } }) // передаём org_id как параметр
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);

                return {
                    keywords: {
                        positive: response.data.keywords.positive.map(item => ({
                            phrase: item.phrase,
                            score: item.score
                        })),
                        negative: response.data.keywords.negative.map(item => ({
                            phrase: item.phrase,
                            score: item.score
                        }))
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