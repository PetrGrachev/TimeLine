<template>
    <!-- Section: Reviews -->
    <section id="reviews" class="section-container">
        <h2>Отзывы</h2>
        <div v-if="reviews && Object.keys(reviews || {}).length">
            <div v-for="(review, index) in reviews" :key="index" class="review-item">
                <EditableReviewCard :review="review" @edit="editReview" @delete="deleteReview" />
            </div>
        </div>
        <div v-else>
            <p>Пока отзывов нет...</p>
        </div>

        <ReviewingDialog v-model:visible="isReviewDialogVisible" :reviewRating="reviewRating" :reviewText="reviewText"
            @submit-review="submitReview" />
    </section>
</template>

<script>
import { deleteFeedback, getFeedback, updateFeedback } from '../../api/feedbacksApi';
import EditableReviewCard from '../../components/cards/EditableReviewCard.vue';
import ReviewingDialog from '../../components/dialog/ReviewingDialog.vue';

export default {
    name: 'ReviewsSection',
    components: {
        EditableReviewCard,
        ReviewingDialog,
    },
    data() {
        return {
            id: 0,
            reviews: [],
            isReviewDialogVisible: false,
            currentReview: null,
            reviewRating: 0,
            reviewText: '',
        }
    },
    mounted() {
        this.id = localStorage.getItem('id');
        this.loadReviews()
    },
    methods: {
        loadReviews() {
            getFeedback(100, 1, null, null, this.id)
                .then((reviews) => {
                    this.reviews = reviews;
                })
                .catch((error) => {
                    console.error('Ошибка загрузки отзывов:', error);
                });
        },
        editReview(review) {
            this.currentReview = review
            this.reviewRating = this.currentReview.stars
            this.reviewText = this.currentReview.feedback
            this.isReviewDialogVisible = true
        },
        submitReview(text, rating) {
            updateFeedback(text, this.currentReview.record_id, rating)
                .then(() => {
                    this.loadReviews()
                })
                .catch((error) => {
                    console.error('Ошибка загрузки отзывов:', error);
                });
        },
        deleteReview(review) {
            deleteFeedback(review.record_id)
                .then(() => {
                    this.loadReviews()
                })
                .catch((error) => {
                    console.error('Ошибка загрузки отзывов:', error);
                });
        }
    }
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