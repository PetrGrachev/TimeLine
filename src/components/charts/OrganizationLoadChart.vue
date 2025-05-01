<template>
    <div class="distribution-chart-container">
        <h3>Загруженность</h3>

        <!-- Навигация по дням недели -->
        <div class="day-selector">
            <span v-for="(day, index) in days" :key="index" class="day-tab"
                :class="{ active: selectedDayIndex === index }" @click="selectedDayIndex = index">
                {{ day }}
            </span>
        </div>

        <!-- Текущее время и описание -->
        <div v-if="currentHourData" class="current-load">
            <i class="fas fa-user"></i>
            <strong>{{ formatHour(currentHourData.hour) }}:</strong>
            <span> обычно {{ getLoadDescription(currentHourData.bookings) }}</span>
        </div>

        <!-- Диаграмма -->
        <Chart type="bar" :data="chartData" :options="chartOptions" class="chart" />
    </div>
</template>

<script>
import { getBookingsDistribution } from '@/api/analytics/distributionApi';
import Chart from 'primevue/chart';

export default {
    name: 'OrganizationDistributionChart',
    components: { Chart },
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            distribution: null,
            days: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
            selectedDayIndex: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, // сдвиг, т.к. у нас ПН = 0
        };
    },
    mounted() {
        getBookingsDistribution(this.id)
            .then((distribution) => {
                this.distribution = distribution
            })
    },
    computed: {
        selectedDayData() {
            if (!this.distribution) return { hours: [] }; // пока данные не пришли
            return this.distribution.find((d) => d.day_of_week === this.selectedDayIndex + 1) || { hours: [] };
        },
        currentHourData() {
            const currentHour = new Date().getHours();
            return this.selectedDayData.hours.find(h => h.hour === currentHour);
        },
        chartData() {
            const allHours = Array.from({ length: 24 }, (_, i) => i);
            const bookingsMap = new Map(
                this.selectedDayData.hours.map(h => [h.hour, h.bookings])
            );

            return {
                labels: allHours.map(h => this.formatHour(h)),
                datasets: [
                    {
                        label: 'Количество записей',
                        backgroundColor: '#0F4EB3',
                        data: allHours.map(h => bookingsMap.get(h) || 0),
                        barThickness: 10, // чуть плотнее
                        borderRadius: 8, // закругление
                        barPercentage: 1.0,
                        categoryPercentage: 1.0
                    }
                ]
            };
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            display: false
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false
                    }
                }
            };
        }
    },
    methods: {
        formatHour(hour) {
            return `${hour.toString().padStart(2, '0')}`;
        },
        getLoadDescription(count) {
            if (count >= 20) return 'высокая загруженность';
            if (count >= 10) return 'нормальная загруженность';
            return 'низкая загруженность';
        },
    },
};
</script>

<style scoped>
.distribution-chart-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* 👈 добавлено */
}

.day-selector {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.day-tab {
    cursor: pointer;
    padding: 6px 12px;
    border-bottom: 2px solid transparent;
    font-weight: bold;
    color: #333;
    transition: all 0.2s;
}

.day-tab.active {
    border-bottom: 2px solid #0F4EB3;
    color: #0F4EB3;
}

.current-load {
    margin: 10px 0 20px;
    font-size: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
}

.chart {
    max-height: 100%;
}
</style>