import axiosInstance from './axiosInstance';

export function uploadMedia(entity, entity_id, file) {
    const formData = new FormData();
    formData.append('entity', entity);
    formData.append('entityID', entity_id);
    formData.append('file', file);

    return axiosInstance.post('/media', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Переопределяем заголовок только для этого запроса
        },
    })
        .then(response => {
            console.log('Файл успешно загружен:', response.data);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
}

export function downloadMedia(url) {
    const params = {
        url: url
    }

    return axiosInstance.get('/media', { params })
        .then(response => {
            console.log('Файл успешно получен:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка получении файла:', error);
        });
}

export function deleteMedia(url, entity) {
    const params = {
        url: url,
        entity: entity,
    }

    return axiosInstance.delete('/media', { params })
        .then(response => {
            console.log('Файл успешно удален:', response.data);
        })
        .catch(error => {
            console.error('Ошибка удаления файла:', error);
        });
}