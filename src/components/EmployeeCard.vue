<template>
  <div class="employee-card">
    <!-- TODO сделать обработку фото <img :src="employee.photo" alt="Фото сотрудника" class="employee-photo">-->
    <div class="employee-info">
      <div class="employee-info-item">
        <p><strong>Должность:</strong>{{ employee.position }}</p>
      </div>
      <div class="employee-info-item">
        <p><strong>Имя:</strong>{{ employee.first_name }}</p>
      </div>
      <div class="employee-info-item">
        <p><strong>Фамилия:</strong>{{ employee.last_name }}</p>
      </div>
      <div class="employee-info-item">
        <p><strong>Образование:</strong>{{ employee.degree }}</p>
      </div>
      <div class="employee-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
    };
  },
}
</script>

<style scoped>
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

.employee-actions {
  margin-top: 16px;
  /* Расстояние между карточкой и кнопками */
  display: flex;
  /* Выравнивание кнопок по горизонтали */
  gap: 8px;
  /* Расстояние между кнопками */
  justify-content: center;
  /* Центрирование кнопок */
}
</style>