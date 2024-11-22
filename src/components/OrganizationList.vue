<template>
  <ul class="organization-list-items">
    <li v-for="org in organizations" :key="org.name" class="organization-item" @click="$emit('organization-click', org)">
      <img :src="require(`@/assets/${org.type}-icon.png`)" alt="icon" class="organization-icon" />
      <div class="organization-details">
        <h3>{{ org.name }}</h3>
        рейтинг
        адрес
      </div>
    </li>
  </ul>
</template>

<script>
export default {
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
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.organization-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column;
}

.organization-details h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.organization-details p {
  margin: 5px 0 0;
  font-size: 14px;
  color: var(--text-color);
}
</style>
