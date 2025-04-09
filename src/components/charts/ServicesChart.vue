<template>
    <div>
        <h2 class="section-title">Услуги</h2>
        <div class="service-stats-container">

            <!-- Лучшая услуга -->
            <div class="service-card">
                <i class="fas fa-star icon good"></i>
                <div class="text-block">
                    <p class="label">Лучшая услуга</p>
                    <p class="value">{{ services.best_service.name }}</p>
                    <p class="rating"><i class="fas fa-star" style="color: #ffc107;"></i> {{
                        formatRating(services.best_service.rating) }}</p>
                </div>
            </div>

            <!-- Самая популярная -->
            <div class="service-card">
                <i class="fas fa-fire icon popular"></i>
                <div class="text-block">
                    <p class="label">Популярная услуга</p>
                    <p class="value">{{ services.popular_service_name || 'Нет данных' }}</p>
                </div>
            </div>

            <!-- Худшая услуга -->
            <div class="service-card">
                <i class="fas fa-thumbs-down icon bad"></i>
                <div class="text-block">
                    <p class="label">Худшая услуга</p>
                    <p class="value">{{ services.worst_service.name }}</p>
                    <p class="rating"><i class="fas fa-star" style="color: #ffc107;"></i> {{
                        formatRating(services.worst_service.rating) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        services: {
            type: Object,
            required: true,
        }
    },
    methods: {
        formatRating(value) {
            return parseFloat(value).toFixed(2);
        }
    }
};
</script>

<style scoped>
.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-color);
}

.service-stats-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-between;
}

.service-card {
    display: flex;
    align-items: center;
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    flex: 1 1 300px;
    min-width: 260px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon {
    font-size: 2rem;
    margin-right: 15px;
}

.icon.good {
    color: #28a745;
}

.icon.popular {
    color: #f97316;
}

.icon.bad {
    color: #e53935;
}

.text-block {
    display: flex;
    flex-direction: column;
}

.label {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
}

.value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0F4EB3;
}

.rating {
    color: #facc15;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 4px;
}
</style>