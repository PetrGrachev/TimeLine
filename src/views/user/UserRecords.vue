<template>
  <div class="order-history">
    <Toast ref="toast" />

    <nav class="top-nav">
      <button @click="getFutureRecords" :class="{ active: currentTab === 'records' }">Мои записи</button>
      <button @click="getHistory" :class="{ active: currentTab === 'history' }">История</button>
    </nav>

    <div v-if="currentTab === 'records'">
      <FreshRecordsList :orders="records" @leave-review="leaveReview" @repeat-order="repeatOrder"
        @cancel-order="cancelOrder" @org-click="goToCompanyInfo" />
    </div>

    <div v-if="currentTab === 'history'">
      <HistoryRecordsList :orders="records" @leave-review="leaveReview" @repeat-order="repeatOrder"
        @cancel-order="cancelOrder" @org-click="goToCompanyInfo" />
    </div>


    <ReviewingDialog v-model:visible="isReviewDialogVisible" :reviewRating="reviewRating" :reviewText="reviewText"
      @submit-review="submitReview" />

    <CancellationDialog v-model:visible="isCancellationDialogVisible" @submit="submitCancellation" />
  </div>
</template>

<script>
import Toast from 'primevue/toast';
import ReviewingDialog from '../../components/dialog/ReviewingDialog.vue';
import { cancelRecord, getRecords } from '../../api/recordsApi';
import { addFeedback } from '../../api/feedbacksApi';
import HistoryRecordsList from '../../components/lists/HistoryRecordsList.vue';
import FreshRecordsList from '../../components/lists/FreshRecordsList.vue';
import CancellationDialog from '../../components/dialog/CancellationDialog.vue';
export default {
  components: {
    Toast,
    ReviewingDialog,
    HistoryRecordsList,
    FreshRecordsList,
    CancellationDialog,
  },

  data() {
    return {
      records: null,
      currentTab: 'records', // Текущая вкладка - 'records' или 'history'
      isReviewDialogVisible: false,
      reviewRating: null,
      reviewText: '',
      currentOrder: null,
      isCancellationDialogVisible: false,
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

    cancelOrder(order) {
      this.currentOrder = order;
      this.isCancellationDialogVisible = true;
    },
    submitCancellation(reason) {
      cancelRecord(this.currentOrder.record_id, reason)
        .then(() => {
          this.isCancellationDialogVisible = false;
          this.$refs.toast.add({ severity: 'info', summary: 'Успех', detail: 'Запись отменена', life: 3000 });
        })
        .catch(error => {
          console.error("Ошибка отмены", error);
        });
    },
    submitReview(text, rating) {
      addFeedback(text, this.currentOrder.record_id, rating)
        .then(() => {
          this.isReviewDialogVisible = false;
          this.$refs.toast.add({ severity: 'success', summary: 'Успех', detail: 'Отзыв успешно отправлен', life: 3000 });
        })
      this.currentOrder.reviewed = true
    },
    getHistory() {
      this.currentTab = 'history';
      this.records = null;
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
      this.records = null;
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
    goToCompanyInfo(org_id) {
      this.$router.push({ name: 'OrgInfo', params: { id: org_id } });
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
