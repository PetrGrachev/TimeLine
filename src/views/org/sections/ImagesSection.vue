<template>
  <!-- Section: Images -->
  <section id="images" class="section-container">
    <h2>Изображения</h2>
    <div class="images-grid">
      <!-- Цикл по изображениям -->
      <div v-for="(image, index) in galleryUrls" :key="index" class="image-item" @click="showImage(image)">
        <img :src=image alt="Изображение галереи" />
      </div>

      <!-- Диалоговое окно для отображения выбранного изображения -->
      <Dialog v-model:visible="visible" modal header="Изображение" :style="{ width: '50rem' }">
        <img class="modal-content" :src=selectedImage alt="Изображение галереи" />
      </Dialog>
    </div>
  </section>
</template>

<script>
import Dialog from 'primevue/dialog';
import { downloadMedia } from '../../../api/mediaApi';
export default {
  name: 'ImagesSection',
  components: {
    Dialog
  },
  props: {
    org: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

      visible: false,
      selectedImage: {},
      galleryUrls: [],
    };
  },

  mounted() {
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
  },
  methods: {
    showImage(image) {
      this.selectedImage = image; // Устанавливаем выбранное изображение
      this.visible = true; // Открываем диалог
    }
  }
};
</script>

<style scoped>
/* General section styles */
.section-container {
  padding: 20px;
  margin: 20px;
  background-color: var(--transparent-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.image-item {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: var(--card-background-color);
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>