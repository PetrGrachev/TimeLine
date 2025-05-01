<template>
  <Toast ref="toast" />
  <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal header="Запись на услугу"
    :style="{ width: '30rem' }" @hide="resetDialog">
    <div class="booking-form">
      <div :class="['form-group', { 'error': showErrors && !selectedEmployee }]">
        <label for="employee" class="form-label">Выберите работника</label>
        <Dropdown v-model="selectedEmployee" :options="employees" optionLabel="name" placeholder="Выберите работника"
          class="mb-4" :pt="dropdownPt"></Dropdown>
      </div>
      <div :class="['form-group', { 'error': showErrors && !selectedDate }]">
        <label for="date" class="form-label">Выберите дату</label>
        <Calendar v-model="selectedDate" showIcon placeholder="Выберите дату" class="mb-4" :pt="calendarPt"></Calendar>
      </div>
      <div :class="['form-group', { 'error': showErrors && !selectedSlot }]">
        <label for="time" class="form-label">Выберите время</label>
        <div class="time-slot-grid">
          <button v-for="slot in filteredSlots" :key="slot.date + slot.begin"
            :class="['time-slot', { 'selected': selectedSlot.begin === slot.begin, 'disabled': slot.busy }]"
            @click="selectTime(slot)" :disabled="slot.busy">
            {{ slot.begin }}
          </button>
        </div>
      </div>
      <div class="form-group">
        <h3 class="service-name">{{ service.name }}</h3>
        <p class="service-price"><strong>{{ service.cost }} ₽</strong></p>
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
import Toast from 'primevue/toast';
import { getServiceWorkers } from '../../api/servicesApi';
import { getSlots } from '../../api/slotsApi';
import { addRecord } from '../../api/recordsApi';


export default {
  name: 'BookingDialog',
  components: {
    Dialog,
    Dropdown,
    Calendar,
    Toast,
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
      selectedSlot: {},
      employees: [],
      filteredSlots: [],
      slots: [],
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
  watch: {
    visible(newValue) {
      if (newValue) {

        getServiceWorkers(this.service.org_id, this.service.service_id)
          .then((workers) => {
            this.employees = workers.map(worker => ({
              ...worker,
              name: `${worker.first_name} ${worker.last_name}`, // Добавляем свойство name
            }));
          })
          .catch(error => {
            console.error('Ошибка при получении работников:', error);
          });
      }
    },
    selectedEmployee(newVal) {

      getSlots(this.service.org_id, newVal.worker_id)
        .then((slots) => {
          this.slots = slots
            .sort((a, b) => a.begin.localeCompare(b.begin))
            .map(slot => ({
              ...slot,
              begin: slot.begin
            }));
        })
        .catch(error => {
          console.error('Ошибка при получении слотов:', error);
        });
    },
    selectedDate(newVal) {
      console.log(newVal);

      const selectedDate = newVal.getFullYear() +
        '-' +
        String(newVal.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(newVal.getDate()).padStart(2, '0');

      console.log("Преобразованная дата:", selectedDate);

      this.filteredSlots = this.slots.filter(slot => slot.date.trim() === selectedDate.trim());

      console.log("Совпадающие слоты:", this.filteredSlots);
    }
  },

  methods: {
    resetDialog() {
      this.$emit('update:visible', false);
      this.showErrors = false;
    },
    bookService() {
      if (!this.selectedEmployee || !this.selectedDate || !this.selectedSlot) {
        this.showErrors = true;
      } else {
        const id = localStorage.getItem('id');
        console.log(this.selectedEmployee);

        addRecord(this.selectedEmployee.org_id, this.service.service_id, this.selectedSlot.slot_id, id, this.selectedEmployee.worker_id)
          .then(() => {
            this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Запись создана', life: 3000 });
            this.resetDialog();
          })
          .catch(error => {
            console.error('Ошибка при создании записи:', error);
          });


      }
    },
    selectTime(slot) {
      this.selectedSlot = slot;
    }
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
  font-size: 16px;
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

.time-slot-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.time-slot {
  padding: 10px;
  border: 1px solid #0F4EB3;
  background-color: #ffffff;
  color: #0F4EB3;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.time-slot.selected {
  background-color: #0F4EB3;
  color: #ffffff;
}

.time-slot.disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  pointer-events: none;
}

.time-slot:hover {
  background-color: #e6e6e6;
}

.error .form-label {
  color: red;
}
</style>