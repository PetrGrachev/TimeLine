import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Импортируйте роутер
import PrimeVue from 'primevue/config';
//import Aura from '@primevue/themes/aura';
import { MyPreset } from './styles/mytheme'
import ToastService from 'primevue/toastservice';
import { setRouter } from '@/api/errorHandler';
setRouter(router);

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router); // Подключите роутер к приложению
app.use(ToastService);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: '.my-app-dark',
      cssLayer: false
    }
  }
});

const themeMixin = {
  created() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'light'; // Устанавливаем светлую тему по умолчанию
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.toggle('my-app-dark');
    }
  },
  methods: {
    setTheme(theme) {
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

    }
  }
};

app.mixin(themeMixin);

app.mount('#app');
