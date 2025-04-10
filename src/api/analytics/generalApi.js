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

export function getWorkload(id) {
    if (!id) {
        console.error("ID отсутствует");
        return Promise.reject(new Error("ID отсутствует"));
    }

    const url = `/analytics/workload`;

    return axiosInstance.get(url, { params: { org_id: id } }) // передаём org_id как параметр
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);

                return {
                    workers: response.data.workers.map(worker => ({
                        busy_slots: worker.busy_slots,
                        total_slots: worker.total_slots,
                        worker_id: worker.worker_id,
                        workload_percentage: worker.workload_percentage,
                    })),
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

export function getSummary(id) {
    if (!id) {
        console.error("ID отсутствует");
        return Promise.reject(new Error("ID отсутствует"));
    }

    const url = `/analytics/summary`;

    return axiosInstance.get(url, { params: { org_id: id } }) // передаём org_id как параметр
        .then(response => {
            if (response.status === 200) {
                console.log("Успешный ответ:", response.data);

                return {
                    clients: {
                        most_frequent_client_id: response.data.clients.most_frequent_client_id,
                        unique_customers: response.data.clients.unique_customers,
                    },
                    metrics: {
                        avg_booking_cost: response.data.metrics.avg_booking_cost,
                        total_bookings: response.data.metrics.total_bookings,
                        total_revenue: response.data.metrics.total_revenue,
                    },
                    services: {
                        best_service: {
                            rating: response.data.services.best_service.rating,
                            service_id: response.data.services.best_service.service_id,
                        },
                        popular_service_id: response.data.services.popular_service_id,
                        worst_service: {
                            rating: response.data.services.worst_service.rating,
                            service_id: response.data.services.worst_service.service_id,
                        },
                    },
                    workers: {
                        best_worker: {
                            rating: response.data.workers.best_worker.rating,
                            worker_id: response.data.workers.best_worker.worker_id,
                        },
                        worst_worker: {
                            rating: response.data.workers.worst_worker.rating,
                            worker_id: response.data.workers.worst_worker.worker_id,
                        },
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