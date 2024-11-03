import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируйте роутер
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './styles/themes-override.css';
const app = createApp(App);

app.use(router); // Подключите роутер к приложению
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
