<template>
    <div class="services-grid">
        <!-- Карточки услуг -->
        <div v-for="(service, index) in services" :key="index" class="service-card">
            <EditableServiceCard :service="service" />
        </div>

        <!-- Карточка добавления новой услуги -->
        <div class="service-card add-service-card" @click="addNewService">
            <div class="add-service-content">
                <span>+</span>
                <p>Добавить услугу</p>
            </div>
        </div>
    </div>
</template>


<script>
import { getServices } from '../../../api/servicesApi';
import EditableServiceCard from '../../../components/EditableServiceCard.vue';
//TODO сделать нормальный стиль для кнопки +
export default {
    components: {
        EditableServiceCard,
    },
    data() {
        return {
            isVisible: false,
            services: [],
        }
    },
    mounted() {
        const id = localStorage.getItem('id');
        getServices(id)
            .then(services => {
                this.services = services;
                console.log(this.services)
            })
            .catch(error => {
                console.error('Ошибка при получении услуг:', error);
            });
    },
    methods: {

    },
}
</script>
<style scoped>
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}



.top-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.top-nav button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: var(--input-background-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
    background-color: #0F4EB3;
    color: var(--input-background-color);
}

.top-nav button:hover {
    background-color: var(--button-hover);
}

.add-service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-service-card:hover {
    background-color: #e0e0e0;
}

.add-service-content span {
    font-size: 2rem;
    color: #007bff;
}

.add-service-content p {
    margin-top: 8px;
    font-size: 1rem;
    color: #333;
}
</style>