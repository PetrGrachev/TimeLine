<template>
  <Toast ref="toast" />
  <div class="user-profile-container">
    <h2>Редактирование профиля</h2>

    <EditableUserAvatar :uuid="user.uuid" :name="user.first_name" @upload="handlePhotoUpload"
      @delete="handlePhotoDelete" class="form-avatar" />


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
import { deleteMedia, uploadMedia } from '../../api/mediaApi';
import EditableUserAvatar from '../../components/EditableUserAvatar.vue';
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
    EditableUserAvatar,
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
    handlePhotoUpload(file) {
      const id = localStorage.getItem('id');
      this.avatarUrl = URL.createObjectURL(file);
      uploadMedia("user", id, file)
        .then(() => {
          this.$refs.toast.add({ severity: 'success', summary: 'Аватар загружен', life: 3000 });
          this.loadUserData();
        })
        .catch(error => {
          console.error('Ошибка при загрузки изображения:', error);
        });
    },
    handlePhotoDelete(uuid) {
      deleteMedia(uuid, "user")
        .then(() => {
          this.$refs.toast.add({ severity: 'info', summary: 'Аватар удален', life: 3000 });
          this.loadUserData();
        })
        .catch(error => {
          console.error('Ошибка при удалении изображения:', error);
        });
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

.form-avatar {
  margin-bottom: 15px;
}
</style>