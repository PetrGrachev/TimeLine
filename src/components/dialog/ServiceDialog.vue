<template>
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Создать новую услугу"
        :style="{ width: '50rem' }">
        <div class="service-dialog-container">
            <div class="service-form-container">
                <!-- Название услуги -->
                <div class="form-group">
                    <label for="name" class="form-label">Название:</label>
                    <InputText v-model="localService.name" placeholder="Введите название услуги" class="mb-4" />
                </div>

                <!-- Описание услуги -->
                <div class="form-group">
                    <label for="description" class="form-label">Описание:</label>
                    <Textarea v-model="localService.description" placeholder="Введите описание услуги" rows="4"
                        class="mb-4" />
                </div>

                <!-- Цена услуги -->
                <div class="form-group">
                    <label for="price" class="form-label">Цена:</label>
                    <InputNumber v-model="localService.cost" mode="currency" currency="USD" locale="en-US"
                        placeholder="Введите цену" class="mb-4" />
                </div>

                <!-- Кнопка для создания услуги -->
                <div class="submit-button-container">
                    <Button :label="buttonLabel" @click="handleCreateService" class="action-button" />
                </div>
            </div>
        </div>
    </Dialog>
</template>


<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
//TODO Сделать нормально по визуалу
export default {
    name: 'EmployeeDialog',
    components: {
        Dialog,
        InputText,
        Button,
        Textarea,
        InputNumber,
    },
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        service: {
            type: Object,
            default: () => ({
                name: '',
                description: '',
                cost: '',
            }),
        },
        isEditing: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            localService: { ...this.service },
        };
    },
    computed: {
        buttonLabel() {
            return this.isEditing ? "Сохранить" : "Создать"; // Возвращает текст кнопки
        },
    },
    watch: {
        service: {
            immediate: true,
            handler(newVal) {
                this.localService = { ...newVal };
            },
        },
    },
    methods: {
        handleCreateService() {
            if (this.isEditing) {
                this.$emit('update-service', this.localService);
            }
            else {
                this.$emit('create-service', this.localService);
            }
            this.resetDialog();
        },
        resetDialog() {
            this.localService = {
                name: '',
                description: '',
                cost: '',
            };
            this.$emit('update:isVisible', false);
        },
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
}

.form-group {
    margin-bottom: 16px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.mb-4 {
    margin-bottom: 16px;
}

.submit-button-container {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    width: 120px;
}
</style>