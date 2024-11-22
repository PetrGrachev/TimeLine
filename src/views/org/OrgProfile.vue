<template>
    <div class="user-profile-container">
      <h2>Редактирование профиля</h2>
      <form @submit.prevent="handleSave">
        <!-- Имя пользователя -->
        <div class="form-group">
          <label for="name">Название организации:</label>
          <input type="text" v-model="org.name" id="name" required />
        </div>
  
        <!-- Телефон пользователя -->
        <div class="form-group">
          <label for="phone">Телефон:</label>
          <input type="tel" v-model="org.phone" id="phone" />
        </div>
  
        <!-- Email пользователя -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="org.email" id="email" required />
        </div>
  
        <!-- Соцсети пользователя -->
        <div class="form-group">
          <label for="social">Социальные сети:</label>
          <input type="text" v-model="org.social" id="social" placeholder="Например, ссылка на VK или Instagram" />
        </div>
  
        <!-- Раздел о себе -->
        <div class="form-group">
          <label for="about">Об организации:</label>
          <textarea v-model="org.about" id="about" rows="5" placeholder="Расскажите немного о вашей организации"></textarea>
        </div>
  
        <!-- Кнопка сохранения -->
        <button type="submit" class="save-button">Сохранить изменения</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserProfile",
    data() {
      return {
        org: {
          name: "",
          phone: "",
          email: "",
          social: "",
          about: "",
        },
      };
    },
    mounted() {
      // Здесь можно сделать запрос к API для получения данных пользователя и присвоить их user
      // Пример: this.user = fetchUserData();
    },
    methods: {
      handleSave() {
        // Логика для сохранения изменений
        // Пример: отправка данных на сервер
        console.log("Изменения сохранены", this.user);
        alert("Ваш профиль был успешно обновлен!");
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile-container {
    max-width: 500px;
    margin: 20px auto 0;
    padding: 20px;
    background-color: var(--card-background-color);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  label {
    width: 150px;
    font-weight: 500;
  }
  
  input,
  textarea {
    background-color: var(--input-background-color);
    flex-grow: 1;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    font-size: 16px;
    transition: border 0.3s ease, box-shadow 0.3s ease;
    color: var(--text-color);
}
  
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #0F4EB3;
    box-shadow: 0 0 8px rgba(66, 185, 131, 0.4);
  }
  
  .save-button {
    width: 100%;
    padding: 12px;
    background-color: #0F4EB3;
    color: var(--text-color-background-color);
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .save-button:hover {
    background-color: #1A6CDB;
  }
  </style>
  