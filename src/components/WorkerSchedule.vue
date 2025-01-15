<template>
    <p>{{ worker.first_name }} {{ worker.last_name }}</p>

    <div v-if="schedule && Object.keys(schedule.schedule || {}).length">
        <div class="schedule">

            <p>Продолжительность сеанса: {{ schedule.session_duration }} минут</p>
            <div v-for="day in schedule.schedule" :key="day.weekday" class="schedule-day">
                <strong>{{ getWeekdayName(day.weekday) }}:</strong>
                <span v-if="day.start && day.over">
                    {{ day.start }} - {{ day.over }}
                </span>
                <span v-else>Выходной</span>
            </div>
            <Button label="Изменить" @click="updateSchedule" class="action-button" />
            <Button label="Удалить" @click="deleteSchedule" class="action-button" />
        </div>
    </div>
    <div v-else>
        <p><strong>Нет расписания</strong></p>
        <Button label="Добавить расписание" @click="createSchedule" class="action-button" />
    </div>
</template>

<script>
import Button from 'primevue/button';

export default {
    components: {
        Button,
    },
    props: {
        worker: {
            type: Object,
            required: true,
        },
        schedule: {
            type: Object,
            required: true,
        }
    },
    methods: {
        getWeekdayName(weekday) {
            const weekdays = [
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
                'Воскресенье'
            ];
            return weekdays[weekday - 1]; // Учитываем, что weekday начинается с 1
        },
        updateSchedule() {
            this.$emit('update-schedule', this.schedule, this.worker);
        },
        createSchedule() {
            this.$emit('create-schedule', this.worker);
        },
        deleteSchedule() {
            this.$emit('delete-schedule', this.worker);
        }
    },
};
</script>