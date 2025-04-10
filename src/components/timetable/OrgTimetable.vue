<template>
    <div class="info-wrapper">
        <!-- Расписание -->
        <div class="timetable-block">
            <h3>Расписание</h3>
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
        </div>

        <!-- Диаграмма -->
        <OrganizationLoadChart class="fixed-chart" />
    </div>

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
.info-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 200px;
    width: 100%;
    align-items: stretch;
}

/* Левая колонка — расписание */
.timetable-block {
    flex-shrink: 0;
    width: 500px;
    /* фиксированная ширина */
}

/* Правая колонка — диаграмма */
.fixed-chart {
    flex-grow: 1;
    min-width: 0;
    /* чтобы не ломался layout */
}

/* Расписание */
.timetable {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.timetable-day {
    display: flex;
    align-items: center;
    gap: 5px;
}

.actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-start;
}
</style>