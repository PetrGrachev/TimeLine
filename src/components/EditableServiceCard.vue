<template>
    <ServiceCard :service="service">
        <template #actions>
            <Button @click="AssignEmployee">Добавить работника</Button>
            <Button @click="editService">Редактировать</Button>
            <Button @click="deleteService">Удалить</Button>
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

    },
};
</script>