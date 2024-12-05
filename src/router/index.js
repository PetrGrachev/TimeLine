import { createRouter, createWebHistory } from 'vue-router';
//user
import MainPage from '@/views/user/MainPage.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import UserRecords from '@/views//user/UserRecords.vue';
import MainList from '../components/MainList.vue';
import OrgsMap from '../components/OrgsMap.vue';

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

import TheOrgSettings from '../views/org/TheOrgSettings.vue';
import OrgProfile from '../views/org/OrgProfile.vue';
import OrgManaging from '../views/org/OrgManaging.vue';
import EmployeeManaging from '../views/org/managing/EmployeeManaging.vue';
import ServicesManaging from '../views/org/managing/ServicesManaging.vue';
import ScheduleManaging from '../views/org/managing/ScheduleManaging.vue';
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
    redirect: '/user/main/list',
    children: [
      {
        path: 'list',
        name: 'MainList',
        component: MainList,

      },
      {
        path: 'map',
        name: 'OrgsMap',
        component: OrgsMap,
        props: (route) => ({
          lat: route.query.lat,
          lng: route.query.lng,
          zoom: route.query.zoom
        }),
      },
    ],
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
    path: '/organization/:id',
    name: 'OrgInfo',
    component: OrgInfo,
    props: true,
    redirect: to => `/organization/${to.params.id}/info`,
    children: [
      {
        path: 'info',
        name: 'Info',
        component: InfoSection,
        props: true,
      },
      {
        path: 'services',
        name: 'Services',
        component: ServicesSection,
        props: true,
      },
      {
        path: 'employees',
        name: 'Employees',
        component: EmployeesSection,
        props: true,
      },
      {
        path: 'images',
        name: 'Images',
        component: ImagesSection,
        props: true,
      },
      {
        path: 'reviews',
        name: 'Reviews',
        component: ReviewsSection,
        props: true,
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
    path: '/org/managing',
    name: 'OrgManaging',
    component: OrgManaging,
    redirect: '/org/managing/employees',
    children: [
      {
        path: 'employees',
        name: 'EmployeeManaging',
        component: EmployeeManaging,
      },
      {
        path: 'services',
        name: 'ServicesManaging',
        component: ServicesManaging,

      },
      {
        path: 'schedule',
        name: 'ScheduleManaging',
        component: ScheduleManaging,

      },
    ],
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
