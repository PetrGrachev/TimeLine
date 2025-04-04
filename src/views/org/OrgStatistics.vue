<template>
  <div class="chart-container">
    <IncomeBookingsChart class="dashboard-card" />
    <MetricsChart class="dashboard-card" />
    <ClientsChart class="dashboard-card" />
    <WorkersChart class="dashboard-card" />
    <WorkloadChart class="dashboard-card" />
    <ServicesChart class="dashboard-card" />

    <CancellationsChart class="dashboard-card" />

  </div>
</template>

<script>
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

    }
  }
}
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