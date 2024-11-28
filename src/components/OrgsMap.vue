<template>
    <!-- 2GIS Integration Placeholder -->
    <div id="map" class="map-container"></div>
</template>

<script>
import { showMap, getUserLocation } from '../api/axiosInstance';


/* global DG */
export default{
    props: {
    selectedOrganizationType: {
      type: String,
      required: true,
    },
  },
    data() {
    return {
        mapOrgs: [],
      filteredMapOrgs:[],
        }
    },
mounted() {
    this.initializeMap();
},
watch: {
    selectedOrganizationType() {
      this.getMapBounds();
    },
  },
methods:{
    filterMapOrgs() {
    console.log("Фильтруем по ", this.selectedOrganizationType);
  if (this.selectedOrganizationType) {
    this.filteredMapOrgs = this.mapOrgs.filter(
      org => org.type === this.selectedOrganizationType
    );
  } else {
    this.filteredMapOrgs = this.mapOrgs;
  }
},
    initializeMap() {
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
  this.mapInitialized = true;

  this.markers = [];

  getUserLocation()
  .then((userLocation) => {
    const { latitude, longitude } = userLocation;
    this.createMap([latitude, longitude]); // Инициализируем карту по координатам пользователя
  })
  .catch((error) => {
    console.error("Ошибка ", error.message);

    // Используем координаты по умолчанию в случае ошибки
    const defaultCenter = [55.7558, 37.6176]; // Москва
    this.createMap(defaultCenter); // Инициализируем карту по координатам по умолчанию
  });

},
createMap(center){
  DG.then(() => {
    this.map = DG.map('map', {
      center: center,
      zoom: 13,
    });

    // Добавление слушателя для обновления карты при окончании движения
    this.map.on('moveend', () => {
      this.getMapBounds();
    });

    // Начальная загрузка данных и добавление маркеров
    this.getMapBounds();
  });
},
getMapBounds() {
  if (this.map) {
    const bounds = this.map.getBounds();
    const southWest = bounds.getSouthWest(); // Левый нижний угол (юго-западный)
    const northEast = bounds.getNorthEast(); // Правый верхний угол (северо-восточный)

    console.log('Левый нижний угол (Юго-западный):', southWest.lat, southWest.lng);
    console.log('Правый верхний угол (Северо-восточный):', northEast.lat, northEast.lng);

    showMap(southWest, northEast)
      .then(orgs => {
        if (Array.isArray(orgs)) {
          this.mapOrgs = orgs;

          this.clearMarkers();

          this.filterMapOrgs();
          //TODO заменить {org.type} на расписание
            this.filteredMapOrgs.forEach(org => {
            const popupContent = `
            <div style="font-family: Arial, sans-serif; color: #a2b7d6; text-align: center;">
                <h3 style="margin: 0; font-size: 16px;">${org.name}</h3>
                <p style="margin: 5px 0;">${org.type}</p> 
                <p style="margin: 5px 0;">
                ${org.rating} <span style="color: #FFD700;">&#9733;</span>
                </p>
                <button id="go-to-company-${org.id}" style="
                padding: 8px 12px;
                background-color: #0F4EB3;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;">
                Подробнее
                </button>
            </div>
            `;

            const marker = DG.marker(org.coords, {
              icon: DG.icon({
                iconUrl: require(`@/assets/${org.type}-icon.png`),
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
              })
            }).addTo(this.map)
              .bindPopup(popupContent)

                        // Добавление обработчика для кнопки "Подробнее" после открытия попапа
            marker.on('popupopen', () => {
                const button = document.getElementById(`go-to-company-${org.id}`);
                if (button) {
                button.addEventListener('click', () => {
                    this.goToCompanyInfo(org); // Вызов метода для перехода
                });
                }
            });

              this.markers.push(marker);

          });
        } else {
          console.error('Полученные данные не являются массивом:', orgs);
        }
      })
      .catch(error => {
        console.error('Ошибка при получении организаций:', error);
      });
  }
  
},
clearMarkers() {
  if (this.markers && this.markers.length > 0) {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker); // Удаляем каждый маркер с карты
    });
    this.markers = []; // Очищаем массив маркеров
  }
},
goToCompanyInfo(org) {
    this.$router.push({ name: 'OrgInfo', params: { orgName: org.name } });
  },
}
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>