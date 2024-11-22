<template>
    <select v-model="selectedType" @change="handleChange">
              <option value="">Все организации</option>
              <option value="barbershop">Парикмахерские</option>
              <option value="gym">Фитнес-клубы</option>
              <option value="carservice">Авто-сервис</option>
              <option value="cafe">Кафе и рестораны</option>
              <option value="pharmacy">Медучреждения</option>
            </select>
</template>

<script>
export default {
  name: 'OrganizationSelect',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    selectedType: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    handleChange() {
      this.$emit('change', this.selectedType);
    },
  },
};
</script>

<style scoped>
select {
  background-color: var(--background-color); /* Фон select */
  color: var(--text-color); /* Цвет текста */
}
</style>