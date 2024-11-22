<template>
    <div>
      <div class="order-header">
        <span class="column-title column-icon">Иконка</span>
        <span class="column-title">Название организации</span>
        <span class="column-title">Услуга</span>
        <span class="column-title">Сотрудник</span>
        <span class="column-title">Дата и время</span>
        <span class="column-title">Действия</span>
      </div>
      <ul class="order-history-list">
        <li v-for="order in orders" :key="order.id" class="order-item" @click="$emit('organization-click', order)">
          <img :src="require(`@/assets/${order.organization.type}-icon.png`)" alt="icon" class="organization-icon" />
          <span class="order-detail">{{ order.organization.name }}</span>
          <span class="order-detail">{{ order.service }}</span>
          <span class="order-detail">{{ order.employee }}</span>
          <span class="order-detail">{{ order.dateTime }}</span>
          <div class="order-actions">
            <button @click="handleLeaveReview(order)" class="action-button">Оставить отзыв</button>
            <button @click="handleRepeatOrder(order)" class="action-button">Повторить</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
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
  background-color: var(--button-hover); /* Измените цвет фона при наведении */
  transform: translateY(-2px); /* Добавляет небольшой подъем при наведении */
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
    color: var(--text-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #1A6CDB;
  }
</style>