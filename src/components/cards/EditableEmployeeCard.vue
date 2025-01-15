<template>
    <EmployeeCard :employee="employee">
        <template #actions>
            <Button @click="editEmployee">Редактировать</Button>
            <Button @click="deleteEmployee">Удалить</Button>
        </template>
    </EmployeeCard>
</template>

<script>
import Button from 'primevue/button';
import EmployeeCard from '@/components/cards/EmployeeCard.vue';


export default {
    components: {
        EmployeeCard,
        Button
    },
    props: {
        employee: {
            type: Object,
            required: true,
        },
    },
    methods: {
        editEmployee() {
            this.$emit('edit', this.employee)

        },
        deleteEmployee() {
            this.$emit('delete', this.employee)

        },
    },
};
</script>