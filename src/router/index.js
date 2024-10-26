import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import CompanyInfo from '@/views/CompanyInfo.vue';
import LoginForm from '@/views/LoginForm.vue';
import UserProfile from '@/views/UserProfile.vue';
import Settings from '@/views/Settings.vue';
import UserHistory from '@/views/UserHistory.vue';

const routes = [
  {
    path: "/",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/history',
    name: 'UserHistory',
    component: UserHistory,
  },
  {
    path: '/company/:companyName',
    name: 'CompanyInfo',
    component: CompanyInfo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
