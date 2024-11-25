<template>
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Создать нового сотрудника" :style="{ width: '50rem' }">
      <div class="employee-dialog-container">
        <div class="employee-photo-container">
          <FileUpload mode="basic" chooseLabel="Загрузить фото" customUpload auto @upload="handlePhotoUpload"/>
          <img v-if="localEmployee.photo" :src="localEmployee.photo" alt="Фото сотрудника" class="employee-photo-preview" />
        </div>
        <div class="employee-form-container">
            <div class="form-group">
            <label for="position" class="form-label">Должность:</label>
            <InputText v-model="localEmployee.position" placeholder="Введите должность" class="mb-4" />
          </div>
          <div class="form-group">
            <label for="name" class="form-label">ФИО:</label>
            <InputText v-model="localEmployee.name" placeholder="Введите ФИО" class="mb-4" />
          </div>
          <div class="form-group">
            <label for="workTime" class="form-label">Часы работы:</label>
            <InputText v-model="localEmployee.work_time" placeholder="Введите часы работы" class="mb-4" />
          </div>
          <div class="form-group">
            <label for="degree" class="form-label">Образование:</label>
            <InputText v-model="localEmployee.degree" placeholder="Введите образование" class="mb-4" />
          </div>
          
          
          <div class="submit-button-container">
            <Button label="Создать" @click="handleCreateEmployee" class="action-button" />
          </div>
        </div>
      </div>
    </Dialog>
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import FileUpload from 'primevue/fileupload';
  
  export default {
    name: 'EmployeeDialog',
    components: {
      Dialog,
      InputText,
      Button,
      FileUpload,
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      employee: {
        type: Object,
        default: () => ({
          position: '',
          name: '',
          work_time: '',
          degree: '',
          photo: null,
        }),
      },
    },
    data() {
      return {
        localEmployee: { ...this.employee },
      };
    },
    watch: {
      employee: {
        immediate: true,
        handler(newVal) {
          this.localEmployee = { ...newVal };
        },
      },
    },
    methods: {
      handlePhotoUpload(event) {
        const file = event.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.localEmployee.photo = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      handleCreateEmployee() {
        this.$emit('create-employee', this.localEmployee);
        this.resetDialog();
      },
      resetDialog() {
        this.localEmployee = {
          position: '',
          name: '',
          work_time: '',
          degree: '',
          photo: null,
        };
        this.$emit('update:isVisible', false);
      },
    },
  };
  </script>
  
  <style scoped>
  .employee-dialog-container {
    display: flex;
    gap: 20px;
  }
  
  .employee-photo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .employee-photo-preview {
    margin-top: 10px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .employee-form-container {
    flex: 1;
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
  </style>
  