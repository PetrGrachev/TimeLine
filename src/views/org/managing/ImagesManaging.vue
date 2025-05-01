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
                auto :chooseLabel="'Добавить изображение'" :disabled="galleryUrls.length >= 5" />
            <div class="photos-grid">
                <div v-for="(photo, index) in galleryUrls" :key="index" class="photo-card">
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
import { deleteMedia, downloadMedia, uploadMedia } from '../../../api/mediaApi';
import { getOrg } from '../../../api/orgApi';

export default {
    components: {
        Toast,
        FileUpload,
        Button,
    },
    data() {
        return {
            org: null,
            id: 0,
            bannerUrl: null, // URL для баннера
            galleryUrls: [], // Массив для фотографий
        };
    },
    mounted() {
        this.id = localStorage.getItem('id');
        this.updateImages()
    },
    methods: {
        updateImages() {
            getOrg(this.id)
                .then((org) => {
                    this.org = org
                })
                .catch(error => {
                    console.error('Ошибка при загрузке организации:', error);
                });
            this.$watch(
                () => this.org,
                (newOrg) => {
                    if (newOrg) {
                        this.org = newOrg;
                        if (this.org.banner) {
                            downloadMedia(this.org.banner)
                                .then(({ blob, type }) => {
                                    const blobUrl = URL.createObjectURL(new Blob([blob], { type })); // Учитываем тип
                                    this.bannerUrl = blobUrl; // Устанавливаем Blob URL
                                })
                                .catch(() => {
                                    console.error('Ошибка загрузки баннера');
                                });
                        }

                        // Загружаем изображения галереи
                        if (this.org.gallery && this.org.gallery.length) {
                            Promise.all(
                                this.org.gallery.map((image) =>
                                    downloadMedia(image).then(({ blob, type }) => {
                                        return URL.createObjectURL(new Blob([blob], { type }));
                                    })
                                )
                            )
                                .then((urls) => {
                                    this.galleryUrls = urls; // Сохраняем все Blob URL
                                })
                                .catch((error) => {
                                    console.error('Ошибка загрузки галереи:', error);
                                });
                        }
                    }
                },
                { immediate: true } // Немедленный запуск, если данные уже есть
            );
        },
        uploadBanner(event) {
            const file = event.files[0];

            uploadMedia("banner", 0, file)
                .then(() => {
                    this.updateImages()
                    this.bannerUrl = URL.createObjectURL(file);
                    this.$refs.toast.add({ severity: 'success', summary: 'Баннер загружен', life: 3000 });

                })
                .catch(error => {
                    if (error.response.data == "file is too big\n") {
                        this.$refs.toast.add({ severity: 'warn', summary: 'Изображение слишком много весит', life: 3000 });
                    }
                    console.error('Ошибка при загрузки изображения:', error);
                });

        },
        deleteBanner() {
            deleteMedia(this.org.banner, "banner")
                .then(() => {
                    this.$refs.toast.add({ severity: 'info', summary: 'Баннер удалён', life: 3000 });
                    this.bannerUrl = null;
                })
                .catch(error => {
                    console.error('Ошибка при удалении изображения:', error);
                });


        },
        uploadPhoto(event) {

            const files = event.files;
            files.forEach(file => {
                console.log(this.galleryUrls)
                if (this.galleryUrls.length < 5) {
                    uploadMedia("gallery", this.id, file)
                    this.galleryUrls.push(URL.createObjectURL(file));
                    this.$refs.toast.add({ severity: 'success', summary: 'Изображение  загружено', life: 3000 });
                } else {
                    this.$refs.toast.add({ severity: 'warn', summary: 'Можно добавить не более 5 изображений', life: 3000 });
                }
            });
            this.updateImages()
        },
        deletePhoto(index) {
            deleteMedia(this.org.gallery[index], "gallery")
                .then(() => {
                    this.$refs.toast.add({ severity: 'info', summary: 'Изображение удалено', life: 3000 });
                    this.galleryUrls.splice(index, 1);
                })
                .catch(error => {
                    console.error('Ошибка при удалении изображения:', error);
                });

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
