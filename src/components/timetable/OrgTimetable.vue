<template>
    <div class="timetable">
        <div v-for="day in timetable" :key="day.weekday" class="timetable-day">
            <strong>{{ getWeekdayName(day.weekday) }}:</strong>
            <span v-if="day.open && day.close">
                {{ day.open }} - {{ day.close }}
                <span v-if="day.break_start && day.break_end">
                    (Перерыв: {{ day.break_start }} - {{ day.break_end }})
                </span>
            </span>
            <span v-else>Выходной</span>
        </div>

    </div>
    <OrganizationLoadChart />
    <div class="actions">
        <slot name="actions"></slot>
    </div>
</template>

<script>
import OrganizationLoadChart from '@/components/charts/OrganizationLoadChart.vue'
export default {
    components: {
        OrganizationLoadChart,
    },
    props: {
        timetable: {
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
    },
};
</script>

<style scoped>
.timetable {
    display: flex;
    flex-direction: column;
    /* Располагаем элементы в колонку */
    gap: 5px;
    /* Добавляем небольшой отступ между днями */
}

.timetable-day {
    display: flex;
    align-items: center;
    gap: 5px;
    /* Отступ между днем недели и временем */
}

.actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    /* Выравнивание кнопок по левому краю */
}
</style>