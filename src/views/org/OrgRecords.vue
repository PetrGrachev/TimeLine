<template>
  <div class="order-history">

    <nav class="top-nav">
      <button @click="getFutureRecords" :class="{ active: currentTab === 'records' }">Предстоящие записи</button>
      <button @click="getHistory" :class="{ active: currentTab === 'history' }">История</button>

    </nav>
    <UsersList :orders="records" />

  </div>
</template>

<script>
import { getRecords } from '../../api/recordsApi';
import UsersList from '../../components/lists/UsersList.vue';
export default {
  components: {
    UsersList,
  },
  data() {
    return {
      records: null,
      currentTab: 'records', // Текущая вкладка - 'records' или 'history'
    };
  },
  mounted() {
    // Начальное отображение записей
    this.getFutureRecords();
  },
  methods: {
    getHistory() {
      this.currentTab = 'history';
      const id = localStorage.getItem('id');
      getRecords(id, true, false)
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
      getRecords(id, true, true)
        .then((records) => {
          this.records = records;

        })
        .catch(error => {
          console.error("Ошибка загрузки records:", error);
        });
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
