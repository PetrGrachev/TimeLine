import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируйте роутер
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
const app = createApp(App);

app.use(router); // Подключите роутер к приложению
app.use(ToastService);
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });

app.mount('#app');
