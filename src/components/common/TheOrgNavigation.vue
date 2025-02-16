<template>
  <!-- Sidebar Navigation at the Top -->
  <aside class="sidebar top-sidebar">
    <ul class="sidebar-menu">
      <li class="menu-item" @click="goToMyRecords">
        <i class="fas fa-calendar-alt"></i> Записи
      </li>
      <li class="menu-item" @click="goToOrgProfile">
        <i class="fas fa-user"></i> Профиль
      </li>
      <li class="menu-item" @click="goToSchedule">
        <i class="fas fa-cogs"></i> Управление
      </li>
      <li class="menu-item" @click="goToStatistics">
        <i class="fas fa-chart-bar"></i> Статистика
      </li>
      <li class="menu-item" @click="goToReviews">
        <i class="fas fa-comments"></i> Отзывы
      </li>
      <li class="menu-item" @click="goToSettings">
        <i class="fas fa-cog"></i> Настройки
      </li>
      <li class="menu-item" @click="goToLogin">
        <i class="fas fa-sign-out-alt"></i> Выйти
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'TheOrgNavigation',
  methods: {
    goToMyRecords() {
      // Логика для перехода на страницу "Мои записи"
      this.$router.push({ name: 'OrgMainPage' });
    },
    goToOrgProfile() {
      this.$router.push({ name: 'OrgProfile' });
    },
    goToSettings() {
      this.$router.push({ name: 'TheOrgSettings' });
    },
    goToStatistics() {
      this.$router.push({ name: 'OrgStatistics' });
    },
    goToSchedule() {
      this.$router.push({ name: 'OrgManaging' });
    },
    goToLogin() {
      this.$router.push({ name: 'LoginForm' });
    },
    goToReviews() {
      this.$router.push({ name: 'OrgReviews' });
    },

  }
};
</script>

<style scoped>
.top-sidebar {
  width: 100%;
  background-color: var(--background-color);
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.sidebar-menu {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 15px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.menu-item.inactive {
  color: #aaa;
  pointer-events: none;
}

.menu-item:hover {
  background-color: var(--button-hover);
}
</style>