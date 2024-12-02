<template>
    <Toast ref="toast" />
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Подтверждение" :style="{ width: '30rem' }" @hide="closeDialog">
      <div class="confirmation-container">
        <p>Отправлен код подтверждения на {{ email }}. Пожалуйста, введите 4 цифры ниже:</p>
        <InputOtp v-model="confirmationCode" class="mb-4" placeholder="Введите код" />
        <div v-if="isTimerActive" class="timer">Оставшееся время: {{ minutes }}:{{ seconds }}</div>
        <Button v-else class="resend-button" @click="resendCode">Отправить код повторно</Button>
        <div class="submit-button-container">
          <Button @click="confirmCode" class="action-button">Подтвердить</Button>
        </div>
        <div v-if="isLoading" class="loading-overlay">
          <ProgressSpinner style="width: 100px; height: 100px; z-index: 10000;" strokeWidth="8" fill="transparent"
          animationDuration=".5s" aria-label="Custom ProgressSpinner"/>
        </div>
      </div>
    </Dialog>
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  import InputOtp from 'primevue/inputotp';
  import Button from 'primevue/button';
  import Toast from 'primevue/toast';
  import ProgressSpinner from 'primevue/progressspinner';
  import { verifyCode } from '@/api/authApi';
import { sendCode } from '../../api/authApi';

  export default {
    name: 'ConfirmationDialog',
    components: {
      Dialog,
      InputOtp,
      Button,
      Toast,
      ProgressSpinner,
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
      isOrg: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        confirmationCode: '',
        minutes: 2,
        seconds: 0,
        isTimerActive: true,
        timer: null,
        internalVisible: this.isVisible,
        isLoading:false,
      };
    },
    
    mounted() {
      this.startTimer();
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          if (this.seconds === 0) {
            if (this.minutes === 0) {
              clearInterval(this.timer);
              this.isTimerActive = false;
            } else {
              this.minutes--;
              this.seconds = 59;
            }
          } else {
            this.seconds--;
          }
        }, 1000);
      },
      resendCode() {
        this.minutes = 2;
        this.seconds = 0;
        this.isTimerActive = true;
        this.startTimer();

        sendCode(this.email, this.id, this.isOrg);
        // Логика для повторной отправки кода подтверждения
        console.log('Код подтверждения отправлен повторно на', this.email);
      },
      confirmCode() {
        // Логика для подтверждения кода
        if (this.confirmationCode.length === 4) {
          console.log('Код подтверждения введён:', this.confirmationCode);
          verifyCode(this.confirmationCode, this.email, this.id, this.isOrg)
          .then(tokens => {
          console.log("Полученные токены:", tokens);

          this.isLoading = true;
          this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Вы успешно зарегистрировались!', life: 3000 });
          this.isLoading = false;
          this.$emit('update:isVisible', false);
          if (this.isOrg){
            this.$router.push({ name: 'OrgMainPage' });
          }
          else{
            this.$router.push({ name: 'MainPage' });
          }
            })
        .catch(error => {
          console.error("Ошибка авторизации:", error.message);
        });
          
         
          
        } else {
          alert('Введите 4-значный код подтверждения');
        }
      },
      closeDialog() {
        this.$emit('update:isVisible', false);
        this.internalVisible = false;
        clearInterval(this.timer);
      }
    },
    beforeUnmount() {
      clearInterval(this.timer);
    },
  };
  </script>
  
  <style scoped>
  .confirmation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .timer {
    margin-bottom: 1rem;
    font-weight: bold;
    color: #0F4EB3;
  }
  
  .resend-button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: #0F4EB3;
    color: white;
  }
  
  .action-button {
    padding: 10px 20px;
    background-color: #0F4EB3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #1A6CDB;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }
  </style>
