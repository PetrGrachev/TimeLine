<template>
    <UserAvatar :avatarUrl="worker.uuid" :name="worker.first_name" class="avatar" />
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
            <div class="actions">
                <Button label="Изменить" @click="updateSchedule" class="action-button" />
                <Button label="Удалить" @click="deleteSchedule" class="action-button" />
            </div>
        </div>
    </div>
    <div v-else>
        <p><strong>Нет расписания</strong></p>
        <Button label="Добавить расписание" @click="createSchedule" class="action-button" />
    </div>
</template>

<script>
import Button from 'primevue/button';
import UserAvatar from '../UserAvatar.vue';

export default {
    components: {
        Button,
        UserAvatar,
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

<style scoped>
.avatar {
    width: 100px;
    /* Сделали еще больше */
    height: 100px;
    border-radius: 50%;
    border: 3px solid var(--primary-color);
    object-fit: cover;
    margin-right: 20px;
    /* Отступ между аватаркой и информацией */
}

.actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    /* Выравнивание кнопок по левому краю */
}
</style>