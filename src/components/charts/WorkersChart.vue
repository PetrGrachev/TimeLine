<template>
    <div>
        <h2 class="section-title">Работники</h2>
        <div class="worker-metrics-container">
            <!-- Лучший работник -->
            <div class="worker-card">
                <p class="label">Лучший сотрудник</p>
                <div class="worker-info">
                    <UserAvatar :avatarUrl="workers.best_worker.uuid" :name="workers.best_worker.first_name"
                        class="worker-avatar" />
                    <div>
                        <h3 class="name">
                            {{ workers.best_worker.first_name }} {{ workers.best_worker.last_name }}
                        </h3>
                        <p class="position">{{ workers.best_worker.position }}</p>
                        <p class="rating">
                            <i class="fas fa-star" style="color: #ffc107;"></i>
                            {{ workers.best_worker.rating }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Худший работник -->
            <div class="worker-card">
                <p class="label">Худший сотрудник</p>
                <div class="worker-info">
                    <UserAvatar :avatarUrl="workers.worst_worker.uuid" :name="workers.worst_worker.first_name"
                        class="worker-avatar" />
                    <div>
                        <h3 class="name">
                            {{ workers.worst_worker.first_name }} {{ workers.worst_worker.last_name }}
                        </h3>
                        <p class="position">{{ workers.worst_worker.position }}</p>
                        <p class="rating">
                            <i class="fas fa-star" style="color: #ffc107;"></i>
                            {{ workers.worst_worker.rating }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '../UserAvatar.vue';

export default {
    name: 'BestWorstWorker',
    components: {
        UserAvatar,
    },
    props: {
        workers: {
            type: Object,
            required: true,
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

.worker-metrics-container {
    display: flex;
    gap: 20px;
    width: 100%;
}

.worker-card {
    flex: 1;
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.label {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: var(--text-color);
}

.worker-info {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
}

.worker-avatar {
    width: 60px;
    height: 60px;
}

.name {
    margin: 0;
    font-weight: 600;
    font-size: 1.3rem;
    color: #0F4EB3;
}

.position {
    color: #0F4EB3;
    font-size: 1rem;
    margin: 2px 0;
}

.rating {
    font-weight: bold;
    font-size: 1.1rem;
    color: #ffc107;
}
</style>