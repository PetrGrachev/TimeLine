<template>
    <div class="page-container" :class="{ 'modal-open': isModalOpen }">
      <!-- Organization Header -->
      <header class="header-container">
        <div class="header-left">
          <h1></h1>
        </div>
        <div class="header-right">
          <p>Рейтинг:</p>
          <div class="rating-circle">4.75</div>
        </div>
      </header>
  
      <!-- Navigation Bar -->
      <nav class="navigation-bar">
        <button @click="activeSection = 'info'" class="nav-btn">Информация</button>
        <button @click="activeSection = 'employees'" class="nav-btn">Сотрудники</button>
        <button @click="activeSection = 'images'" class="nav-btn">Изображения</button>
        <button @click="activeSection = 'reviews'" class="nav-btn">Отзывы</button>
      </nav>
  
      <!-- Section: Information -->
      <section v-if="activeSection === 'info'" id="info" class="section-container">
        <h2>Информация</h2>
        <div class="info-item">
          <i class="fas fa-phone"></i>
          <p>+7 999 666 5252</p>
        </div>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <p>ул. Магомета Гаджиева, 16, Махачкала</p>
        </div>
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <p>24/7</p>
        </div>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <p>oldboybarbershop.com</p>
        </div>
      </section>
  
      <!-- Section: Employees -->
      <section v-if="activeSection === 'employees'" id="employees" class="section-container">
        <h2>Сотрудники</h2>
        <div class="employee-card">
          <img src="@/assets/emp1.jpg" alt="Фото сотрудника" class="employee-photo">
          <div class="employee-info">
            <div class="employee-info-item">
              <p><strong>Должность:</strong> Стилист</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Имя:</strong> Магамед Магамедов</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Дни работы:</strong> Понедельник - Пятница</p>
            </div>
            <div class="employee-info-item">
              <p><strong>Образование:</strong> Школа косметологии</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Section: Images -->
      <section v-if="activeSection === 'images'" id="images" class="section-container">
        <h2>Изображения</h2>
        <div class="images-grid">
        <!-- Цикл по изображениям -->
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="image-item" 
          @click="showImage(image)"
        >
      <img :src="require(`@/assets/${image.src}`)" :alt="image.alt" />
    </div>

    <!-- Диалоговое окно для отображения выбранного изображения -->
    <Dialog v-model:visible="visible" modal header="Изображение" :style="{ width: '50rem' }">
      <img class="modal-content" :src="require(`@/assets/${selectedImage.src}`)" :alt="selectedImage.alt" />
    </Dialog>
  </div>
      </section>
      </div>
      <!-- Section: Reviews -->
      <section v-if="activeSection === 'reviews'" id="reviews" class="section-container">
        <h2>Отзывы</h2>
        <p>Пока отзывов нет...</p>
      </section>
      
      
  </template>
  
  <script>
  import Dialog from 'primevue/dialog';
  export default {
    props: {
    companyName: {
      type: String,
      required: true,
    },
  },
  components: {
    Dialog
  },
    data() {
      return {
        activeSection: 'info', // Отображаемая секция по умолчанию
        
        visible: false,
        selectedImage: {},
      images: [
        { src: 'img1.webp', alt: 'Image 1' },
        { src: 'img2.webp', alt: 'Image 2' },
        { src: 'img3.webp', alt: 'Image 3' }
      ]
    };
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
  /* Container for the entire page */
  .page-container {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    padding-bottom: 50px;
    position: relative;
    z-index: 1;
    background-color: transparent;
  }
  
  .page-container.modal-open {
    filter: blur(5px); /* Эффект размытия страницы при открытом модальном окне */
    pointer-events: none; /* Блокировка взаимодействия с фоном */
  }
  
  .page-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
    opacity: 0.9;
  }
  
  /* Header */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-image: url('@/assets/facade.webp');
    background-size: cover;
    background-position: center;
    color: white;
    border-bottom: 1px solid #ddd;
  }
  
  .header-left h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
  
  .header-right {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
  }
  
  .rating-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  
  /* Navigation bar */
  .navigation-bar {
    display: flex;
    justify-content: space-around;
    background-color: #f9f9f9;
    padding: 15px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }
  
  .nav-btn {
    background-color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
  }
  
  .nav-btn:hover {
    background-color: #f0f0f0;
  }
  
  /* General section styles */
  .section-container {
    padding: 20px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Info section with icons */
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .info-item i {
    margin-right: 10px;
  }
  
  /* Employee card */
  .employee-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .employee-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }
  
  .employee-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
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
    background-color: #f0f0f0;
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
    color: white;
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
  