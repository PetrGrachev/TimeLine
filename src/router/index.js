import { createRouter, createWebHistory } from 'vue-router';
//user
import MainPage from '@/views/user/MainPage.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import UserRecords from '@/views//user/UserRecords.vue';

import OrgInfo from '@/views/OrgInfo.vue';
import TheSettings from '@/views/user/TheSettings.vue';
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
//org
import OrgRecords from '../views/org/OrgRecords.vue';
import OrgStatistics from '../views/org/OrgStatistics.vue';
import OrgShedule from '../views/org/OrgShedule.vue';
import TheOrgSettings from '../views/org/TheOrgSettings.vue';
import OrgProfile from '../views/org/OrgProfile.vue';
const routes = [
  {
    path: "/auth",
    name: "LoginForm",
    component: LoginForm,
    redirect: '/auth/login',
    children: [
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
    redirect: '/organization/:orgName/info',
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
    name: 'OrgMainPage',
    component: OrgRecords,
  },
  {
    path: '/org/profile',
    name: 'OrgProfile',
    component: OrgProfile,
  },
  {
    path: '/org/settings',
    name: 'TheOrgSettings',
    component: TheOrgSettings,
  },
  {
    path: '/org/shedule',
    name: 'OrgShedule',
    component: OrgShedule,
  },
  {
    path: '/org/statistics',
    name: 'OrgStatistics',
    component: OrgStatistics,
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
