<template>
    <!-- Section: Reviews -->
    <section id="reviews" class="section-container">
        <h2>Отзывы</h2>
        <div v-if="reviews && Object.keys(reviews || {}).length">
            <div v-for="(review, index) in reviews" :key="index" class="review-item">
                <EditableReviewCard :review="review" />
            </div>
        </div>
        <div v-else>
            <p>Пока отзывов нет...</p>
        </div>
    </section>
</template>

<script>
import { getFeedback } from '../../api/feedbacksApi';
import EditableReviewCard from '../../components/cards/EditableReviewCard.vue';

export default {
    name: 'ReviewsSection',
    components: {
        EditableReviewCard,
    },
    data() {
        return {
            id: 0,
            reviews: [],
        }
    },
    mounted() {
        this.id = localStorage.getItem('id');
        getFeedback(100, 1, null, this.id, null)
            .then((reviews) => {
                this.reviews = reviews;
            })
            .catch((error) => {
                console.error('Ошибка загрузки отзывов:', error);
            });
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
</style>