<template>
    <div class="organization-photo-management">
        <!-- Уведомления -->
        <Toast ref="toast" />

        <!-- Выбор баннера -->
        <div class="banner-section">
            <h2>Баннер</h2>
            <div v-if="bannerUrl == null">
                <p>Выберите баннер для вашей организации. Он будет отображаться на заднем фоне страницы организации.</p>
                <FileUpload mode="basic" name="banner" accept="image/*" @select="uploadBanner" customUpload :auto="true"
                    :chooseLabel="'Выбрать баннер'" />
            </div>
            <div v-else class="banner-preview">
                <img :src="bannerUrl" alt="Предварительный просмотр баннера" />
                <Button label="Удалить баннер" icon="pi pi-trash" class="p-button-danger" @click="deleteBanner" />
            </div>
        </div>

        <!-- Добавление изображений -->
        <div class="photos-section">
            <h2>Изображения</h2>
            <p>Добавьте до 5 изображений</p>
            <FileUpload mode="basic" name="photos" accept="image/*" @select="uploadPhoto" :multiple="true" customUpload
                auto :chooseLabel="'Добавить изображение'" :disabled="photos.length >= 5" />
            <div class="photos-grid">
                <div v-for="(photo, index) in photos" :key="index" class="photo-card">
                    <img :src="photo" alt="Фото организации" class="photo-preview" />
                    <Button label="Удалить" icon="pi pi-trash" class="p-button-danger" @click="deletePhoto(index)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Toast from 'primevue/toast';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { uploadMedia } from '../../../api/mediaApi';

export default {
    components: {
        Toast,
        FileUpload,
        Button,
    },
    data() {
        return {
            bannerUrl: null, // URL для баннера
            photos: [], // Массив для фотографий
        };
    },
    methods: {

        uploadBanner(event) {
            const id = localStorage.getItem('id');
            const file = event.files[0];
            this.bannerUrl = URL.createObjectURL(file);
            uploadMedia("banner", id, file)
                .then(() => {
                    this.$refs.toast.add({ severity: 'success', summary: 'Баннер загружен', life: 3000 });

                })
                .catch(error => {
                    console.error('Ошибка при загрузки изображения:', error);
                });

        },
        deleteBanner() {
            this.bannerUrl = null;
            this.$refs.toast.add({ severity: 'info', summary: 'Баннер удалён', life: 3000 });
        },
        uploadPhoto(event) {

            const files = event.files;
            files.forEach(file => {
                console.log(this.photos)
                if (this.photos.length < 5) {
                    this.photos.push(URL.createObjectURL(file));
                    this.$refs.toast.add({ severity: 'success', summary: 'Изображение  загружено', life: 3000 });
                } else {
                    this.$refs.toast.add({ severity: 'warn', summary: 'Можно добавить не более 5 изображений', life: 3000 });
                }
            });

        },
        deletePhoto(index) {
            this.photos.splice(index, 1);
            this.$refs.toast.add({ severity: 'info', summary: 'Изображение удалено', life: 3000 });
        },
    },
};
</script>

<style scoped>
.organization-photo-management {
    padding: 20px;
}

.banner-section,
.photos-section {
    margin-bottom: 40px;
}

.banner-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.banner-preview img {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner-preview .p-button-danger {
    margin-top: 15px;
    align-self: center;
    /* Центрируем кнопку по горизонтали */
    width: fit-content;
    /* Кнопка занимает только необходимую ширину */
    padding: 10px 20px;
    /* Внутренние отступы */
    text-align: center;
}


.photos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.photo-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.photo-preview {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.p-button-danger {
    width: auto;
    align-self: stretch;
    text-align: center;
}
</style>
