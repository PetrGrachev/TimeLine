<template>
  <div class="main-page-container">
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation Bar -->
        <nav class="top-nav">
            <Button @click="goToRoute('list')" :class="{ active: currentRoute === 'list' }">Список организаций</button>
            <Button @click="goToRoute('map')"  :class="{ active: currentRoute === 'map' }">Карта</button>
        </nav>
        <router-view />
    </div>
  </div>
</template>

<script>

import Button from 'primevue/button';

export default {
  components: {
      Button,
     
  },
  data() {
    return {
      selectedOrganizationType: '',
      query: "",
      viewMode: 'list', // Режим отображения по умолчанию (список)
      orgsList: [],
      filteredOrgList:[],
      currentPage: 0, // PrimeVue страницы начинаются с 0
      rowsPerPage: 5,
      totalRecords: 0,
      noOrgs:false,

      currentRoute: 'list',
    };
  },
watch: {
    '$route'(to) {
      // Автоматически устанавливать текущий маршрут при изменении
      if (to.name === 'MainList' || to.name === 'OrgsMap') {
        this.currentRoute = to.name === 'MainList' ? 'list' : 'map';
      }
    },
  },
  created() {
    // Устанавливаем маршрут при инициализации компонента
    if (this.$route.name === 'MainList' || this.$route.name === 'OrgsMap') {
      this.currentRoute = this.$route.name === 'MainList' ? 'list' : 'map';
    }
  },
methods: {
  goToRoute(route) {
      this.currentRoute = route;
      this.$router.push({ name: route === 'list' ? 'MainList' : 'OrgsMap' });
    },
  }
};
</script>

<style scoped>
.main-page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin-bottom: 10px;
}


.main-content {
  flex-grow: 1;
  padding: 20px;
}



.organization-map {
  background-color: var(--background-color);
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>