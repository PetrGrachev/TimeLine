import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируйте роутер

const app = createApp(App);

app.use(router); // Подключите роутер к приложению
app.mount('#app');
