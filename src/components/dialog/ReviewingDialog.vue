<template>
  <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal header="Оставить отзыв"
    :style="{ width: '30rem' }">
    <div class="review-form">
      <Rating v-model="localReviewRating" :stars="5" cancel="false" class="mb-4" :pt="ratingPt"></Rating>
      <Textarea v-model="localReviewText" rows="5" placeholder="Введите ваш отзыв" class="mb-4"></Textarea>
      <button @click="handleSubmit" class="action-button">Отправить</button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';

export default {
  name: 'ReviewingDialog',
  components: {
    Dialog,
    Rating,
    Textarea,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    reviewRating: {
      type: Number,
      default: 0,
    },
    reviewText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localReviewRating: this.reviewRating,
      localReviewText: this.reviewText,
      ratingPt: {
        icon: {
          style: {
            color: '#0F4EB3',
          },
        },
      },
    };
  },
  watch: {
    reviewRating: {
      immediate: true,
      handler(newVal) {
        this.localReviewRating = newVal;
      },
    },
    reviewText: {
      immediate: true,
      handler(newVal) {
        this.localReviewText = newVal;
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-review', this.localReviewText, this.localReviewRating);
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
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>