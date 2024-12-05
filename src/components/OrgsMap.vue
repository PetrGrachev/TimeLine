<template>
  <nav class="top-nav">
    <OrganizationSelect v-model="selectedOrganizationType" @change="getMapBounds" class="custom-select" />

  </nav>
  <!-- 2GIS Integration Placeholder -->
  <div id="map" class="map-container"></div>
</template>

<script>
import { showMap } from '../api/userApi';
import { getUserLocation } from '../api/axiosInstance';
import OrganizationSelect from './OrganizationSelect.vue';


/* global DG */
export default {
  props: {
    lat: {
      type: Number,

    },
    lng: {
      type: Number,

    },
    zoom: {
      type: Number,

    }
  },
  components: {
    OrganizationSelect,
  },
  data() {
    return {
      mapOrgs: [],
      filteredMapOrgs: [],
      selectedOrganizationType: '',
      localLat: null,
      localLong: null,
      localZoom: 13,
    }
  },
  mounted() {
    this.loadMapScript();

    const { lat, lng, zoom } = this.$route.query;

    if (lat && lng && zoom) {
      this.localLat = parseFloat(lat);
      this.localLong = parseFloat(lng);
      this.localZoom = parseInt(zoom, 10);
      this.initializeMap();
    } else {
      getUserLocation()
        .then((userLocation) => {
          const { latitude, longitude } = userLocation;
          this.localLat = latitude;
          this.localLong = longitude;
          this.localZoom = 13; // Значение по умолчанию
          this.initializeMap();
        })
        .catch((error) => {
          console.error("Ошибка при получении местоположения:", error.message);
          this.localLat = 55.7558; // Москва по умолчанию
          this.localLong = 37.6176;
          this.localZoom = 13;
          this.initializeMap();
        });
    }
  },
  watch: {
    selectedOrganizationType() {
      this.getMapBounds();
    },
  },


  methods: {
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
    loadMapScript() {
      return new Promise((resolve, reject) => {
        if (document.getElementById('2gis-script')) {
          // Скрипт уже загружен
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.id = '2gis-script';
        script.src = 'https://maps.api.2gis.ru/2.0/loader.js?pkg=full';
        script.onload = () => {
          resolve();
        };
        script.onerror = () => {
          reject(new Error('Ошибка при загрузке скрипта карты.'));
        };
        document.body.appendChild(script);
      });
    },
    initializeMap() {

      if (this.map) {
        this.map.remove();
        this.map = null;
      }
      this.mapInitialized = true;

      this.markers = [];

      this.createMap();

    },
    throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    },
    createMap() {
      console.log(this.localLat, this.localLong, this.localZoom)
      DG.then(() => {
        this.map = DG.map('map', {
          center: [this.localLat, this.localLong],
          zoom: this.localZoom,
        });


        // Добавление слушателя для обновления карты при окончании движения
        this.map.on('moveend', this.throttle(() => {
          const center = this.map.getCenter();
          const zoom = this.map.getZoom();

          this.$router.replace({
            name: 'OrgsMap',
            query: {
              lat: center.lat,
              lng: center.lng,
              zoom: zoom
            }
          });
          this.getMapBounds();
        }, 1000));

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

              this.filteredMapOrgs.forEach(org => {

                let scheduleText = 'Закрыто';
                if (org.schedule) {
                  scheduleText = `Открыто: ${org.schedule.open} - ${org.schedule.close}`;
                  if (org.schedule.break_start && org.schedule.break_end) {
                    scheduleText += ` (Перерыв: ${org.schedule.break_start} - ${org.schedule.break_end})`;
                  }
                }
                const popupContent = `
            <div style="font-family: Arial, sans-serif; color: #a2b7d6; text-align: center;">
                <h3 style="margin: 0; font-size: 16px;">${org.name}</h3>
                <p style="margin: 5px 0;">${scheduleText}</p> 
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
      this.$router.push({ name: 'OrgInfo', params: { id: org.org_id } });
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