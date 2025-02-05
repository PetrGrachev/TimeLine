<template>
    <Toast ref="toast" />
    <h2>Сотрудники</h2>
    <div class="employees-list">
        <EditableEmployeeCard v-for="employee in employees" :key="employee.worker_id" :employee="employee"
            @delete="confirmDelete(employee)" @edit="editDialog" />
    </div>

    <!-- Карточка добавления нового работника -->
    <div class="employee-card add-employee-card" @click="createDialog">
        <div class="add-employee-content">
            <span>+</span>
            <p>Добавить работника</p>
        </div>
    </div>

    <!-- Диалог для добавления/редактирования сотрудника -->
    <EmployeeDialog :isVisible="isVisible" :employee="editableEmployee" :isEditing="isEditing"
        @update:isVisible="isVisible = $event" @create-employee="createEmployee" @update-employee="updateEmployee" />

    <!-- Диалог подтверждения удаления -->
    <DeletionDialog :visible="isDeleteDialogVisible" text="Вы уверены, что хотите удалить этого сотрудника?"
        @update:visible="isDeleteDialogVisible = $event" @yes="deleteEmployee" @no="isDeleteDialogVisible = false" />
</template>

<script>
import Toast from 'primevue/toast';
import { createWorker, deleteWorker, getWorkers, updateWorker } from '../../../api/workersApi';
import EmployeeDialog from '../../../components/dialog/EmployeeDialog.vue';
import EditableEmployeeCard from '../../../components/cards/EditableEmployeeCard.vue';
import DeletionDialog from '../../../components/dialog/DeletionDialog.vue';

export default {
    components: {
        EmployeeDialog,
        EditableEmployeeCard,
        Toast,
        DeletionDialog
    },
    data() {
        return {
            isVisible: false,
            employees: [],
            editableEmployee: null,
            isEditing: false,
            editableId: 0,
            isDeleteDialogVisible: false, // Для диалога удаления
            employeeToDelete: null, // Храним сотрудника, которого хотим удалить
        }
    },
    mounted() {
        this.loadEmployees();
    },
    methods: {
        loadEmployees() {
            const id = localStorage.getItem('id');
            getWorkers(id, 100, 1)
                .then(data => {
                    this.employees = data.workers;
                })
                .catch(error => {
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при получении работников', life: 3000 });
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
        confirmDelete(employee) {
            this.employeeToDelete = employee; // Сохраняем сотрудника для удаления
            this.isDeleteDialogVisible = true; // Открываем окно подтверждения
        },
        deleteEmployee() {
            if (!this.employeeToDelete) return;

            deleteWorker(this.employeeToDelete.org_id, this.employeeToDelete.worker_id)
                .then(() => {
                    this.loadEmployees();
                    this.$toast.add({ severity: 'info', summary: 'Успех', detail: 'Сотрудник успешно удален', life: 3000 });
                })
                .catch(error => {
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при удалении работника', life: 3000 });
                    console.error("Ошибка:", error.message);
                })
                .finally(() => {
                    this.isDeleteDialogVisible = false; // Закрываем модалку
                    this.employeeToDelete = null; // Очищаем данные
                });
        },
        editDialog(employee) {
            this.editableId = employee.worker_id;
            this.editableEmployee = employee;
            this.isEditing = true;
            this.openDialog();
        },
        createEmployee(employee) {
            const id = localStorage.getItem('id');
            createWorker(id, employee)
                .then(() => {
                    this.loadEmployees();
                    this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Сотрудник успешно создан', life: 3000 });
                })
                .catch(error => {
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при создании работника', life: 3000 });
                    console.error("Ошибка:", error.message);
                });
        },
        updateEmployee(employee) {
            const id = localStorage.getItem('id');
            updateWorker(id, this.editableId, employee)
                .then(() => {
                    this.loadEmployees();
                    this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Сотрудник успешно обновлен', life: 3000 });
                })
                .catch(error => {
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при обновлении работника', life: 3000 });
                    console.error("Ошибка:", error.message);
                });
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

.add-employee-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 200px;
    /* Фиксированная высота карточки */
    width: 100%;
    /* Можно задать фиксированную ширину или оставить 100% */
    margin-top: 10px;
}

.add-employee-card:hover {
    background-color: #e0e0e0;
}

.add-employee-content span {
    font-size: 2rem;
    color: #007bff;
}

.add-employee-content p {
    margin-top: 8px;
    font-size: 1rem;
    color: #333;
}
</style>