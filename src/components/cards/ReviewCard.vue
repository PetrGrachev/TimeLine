<template>
    <div class="review-card">
        <!-- Рейтинг -->
        <div class="review-header">
            <Rating v-model="localStars" :stars="5" cancel="false" readonly class="review-rating" />
            <p class="review-author">Имя Фамилия</p>
        </div>

        <!-- Текст отзыва -->
        <p class="review-feedback">{{ review.feedback }}</p>
    </div>
</template>

<script>
import Rating from 'primevue/rating';

export default {
    components: {
        Rating,
    },
    props: {
        review: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            localStars: this.review.stars,
        };
    },
};
</script>

<style scoped>
.review-card {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--card-background-color);
    margin: 10px auto;
}

.review-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.review-rating {
    flex-shrink: 0;
    /* Рейтинг занимает минимальное место */
}

.review-author {
    font-weight: bold;
    color: var(--text-color);
    margin-left: 15px;
    /* Отступ от рейтинга */
    flex-grow: 1;
    /* Имя автора растягивается, занимая оставшееся пространство */
    text-align: left;
}

.review-feedback {
    font-size: 1rem;
    color: var(--text-color-secondary);
    line-height: 1.6;
    /* Для удобного чтения */
    margin-top: 10px;
    text-align: justify;
    /* Выравнивание текста */
}
</style>