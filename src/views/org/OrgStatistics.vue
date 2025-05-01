<template>
  <div class="chart-container">
    <IncomeBookingsChart class="dashboard-card" />
    <MetricsChart :metrics="summary.metrics" class="dashboard-card" />
    <ClientsChart v-if="summary && summary.clients" :unique_customers="summary.clients.unique_customers"
      :most_frequent_client="summary.clients.most_frequent_client" class="dashboard-card" />
    <WorkersChart v-if="summary && summary.workers" :workers="summary.workers" class="dashboard-card" />
    <WorkloadChart class="dashboard-card" />
    <ServicesChart v-if="summary && summary.services" :services="summary.services" class="dashboard-card" />

    <CancellationsChart class="dashboard-card" />

  </div>
</template>

<script>
import { getSummary } from '../../api/analytics/generalApi';
import { getServices } from '../../api/servicesApi';
import { getUser } from '../../api/userApi';
import { getWorkers } from '../../api/workersApi';
import CancellationsChart from '../../components/charts/CancellationsChart.vue';
import ClientsChart from '../../components/charts/ClientsChart.vue';
import IncomeBookingsChart from '../../components/charts/IncomeBookingsChart.vue';
import MetricsChart from '../../components/charts/MetricsChart.vue';
import ServicesChart from '../../components/charts/ServicesChart.vue';
import WorkersChart from '../../components/charts/WorkersChart.vue';
import WorkloadChart from '../../components/charts/WorkloadChart.vue';


export default {
  name: 'OrgStatistics',
  components: {
    IncomeBookingsChart,
    CancellationsChart,
    MetricsChart,
    ClientsChart,
    ServicesChart,
    WorkersChart,
    WorkloadChart,
  },
  data() {
    return {
      summary: {
        metrics: {}
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {


      try {
        // 1. Получаем основную сводку
        const summary = await getSummary();

        // 2. Делаем параллельные доп. запросы
        const [
          frequentClient,
          bestService,
          worstService,
          popularService,
          bestWorker,
          worstWorker
        ] = await Promise.all([
          getUser(summary.clients.most_frequent_client_id),
          getServices(summary.services.best_service.service_id),
          getServices(summary.services.worst_service.service_id),
          getServices(summary.services.popular_service_id),
          getWorkers(summary.workers.best_worker.worker_id),
          getWorkers(summary.workers.worst_worker.worker_id),
        ]);
        // 3. Объединяем все в структуру summary
        this.summary = {
          ...summary,
          clients: {
            ...summary.clients,
            most_frequent_client: frequentClient,
          },
          services: {
            ...summary.services,
            best_service: {
              ...summary.services.best_service,
              ...bestService.services[0],
            },
            worst_service: {
              ...summary.services.worst_service,
              ...worstService.services[0],
            },
            popular_service_name: popularService.services[0].name,
          },
          workers: {
            best_worker: {
              ...summary.workers.best_worker,
              ...bestWorker.workers[0],
            },
            worst_worker: {
              ...summary.workers.worst_worker,
              ...worstWorker.workers[0],
            },
          }
        };
        console.log(this.summary)
      } catch (error) {
        console.error("Ошибка при получении аналитики:", error);
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Центрируем карточки по горизонтали */
  gap: 20px;
  /* Отступ между блоками */
  padding: 20px;
}

.dashboard-card {
  width: 100%;
  /* Максимальная ширина карточки */
}
</style>