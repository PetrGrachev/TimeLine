<template>
    <div>
        <h2 class="section-title">Отмены</h2>
        <div class="cancellations-container">
            <div class="stat-card">
                <p class="label">Отменено записей</p>
                <p class="value">{{ info.canceled_records }}</p>
            </div>
            <div class="stat-card">
                <p class="label">Процент отмен</p>
                <p class="value">{{ info.cancellation_percentage }}%</p>
            </div>
            <div class="stat-card">
                <p class="label">Основная причина</p>
                <p class="value">{{ info.most_common_cancel_reason || 'Пока не было отмен' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getCancellations } from '../../api/analytics/generalApi';


export default {
    name: 'CancellationStats',
    components: {

    },
    data() {
        return {
            info: {},
        }
    },
    mounted() {
        const id = localStorage.getItem('id');
        getCancellations(id)
            .then((data) => {
                this.info = data.info
            })
            .catch((error) => {
                console.error(error)
            })
    },
};
</script>

<style scoped>
.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-color);
}

.cancellations-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
}

.stat-card {
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px 30px;
    min-width: 200px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    flex: 1;
    /* предотвратить сжатие карточек */
}

.label {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 8px;
    font-size: 0.95rem;
}

.value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #0F4EB3;
}
</style>