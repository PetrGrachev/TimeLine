<template>
  <nav class="top-nav">
    <OrganizationSelect v-model="selectedOrganizationType" @change="onChange" class="custom-select" />
    <InputGroup v-if="viewMode === 'list'" class="search">
      <Button label="Поиск" @click="onChange" class="search-button" />
      <InputText v-model="query" @keyup.enter="onChange" placeholder="Введите ключевое слово" />
    </InputGroup>
    <Dropdown v-model="selectedSortOrder" :options="sortOptions" optionLabel="label" placeholder="Сортировка"
      class="sort-dropdown" @change="onChange" />
  </nav>
  <div class="organization-list">
    <div v-if="noOrgs" class="no-organizations-message">
      По запросу ничего не найдено
    </div>
    <div v-else>
      <OrganizationList :organizations="orgsList" @organization-click="goToCompanyInfo" />
    </div>
    <Paginator :rows="rowsPerPage" :totalRecords="totalRecords" :page="currentPage" @page="onPageChange"
      class="pagination" />
  </div>
</template>

<script>
import InputGroup from 'primevue/inputgroup';
import OrganizationList from '@/components/lists/OrganizationList.vue';
import OrganizationSelect from '@/components/selects/OrganizationSelect.vue';
import { findOrgs } from '../../api/userApi';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
export default {
  components: {
    OrganizationList,
    OrganizationSelect,
    InputGroup,
    Button,
    InputText,
    Paginator,
    Dropdown
  },
  data() {
    return {
      selectedOrganizationType: '',
      query: "",
      viewMode: 'list', // Режим отображения по умолчанию (список)
      orgsList: [],
      filteredOrgList: [],
      currentPage: 0, // PrimeVue страницы начинаются с 0
      rowsPerPage: 5,
      totalRecords: 0,
      noOrgs: false,
      selectedSortOrder: null,
      sortOptions: [
        { label: 'По рейтингу', value: 'rating' },
        { label: 'По имени', value: 'name' },
      ],
    };
  },
  mounted() {
    this.updateList(5, 1, "", "", true, false);
  },

  methods: {
    onPageChange(event) {
      this.currentPage = event.page; // Обновляем текущую страницу
      this.updateList(this.rowsPerPage, this.currentPage + 1, this.query, this.selectedOrganizationType); // Загружаем данные для выбранной страницы
    },
    updateList(limit, page, name, type) {
      let sort = false
      console.log(this.selectedSortOrder)
      if (this.selectedSortOrder && this.selectedSortOrder.value == 'rating') {
        sort = true
      }
      findOrgs(limit, page, name, type, sort, sort)
        .then(data => {
          if (Array.isArray(data.orgs) && data.orgs.length > 0) {
            this.orgsList = data.orgs;
            console.log(this.orgsList)
            this.totalRecords = data.found;
            this.noOrgs = false;
          }
          else {
            this.noOrgs = true;
          }
        })
        .catch(error => {
          console.error("Ошибка ", error.message);
        });

    },
    onChange() {
      this.currentPage = 0
      this.updateList(this.rowsPerPage, this.currentPage + 1, this.query, this.selectedOrganizationType);
    },
    goToCompanyInfo(org) {
      this.$router.push({ name: 'OrgInfo', params: { id: org.id } });
    },
  }
};
</script>

<style scoped>
.top-nav {
  display: flex;
  align-items: center;
  /* Выравнивание по вертикали */
  gap: 15px;
  /* Пространство между элементами */
  margin-bottom: 20px;
  flex-wrap: wrap;
  /* Чтобы элементы переносились на следующую строку, если экран слишком узкий */
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
  width: 150px;
  /* Устанавливаем фиксированную ширину */
  height: 50px;
  /* Устанавливаем фиксированную высоту */
  transition: transform 0.2s;
  /* Плавное увеличение */
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

.search {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 50%;
}

.custom-select {
  flex-shrink: 0;
  /* Чтобы селект не сжимался */
  width: 250px;
  /* Установите ширину, чтобы он был одинаковым с другими элементами */
}

:deep(.p-inputgroup) {
  flex-grow: 1;
  /* Растягивает inputgroup, чтобы он занимал свободное место */
}

:deep(.p-paginator) {
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

.search-button {
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

:deep(.p-dropdown-item) {
  background-color: var(--text-color-background-color);
}
</style>