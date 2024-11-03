<template>
  
  <div class="order-history">

    <nav class="top-nav">
    <button @click="getRecords">Мои записи</button>
    <button @click="getHistory">История</button>
    <select v-model="selectedOrganizationType" @change="filterOrganizations">
      <option value="">Все организации</option>
      <option value="barbershop">Парикмахерские</option>
      <option value="gym">Фитнес-клубы</option>
      <option value="carservice">Авто-сервис</option>
      <option value="cafe">Кафе и рестораны</option>
      <option value="pharmacy">Медучреждения</option>
    </select>
  </nav>

    <div class="order-header">
      <span class="column-title column-icon">Иконка</span>
      <span class="column-title">Название организации</span>
      <span class="column-title">Услуга</span>
      <span class="column-title">Сотрудник</span>
      <span class="column-title">Дата и время</span>
      <span class="column-title">Действия</span>
    </div>
    <ul class="order-history-list">
      <li v-for="order in filteredOrganizations" :key="order.id" class="order-item">
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


    
    <!-- Модальное окно для отзыва -->
    <Dialog v-model:visible="isReviewDialogVisible" modal header="Оставить отзыв" :style="{ width: '30rem' }">
        <div class="review-form">
          <Rating v-model="reviewRating" :stars="5" cancel="false" class="mb-4" :pt="{
          icon: {
            style: {
              'color': '#0F4EB3'
            }
          }
        }"></Rating>
          <Textarea v-model="reviewText" rows="5" placeholder="Введите ваш отзыв" class="mb-4"></Textarea>
          <button @click="submitReview" class="action-button">Отправить</button>
        </div>
      </Dialog>
  </div>
</template>

<script>
import  Dialog  from 'primevue/dialog';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
export default {
  components: {
      Dialog,
      Rating,
      Textarea,
    },
  
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
      filteredOrganizations: [],
      selectedOrganizationType: '',
      currentTab: 'records', // Текущая вкладка - 'records' или 'history'
      isReviewDialogVisible: false,
        reviewRating: null,
        reviewText: '',
        currentOrder: null,
    };
  },
  mounted() {
    // Начальное отображение записей
    this.getRecords();
  },
  methods: {
    filterOrganizations() {
      if (this.selectedOrganizationType) {
        this.filteredOrganizations = this.orders.filter(
          order => order.organization.type === this.selectedOrganizationType
        );
      } else {
        this.filteredOrganizations = this.orders;
      }
    },
    leaveReview(order) {
      this.currentOrder = order;  
      this.isReviewDialogVisible = true;
    },
    repeatOrder(order) {
      // Логика для повторения заказа
      alert("Повторить запись: " + order.organization.name);
    },
    submitReview() {
        // Логика для отправки отзыва для конкретного заказа
        console.log("Отправить отзыв для заказа", this.currentOrder.organization.name, this.reviewRating, this.reviewText);
        this.isReviewDialogVisible = false;
        this.reviewRating = null;
        this.reviewText = '';
        this.currentOrder = null;
      },
    getHistory() {
      this.currentTab = 'history';
      this.filteredOrganizations = this.orders; // Здесь вы можете добавить логику для запроса истории
      this.filterOrganizations();
    },
    getRecords() {
      this.currentTab = 'records';
      this.filteredOrganizations = this.orders; // Здесь вы можете добавить логику для запроса записей
      this.filterOrganizations();
    },
  },
};
</script>
  
  <style scoped>
  .order-history {
    margin-top: 20px;
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
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
  background-color: #0F4EB3;
  color: #fff;
}

.top-nav button:hover {
  background-color: #e6e6e6;
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

  .review-form {
    display: flex;
    flex-direction: column;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }

  </style>
