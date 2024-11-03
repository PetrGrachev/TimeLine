<template>
    <!-- Section: Services -->
    <section id="services" class="section-container">
        <h2>Услуги</h2>
        <!-- Перебираем каждую услугу из списка services и выводим информацию -->
        <div class="services-grid">
            <div v-for="(service, index) in services" :key="index" class="service-card" @click="openBooking(service)" @mouseover="hoverService" @mouseleave="leaveService">
                <h3 class="service-name">{{ service.name }}</h3>
                <p class="service-description">{{ service.description }}</p>
                <p class="service-price"><strong>{{ service.price }} ₽</strong></p>
            </div>
        </div>
    </section>
    
    <!-- Компонент для модального окна записи -->
    <BookingDialog :visible="isBookingDialogVisible" :service="selectedService" @update:visible="isBookingDialogVisible = $event" />
</template>

<script>
import BookingDialog from '@/components/BookingDialog.vue';
export default {
    name: 'ServicesSection',
    components: {
        BookingDialog,
    },
    data() {
        return {
            services: [
                { 
                    name: 'Стрижка', 
                    price: 1500, 
                    description: 'Классическая мужская стрижка с укладкой.'
                },
                { 
                    name: 'Бритье', 
                    price: 800, 
                    description: 'Классическое бритье с горячим полотенцем.'
                },
                { 
                    name: 'Окрашивание волос', 
                    price: 2500, 
                    description: 'Окрашивание волос по вашему выбору.'
                },
                { 
                    name: 'Массаж головы', 
                    price: 500, 
                    description: 'Расслабляющий массаж головы перед стрижкой.'
                },
            ],
            isBookingDialogVisible: false,
            selectedService: null,
        };
    },
    methods: {
        openBooking(service) {
            this.selectedService = service;
            this.isBookingDialogVisible = true;
        },
        hoverService(event) {
            event.currentTarget.style.backgroundColor = '#f0f0f0';
        },
        leaveService(event) {
            event.currentTarget.style.backgroundColor = '#ffffff';
        },
    },
};
</script>

<style scoped>
/* General section styles */
.section-container {
    padding: 20px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Services grid */
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* Service card */
.service-card {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.service-card:hover {
    background-color: #f0f0f0;
}

.service-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.service-description {
    font-size: 14px;
    margin-bottom: 10px;
    color: #555;
}

.service-price {
    font-size: 16px;
    font-weight: bold;
    color: #0F4EB3;
}
</style>
