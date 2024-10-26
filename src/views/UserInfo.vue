<template>
    <div class="user-profile">
      <!-- User Info Section -->
      <section class="user-info">
        <div class="profile-photo">
          <img src="default_user_photo.jpg" alt="User Photo">
        </div>
        <div class="profile-details">
          <p><strong>ФИО:</strong> Иван Иванов</p>
          <div class="contact-item"><i class="fas fa-phone"></i><p>+7 999 666 5252</p></div>
          <div class="contact-item"><i class="fas fa-envelope"></i><p>ivanov@example.com</p></div>
          <div class="contact-item"><i class="fas fa-share-alt"></i><p>Социальные сети:</p></div>
<ul>
  <li><i class="fab fa-vk"></i><a href="#">ВКонтакте</a></li>
  <li><i class="fab fa-instagram"></i><a href="#">Instagram</a></li>
</ul>
        </div>
      </section>
  
      <!-- About Section -->
      <section class="about-section">
        <h2>О себе:</h2>
        <p>Что то о себе...</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Можно добавить динамические данные для пользователя, если требуется
      };
    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .user-info {
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .profile-photo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-details {
    display: flex;
    flex-direction: column;
  }
  
  .profile-details p {
    margin: 5px 0;
  }
  
  .profile-details ul {
    padding: 0;
    list-style-type: none;
  }
  
  .profile-details ul li {
    margin: 5px 0;
  }
  
  .profile-details ul li a {
    color: #007aff;
    text-decoration: none;
  }
  
  .profile-details ul li a:hover {
    text-decoration: underline;
  }
  
  .about-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .about-section h2 {
    margin-bottom: 10px;
  }
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.contact-item i {
    margin-right: 10px;
}

.about-section p {
    text-align: left;
}

</style>