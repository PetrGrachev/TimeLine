<template>
  <ul class="organization-list-items">
    <li v-for="org in organizations" :key="org.id" class="organization-item" @click="$emit('organization-click', org)">
      <img :src="require(`@/assets/${org.type}-icon.png`)" alt="icon" class="organization-icon" />
      <div class="organization-details">
        <h3 class="organization-name">{{ org.name }}</h3>
        <div class="details-row">
          <p>
            <i class="fas fa-map-marker-alt"></i> {{ org.address }} |
            <span class="rating-container">
              <b v-if="org.rating !== undefined">{{ org.rating }}</b>
              <Rating v-if="org.rating !== undefined" :modelValue="org.rating" readonly halfStars :cancel="false" />
              <span v-else>Нет рейтинга</span>
            </span> |
            <span class="schedule-info">
              <template v-if="org.schedule">
                <i class="far fa-clock"></i> {{ org.schedule.open }} - {{ org.schedule.close }},
                <i class="far fa-pause-circle"></i> {{ org.schedule.break_start }} - {{ org.schedule.break_end }}
              </template>
              <template v-else>
                <i class="fas fa-times-circle"></i> Закрыто
              </template>
            </span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Rating from 'primevue/rating';


export default {
  components: {
    Rating,
  },
  props: {
    organizations: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style scoped>
.organization-list-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.organization-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.3s;
}

.organization-item:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

.organization-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  filter: var(--icon-filter);
}

.organization-details {
  flex-grow: 1;
}

.details-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.organization-name {
  margin: 0;
  font-size: 1.2rem;
  text-align: left;
}

.organization-details p {
  margin: 4px 0;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-container,
.schedule-info {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
