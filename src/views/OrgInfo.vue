<template>
    <div class="page-container" :class="{ 'modal-open': isModalOpen }">
      <!-- Organization Header -->
      <header class="header-container">
        <div class="header-left">
          <h1>ORG</h1>
        </div>
        <div class="header-right">
          <p>Рейтинг:</p>
          <div class="rating-circle">4.75</div>
        </div>
      </header>
      
      <!-- Navigation Bar -->
      <nav class="navigation-bar">
      <button @click="changeSection('info')" class="nav-btn">Информация</button>
      <button @click="changeSection('services')" class="nav-btn">Услуги</button>
      <button @click="changeSection('employees')" class="nav-btn">Сотрудники</button>
      <button @click="changeSection('images')" class="nav-btn">Изображения</button>
      <button @click="changeSection('reviews')" class="nav-btn">Отзывы</button>
      </nav>

      <router-view />

      </div>
      
      
      
  </template>
  
  <script>
  
  export default {
    props: {
    orgName: {
      type: String,
      required: true,
    },
  },
  //TODO добавить получение информации с сервера
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
      changeSection(section) {
      this.activeSection = section;
      this.$router.push({ name: section.charAt(0).toUpperCase() + section.slice(1), params: { orgName: this.orgName } });
    },
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
    color: var(--card-background-color);
    border-bottom: 1px solid var(--border-color);
  }
  
  .header-left h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: var(--light-text);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
  
  .header-right {
    color: var(--light-text);
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
    background-color: #0F4EB3;
    color: var(--light-text);
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
    background-color: var(--background-color);
    padding: 15px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }
  
  .nav-btn {
    background-color: var(--card-background-color);
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
  }
  
  .nav-btn:hover {
    background-color: var(--background-color);
  }
  
  /* General section styles */
  .section-container {
    padding: 20px;
    margin: 20px;
    background-color: var(--transparent-color);
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
  