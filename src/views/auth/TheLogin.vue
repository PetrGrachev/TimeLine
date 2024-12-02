<template>
  <h2>Вход</h2>
  <RadioUserOrg v-model="isOrganization" />
  <form @submit.prevent="handleLogin">
    <div class="form-group">
      <InputText
        v-model="email"
        id="email"
        type="email"
        placeholder="Email"
        class="mb-4"
        :class="{ 'p-invalid': emailError }"
        @blur="validateEmail"
        required
      />
      <small v-if="emailError" class="p-error">Введите корректный email.</small>
    </div>
    <div class="form-group">
      <Password
        v-model="password"
        id="password"
        placeholder="Пароль"
        :feedback="false"
        :toggleMask="true"
        class="mb-4"
        :class="{ 'p-invalid': passwordError }"
        @blur="validatePassword"
        required
      />
      <small v-if="passwordError" class="p-error">Пароль должен содержать не менее 12 символов.</small>
    </div>
    <Button label="Войти" type="submit"></Button>
  </form>
  <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import RadioUserOrg from '@/components/RadioUserOrg.vue';

import { login } from '@/api/authApi';
export default {
  components: {
    InputText,
    Password,
    Button,
    RadioUserOrg,
  },
  data() {
    return {
      email: '',
      password: '',
      isOrganization: false,
      emailError: false,
      passwordError: false,
      errorMessage: '',
    };
},
methods:{
  validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.email);
    },
    validatePassword() {
      this.passwordError = this.password.length < 12;
    },
    handleLogin() {
      this.validateEmail();
      this.validatePassword();
      if (!this.emailError && !this.passwordError) {
        this.loginUser();
      }
    },
      loginUser(){
        login(this.email, this.password, this.isOrganization)
        .then(tokens => {
    console.log("Полученные токены:", tokens);
    this.$router.push({ name: 'MainPage' });
  })
  .catch(error => {
    console.error("Ошибка авторизации:", error.message);
  });
      }
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

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
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
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

input {
  width: calc(100% - 24px); /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--background-color);
  color: var(--text-color);
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
  color: var(--text-color);
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
  margin-bottom: 5px;
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
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.p-password){
  width: 100%; /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
}
:deep(.p-password-input){
  width: calc(100% - 24px); /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--background-color);
  color: var(--text-color);
}

</style>