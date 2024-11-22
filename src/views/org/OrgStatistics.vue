<template>
    <div class="chart-container">
    <Bar :data="chartData" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
  labels: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  datasets: [
    {
      label: 'Доход по месяцам',
      backgroundColor: '#0F4EB3',
      data: [40, 20, 12, 50, 70, 90, 120, 80, 100, 110, 90, 60],
    },
    {
      label: 'Услуги по месяцам',
      backgroundColor: '#FF5733',
      data: [30, 15, 10, 40, 60, 80, 110, 70, 90, 100, 80, 50],
    },
    {
      label: 'Отмен записи по месяцам',
      backgroundColor: '#FFC300',
      data: [10, 5, 5, 10, 20, 30, 50, 40, 60, 80, 70, 40],
    },
  ],
}

      }
    }
  }
  </script>

  <style scoped>
  .chart-container{
    width: 2200px;
    height: 400px;
  }
</style>