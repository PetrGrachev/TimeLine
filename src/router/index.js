import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import OrgInfo from '@/views/OrgInfo.vue';
import LoginForm from '@/views/LoginForm.vue';
import UserProfile from '@/views/UserProfile.vue';
import TheSettings from '@/views/TheSettings.vue';
import UserRecords from '@/views/UserRecords.vue';
import OrgHistory from '@/views/OrgHistory.vue';

import InfoSection from '@/components/InfoSection.vue';
import EmployeesSection from '@/components/EmployeesSection.vue';
import ImagesSection from '@/components/ImagesSection.vue';
import ReviewsSection from '@/components/ReviewsSection.vue';
import ServicesSection from '@/components/ServicesSection.vue';
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
    children: [
      {
        path: 'info',
        name: 'Info',
        component: InfoSection,
      },
      {
        path: 'services',
        name: 'Services',
        component: ServicesSection,
      },
      {
        path: 'employees',
        name: 'Employees',
        component: EmployeesSection,
      },
      {
        path: 'images',
        name: 'Images',
        component: ImagesSection,
      },
      {
        path: 'reviews',
        name: 'Reviews',
        component: ReviewsSection,
      },
    ],
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
