<template>
  <div class="main-page-container">
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation Bar -->
      <nav class="top-nav">
          <button @click="viewMode = 'list'" :class="{ active: viewMode === 'list' }">Список организаций</button>
          <button @click="viewMode = 'map'" :class="{ active: viewMode === 'map' }">Карта</button>
          <InputGroup v-if="viewMode === 'list'" class="search">
            <Button label="Поиск" @click="filterOrgs"/>
            <InputText v-model="query" placeholder="Введите ключевое слово" />
          </InputGroup>
          <OrganizationSelect v-model="selectedOrganizationType" @change="filterOrgs"/>
      </nav>
      <!-- TODO Добавить поле для поиска-->
      <!-- List or Map Display -->
      <div v-if="viewMode === 'list'" class="organization-list">
          <OrganizationList :organizations="filteredOrgList" @organization-click="goToCompanyInfo" />
          <Paginator :rows="rowsPerPage" :totalRecords="totalRecords" :page="currentPage" @page="onPageChange" class="pagination" />
      </div>

      <div v-if="viewMode === 'map'" class="organization-map">
        <!-- 2GIS Integration Placeholder -->
        <div id="map" class="map-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from 'primevue/inputgroup';

import OrganizationList from '@/components/OrganizationList.vue';
import OrganizationSelect from '../../components/OrganizationSelect.vue';
import { findOrgs, showMap } from '../../api/axiosInstance';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
/* global DG */
export default {
  components: {
      OrganizationList,
      OrganizationSelect,
      InputGroup,
      Button,
     InputText,
     Paginator
  },
  data() {
    return {
      selectedOrganizationType: '',
      query: "",
      viewMode: 'list', // Режим отображения по умолчанию (список)
      orgsList: [],
      filteredOrgList:[],
      mapOrgs: [],
      filteredMapOrgs:[],
      currentPage: 0, // PrimeVue страницы начинаются с 0
      rowsPerPage: 5,
      totalRecords: 100,
    };
  },
  mounted() {
  this.initializeMap();
  this.updateList(5, 1, "", "");
},
watch: {
  viewMode(newMode) {
    if (newMode === 'map') {
      this.initializeMap();
    }
  }
},
methods: {
  onPageChange(event) {
      this.currentPage = event.page; // Обновляем текущую страницу
      this.updateList(this.rowsPerPage, this.currentPage+1, this.query, this.selectedOrganizationType); // Загружаем данные для выбранной страницы
    },
  updateList(limit, page, name, type){

    findOrgs(limit, page, name, type)
    .then(orgs => {
      if (Array.isArray(orgs)) {
        this.orgsList=orgs;
        console.log("OrgsList",this.orgsList);
        this.filterOrgList();
        console.log("filteredOrgList",this.filteredOrgList);
      }
  })
  .catch(error => {
    console.error("Ошибка ", error.message);
  });
    
  },
  filterOrgs(){
    console.log(this.currentPage)
      if (this.viewMode=== 'map'){
        this.getMapBounds();
      }
      else{//TODO сделать новый findOrgs и фильтр
        this.updateList(this.rowsPerPage, this.currentPage+1, this.query, this.selectedOrganizationType);
      }
  },
  filterMapOrgs() {
    console.log("Фильтруем по ", this.selectedOrganizationType);
  if (this.selectedOrganizationType) {
    this.filteredMapOrgs = this.mapOrgs.filter(
      org => org.type === this.selectedOrganizationType
    );
  } else {
    this.filteredMapOrgs = this.mapOrgs;
  }
},
  filterOrgList(){
    if (this.selectedOrganizationType) {
    this.filteredOrgList = this.orgsList.filter(
      org => org.type === this.selectedOrganizationType
    );
  } else {
    this.filteredOrgList = this.orgsList;
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

  this.markers = [];


  DG.then(() => {
    this.map = DG.map('map', {
      center: [42.98306, 47.50462], // Центр карты (Махачкала)
      zoom: 13,
    });

    // Добавление слушателя для обновления карты при окончании движения
    this.map.on('moveend', () => {
      this.getMapBounds();
    });

    // Начальная загрузка данных и добавление маркеров
    this.getMapBounds();
  });
},

getMapBounds() {
  if (this.map) {
    const bounds = this.map.getBounds();
    const southWest = bounds.getSouthWest(); // Левый нижний угол (юго-западный)
    const northEast = bounds.getNorthEast(); // Правый верхний угол (северо-восточный)

    console.log('Левый нижний угол (Юго-западный):', southWest.lat, southWest.lng);
    console.log('Правый верхний угол (Северо-восточный):', northEast.lat, northEast.lng);

    showMap(southWest, northEast)
      .then(orgs => {
        if (Array.isArray(orgs)) {
          this.mapOrgs = orgs;

          this.clearMarkers();

          this.filterMapOrgs();
          
          //TODO сделать нормальное отображение маркеров
          this.filteredMapOrgs.forEach(org => { //TODO вынести в отдельную функцию
            const popupContent = `
              <div style="font-family: Arial, sans-serif; color: #a2b7d6; text-align: center; ">
                <h3 style="margin: 0; font-size: 16px;">${org.name}</h3>
                <p style="margin: 5px 0;">${org.type}</p>
                <p style="margin: 5px 0;">${org.rating} *</p>
                <button style="
                  padding: 8px 12px;
                  background-color: #0F4EB3;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 14px;">
                  Подробнее
                </button>
              </div>
            `;

            const marker = DG.marker(org.coords, {
              icon: DG.icon({
                iconUrl: require(`@/assets/${org.type}-icon.png`),
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
              })
            }).addTo(this.map)
              .bindPopup(popupContent)
              .on('dblclick', () => {
                this.goToCompanyInfo(org);
              });

              this.markers.push(marker);

          });
        } else {
          console.error('Полученные данные не являются массивом:', orgs);
        }
      })
      .catch(error => {
        console.error('Ошибка при получении организаций:', error);
      });
  }
  
},
clearMarkers() {
  if (this.markers && this.markers.length > 0) {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker); // Удаляем каждый маркер с карты
    });
    this.markers = []; // Очищаем массив маркеров
  }
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
  background-color: var(--card-background-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
  background-color: #0F4EB3;
  color: var(--input-background-color);
}

.top-nav button:hover {
  background-color: var(--button-hover);
}

.organization-list {
  background-color: var(--card-background-color);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
.search{
  height: 80%;
  margin-right: 400px;
}
</style>