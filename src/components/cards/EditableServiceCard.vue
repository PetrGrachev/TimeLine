<template>
    <ServiceCard :service="service">
        <template #actions>
            <div class="button-group">
                <button @click="assignEmployee" class="action-button">Назначить работника</button>
                <button @click="unsignEmployee" class="action-button">Убрать работника</button>
                <button @click="editService" class="action-button">Редактировать</button>
                <button @click="deleteService" class="action-button">Удалить</button>
            </div>
        </template>
    </ServiceCard>
</template>

<script>
import ServiceCard from './ServiceCard.vue';
export default {
    components: {
        ServiceCard,
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
    transition: background-color 0.3s ease;
    background-color: #0F4EB3;
    color: white;
    text-align: center;
}

/* Эффект при наведении */
.action-button:hover {
    background-color: #1A6CDB;
}
</style>
