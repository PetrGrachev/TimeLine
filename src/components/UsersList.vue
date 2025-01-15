<template>
  <div v-if="orders && Object.keys(orders || {}).length">
    <div class="order-header">
      <span class="column-title">Клиент</span>
      <span class="column-title">Услуга</span>
      <span class="column-title">Сотрудник</span>
      <span class="column-title">Дата и время</span>
    </div>
    <ul class="order-history-list">
      <li v-for="order in orders" :key="order.record_id" class="order-item">
        <!-- Клиент с аватаркой -->
        <!-- TODO указывать clientAvatar и employeeAvatar в передоваемом массиве -->
        <span class="order-detail">
          <!-- Если есть аватарка, показываем изображение -->
          <Avatar v-if="order.user_avatarUrl" :image="order.user_avatarUrl" class="mr-2" size="normal" shape="circle" />

          <!-- Если аватарки нет, показываем первую букву имени -->
          <Avatar v-else :label="getInitial(order.user_first_name)" :style="getAvatarStyle(order.user_first_name)"
            class="mr-2" size="normal" shape="circle" />

          {{ order.user_first_name }} {{ order.user_last_name }}
        </span>

        <!-- Услуга -->
        <span class="order-detail">{{ order.service }}</span>

        <!-- Сотрудник с аватаркой -->
        <span class="order-detail">
          <!-- Если есть аватарка, показываем изображение -->
          <Avatar v-if="order.employee_avatarUrl" :image="order.employee_avatarUrl" class="mr-2" size="normal"
            shape="circle" />

          <!-- Если аватарки нет, показываем первую букву имени -->
          <Avatar v-else :label="getInitial(order.employee_first_name)"
            :style="getAvatarStyle(order.employee_first_name)" class="mr-2" size="normal" shape="circle" />

          {{ order.employee_first_name }} {{ order.employee_last_name }}
        </span>

        <!-- Дата и время -->
        <span class="order-detail">{{ formatDateForDisplay(order.date) }} {{ convertToTimeZone(order.time) }}</span>
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
  name: 'UsersList',
  components: {
    Avatar,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getInitial(name) {
      if (!name) return 'N';
      return name.charAt(0).toUpperCase(); // Берем первую букву и делаем её заглавной
    },
    formatDateForDisplay(date) {
      return formatDate(date);
    },
    convertToTimeZone(time) {
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
  }
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

.order-detail {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 15px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.top-nav button.active {
  background-color: #0F4EB3;
  color: var(--input-background-color);
}
</style>