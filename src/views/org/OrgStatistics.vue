<template>
  <div class="chart-container">
    <IncomeBookingsChart />
  </div>
</template>

<script>
import IncomeBookingsChart from '../../components/charts/IncomeBookingsChart.vue';


export default {
  name: 'OrgStatistics',
  components: {
    IncomeBookingsChart,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 2200px;
  height: 400px;
}
</style>