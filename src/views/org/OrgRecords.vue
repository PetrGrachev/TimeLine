<template>
    <div class="order-history">
      
      <nav class="top-nav">
        <button @click="getUsers">Мои записи</button>
        <button @click="getHistory">История</button>
        
      </nav>
      <UsersList :orders="orders"/>

    </div>
  </template>

  <script>
  import UsersList from '../../components/UsersList.vue';
export default {
    components:{
        UsersList,
    },
  data() {
    return {
        orders: [
  { id: 1, first_name: 'Иван', last_name: 'Иванов', service: 'Стрижка', employee: 'Иван Иванов', dateTime: '2024-11-18 14:00' },
  { id: 2, first_name: 'Олег', last_name: 'Смирнов', service: 'Персональная тренировка', employee: 'Олег Смирнов', dateTime: '2024-11-17 18:00' },
  { id: 3, first_name: 'Петр', last_name: 'Петров', service: 'Бритье', employee: 'Петр Петров', dateTime: '2024-11-16 12:00' },
  { id: 4, first_name: 'Сергей', last_name: 'Сергеев', service: 'Замена масла', employee: 'Сергей Сергеев', dateTime: '2024-11-15 10:00' },
  { id: 5, first_name: 'Анна', last_name: 'Сидорова', service: 'Бронирование стола', employee: 'Администратор', dateTime: '2024-11-14 19:00' },
  { id: 6, first_name: 'Мария', last_name: 'Кузнецова', service: 'Бронирование VIP-зала', employee: 'Администратор', dateTime: '2024-11-13 20:00' },
  { id: 7, first_name: 'Дмитрий', last_name: 'Медведев', service: 'Консультация врача', employee: 'Дмитрий Медведев', dateTime: '2024-11-12 09:00' },
    ],
      currentTab: 'records', // Текущая вкладка - 'records' или 'history'
    };
  },
  mounted() {
    // Начальное отображение записей
    this.getRecords();
  },
  methods: {
    getHistory() {
      this.currentTab = 'history';
    },
    getRecords() {
      this.currentTab = 'records';
    },
  },
};
  </script>

  <style scoped>
  .order-history {
    margin-top: 20px;
    width: 100%;
  }
  .top-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.top-nav button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: var(--input-background-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
  background-color: #0F4EB3;
  color: var(--input-background-color);
}

.top-nav button:hover {
  background-color: var(--button-hover);
}
</style>
