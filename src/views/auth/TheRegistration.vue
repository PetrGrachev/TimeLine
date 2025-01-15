<template>
  <h2>Регистрация</h2>
  <RadioUserOrg v-model="isOrganization" />
  <form @submit.prevent="handleRegister">
    <div class="form-group">
      <InputText v-model="registrationName" id="registrationName"
        :placeholder="isOrganization ? 'Название организации' : 'Имя'" class="mb-4"
        :class="{ 'p-invalid': registrationNameError }" @blur="validateRegistrationName" required />
      <small v-if="registrationNameError" class="p-error">Имя должно содержать не менее 3 символов.</small>
    </div>
    <div class="form-group" v-if="!isOrganization">
      <InputText v-model="lastName" id="lastName" placeholder="Фамилия" class="mb-4" required />
    </div>
    <div class="form-group">
      <CitySelect v-model="city" class="city-select" />
    </div>
    <div class="form-group">
      <InputText v-model="email" id="email" type="email" placeholder="Email" class="mb-4"
        :class="{ 'p-invalid': emailError }" @blur="validateEmail" required />
      <small v-if="emailError" class="p-error">Введите корректный email.</small>
    </div>
    <div class="form-group">
      <Password v-model="password" id="password" placeholder="Пароль" feedback="false" :toggleMask="true" class="mb-4"
        :class="{ 'p-invalid': passwordError }" @blur="validatePassword" required />
      <small v-if="passwordError" class="p-error">Пароль должен содержать не менее 12 символов.</small>
    </div>
    <div v-if="isOrganization">
      <div class="form-group">
        <OrganizationSelect v-model="type" class="org-select" />
      </div>
      <div class="form-group">
        <InputMask v-model="contactNumber" id="contactNumber" placeholder="Контактный номер" mask="+79999999999"
          class="mb-4" required />
      </div>

      <div class="form-group">
        <InputText v-model="address" id="address" placeholder="Адрес" class="mb-4" required />
        <p class="map-text">Укажите адрес на карте:</p>
        <div id="map" class="map-container"></div>
      </div>
    </div>
    <Button label="Зарегистрироваться" type="submit" :disabled="isSubmitDisabled" />
    <ConfirmationCodeDialog :isVisible="isConfirmationDialogVisible" :email="email" :id="id" :isOrg="isOrganization"
      @update:isVisible="isConfirmationDialogVisible = $event" />
  </form>
</template>


