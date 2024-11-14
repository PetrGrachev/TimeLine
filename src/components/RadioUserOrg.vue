<template>
    <div class="radio-container">
      <div class="radio-item">
        <RadioButton v-model="localValue" inputId="ingredient1" name="userOrg" :value="false" :pt="radioStyles" />
        <label for="ingredient1" class="radio-label">Клиент</label>
      </div>
      <div class="radio-item">
        <RadioButton v-model="localValue" inputId="ingredient2" name="userOrg" :value="true" :pt="radioStyles" />
        <label for="ingredient2" class="radio-label">Организация</label>
      </div>
    </div>
  </template>
  
  <script>
  import RadioButton from 'primevue/radiobutton';
  
  export default {
    components: {
      RadioButton,
    },
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        localValue: this.modelValue,
        radioStyles: {
          box: {
            style: {
              'border-color': '#1A6CDB', // Синий цвет рамки радиокнопки
              'background-color': '#1A6CDB',
            },
          },
          icon: {
            style: {
              'color': '#1A6CDB', // Синий цвет для иконки внутри радиокнопки
            },
          }
        },
      };
    },
    watch: {
      // Синхронизация локального значения с изменениями в prop
      modelValue(newVal) {
        this.localValue = newVal;
      },
      // Синхронизация родительского компонента с изменениями в локальном значении
      localValue(newVal) {
        this.$emit('update:modelValue', newVal);
      },
    },
  };
  </script>
  
  <style scoped>
  .radio-container {
    display: flex;
    flex-direction: column; /* Выровнять элементы друг под другом */
    gap: 10px; /* Зазор между радиокнопками */
    margin-bottom: 20px;
  }
  
  .radio-item {
    display: flex;
    align-items: center; /* Выровнять радиокнопку и текст по центру */
  }
  
  .radio-label {
    margin-left: 8px; /* Отступ между радиокнопкой и текстом */
  }
  </style>
  