<template>
    <!-- Section: Employees -->
    <section id="employees" class="section-container">
        <h2>Сотрудники</h2>
        <EmployeeCard/>
      </section>
  </template>
  
  <script>
import EmployeeCard from '../EmployeeCard.vue';


  export default {
    components:{
      EmployeeCard,
    },
    name: 'EmployeesSection',
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
  