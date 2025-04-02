import axiosInstance from './analyticsInstance';

export function getBookingsDistribution(id) {
    if (!id) {
        console.error("ID отсутствует");
        return Promise.reject(new Error("ID отсутствует"));
    }

    const url = `/analytics/distribution/bookings`;

    return axiosInstance.get(url, { params: { org_id: id } }) // передаём org_id как параметр
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);

                return response.data.distribution.map(day => ({
                    day_of_week: day.day_of_week,
                    hours: day.hours.map(hour => ({
                        hour: hour.hour,
                        bookings: hour.bookings
                    }))
                }));
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