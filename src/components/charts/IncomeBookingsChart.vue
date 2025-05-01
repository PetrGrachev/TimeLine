<template>
    <div class="income-bookings-chart">
        <h2>Доходы и бронирования по дням</h2>
        <Chart type="line" :data="chartData" :options="chartOptions" class="chart" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';
import { getIncomeDistribution } from '../../api/analytics/distributionApi';

export default {
    name: 'IncomeBookingsChart',
    components: { Chart },
    data() {
        return {
            distribution: [],
        }
    },
    mounted() {
        const id = localStorage.getItem('id');
        getIncomeDistribution(id)
            .then((distribution) => {
                this.distribution = distribution
            })
            .catch((error) => {
                console.error(error)
            })
    },
    computed: {
        chartData() {
            const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

            // Создаем структуру по умолчанию на каждый день недели
            const fullWeekData = Array.from({ length: 7 }, (_, i) => ({
                day_of_week: i + 1,
                info: [{ bookings: 0, income: 0 }]
            }));

            // Объединяем с пришедшими данными, заменяя дефолтные значения, если есть реальные
            const filledData = fullWeekData.map(day => {
                const match = this.distribution.find(d => d.day_of_week === day.day_of_week);
                return match || day;
            });

            return {
                labels: weekdays,
                datasets: [
                    {
                        label: 'Доход (₽)',
                        data: filledData.map(d => d.info[0].income),
                        borderColor: '#0F4EB3',
                        backgroundColor: '#0F4EB3',
                        yAxisID: 'y-income',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        type: 'bar',
                        label: 'Бронирования',
                        data: filledData.map(d => d.info[0].bookings),
                        backgroundColor: 'rgba(0, 184, 217, 0.2)',
                        yAxisID: 'y-bookings',
                        tension: 0.3,
                        fill: false
                    }
                ]
            };
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                stacked: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'День недели'
                        }
                    },
                    'y-income': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Доход (₽)'
                        }
                    },
                    'y-bookings': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Бронирования'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            };
        }
    }
};
</script>

<style scoped>
.income-bookings-chart {
    background-color: var(--card-background-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 1200px;
}

.chart {
    height: 350px;

}
</style>