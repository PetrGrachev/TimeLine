<template>
  <section class="section-container">
    <Toast ref="toast" />
    <h2>Информация</h2>
    <div class="info-item">
      <i class="fas fa-phone"></i>
      <p>{{ formatPhoneNumber(org.telephone) }}</p>
      <i class="fas fa-copy copy-icon" @click="copyToClipboard(org.telephone)" title="Скопировать номер"></i>
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
import Toast from 'primevue/toast';
import OrgTimetable from '../OrgTimetable.vue';

export default {
  components: {
    OrgTimetable,
    Toast,
  },
  name: 'InfoSection',
  props: {
    org: {
      type: Object,
      required: true,
    }
  },
  methods: {
    formatPhoneNumber(phone) {
      if (!phone) return '';
      // Преобразуем номер в формат +7 (999) 999-99-99
      return phone.replace(/^(\+7|7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($2) $3-$4-$5');
    },
    copyToClipboard(phone) {
      navigator.clipboard.writeText(phone).then(() => {
        this.$toast.add({ severity: 'success', summary: 'Скопировано!', detail: 'Номер телефона скопирован в буфер обмена.', life: 3000 });
      }).catch(() => {
        this.$toast.add({ severity: 'error', summary: 'Ошибка!', detail: 'Не удалось скопировать номер телефона.', life: 3000 });
      });
    },
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