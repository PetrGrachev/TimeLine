<template>
  <div class="main-page-container">
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation Bar -->
        <nav class="top-nav">
            <Button @click="viewMode = 'list'" :class="{ active: viewMode === 'list' }">Список организаций</button>
            <Button @click="viewMode = 'map'" :class="{ active: viewMode === 'map' }">Карта</button>
            <OrganizationSelect v-model="selectedOrganizationType" @change="filterOrgs" class="custom-select"/>
            <InputGroup v-if="viewMode === 'list'" class="search">
              <Button label="Поиск" @click="filterOrgs" class="search-button"/>
              <InputText v-model="query" @keyup.enter="filterOrgs" placeholder="Введите ключевое слово" />
            </InputGroup>
            
        </nav>
      
      <!-- List or Map Display -->
      <div v-if="viewMode === 'list'" class="organization-list">
  <div v-if="noOrgs" class="no-organizations-message">
    По запросу ничего не найдено
  </div>
  <div v-else>
    <OrganizationList :organizations="orgsList" @organization-click="goToCompanyInfo" />
  </div>
  <Paginator :rows="rowsPerPage" :totalRecords="totalRecords" :page="currentPage" @page="onPageChange" class="pagination" />
</div>
      <!--TODO Сделать сброс пагинации при обновлении фильтра типа или поиска-->
      <div v-if="viewMode === 'map'" class="organization-map">
        <OrgsMap :selectedOrganizationType="selectedOrganizationType"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from 'primevue/inputgroup';
import OrganizationList from '@/components/OrganizationList.vue';
import OrganizationSelect from '../../components/OrganizationSelect.vue';
import { findOrgs} from '../../api/axiosInstance';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import OrgsMap from '../../components/OrgsMap.vue';

export default {
  components: {
      OrganizationList,
      OrganizationSelect,
      InputGroup,
      Button,
     InputText,
     Paginator,
     OrgsMap,
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
      totalRecords: 100,
      noOrgs:false,
    };
  },
  mounted() {
  this.updateList(5, 1, "", "");
},

methods: {
  onPageChange(event) {
      this.currentPage = event.page; // Обновляем текущую страницу
      this.updateList(this.rowsPerPage, this.currentPage+1, this.query, this.selectedOrganizationType); // Загружаем данные для выбранной страницы
    },
  updateList(limit, page, name, type){

    findOrgs(limit, page, name, type)
    .then(orgs => {
      if (Array.isArray(orgs)  && orgs.length > 0) {
        this.orgsList=orgs;
        this.noOrgs=false;
      }
      else{
      this.noOrgs=true;
      }
  })
  .catch(error => {
    console.error("Ошибка ", error.message);
  });
    
  },
  filterOrgs(){
      if (this.viewMode=== 'map'){
        this.getMapBounds();
      }
      else{
        this.updateList(this.rowsPerPage, this.currentPage+1, this.query, this.selectedOrganizationType);
      }
  },
  goToCompanyInfo(org) {
    this.$router.push({ name: 'OrgInfo', params: { orgName: org.name } });
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

.top-nav {
  display: flex;
  align-items: center; /* Выравнивание по вертикали */
  gap: 15px; /* Пространство между элементами */
  margin-bottom: 20px;
  flex-wrap: wrap; /* Чтобы элементы переносились на следующую строку, если экран слишком узкий */
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
.top-nav .p-button {
  width: 150px; /* Устанавливаем фиксированную ширину */
  height: 50px; /* Устанавливаем фиксированную высоту */
  transition: transform 0.2s; /* Плавное увеличение */
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
.search {
  display: flex;
  align-items: center;
  gap: 10px;
  
  width: 50%;
}

.custom-select {
  flex-shrink: 0; /* Чтобы селект не сжимался */
  width: 250px; /* Установите ширину, чтобы он был одинаковым с другими элементами */
}

:deep(.p-inputgroup) {
  flex-grow: 1; /* Растягивает inputgroup, чтобы он занимал свободное место */
}
:deep(.p-paginator){
  background-color: var(--background-color);
  color: var(--text-color);
}
input,
textarea {
  background-color: var(--input-background-color);
  flex-grow: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  color: var(--text-color);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #0F4EB3;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.4);
}
.search-button{
  width: 100%;
  padding: 12px;
  background-color: #0F4EB3;
  color: var(--text-color-background-color);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>