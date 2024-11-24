<template>
  <Select
    v-model="selectedValue"
    :options="organizationOptions"
    optionLabel="label"
    optionValue="value"
    placeholder="Все организации"
    @change="handleChange"
    class="custom-select"
  />
</template>

<script>
import Select from 'primevue/select';

export default {
  name: 'OrganizationSelect',
  components: {
    Select,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return { // TODO Добавь и переименуй на: Образование, Медучреждения -> Медицина, Фитнес-клубы -> Спорт, Развлечения (аквапарки, кино),
      organizationOptions: [
        { label: 'Все организации', value: '' },
        { label: 'Парикмахерские', value: 'barbershop' },
        { label: 'Фитнес-клубы', value: 'gym' },
        { label: 'Авто-сервис', value: 'carservice' },
        { label: 'Кафе и рестораны', value: 'cafe' },
        { label: 'Медучреждения', value: 'pharmacy' },
      ],
    };
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    handleChange() {
      this.$emit('change');
    },
  },
};
</script>

<style scoped>
:deep(.p-select-dropdown) {
  background-color: var(--background-color); /* Фон select */
  color: var(--text-color); /* Цвет текста */
  border-radius: 0px;
  
}
:deep(.p-select-label) {
  background-color: var(--background-color); /* Фон select */
  color: var(--text-color); /* Цвет текста */
  border-radius: 0px;
  
}
.custom-select {
  border-color: var(--border-color) !important;
  border-width: 2px !important;
 border-radius: 8px;
}
</style>