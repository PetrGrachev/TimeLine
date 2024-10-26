<template>
    <div class="order-history">
      <div class="order-header">
        <span class="column-title column-icon">Иконка</span>
        <span class="column-title">Название организации</span>
        <span class="column-title">Услуга</span>
        <span class="column-title">Сотрудник</span>
        <span class="column-title">Дата и время</span>
        <span class="column-title">Действия</span>
      </div>
      <ul class="order-history-list">
        <li v-for="order in orders" :key="order.id" class="order-item">
          <img :src="require(`@/assets/${order.organization.type}-icon.png`)" alt="icon" class="organization-icon" />
          <span class="order-detail">{{ order.organization.name }}</span>
          <span class="order-detail">{{ order.service }}</span>
          <span class="order-detail">{{ order.employee }}</span>
          <span class="order-detail">{{ order.dateTime }}</span>
          <div class="order-actions">
            <button @click="leaveReview(order)" class="action-button">Оставить отзыв</button>
            <button @click="repeatOrder(order)" class="action-button">Повторить</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
        orders: [
          { id: 1, organization: { name: 'Парикмахерская GACHI HAIR', type: 'barbershop' }, service: 'Стрижка', employee: 'Иван Иванов', dateTime: '2024-10-25 14:00' },
          { id: 2, organization: { name: 'Фитнес-клуб GymFit', type: 'gym' }, service: 'Персональная тренировка', employee: 'Олег Смирнов', dateTime: '2024-10-24 18:00' },
          { id: 3, organization: { name: 'Барбершоп AlfaMed', type: 'barbershop' }, service: 'Бритье', employee: 'Петр Петров', dateTime: '2024-10-23 12:00' },
          { id: 4, organization: { name: 'Сервис 24', type: 'carservice' }, service: 'Замена масла', employee: 'Сергей Сергеев', dateTime: '2024-10-22 10:00' },
          { id: 5, organization: { name: 'Кафе Aroma', type: 'cafe' }, service: 'Бронирование стола', employee: 'Администратор', dateTime: '2024-10-21 19:00' },
          { id: 6, organization: { name: 'Ресторан Gusto', type: 'cafe' }, service: 'Бронирование VIP-зала', employee: 'Администратор', dateTime: '2024-10-20 20:00' },
          { id: 7, organization: { name: 'Клиника PharmaPlus', type: 'pharmacy' }, service: 'Консультация врача', employee: 'Дмитрий Медведев', dateTime: '2024-10-19 09:00' }
        ],
      };
    },
    methods: {
      leaveReview(order) {
        // Логика для оставления отзыва
        alert("Оставить отзыв для записи: " + order.organization.name);
      },
      repeatOrder(order) {
        // Логика для повторения заказа
        alert("Повторить запись: " + order.organization.name);
      },
    },
  };
  </script>
  
  <style scoped>
  .order-history {
    width: 100%;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #f1f1f1;
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
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .organization-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
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
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #1A6CDB;
  }
  </style>
