<template>
    <div class="workload-chart">
        <h2 class="title">Загрузка сотрудников</h2>
        <div class="workers-grid">
            <div v-for="(worker, index) in workers" :key="index" class="worker-card">
                <UserAvatar :avatarUrl="worker.uuid" :name="worker.first_name" class="avatar" />
                <p class="worker-name">{{ worker.first_name }} {{ worker.last_name }}</p>
                <p class="worker-position">{{ worker.position }}</p>
                <GaugeChart :value="worker.workload_percentage" :bookings="worker.busy_slots" />
            </div>
        </div>
    </div>
</template>

<script>
import { getWorkload } from '../../api/analytics/generalApi';
import { getWorker } from '../../api/workersApi';
import UserAvatar from '../UserAvatar.vue';
import GaugeChart from './GaugeChart.vue';

export default {
    name: 'WorkerLoadChart',
    components: {
        UserAvatar,
        GaugeChart
    },
    data() {
        return {
            workers: [
                {
                    first_name: "Имя",
                    last_name: "Фамилия",
                    position: "Позиция",
                    uuid: "",
                    workload_percentage: 10.1,
                },
                {
                    first_name: "Имя",
                    last_name: "Фамилия",
                    position: "Позиция",
                    uuid: "",
                    workload_percentage: 50.3,
                },
                {
                    first_name: "Имя",
                    last_name: "Фамилия",
                    position: "Позиция",
                    uuid: "",
                    workload_percentage: 90.9,
                },
            ]
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            const org_id = localStorage.getItem('id');

            getWorkload(org_id).then(async (data) => {
                // Получаем массив с базовой инфой о работниках
                const baseWorkers = data.workers;

                // Для каждого работника делаем запрос getWorker и объединяем данные
                const enrichedWorkers = await Promise.all(
                    baseWorkers.map(async (worker) => {
                        try {
                            const detailed = await getWorker(org_id, worker.worker_id);

                            return {
                                first_name: detailed.first_name,
                                last_name: detailed.last_name,
                                position: detailed.position,
                                uuid: detailed.uuid,
                                workload_percentage: worker.workload_percentage,
                                busy_slots: worker.busy_slots,
                            };
                        } catch (error) {
                            console.error(`Ошибка при получении данных работника с ID ${worker.worker_id}:`, error);
                            return {
                                ...worker,
                                first_name: 'Ошибка',
                                last_name: '',
                                position: '',
                                uuid: '',
                            };
                        }
                    })
                );

                this.workers = enrichedWorkers;
            });
        }
    }

};
</script>

<style scoped>
.workload-chart {
    margin-bottom: -20px;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--text-color);
}

.workers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    width: 100%;
}

.worker-card {
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.avatar {
    width: 70px;
    height: 70px;
    margin: 0 auto 10px;
}

.worker-name {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 4px;
    color: #0F4EB3;
}

.worker-position {
    font-size: 1rem;
    color: #0F4EB3;
    margin-bottom: 10px;
}
</style>