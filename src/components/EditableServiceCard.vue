<template>
    <ServiceCard :service="service">
        <template #actions>
            <Button @click="assignEmployee">Приписать работника</Button>
            <Button @click="editService">Редактировать</Button>
            <Button @click="deleteService">Удалить</Button>
        </template>
    </ServiceCard>
</template>

<script>
import Button from 'primevue/button';
import ServiceCard from './ServiceCard.vue';
//TODO сделать приписывание сотрудников
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
        }
    },
};
</script>