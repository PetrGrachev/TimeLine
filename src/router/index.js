import { createRouter, createWebHistory } from 'vue-router';
//user
import MainPage from '@/views/user/MainPage.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import UserRecords from '@/views//user/UserRecords.vue';

import OrgInfo from '@/views/OrgInfo.vue';
import TheSettings from '@/views/TheSettings.vue';
import ErrorPage from '@/views/ErrorPage.vue';
//sections
import InfoSection from '@/components/sections/InfoSection.vue';
import EmployeesSection from '@/components/sections/EmployeesSection.vue';
import ImagesSection from '@/components/sections/ImagesSection.vue';
import ReviewsSection from '@/components/sections/ReviewsSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
//auth
import TheLogin from '@/views/auth/TheLogin.vue';
import TheRegistration from '@/views/auth/TheRegistration.vue';
import LoginForm from '@/views/auth/LoginForm.vue';
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
