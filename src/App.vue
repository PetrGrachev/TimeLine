<template>
  <div id="app">
    <!-- Отображение соответствующей навигации -->
    <TheNavigation v-show="showUserNavigation" />
    <TheOrgNavigation v-show="showOrgNavigation" />

    <router-view />

    <!-- Отображение футера только если навигация видима -->
    <TheFooter v-show="showNavigation" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import TheNavigation from '@/components/common/TheNavigation.vue';
import TheOrgNavigation from '@/components/common/TheOrgNavigation.vue';
import TheFooter from '@/components/common/TheFooter.vue';
import '@/styles/global.css';
import '@/styles/themes-override.css';
import '@/styles/themes.css';

export default {
  components: {
    TheNavigation,
    TheOrgNavigation,
    TheFooter,
  },
  setup() {
    const route = useRoute();

    const excludedRoutes = ['Login', 'RegistrationUser', 'RegistrationOrg', 'NotFound'];
    const userRoutes = ['MainPage', 'UserProfile', 'TheSettings', 'UserRecords', 'OrgInfo', 'Info', 'Services', 'Employees', 'Images', 'Reviews', 'MainList', 'OrgsMap', 'UserReviews']; // Добавьте свои маршруты
    const orgRoutes = ['OrgMainPage', 'OrgProfile', 'TheOrgSettings', 'OrgManaging', 'OrgStatistics', 'EmployeeManaging', 'ServicesManaging', 'ScheduleManaging', 'ImagesManaging', 'OrgReviews'];

    const showNavigation = computed(() => !excludedRoutes.includes(route.name));
    const showUserNavigation = computed(() => showNavigation.value && userRoutes.includes(route.name));
    const showOrgNavigation = computed(() => showNavigation.value && orgRoutes.includes(route.name));

    return {
      showNavigation,
      showUserNavigation,
      showOrgNavigation,
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
  color: var(--text-color);
  margin-top: 20px;
}
</style>