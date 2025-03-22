<template>
  <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal header="Укажите причину отмены"
    :style="{ width: '30rem' }">
    <div class="review-form">
      <CancellationReasonSelect v-model="reason" class="org-select" />
      <button @click="handleSubmit" class="action-button">Отправить</button>
    </div>

  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import CancellationReasonSelect from '../selects/CancellationReasonSelect.vue';

export default {
  name: 'ReviewingDialog',
  components: {
    Dialog,
    CancellationReasonSelect,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      reason: 'plans_changed',
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.reason);
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style scoped>
.action-button {
  padding: 8px 12px;
  background-color: #0F4EB3;
  color: var(--card-background-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #1A6CDB;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>