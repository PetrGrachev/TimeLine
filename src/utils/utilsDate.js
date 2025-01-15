export function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    // Проверяем сегодня, завтра, послезавтра
    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString()) return 'Завтра';
    if (date.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString()) return 'Послезавтра';

    // Дни недели
    const daysOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

    // Месяцы
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${day} ${month}`;
}

export function convertTimeToTimeZone(utcTime) {
    // Преобразуем строку времени в объект Date
    const [hours, minutes] = utcTime.split(':').map(Number);
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes)); // Создаём дату в UTC

    // Вычисляем локальное время с учётом смещения
    const localDate = new Date(utcDate.getTime());
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    // Форматируем время в строку
    const formattedTime = localDate.toTimeString().slice(0, 5); // HH:MM
    return formattedTime;
}