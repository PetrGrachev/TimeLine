<template>
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Назначить услугу"
        :style="{ width: '50rem' }">
        <div class="service-dialog-container">
            <div class="service-form-container">

                <div class="form-group">
                    <label for="employee" class="form-label">
                        <i :class="isUnsigning ? 'fas fa-user-minus' : 'fas fa-user-plus'"></i>
                        {{ isUnsigning ? 'Убрать работника с услуги' : 'Назначить услугу' }} "{{ service.name }}":
                    </label>
                    <Dropdown v-model="selectedEmployee" :options="employees" optionLabel="name"
                        placeholder="Выберите работника" class="input-field"></Dropdown>
                </div>

                <div class="submit-button-container">
                    <Button label="Сохранить" @click="handleAssign" class="action-button" />
                </div>
            </div>
        </div>
    </Dialog>
</template>


<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { getWorkers } from '../../api/workersApi';
import { getServiceWorkers } from '../../api/servicesApi';
export default {
    name: 'EmployeeDialog',
    components: {
        Dialog,
        Dropdown,
        Button,
    },
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        service: {
            type: Object,
            required: true,
        },
        isUnsigning: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            employees: [],
            selectedEmployee: null,
        };
    },
    watch: {
        isVisible(newValue) {
            if (newValue) {
                if (this.isUnsigning) {
                    this.loadSignedEmployees();
                }
                else {
                    this.loadEmployees();
                }
            }
        },
    },

    methods: {
        handleAssign() {
            console.log(this.selectedEmployee);
            if (this.selectedEmployee) {
                if (this.isUnsigning) {
                    this.$emit('unsign', this.selectedEmployee);
                }
                else {
                    this.$emit('assign', this.selectedEmployee);
                }
            }
            this.resetDialog();
        },
        resetDialog() {
            this.$emit('update:isVisible', false);
        },
        loadEmployees() {
            const id = localStorage.getItem('id');
            getWorkers(id, 100, 1)
                .then(data => {
                    getServiceWorkers(id, this.service.service_id)
                        .then(serviceWorkers => {
                            // Фильтрация работников
                            const filteredWorkers = data.workers.filter(worker => {
                                return !serviceWorkers.some(serviceWorker => serviceWorker.worker_id === worker.worker_id);
                            });

                            // Преобразование работников для Dropdown
                            this.employees = filteredWorkers.map(worker => ({
                                ...worker,
                                name: `${worker.first_name} ${worker.last_name}`, // Добавляем свойство name
                            }));
                        })
                        .catch(error => {
                            console.error('Ошибка при получении serviceWorkers:', error);
                        });
                })
                .catch(error => {
                    console.error('Ошибка при получении workers:', error);
                });
        },
        loadSignedEmployees() {
            const id = localStorage.getItem('id');
            getServiceWorkers(id, this.service.service_id)
                .then(serviceWorkers => {
                    // Преобразование работников для Dropdown
                    this.employees = serviceWorkers.map(worker => ({
                        ...worker,
                        name: `${worker.first_name} ${worker.last_name}`, // Добавляем свойство name
                    }));
                })
                .catch(error => {
                    console.error('Ошибка при получении serviceWorkers:', error);
                });
        }
    },
};
</script>

<style scoped>
.service-dialog-container {
    padding: 16px;
}

.service-form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: bold;
}

.input-field {
    width: 100%;
}

.submit-button-container {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    width: 120px;
}
</style>
