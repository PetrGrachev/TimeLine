<template>
    <div class="employee-card">
          <img :src="employee.photo" alt="Фото сотрудника" class="employee-photo">
          <div class="employee-info">
            <div class="employee-info-item">
              <p><strong>Должность:</strong>{{ employee.position }}</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Имя:</strong>{{ employee.name }}</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Дни работы:</strong>{{ employee.work_time }}</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Образование:</strong>{{ employee.degree }}</p>
            </div>
          </div>
        </div>
</template>

<script>
export default{
    data() {
      return {
        employee: {
          position: "Стилист",
          name: "Магамед Магамедов",
          work_time: "Понедельник - Пятница",
          degree: "Школа косметологии",
          photo: require('@/assets/emp1.jpg')
        },
      };
    },
}
</script>

<style>
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
  
  .employee-info-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
}
</style>