<script>
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import Button from 'primevue/button';
import RadioUserOrg from '@/components/RadioUserOrg.vue';
import OrganizationSelect from '@/components/selects/OrganizationSelect.vue';
import ConfirmationCodeDialog from '@/components/dialog/ConfirmationCodeDialog.vue';
import { registerOrg, registerUser } from '../../api/authApi';
import CitySelect from '../../components/selects/CitySelect.vue';
/* global DG */
export default {
  components: {
    InputText,
    InputMask,
    Password,
    Button,
    RadioUserOrg,
    OrganizationSelect,
    ConfirmationCodeDialog,
    CitySelect,
  },

  data() {
    return {
      registrationName: '',
      lastName: '',
      email: '',
      password: '',
      isOrganization: false,
      type: '',
      contactNumber: '',
      address: '',
      emailError: false,
      passwordError: false,
      isConfirmationDialogVisible: false,
      id: null,
      markerCoords: null,
      city: '',
    };
  },
  mounted() {
    this.loadMapScript();
    this.$nextTick(() => {
      this.initializeMap();
    });
  },
  watch: {
    isOrganization(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initializeMap();
        });
      }

    }
  },
  computed: {
    isSubmitDisabled() {
      return (
        !this.registrationName ||
        this.registrationName.length < 3 ||
        !this.city ||
        (this.isOrganization && !this.type) ||
        !this.email ||
        !this.validateEmailFormat(this.email) ||
        !this.password ||
        this.password.length < 12 ||
        (this.isOrganization && (this.contactNumber.length == 10 || !this.address || !this.markerCoords))
      );
    },
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
    validateEmail() {
      this.emailError = !this.validateEmailFormat(this.email);
    },
    validatePassword() {
      this.passwordError = this.password.length < 12;
    },
    validateRegistrationName() {
      this.registrationNameError = this.registrationName.length < 3;
    },
    validateEmailFormat(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    handleRegister() {
      // Логика для регистрации
      console.log('Регистрация', {
        registrationName: this.registrationName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        type: this.type,
        contactNumber: this.contactNumber,
        address: this.address,
      });
      this.register()
    },
    register() {
      if (this.isOrganization) {
        registerOrg(this.address, this.city, this.email, this.markerCoords.lat, this.markerCoords.lng, this.registrationName, this.password, this.type, this.contactNumber)
          .then(id => {
            console.log("Полученный id:", id);
            this.id = id;
            this.showConfirmationDialog();
          })
          .catch(error => {
            console.error("Ошибка авторизации:", error.message);
          });
      }
      else {
        registerUser(this.email, this.registrationName, this.lastName, this.city, this.password)
          .then(id => {
            console.log("Полученный id:", id);
            this.id = id;
            this.showConfirmationDialog();
          })
          .catch(error => {
            console.error("Ошибка авторизации:", error.message);
          });
      }
    },
    showConfirmationDialog() {
      this.isConfirmationDialogVisible = true;
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
        this.marker = DG.marker([42.98306, 47.50462], { draggable: true })
          .addTo(this.map)
          .bindPopup('Перетащите меня!');

        // Обработка события перетаскивания маркера
        this.marker.on('dragend', (event) => {
          this.markerCoords = event.target.getLatLng(); // Сохраняем координаты маркера
          console.log('Координаты маркера:', this.markerCoords);
        });
      });
    },
  }
}
</script>

<style scoped>
/* Общие стили для формы входа и регистрации */
.auth-container {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

/* Логотип */
.logo-container {
  margin-bottom: 20px;
}

.logo {
  max-width: 200px;
  height: auto;
}

/* Вкладки для переключения */
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tabs button {
  width: 48%;
  padding: 10px;
  background-color: #0F4EB3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: #1A6CDB;
}

.tabs button:hover {
  background-color: #1A6CDB;
}

.align-left {
  margin-right: auto;
}

.align-right {
  margin-left: auto;
}

/* Переключатель для типа регистрации */
.toggle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

/* Форма */
.form-container h2 {
  text-align: center;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

input {
  width: calc(100% - 24px);
  /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--background-color);
  color: var(--text-color)
}

input:focus {
  outline: none;
  border-color: #0F4EB3;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.4);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #0F4EB3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1A6CDB;
}

.form-label {
  font-weight: bold;
  padding: 10px;
  margin: 10px;
}

.p-error {
  color: #f00;
  font-size: 0.875rem;
}

.error {
  color: #f00;
  margin-top: 1rem;
}

.map-container {
  width: 320px;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-text {
  text-align: left;
}

.radio-container {
  display: flex;
  flex-direction: column;
  /* Выровнять элементы друг под другом */
  gap: 10px;
  /* Зазор между радиокнопками */
  margin-bottom: 20px;
}

.radio-item {
  display: flex;
  align-items: right;
  /* Выровнять радиокнопку и текст по центру */
}

.radio-label {
  margin-left: 8px;
  /* Отступ между радиокнопкой и текстом */
}

.organization-select select {
  padding: 10px 10px;
  border-color: var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: var(--card-background-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 100%;

}

:deep(.p-password) {
  width: 100%;
  /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
}

:deep(.p-password-input) {
  width: calc(100% - 24px);
  /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--background-color);
  color: var(--text-color);
}

.org-select {
  margin-right: auto;
  width: calc(100% - 24px);
}

.city-select {
  width: calc(100% - 24px);
  margin: 10px;
}
</style>