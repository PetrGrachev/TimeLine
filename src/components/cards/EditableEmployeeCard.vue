<template>
    <Toast ref="toast" />
    <EmployeeCard :employee="employee">
        <template #avatar>
            <EditableUserAvatar :uuid="employee.uuid" :name="employee.first_name" @upload="handlePhotoUpload"
                @delete="handlePhotoDelete" class="form-avatar" />
        </template>
        <template #actions>
            <Button @click="editEmployee">Редактировать</Button>
            <Button @click="deleteEmployee">Удалить</Button>
        </template>
    </EmployeeCard>
</template>

<script>
import Button from 'primevue/button';
import EmployeeCard from '@/components/cards/EmployeeCard.vue';
import EditableUserAvatar from '../EditableUserAvatar.vue';
import { deleteMedia, uploadMedia } from '../../api/mediaApi';
import Toast from 'primevue/toast';


export default {
    components: {
        EmployeeCard,
        Button,
        EditableUserAvatar,
        Toast,
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
        handlePhotoUpload(file) {
            this.avatarUrl = URL.createObjectURL(file);
            uploadMedia("worker", this.employee.worker_id, file)
                .then(() => {
                    this.$refs.toast.add({ severity: 'success', summary: 'Аватар загружен', life: 3000 });
                    this.$emit('update-photo')
                })
                .catch(error => {
                    console.error('Ошибка при загрузки изображения:', error);
                });
        },
        handlePhotoDelete(uuid) {
            deleteMedia(uuid, "worker")
                .then(() => {
                    this.$refs.toast.add({ severity: 'info', summary: 'Аватар удален', life: 3000 });
                    this.$emit('update-photo')
                })
                .catch(error => {
                    console.error('Ошибка при удалении изображения:', error);
                });
        }
    },
};
</script>

<style scoped>
.form-avatar {
    margin-right: 10px;
}
</style>