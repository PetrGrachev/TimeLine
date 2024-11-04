    <template>
        <h2>Регистрация</h2>
        <div class="radio-container">
        <div class="radio-item">
      <RadioButton v-model="isOrganization" inputId="ingredient1" name="pizza" :value="false" :pt="radioStyles" />
      <label for="ingredient1" class="radio-label">Клиент</label>
    </div>
    <div class="radio-item">
      <RadioButton v-model="isOrganization" inputId="ingredient2" name="pizza" :value="true" :pt="radioStyles" />
      <label for="ingredient2" class="radio-label">Организация</label>
    </div>
  </div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input
        type="text"
        v-model="registrationName"
        :placeholder="isOrganization ? 'Название организации' : 'Имя'"
        required
      />
        </div>
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            id="register-email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            id="register-password"
            placeholder="Пароль"
            required
          />
        </div>
        <!-- Дополнительные поля для организации -->
        <div v-if="isOrganization">
          <div class="form-group">
            <input
              type="text"
              v-model="contactNumber"
              id="contact-number"
              placeholder="Контактный номер"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="address"
              id="address"
              placeholder="Адрес"
              required
            />
            <p class="map-text">Укажите адрес на карте:</p>
            <div id="map" class="map-container"></div>
          </div>
          
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </template>
    
    <script>
    import RadioButton from 'primevue/radiobutton';
    /* global DG */
    export default {
      components: {
    RadioButton,
  },

      data() {
        return {
            isOrganization: false,
            email: "",
            password: "",
            name: "",
            companyName: "",
            address: "",
            contactNumber: "",
            errorMessage: "",
            markerCoords: null,
            radioStyles: {
        box: {
          style: {
            'border-color' : '#1A6CDB', // Синий цвет рамки радиокнопки
            'background-color': '#1A6CDB',
          },
        },
        icon: {
          style: {
            'color': '#1A6CDB', // Синий цвет для иконки внутри радиокнопки
            
          },
          
        },
      },
        };
    },
    mounted() {
  this.$nextTick(() => {
    this.initializeMap();
  });
    },
    computed: {
    registrationName: {
      get() {
        return this.isOrganization ? this.companyName : this.name;
      },
      set(value) {
        if (this.isOrganization) {
          this.companyName = value;
        } else {
          this.name = value;
        }
      }
    }
  },
  watch: {
  isOrganization(newVal) {
    if (newVal) {
      this.$nextTick(() => {
        this.initializeMap();
      });
    }
    
  }
},
    methods:{
        initializeMap() {
    if (this.map) {
    this.map.remove();
    this.map = null;
  }
  this.mapInitialized = true;
      DG.then(() => {
        this.map = DG.map('map', {
          center: [42.98306, 47.50462], // Центр карты (Махачкала)
          zoom: 13,
        });
        this.marker = DG.marker([42.98306, 47.50462], { draggable: true })
          .addTo(this.map)
          .bindPopup('Перетащите меня!');

        // Обработка события перетаскивания маркера
        this.marker.on('dragend', (event) => {
          this.markerCoords = event.target.getLatLng(); // Сохраняем координаты маркера
          console.log('Координаты маркера:', this.markerCoords);
        });
    });},
    }
}
    </script>
    
    <style scoped>
    /* Общие стили для формы входа и регистрации */
.auth-container {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

/* Логотип */
.logo-container {
  margin-bottom: 20px;
}

.logo {
  max-width: 200px;
  height: auto;
}

/* Вкладки для переключения */
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tabs button {
  width: 48%;
  padding: 10px;
  background-color: #0F4EB3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: #1A6CDB;
}

.tabs button:hover {
  background-color: #1A6CDB;
}

.align-left {
  margin-right: auto;
}

.align-right {
  margin-left: auto;
}

/* Переключатель для типа регистрации */
.toggle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Форма */
.form-container h2 {
  text-align: center;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

input {
  width: calc(100% - 24px); /* Учитываем отступы, чтобы выровнять с кнопкой */
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: #fafafa;
}

input:focus {
  outline: none;
  border-color: #0F4EB3;
  box-shadow: 0 0 8px rgba(66, 185, 131, 0.4);
}

button {
  width: 100%;
  padding: 12px;
  background-color: #0F4EB3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1A6CDB;
}

.error {
  color: red;
  text-align: center;
  margin-top: 15px;
}

.map-container {
  width: 320px;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
    .map-text{
        text-align: left;
    }

    .radio-container {
  display: flex;
  flex-direction: column; /* Выровнять элементы друг под другом */
  gap: 10px; /* Зазор между радиокнопками */
  margin-bottom: 20px;
}

.radio-item {
  display: flex;
  align-items: right; /* Выровнять радиокнопку и текст по центру */
}

.radio-label {
  margin-left: 8px; /* Отступ между радиокнопкой и текстом */
}
    </style>