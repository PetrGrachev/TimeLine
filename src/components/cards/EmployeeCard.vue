<template>
  <div class="employee-card">
    <slot name="avatar">
      <UserAvatar :avatarUrl="employee.uuid" :name="employee.first_name" class="avatar" />
    </slot>
    <div class="employee-info">
      <div class="employee-info-item">
        <p><i class="fas fa-briefcase"></i> <strong>Должность:</strong> {{ employee.position }}</p>
      </div>
      <div class="employee-info-item">
        <p><i class="fas fa-user"></i> <strong>Имя:</strong> {{ employee.first_name }}</p>
      </div>
      <div class="employee-info-item">
        <p><i class="fas fa-user-tag"></i> <strong>Фамилия:</strong> {{ employee.last_name }}</p>
      </div>
      <div class="employee-info-item">
        <p><i class="fas fa-graduation-cap"></i> <strong>Образование:</strong> {{ employee.degree }}</p>
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
.employee-card {
  display: flex;
  align-items: flex-start;
  border: 1px solid var(--border-color);
  padding: 16px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: var(--transparent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  object-fit: cover;
  margin-right: 20px;
}

.employee-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
}

.employee-info-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  margin-bottom: 0px;
}

.employee-info-item i {
  color: var(--primary-color);
}

.employee-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}
</style>