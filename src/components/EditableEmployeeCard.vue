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
import EmployeeCard from './EmployeeCard.vue';
import { deleteWorker } from '../api/workersApi';

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
            console.log('Редактировать сотрудника:', this.employee);

        },
        deleteEmployee() {//TODO сделать emit, эту функцию перенести в orgshedule
            //TODO сделать подтверждение на удаление
            console.log('Удалить сотрудника:', this.employee);
            deleteWorker(this.employee.org_id, this.employee.worker_id);
        },
    },
};
</script>