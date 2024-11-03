import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import OrgInfo from '@/views/OrgInfo.vue';
import LoginForm from '@/views/LoginForm.vue';
import UserProfile from '@/views/UserProfile.vue';
import TheSettings from '@/views/TheSettings.vue';
import UserRecords from '@/views/UserRecords.vue';
import OrgHistory from '@/views/OrgHistory.vue';

const routes = [
  {
    path: "/login",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: '/user/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/user/settings',
    name: 'TheSettings',
    component: TheSettings,
  },
  {
    path: '/user/records',
    name: 'UserRecords',
    component: UserRecords,
  },
  {
    path: '/organization/:orgName',
    name: 'OrgInfo',
    component: OrgInfo,
    props: true,
  },
  {
    path: '/org/main',
    name: 'OrgHistory',
    component: OrgHistory,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
