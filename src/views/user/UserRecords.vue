<template>
  <div class="order-history">
    <Toast ref="toast" />

    <nav class="top-nav">
      <button @click="getFutureRecords" :class="{ active: currentTab === 'records' }">Мои записи</button>
      <button @click="getHistory" :class="{ active: currentTab === 'history' }">История</button>
    </nav>

    <RecordsList :orders="records" @leave-review="leaveReview" @repeat-order="repeatOrder" @cancel-order="cancelOrder"
      @organization-click="goToCompanyInfo" />

    <ReviewingDialog v-model:visible="isReviewDialogVisible" :reviewRating="reviewRating" :reviewText="reviewText"
      @submit-review="submitReview" />

  </div>
</template>

<script>
import Toast from 'primevue/toast';
import RecordsList from '../../components/lists/RecordsList.vue';
import ReviewingDialog from '../../components/dialog/ReviewingDialog.vue';
import { getRecords } from '../../api/recordsApi';
export default {
  components: {
    Toast,
    RecordsList,
    ReviewingDialog
  },

  data() {
    return {
      records: null,
      currentTab: 'records', // Текущая вкладка - 'records' или 'history'
      isReviewDialogVisible: false,
      reviewRating: null,
      reviewText: '',
      currentOrder: null,
    };
  },
  mounted() {
    // Начальное отображение записей
    this.getFutureRecords();
  },
  methods: {
    leaveReview(order) {
      this.currentOrder = order;
      this.isReviewDialogVisible = true;
    },
    repeatOrder(order) {
      // Логика для повторения заказа
      alert("Повторить запись: " + order.name);
    },
    cancelOrder(order) {
      // Логика для отмены заказа
      alert("Отменить запись: " + order.name);
    },
    submitReview() {
      // Логика для отправки отзыва для конкретного заказа
      console.log("Отправить отзыв для заказа", this.currentOrder.organization.name, this.reviewRating, this.reviewText);
      this.isReviewDialogVisible = false;
      this.reviewRating = null;
      this.reviewText = '';
      this.currentOrder = null;

      this.$refs.toast.add({ severity: 'success', summary: 'Успех', detail: 'Отзыв успешно отправлен', life: 3000 });
    },
    getHistory() {
      this.currentTab = 'history';
      const id = localStorage.getItem('id');
      getRecords(id, false, false)
        .then((records) => {
          this.records = records;
        })
        .catch(error => {
          console.error("Ошибка загрузки records:", error);
        });
    },
    getFutureRecords() {
      this.currentTab = 'records';
      const id = localStorage.getItem('id');
      getRecords(id, false, true)
        .then((records) => {
          this.records = records;
        })
        .catch(error => {
          console.error("Ошибка загрузки records:", error);
        });
    },
    goToCompanyInfo(record) {
      //TODO сделать переход на страницу организации
      console.log(record)
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
  color: var(--text-color);
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

.action-button {
  padding: 8px 12px;
  background-color: #0F4EB3;
  color: var(--card-background-color);
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

select {
  background-color: var(--input-background-color);
  color: var(--text-color);
}
</style>
