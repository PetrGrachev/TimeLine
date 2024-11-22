<template>
    <div>
      <div class="order-header">
        <span class="column-title">Клиент</span>
        <span class="column-title">Услуга</span>
        <span class="column-title">Сотрудник</span>
        <span class="column-title">Дата и время</span>
      </div>
      <ul class="order-history-list">
        <li v-for="order in orders" :key="order.id" class="order-item">
          <!-- Клиент с аватаркой -->
            <!-- TODO указывать clientAvatar и employeeAvatar в передоваемом массиве -->
          <span class="order-detail">
            <img :src="order.clientAvatar" alt="Client Avatar" class="avatar" />
            {{ order.first_name }} {{ order.last_name }}
          </span>
          
          <!-- Услуга -->
          <span class="order-detail">{{ order.service }}</span>
          
          <!-- Сотрудник с аватаркой -->
          <span class="order-detail">
            <img :src="order.employeeAvatar" alt="Employee Avatar" class="avatar" />
            {{ order.employee }}
          </span>
          
          <!-- Дата и время -->
          <span class="order-detail">{{ order.dateTime }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UsersList',
    props: {
      orders: {
        type: Array,
        required: true,
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
  </style>
  