<template>
  <!-- Section: Employees -->
  <section id="employees" class="section-container">
    <h2>Сотрудники</h2>
    <div class="employees-list">
      <EmployeeCard v-for="employee in employees" :key="employee.worker_id" :employee="employee" />
    </div>
  </section>
</template>

<script>
import { getWorkers } from '../../../api/workersApi';
import EmployeeCard from '@/components/cards/EmployeeCard.vue';


export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    EmployeeCard,
  },
  name: 'EmployeesSection',
  data() {
    return {
      employees: [],
      totalEmployees: 0,
    }
  },

  mounted() {
    getWorkers(this.id, 10, 1)
      .then((data) => {
        this.employees = data.workers;
        this.totalEmployees = data.found;
      })
      .catch(error => {
        console.error("Ошибка загрузки timetable:", error);
      });
  },
  methods: {

  }
};
</script>

<style scoped>
/* General section styles */
.section-container {
  padding: 20px;
  margin: 20px;
  background-color: var(--transparent-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Employee card */
.employee-card {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: var(--transparent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.employee-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.employee-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
</style>