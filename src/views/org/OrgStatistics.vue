<template>
  <div class="chart-container">
    <IncomeBookingsChart class="dashboard-card" />
    <MetricsChart :metrics="summary.metrics" class="dashboard-card" />
    <ClientsChart class="dashboard-card" />
    <WorkersChart :workers="summary.workers" class="dashboard-card" />
    <WorkloadChart class="dashboard-card" />
    <ServicesChart :services="summary.services" class="dashboard-card" />

    <CancellationsChart class="dashboard-card" />

  </div>
</template>

<script>
import { getSummary } from '../../api/analytics/generalApi';
import { getService } from '../../api/servicesApi';
import { getUser } from '../../api/userApi';
import { getWorker } from '../../api/workersApi';
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
    const org_id = localStorage.getItem('id');
    getSummary(org_id)
      .then((summary) => {
        this.summary = summary
      })
  },
  methods: {
    async load() {
      const org_id = localStorage.getItem('id');


      try {
        // 1. Получаем основную сводку
        const summary = await getSummary(org_id);

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
          getService(org_id, summary.services.best_service.service_id),
          getService(org_id, summary.services.worst_service.service_id),
          getService(org_id, summary.services.popular_service_id),
          getWorker(org_id, summary.workers.best_worker.worker_id),
          getWorker(org_id, summary.workers.worst_worker.worker_id),
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
              ...bestService,
            },
            worst_service: {
              ...summary.services.worst_service,
              ...worstService,
            },
            popular_service_name: popularService.name,
          },
          workers: {
            best_worker: {
              ...summary.workers.best_worker,
              ...bestWorker,
            },
            worst_worker: {
              ...summary.workers.worst_worker,
              ...worstWorker,
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