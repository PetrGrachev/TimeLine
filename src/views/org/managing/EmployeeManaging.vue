<template>
    <div class="employees-list">
        <EditableEmployeeCard v-for="employee in employees" :key="employee.worker_id" :employee="employee"
            @delete="deleteEmployee" @edit="editDialog" />
    </div>
    <div class="plus-card">
        <button @click="createDialog">+</button>
    </div>
    <EmployeeDialog :isVisible="isVisible" :employee="editableEmployee" :isEditing="isEditing"
        @update:isVisible="isVisible = $event" @create-employee="createEmployee" @update-employee="updateEmployee" />
</template>

<script>
import { createWorker, deleteWorker, getWorkers, updateWorker } from '../../../api/workersApi';
import EmployeeDialog from '../../../components/dialog/EmployeeDialog.vue';
import EditableEmployeeCard from '../../../components/EditableEmployeeCard.vue';
//TODO сделать Toast
//TODO сделать окно с подтверждением
export default {
    components: {
        EmployeeDialog,
        EditableEmployeeCard,
    },
    data() {
        return {
            isVisible: false,
            employees: [],
            editableEmployee: null,
            isEditing: false,
            editableId: 0,
        }
    },
    mounted() {
        this.loadEmployees();
    },
    methods: {
        loadEmployees() {
            const id = localStorage.getItem('id');
            getWorkers(id)
                .then(workers => {
                    this.employees = workers;
                    console.log(this.employees)
                })
                .catch(error => {
                    console.error('Ошибка при получении работников:', error);
                });
        },
        createDialog() {
            this.editableEmployee = null;
            this.isEditing = false;
            this.openDialog();
        },
        openDialog() {
            this.isVisible = true;
        },
        createEmployee(employee) {
            const id = localStorage.getItem('id');
            createWorker(id, employee)
                .then(() => {
                    this.loadEmployees();
                    console.log("Сотрудник успешно создан");
                })
                .catch(error => {
                    console.error("Ошибка:", error.message);
                });
        },
        deleteEmployee(employee) {
            deleteWorker(employee.org_id, employee.worker_id);
            this.loadEmployees();
        },
        editDialog(employee) {
            this.editableId = employee.worker_id;
            this.editableEmployee = employee;
            this.isEditing = true;
            this.openDialog();
        },
        updateEmployee(employee) {
            const id = localStorage.getItem('id');
            updateWorker(id, this.editableId, employee);
            this.loadEmployees();
        }
    },
}
</script>
<style scoped>
.order-history {
    margin-top: 20px;
    width: 100%;
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

.plus-card {
    border-radius: 8px;
    border: 1px solid var(--border-color);
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.plus-card button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background-color: #0F4EB3;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.plus-card button:hover {
    background-color: #1A6CDB;
}
</style>