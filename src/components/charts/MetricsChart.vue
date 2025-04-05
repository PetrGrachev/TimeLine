<template>
    <div>
        <h2 class="metrics-title">Основные метрики</h2>
        <div class="metrics-container">
            <div class="metric-card">
                <i class="fas fa-ruble-sign icon"></i>
                <div class="text-block">
                    <p class="label">Средний чек</p>
                    <p class="value">{{ formattedAvgCost }} ₽</p>
                </div>
            </div>

            <div class="metric-card">
                <i class="fas fa-calendar-check icon"></i>
                <div class="text-block">
                    <p class="label">Всего записей</p>
                    <p class="value">{{ metrics.total_bookings }}</p>
                </div>
            </div>

            <div class="metric-card">
                <i class="fas fa-chart-line icon"></i>
                <div class="text-block">
                    <p class="label">Общая выручка</p>
                    <p class="value">{{ formattedRevenue }} ₽</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        metrics: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        formattedAvgCost() {
            return Number(this.metrics.avg_booking_cost).toLocaleString('ru-RU', {
                maximumFractionDigits: 0
            });
        },
        formattedRevenue() {
            return Number(this.metrics.total_revenue).toLocaleString('ru-RU', {
                maximumFractionDigits: 0
            });
        }
    }
};
</script>

<style scoped>
.metrics-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-color);
}

.metrics-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
}

.metric-card {
    display: flex;
    align-items: center;
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    flex: 1 1 250px;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon {
    font-size: 2rem;
    color: #0F4EB3;
    margin-right: 15px;
}

.text-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.label {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
}

.value {
    font-size: 1.7rem;
    font-weight: bold;
    color: #0F4EB3;
}
</style>