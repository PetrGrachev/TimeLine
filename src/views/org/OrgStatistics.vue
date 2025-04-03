<template>
  <div class="chart-container">
    <IncomeBookingsChart class="dashboard-card" />
    <CancellationsChart class="dashboard-card" />
  </div>
</template>

<script>
import CancellationsChart from '../../components/charts/CancellationsChart.vue';
import IncomeBookingsChart from '../../components/charts/IncomeBookingsChart.vue';


export default {
  name: 'OrgStatistics',
  components: {
    IncomeBookingsChart,
    CancellationsChart,
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
  gap: 24px;
  /* Отступ между блоками */
  padding: 20px;
}

.dashboard-card {
  width: 100%;
  /* Максимальная ширина карточки */
}
</style>