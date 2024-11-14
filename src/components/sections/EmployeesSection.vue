<template>
    <!-- Section: Employees -->
    <section id="employees" class="section-container">
        <h2>Сотрудники</h2>
        <div class="employee-card">
          <img src="@/assets/emp1.jpg" alt="Фото сотрудника" class="employee-photo">
          <div class="employee-info">
            <div class="employee-info-item">
              <p><strong>Должность:</strong> Стилист</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Имя:</strong> Магамед Магамедов</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Дни работы:</strong> Понедельник - Пятница</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Образование:</strong> Школа косметологии</p>
            </div>
          </div>
        </div>
      </section>
  </template>
  
  <script>
  export default {
    name: 'EmployeesSection',
  };
  </script>

  <style scoped>
  /* General section styles */
  .section-container {
    padding: 20px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Employee card */
  .employee-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.9);
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
  