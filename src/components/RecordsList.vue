<template>
  <div v-if="orders && Object.keys(orders || {}).length">
    <div class="order-header">
      <span class="column-title">Название организации</span>
      <span class="column-title">Услуга</span>
      <span class="column-title">Сотрудник</span>
      <span class="column-title">Дата и время</span>
      <span class="column-title">Действия</span>
    </div>
    <ul class="order-history-list">
      <li v-for="order in orders" :key="order.id" class="order-item" @click="$emit('organization-click', order)">
        <img :src="require(`@/assets/${order.type}-icon.png`)" alt="icon" class="organization-icon" />
        <span class="order-detail">{{ order.name }}</span>
        <span class="order-detail">{{ order.service }}</span>
        <!-- Если есть аватарка, показываем изображение -->
        <Avatar v-if="order.employee_avatarUrl" :image="order.employee_avatarUrl" class="mr-2" size="normal"
          shape="circle" />

        <!-- Если аватарки нет, показываем первую букву имени -->
        <Avatar v-else :label="getInitial(order.employee_first_name)" :style="getAvatarStyle(order.employee_first_name)"
          class="mr-2" size="normal" shape="circle" />

        <span class="order-detail">{{ order.employee_first_name }} {{ order.employee_last_name }}</span>
        <span class="order-detail">{{ formatDateForDisplay(order.date) }} {{ convertToTimezone(order.time) }}</span>
        <div class="order-actions">
          <button @click="handleLeaveReview(order)" class="action-button">
            <i class="fas fa-comment"></i> Отзыв
          </button>
          <button @click="handleRepeatOrder(order)" class="action-button">
            <i class="fas fa-redo-alt"></i> Повторить
          </button>
          <button @click="handleCancelOrder(order)" class="action-button">
            <i class="fas fa-times"></i> Отменить
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Здесь пока нет записей</p>
  </div>
</template>

<script>
import Avatar from 'primevue/avatar';
import { convertTimeToTimeZone, formatDate } from '../utils/utilsDate';

export default {
  components: {
    Avatar,
  },
  name: 'RecordsList',
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleLeaveReview(order) {
      this.$emit('leave-review', order);
    },
    handleRepeatOrder(order) {
      this.$emit('repeat-order', order);
    },
    handleCancelOrder(order) {
      this.$emit('cancel-order', order);
    },
    getInitial(name) {
      if (!name) return 'N';
      return name.charAt(0).toUpperCase(); // Берем первую букву и делаем её заглавной
    },
    formatDateForDisplay(date) {
      return formatDate(date);
    },
    convertToTimezone(time) {
      return convertTimeToTimeZone(time)
    },
    getAvatarStyle(name) {
      const colors = [
        { backgroundColor: '#A1C4FD', color: '#2A2A2A' }, // Светло-голубой
        { backgroundColor: '#C3F0CA', color: '#2A2A2A' }, // Мятный
        { backgroundColor: '#FDE2E4', color: '#2A2A2A' }, // Светло-розовый
        { backgroundColor: '#FFF1B8', color: '#2A2A2A' }, // Светло-жёлтый
        { backgroundColor: '#D7D3F5', color: '#2A2A2A' }, // Сиреневый
        { backgroundColor: '#FFE4C0', color: '#2A2A2A' }, // Персиковый
      ];

      // Генерируем индекс на основе имени пользователя
      const index = Math.abs([...name].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;

      // Возвращаем соответствующий стиль
      return colors[index];
    },
  },
};
</script>


<style scoped>
.order-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: var(--input-background-color);
  font-weight: bold;
  border-radius: 8px;
  margin-bottom: 10px;
}

.column-title {
  flex: 1;
  text-align: left;
  padding-left: 15px;
}

.column-icon {
  flex-basis: 40px;
  text-align: left;
}

.order-history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-item:hover {
  background-color: var(--button-hover);
  /* Измените цвет фона при наведении */
  transform: translateY(-2px);
  /* Добавляет небольшой подъем при наведении */
}

.organization-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  filter: var(--icon-filter);
}

.order-detail {
  flex: 1;
  text-align: left;
  padding-left: 15px;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  padding: 8px 12px;
  background-color: #0F4EB3;
  color: var(--light-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #1A6CDB;
}
</style>