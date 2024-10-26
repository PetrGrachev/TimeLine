<template>
  <div id="app">
    <Navigation v-if="showNavigation" />
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Navigation from '@/components/Navigation.vue';
import { computed } from 'vue';

export default {
  components: {
    Navigation,
  },
  setup() {
    const route = useRoute(); // Получаем информацию о текущем маршруте
    const showNavigation = computed(() => {
      const excludedRoutes = ['LoginForm']; // Имена маршрутов, где навигация не должна отображаться
      return !excludedRoutes.includes(route.name);
    });

    return {
      showNavigation,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>