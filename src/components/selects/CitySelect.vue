<template>
  <div class="card flex justify-center">
    <AutoComplete v-model="inputCity" :suggestions="filteredCities" dropdown @complete="searchCity" @blur="validateCity"
      placeholder="Выберите город" class="custom-autocomplete" />
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import russianCities from '@/data/russianCities';

export default {
  name: 'CitySelect',
  components: { AutoComplete },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cities: russianCities, // подключаем список
      filteredCities: [],
      inputCity: this.modelValue, // локальное поле
    };
  },
  watch: {
    inputCity(newVal) {
      this.$emit('update:modelValue', newVal);
    },
    modelValue(newVal) {
      this.inputCity = newVal;
    }
  },
  methods: {
    searchCity(event) {
      const query = event.query.toLowerCase();
      this.filteredCities = this.cities.filter(city =>
        city.toLowerCase().includes(query)
      );
    },
    validateCity() {
      // Очищаем значение, если оно не из списка
      if (this.inputCity && !this.cities.includes(this.inputCity)) {
        this.inputCity = '';
      }
    }
  }
};
</script>

<style scoped>
:deep(.p-autocomplete-input) {
  background-color: var(--background-color);
  color: var(--text-color);
  border-color: var(--border-color);
}

:deep(.p-autocomplete-dropdown) {
  background-color: var(--background-color);
  color: var(--text-color);
  border-color: var(--border-color)
}

.custom-autocomplete {
  width: 100%;
  border-color: var(--border-color) !important;
  border-width: 2px !important;
  border-radius: 8px;
}
</style>
