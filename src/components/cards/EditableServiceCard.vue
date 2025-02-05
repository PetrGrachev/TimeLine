<template>
    <ServiceCard :service="service">
        <template #actions>
            <div class="button-group">
                <Button @click="assignEmployee" class="action-button">Назначить работника</Button>
                <Button @click="unsignEmployee" class="action-button">Убрать работника</Button>
                <Button @click="editService" class="action-button">Редактировать</Button>
                <Button @click="deleteService" class="action-button">Удалить</Button>
            </div>
        </template>
    </ServiceCard>
</template>

<script>
import Button from 'primevue/button';
import ServiceCard from './ServiceCard.vue';
export default {
    components: {
        ServiceCard,
        Button,
    },
    props: {
        service: {
            type: Object,
            required: true,
        },
    },
    methods: {
        editService() {
            this.$emit('edit', this.service);
        },
        deleteService() {
            this.$emit('delete', this.service);
        },
        assignEmployee() {
            this.$emit('assign', this.service);
        },
        unsignEmployee() {
            this.$emit('unsign', this.service);
        }
    },
};
</script>

<style scoped>
.button-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* Две кнопки в одной строке */
    gap: 10px;
    /* Промежутки между кнопками */
    width: 100%;
    margin-top: 15px;
}

/* Стиль для кнопок */
.action-button {
    width: 100%;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    background-color: #0F4EB3;
    color: white;
    text-align: center;
}

/* Эффект при наведении */
.action-button:hover {
    background-color: #1A6CDB;
    transform: scale(1.05);
}
</style>
