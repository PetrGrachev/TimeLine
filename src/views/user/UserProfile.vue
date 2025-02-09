<template>
  <Toast ref="toast" />
  <div class="user-profile-container">
    <h2>Редактирование профиля</h2>
    <div class="avatar-container">
      <!-- Аватарка пользователя -->
      <UserAvatar :avatarUrl="user.uuid" :name="user.first_name" class="avatar" />

      <!-- Скрытый input[type="file"], стилизованный как кнопка -->
      <label class="edit-button">
        <input type="file" accept="image/*" @change="handlePhotoUpload" class="hidden-upload" />
        <i class="fas fa-pencil-alt"></i>
      </label>
    </div>


    <form @submit.prevent="handleSave">
      <!-- Имя пользователя -->
      <div class="form-group">
        <InputText v-model="user.first_name" id="registrationName" placeholder='Имя' class="mb-4"
          :class="{ 'p-invalid': registrationNameError }" @blur="validateRegistrationName" required />
        <small v-if="registrationNameError" class="p-error">Имя должно содержать не менее 3 символов.</small>
      </div>

      <div class="form-group">
        <InputText v-model="user.last_name" id="lastName" placeholder="Фамилия" class="mb-4" required />
      </div>


      <!-- Телефон пользователя -->
      <div class="form-group">
        <InputMask v-model="user.telephone" id="contactNumber" placeholder="Контактный номер" mask="+79999999999"
          class="mb-4" required />
      </div>

      <div class="form-group">
        <CitySelect v-model="user.city" class="city-select" />
      </div>

      <!-- Раздел о себе -->
      <div class="form-group">
        <Textarea v-model="user.about" id="about" rows="5" placeholder="Расскажите немного о себе"></Textarea>
      </div>

      <!-- Кнопка сохранения -->
      <Button label="Сохранить изменения" type="submit" :disabled="isSubmitDisabled" />
    </form>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea';
import { getUser, updateUser } from '../../api/userApi';
import CitySelect from '../../components/selects/CitySelect.vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { uploadMedia } from '../../api/mediaApi';
import UserAvatar from '../../components/UserAvatar.vue';
//TODO сделать кнопку Редактировать
export default {
  name: "UserProfile",
  components: {
    InputText,
    InputMask,
    CitySelect,
    Textarea,
    Button,
    Toast,
    UserAvatar,
  },
  data() {
    return {
      user: {
        about: "",
        city: "",
        first_name: "",
        last_name: "",
        telephone: "",
        user_id: 0,
      },
      registrationNameError: false,
      avatarUrl: null,
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      // Получение id из localStorage
      const id = localStorage.getItem('id');
      getUser(id).then(user => {
        this.user = user;

      })
        .catch(error => {
          console.error("Ошибка ", error.message);
        });

    },
    handleSave() {
      updateUser(this.user.about, this.user.first_name, this.user.last_name, this.user.city, this.user.telephone, this.user.user_id);
      console.log("Изменения сохранены", this.user);
      this.$toast.add({ severity: 'success', summary: 'Успех', detail: 'Изменения сохранены', life: 3000 });

    },
    validateRegistrationName() {
      this.registrationNameError = this.user.first_name.length < 3;
    },
    handlePhotoUpload(event) {
      const id = localStorage.getItem('id');
      const file = event.target.files[0];
      this.avatarUrl = URL.createObjectURL(file);
      uploadMedia("user", id, file)
        .then(() => {
          this.$refs.toast.add({ severity: 'success', summary: 'Аватар загружен', life: 3000 });

        })
        .catch(error => {
          console.error('Ошибка при загрузки изображения:', error);
        });
    },
    triggerFileUpload() {
      // Программное нажатие на скрытый FileUpload
      this.$refs.fileUploadRef.$el.querySelector('input[type="file"]').click();
    }
    //isSubmitDisabled(){
    //  return (!this.user.first_name || //TODO добавить валидацию на остальные поля
    //  this.user.first_name.length < 3)
    //},
  },
};
//TODO сделать поля нормальными по ширине
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

.avatar-container {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Чтобы изображение не растягивалось */
}

/* Полностью скрытый FileUpload */
.hidden-upload {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

/* Кнопка редактирования (значок карандаша) */
.edit-button {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #0F4EB3;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* При наведении кнопка увеличивается */
.edit-button:hover {
  background-color: #1A6CDB;
  transform: scale(1.1);
}
</style>