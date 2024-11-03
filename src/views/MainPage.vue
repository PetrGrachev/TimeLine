<template>
  <div class="main-page-container">
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation Bar -->
      <nav class="top-nav">
          <button @click="viewMode = 'list'" :class="{ active: viewMode === 'list' }">Список организаций</button>
          <button @click="viewMode = 'map'" :class="{ active: viewMode === 'map' }">Карта</button>
          <select v-model="selectedOrganizationType" @change="filterOrganizations">
              <option value="">Все организации</option>
              <option value="barbershop">Парикмахерские</option>
              <option value="gym">Фитнес-клубы</option>
              <option value="carservice">Авто-сервис</option>
              <option value="cafe">Кафе и рестораны</option>
              <option value="pharmacy">Медучреждения</option>
            </select>
      </nav>
  
      <!-- List or Map Display -->
      <div v-if="viewMode === 'list'" class="organization-list">
          <OrganizationList :organizations="filteredOrganizations" @organization-click="goToCompanyInfo" />
      </div>

      <div v-if="viewMode === 'map'" class="organization-map">
        <!-- 2GIS Integration Placeholder -->
        <div id="map" class="map-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import OrganizationList from '@/components/OrganizationList.vue';
/* global DG */
export default {
  components: {
      OrganizationList,
  },
  data() {
    return {
      viewMode: 'list', // Режим отображения по умолчанию (список)
      organizations: [
  { coords: [42.98306, 47.50462], name: 'Парикмахерская GACHI HAIR', type: 'barbershop' },
  { coords: [42.98150, 47.50200], name: 'Фитнес-клуб GymFit', type: 'gym' },
  { coords: [42.98400, 47.50600], name: 'Барбершоп AlfaMed', type: 'barbershop' },
  { coords: [42.98200, 47.50800], name: 'Сервис 24', type: 'carservice' },
  { coords: [42.98000, 47.50700], name: 'Кафе Aroma', type: 'cafe' },
  { coords: [42.98500, 47.50900], name: 'Ресторан Gusto', type: 'cafe' },
  { coords: [42.98350, 47.50350], name: 'Клиника PharmaPlus', type: 'pharmacy' }
  ],
  filteredOrganizations: []
    };
  },
  mounted() {
  this.filteredOrganizations = this.organizations;
  this.initializeMap();
},
watch: {
  viewMode(newMode) {
    if (newMode === 'map') {
      this.initializeMap();
    }
  }
},
methods: {
  
  filterOrganizations() {
  if (this.selectedOrganizationType) {
    this.filteredOrganizations = this.organizations.filter(
      org => org.type === this.selectedOrganizationType
    );
  } else {
    this.filteredOrganizations = this.organizations;
  }
  if (this.viewMode === 'map') {
    this.initializeMap();
  }
},
  goToCompanyInfo(org) {
    this.$router.push({ name: 'OrgInfo', params: { orgName: org.name } });
  },
  initializeMap() {
    if (this.map) {
    this.map.remove();
    this.map = null;
  }
  this.mapInitialized = true;
      DG.then(() => {
        this.map = DG.map('map', {
          center: [42.98306, 47.50462], // Центр карты (Махачкала)
          zoom: 13,
        });

        // Добавление маркеров для парикмахерских в Махачкале
        

        
  this.filteredOrganizations.forEach(org => {
  DG.marker(org.coords, {
    icon: DG.icon({
      iconUrl: require(`@/assets/${org.type}-icon.png`),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    })
  }).addTo(this.map)
        .bindPopup(org.name)
        .on('dblclick', () => {
          this.goToCompanyInfo(org);
        });
    });
  });
  }
}
};
</script>

<style scoped>
.main-page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}


.main-content {
  flex-grow: 1;
  padding: 20px;
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

.organization-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.organization-map {
  background-color: #f4f4f4;
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