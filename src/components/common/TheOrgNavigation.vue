<template>
  <!-- Sidebar Navigation at the Top -->
  <aside class="sidebar top-sidebar">
    <ul class="sidebar-menu">
      <li class="menu-item" @click="goToMyRecords">Записи</li>
      <li class="menu-item" @click="goToOrgProfile">Профиль организации</li>
      <li class="menu-item" @click="goToSchedule">Управление</li>
      <li class="menu-item" @click="goToStatistics">Статистика</li>
      <li class="menu-item" @click="goToSettings">Настройки</li>
      <li class="menu-item" @click="goToLogin">Выйти</li>
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
    }

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