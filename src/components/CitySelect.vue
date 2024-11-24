<template>
    <div class="card flex justify-center">
        <AutoComplete 
          v-model="selectedCity"
          dropdown
          :suggestions="filteredCities"
          @complete="searchCity"
          placeholder="Выберите город"
          class="custom-autocomplete"
        />
    </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';

export default {
  name: 'CitySelect',
  components: {
    AutoComplete,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cities: [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Казань',
        'Нижний Новгород',
        'Челябинск',
        'Самара',
        'Омск',
        'Ростов-на-Дону',
      ],
      filteredCities: [],
    };
  },
  computed: {
    selectedCity: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    searchCity(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCities = [...this.cities];
                } else {
                    this.filteredCities = this.cities.filter((city) => {
                        return city.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
  },
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
