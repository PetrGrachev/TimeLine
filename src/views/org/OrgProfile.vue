<template>
  <div class="user-profile-container">
    <h2>Редактирование профиля</h2>
    <form @submit.prevent="handleSave">

      <div class="form-group">
        <InputText v-model="org.name" id="registrationName" placeholder='Название' class="mb-4"
          :class="{ 'p-invalid': registrationNameError }" @blur="validateRegistrationName" required />
        <small v-if="registrationNameError" class="p-error">Название должно содержать не менее 3 символов.</small>
      </div>

      <div class="form-group">
        <OrganizationSelect v-model="org.type" class="org-select" />
      </div>


      <!-- Телефон пользователя -->
      <div class="form-group">
        <InputMask v-model="org.telephone" id="contactNumber" placeholder="Контактный номер" mask="+79999999999"
          class="mb-4" required />
      </div>

      <!-- Раздел о себе -->
      <div class="form-group">
        <Textarea v-model="org.about" id="about" rows="5"
          placeholder="Расскажите немного о вашей организации"></Textarea>
      </div>

      <div class="form-group">
        <CitySelect v-model="org.city" class="city-select" />
      </div>
      <div class="form-group">
        <InputText v-model="org.address" id="address" placeholder="Адрес" class="mb-4" required />
      </div>
      <p class="map-text">Укажите адрес на карте:</p>
      <div id="map" class="map-container"></div>



      <!-- Кнопка сохранения -->
      <Button label="Сохранить изменения" type="submit" :disabled="isSubmitDisabled" />
    </form>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea';
import { getOrg, updateOrg } from '../../api/orgApi';
import CitySelect from '../../components/selects/CitySelect.vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import OrganizationSelect from '@/components/selects/OrganizationSelect.vue';
/* global DG */
export default {
  name: "OrgProfile",
  components: {
    InputText,
    InputMask,
    CitySelect,
    Textarea,
    Button,
    OrganizationSelect,
  },
  data() {
    return {
      org: {
        about: "",
        address: "",
        city: "",
        lat: 0,
        long: 0,
        name: "",
        org_id: 0,
        telephone: "",
        type: "",
      },
      markerCoords: null,

      registrationNameError: false,
    };
  },
  mounted() {
    this.loadMapScript();
    this.loadOrgData()
      .then(() => {
        this.initializeMap();
      })
      .catch(error => {
        console.error("Ошибка загрузки данных:", error);
      });
  },
  methods: {
    loadMapScript() {
      return new Promise((resolve, reject) => {
        if (document.getElementById('2gis-script')) {
          // Скрипт уже загружен
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = '2gis-script';
        script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Ошибка при загрузке скрипта карты.'));
        };
        document.body.appendChild(script);
      });
    },
    async loadOrgData() {
      try {
        // Получение id из localStorage
        const id = localStorage.getItem('id');
        const org = await getOrg(id); // Асинхронное ожидание завершения запроса
        this.org = org;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        throw error; // Перебрасываем ошибку, чтобы её можно было поймать в `mounted`
      }
    },
    handleSave() {
      updateOrg(this.org.about, this.org.address, this.org.name, this.org.city, this.org.telephone, this.org.org_id, this.org.lat, this.org.long, this.org.type)
      console.log("Изменения сохранены", this.org);
      this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Изменения сохранены', life: 3000 });

    },
    validateRegistrationName() {
      this.registrationNameError = this.org.name.length < 3;
    },
    //isSubmitDisabled(){
    //  return (!this.user.first_name || //TODO добавить валидацию на остальные поля
    //  this.user.first_name.length < 3)
    //},
    initializeMap() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
      this.mapInitialized = true;
      DG.then(() => {
        this.map = DG.map('map', {
          center: [this.org.lat, this.org.long], // Центр карты (Махачкала)
          zoom: 13,
        });
        this.marker = DG.marker([this.org.lat, this.org.long], { draggable: true })
          .addTo(this.map)
          .bindPopup('Перетащите меня!');

        // Обработка события перетаскивания маркера
        this.marker.on('dragend', (event) => {
          this.markerCoords = event.target.getLatLng(); // Сохраняем координаты маркера
          console.log('Координаты маркера:', this.markerCoords);

          this.org.lat = this.markerCoords.lat;
          this.org.long = this.markerCoords.long;
        });
      });
    },
  },
};
//TODO сделать поля нормальными по ширине
</script>

<style scoped>
.user-profile-container {
  max-width: 500px;
  margin: 20px auto 0;
  padding: 20px;
  background-color: var(--card-background-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

label {
  width: 150px;
  font-weight: 500;
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

.save-button {
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

.save-button:hover {
  background-color: #1A6CDB;
}

.map-container {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
</style>
