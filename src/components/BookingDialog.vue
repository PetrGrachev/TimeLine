<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal header="Запись на услугу" :style="{ width: '30rem' }" @hide="resetDialog">
      <div class="booking-form">
        <div :class="['form-group', { 'error': showErrors && !selectedEmployee }]">
          <label for="employee" class="form-label">Выберите работника</label>
          <Dropdown v-model="selectedEmployee" :options="employees" optionLabel="name" placeholder="Выберите работника" class="mb-4" :pt="dropdownPt"></Dropdown>
        </div>
        <div :class="['form-group', { 'error': showErrors && !selectedDate }]">
          <label for="date" class="form-label">Выберите дату</label>
          <Calendar v-model="selectedDate" showIcon placeholder="Выберите дату" class="mb-4" :pt="calendarPt"></Calendar>
        </div>
        <div :class="['form-group', { 'error': showErrors && !selectedTime }]">
          <label for="time" class="form-label">Выберите время</label>
          <Dropdown v-model="selectedTime" :options="availableTimes" placeholder="Выберите время" class="mb-4" :pt="dropdownPt"></Dropdown>
        </div>
        <div class="form-group">
          <h3 class="service-name">{{ service.name }}</h3>
          <p class="service-price"><strong>{{ service.price }} ₽</strong></p>
        </div>
        <div class="submit-button-container">
          <button @click="bookService" class="action-button">Записаться</button>
        </div>
      </div>
    </Dialog>
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  import Dropdown from 'primevue/dropdown';
  import Calendar from 'primevue/calendar';
  export default {
    name: 'BookingDialog',
    components: {
      Dialog,
      Dropdown,
      Calendar,
    },
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      service: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedEmployee: null,
        selectedDate: null,
        selectedTime: null,
        employees: [
          { name: 'Магомед Магомедов' },
          { name: 'Ахмед Ахмедов' },
          { name: 'Саид Саидов' },
        ],
        availableTimes: [
          '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ],
        dropdownPt: {
          root: {
            style: {
              'border-color': '#0F4EB3',
            },
          },
          trigger: {
            style: {
              color: '#0F4EB3',
            },
          },
        },
        calendarPt: {
          input: {
            style: {
              'border-color': '#0F4EB3',
            },
          },
          button: {
            style: {
              color: '#0F4EB3',
            },
          },
        },
        showErrors: false,
      };
    },
    methods: {
      resetDialog() {
        this.$emit('update:visible', false);
        this.selectedEmployee = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.showErrors = false;
      },
      bookService() {
        if (!this.selectedEmployee || !this.selectedDate || !this.selectedTime) {
          this.showErrors = true;
        } else {
          console.log('Записаться на услугу:', this.service.name, 'с работником:', this.selectedEmployee?.name, 'на дату:', this.selectedDate, 'время:', this.selectedTime);
          this.resetDialog();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .booking-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 10px;
  }
  
  .service-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .service-price {
    font-size: 18px;
    font-weight: bold;
    color: #0F4EB3;
    margin-bottom: 20px;
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
  
  .p-dropdown .p-inputtext,
  .p-calendar .p-inputtext {
    border-color: #0F4EB3 !important; /* Синий цвет обводки */
  }
  
  .p-dropdown .p-dropdown-trigger,
  .p-calendar .p-datepicker-trigger {
    color: #0F4EB3 !important; /* Синий цвет иконок */
  }
  
  .error .p-inputtext {
    border-color: red !important;
  }
  
  .error .p-dropdown-trigger,
  .error .p-datepicker-trigger {
    color: red !important;
  }
  </style>
  