<template>
  <section class="section-container">
    <h2>Информация</h2>
    <div class="info-item">
      <i class="fas fa-phone"></i>
      <p>{{ org.telephone }}</p>
    </div>
    <div class="info-item">
      <i class="fas fa-map-marker-alt"></i>
      <p>{{ org.address }}, {{ org.city }}</p>
    </div>
    <div class="info-item">
      <i class="fas fa-clock"></i>

      <OrgTimetable :timetable="org.timetable" />

    </div>
  </section>
</template>

<script>
import OrgTimetable from '../OrgTimetable.vue';

export default {
  components: {
    OrgTimetable,
  },
  name: 'InfoSection',
  props: {
    org: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style scoped>
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
</style>