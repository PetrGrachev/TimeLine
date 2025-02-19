<template>
  <h2>Настройки</h2>
  <div class="theme-switcher">
    <span>Темная тема</span>
    <InputSwitch v-model="isDarkTheme" @change="toggleTheme" />
  </div>
</template>

<script>
import InputSwitch from 'primevue/inputswitch';
export default {
  name: 'TheSettings',
  components: {
    InputSwitch,
  },
  data() {
    return {
      isDarkTheme: localStorage.getItem('theme') === 'dark',
    }
  },
  created() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
  },
  methods: {
    toggleTheme() {
      const theme = this.isDarkTheme ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('my-app-dark');
    }
  }
};
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>