<template>
    <div class="gauge-wrapper">
        <Chart type="doughnut" :data="gaugeData" :options="gaugeOptions" class="gauge-chart" />
        <div class="gauge-center">
            {{ value }}%
        </div>
    </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
    name: 'GaugeChart',
    components: { Chart },
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    computed: {
        gaugeData() {
            return {
                labels: ['Workload', 'Empty'],
                datasets: [
                    {
                        data: [this.value, 100 - this.value],
                        backgroundColor: [
                            this.value < 50 ? '#4CAF50' : this.value < 80 ? '#FFC107' : '#FF5252',
                            '#E0E0E0'
                        ],
                        borderWidth: 0,
                        circumference: 180,
                        rotation: 270,
                        cutout: '75%'
                    }
                ]
            };
        },
        gaugeOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            };
        }
    }
};
</script>

<style scoped>
.gauge-wrapper {
    position: relative;
    width: 100%;
    height: 160px;
}

.gauge-chart {
    height: 100%;
}

.gauge-center {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--text-color);
}
</style>