import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import OrgInfo from '@/views/OrgInfo.vue';
import LoginForm from '@/views/LoginForm.vue';
import UserProfile from '@/views/UserProfile.vue';
import TheSettings from '@/views/TheSettings.vue';
import UserRecords from '@/views/UserRecords.vue';
import OrgHistory from '@/views/OrgHistory.vue';
import ErrorPage from '@/views/ErrorPage.vue';

import InfoSection from '@/components/InfoSection.vue';
import EmployeesSection from '@/components/EmployeesSection.vue';
import ImagesSection from '@/components/ImagesSection.vue';
import ReviewsSection from '@/components/ReviewsSection.vue';
import ServicesSection from '@/components/ServicesSection.vue';

import TheLogin from '@/components/TheLogin.vue';
import TheRegistration from '@/components/TheRegistration.vue';
const routes = [
  {
    path: "/auth",
    name: "LoginForm",
    component: LoginForm,
    children: [
      {
        path: '',
        name: 'Login',
        component: TheLogin,
      },
      {
        path: 'login',
        name: 'Login',
        component: TheLogin,
      },
      {
        path: 'registration/user',
        name: 'RegistrationUser',
        component: TheRegistration,
        
      },
      {
        path: 'registration/org',
        name: 'RegistrationOrg',
        component: TheRegistration,
        
      },
    ],
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
        path: '',
        name: 'OrgInfo',
        component: InfoSection, // По умолчанию загружаем InfoSection
      },
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
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ErrorPage,
    props: {
      errorCode: 404,
      errorMessage: 'Страница не найдена',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
