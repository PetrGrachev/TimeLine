<template>
    <Toast ref="toast" />
    <h2>Услуги</h2>
    <div class="services-grid">
        <!-- Карточки услуг -->
        <div v-for="(service, index) in services" :key="index" class="service-card">
            <EditableServiceCard :service="service" @edit="editDialog" @delete="deleteFunc" @assign="assignDialog"
                @unsign="unsignDialog" />
        </div>

        <!-- Карточка добавления новой услуги -->
        <div class="service-card add-service-card" @click="createDialog">
            <div class="add-service-content">
                <span>+</span>
                <p>Добавить услугу</p>
            </div>
        </div>
        <ServiceDialog :isVisible="isVisible" :service="editableService" :isEditing="isEditing"
            @update:isVisible="isVisible = $event" @create-service="addService" @update-service="update" />
        <AssignDialog :isVisible="isVisibleAssign" :service="editableService" :isUnsigning="isUnsigning"
            @update:isVisible="isVisibleAssign = $event" @assign="assignEmployee" @unsign="unsignEmployee" />
    </div>
</template>


<script>

import Toast from 'primevue/toast';
import { assignWorker, createService, deleteService, getServices, unsignWorker, updateService } from '../../../api/servicesApi';
import AssignDialog from '../../../components/dialog/AssignDialog.vue';
import ServiceDialog from '../../../components/dialog/ServiceDialog.vue';
import EditableServiceCard from '../../../components/cards/EditableServiceCard.vue';
//TODO сделать нормальный стиль для кнопки +
export default {

    components: {
        EditableServiceCard,
        ServiceDialog,
        AssignDialog,
        Toast,
    },
    data() {
        return {
            isVisible: false,
            services: [],
            editableService: null,
            isEditing: false,
            editableId: 0,
            isVisibleAssign: false,
            isUnsigning: false,
        }
    },
    mounted() {
        this.loadServices();
    },
    methods: {
        loadServices() {
            const id = localStorage.getItem('id');
            getServices(id, 100, 1)
                .then(data => {
                    this.services = data.services;
                    console.log(this.services)
                })
                .catch(error => {
                    console.error('Ошибка при получении услуг:', error);
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при получении услуг', life: 3000 });
                });
        },
        createDialog() {
            this.editableService = null;
            this.isEditing = false;
            this.openDialog();
        },
        openDialog() {
            this.isVisible = true;
        },
        addService(service) {
            const id = localStorage.getItem('id');
            createService(id, service)
                .then(() => {
                    this.loadServices();
                    this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Услуга успешно похуй', life: 3000 });
                    console.log("Успешно создано");
                })
                .catch(error => {
                    console.error('Ошибка при получении услуг:', error);
                });
        },
        editDialog(service) {
            this.editableId = service.service_id;
            this.editableService = service;
            this.isEditing = true;
            this.openDialog();
        },
        update(service) {
            const id = localStorage.getItem('id');
            updateService(id, this.editableId, service)
                .then(() => {
                    this.loadServices();
                    this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Услуга успешно обновленна', life: 3000 });
                    console.log("Успешно создано");
                })
                .catch(error => {
                    console.error('Ошибка при обновлении услуг:', error);
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при обновлении услуги', life: 3000 });
                });
        },
        deleteFunc(service) {
            deleteService(service.org_id, service.service_id)
                .then(() => {
                    this.loadServices();
                    this.$toast.add({ severity: 'info', summary: 'Успех', detail: 'Услуга удалена', life: 3000 });
                })
                .catch(error => {
                    console.error('Ошибка при удалении услуги:', error);
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при удалении услуги', life: 3000 });
                });
        },
        assignDialog(service) {
            console.log("Service:", service);
            this.editableService = service;
            this.isVisibleAssign = true;
            this.isUnsigning = false;
        },
        assignEmployee(employee) {
            assignWorker(employee.org_id, employee.worker_id, this.editableService.service_id)
                .then(() => {
                    this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Работник назначен', life: 3000 });
                })
                .catch(error => {
                    console.error('Ошибка при назначении услуги:', error);
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при назначении услуги', life: 3000 });
                });
        },
        unsignDialog(service) {
            this.editableService = service;
            this.isUnsigning = true;
            this.isVisibleAssign = true;
        },
        unsignEmployee(employee) {
            unsignWorker(employee.org_id, employee.worker_id, this.editableService.service_id)
                .then(() => {
                    this.$toast.add({ severity: 'info', summary: 'Успех', detail: 'Работник откреплен', life: 3000 });
                })
                .catch(error => {
                    console.error('Ошибка при откреплении работника:', error);
                    this.$toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при откреплении работника', life: 3000 });
                });
        }
    },
};
</script>

<style scoped>
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
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

.add-service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-service-card:hover {
    background-color: #e0e0e0;
}

.add-service-content span {
    font-size: 2rem;
    color: #007bff;
}

.add-service-content p {
    margin-top: 8px;
    font-size: 1rem;
    color: #333;
}
</style>