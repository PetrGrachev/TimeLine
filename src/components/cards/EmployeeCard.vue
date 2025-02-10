<template>
  <div class="employee-card">
    <slot name="avatar">
      <UserAvatar :avatarUrl="employee.uuid" :name="employee.first_name" class="avatar" />
    </slot>
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
import UserAvatar from "../UserAvatar.vue"
export default {
  components: {
    UserAvatar,
  },
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
  align-items: flex-start;
  /* Выравнивание по верхнему краю */
  border: 1px solid var(--border-color);
  padding: 16px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: var(--transparent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  /* Карточка теперь во всю ширину */
}

/* Увеличенная аватарка */
.avatar {
  width: 100px;
  /* Сделали еще больше */
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  object-fit: cover;
  margin-right: 20px;
  /* Отступ между аватаркой и информацией */
}

/* Информация о сотруднике */
.employee-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  /* Информация занимает всю ширину */
}

/* Элементы информации */
.employee-info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

/* Кнопки действий */
.employee-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  /* Выравнивание кнопок по левому краю */
}
</style>