<template>
    <ReviewCard :review="review">
        <template #actions>
            <Button @click="editReview">Редактировать</Button>
            <Button @click="deleteReview">Удалить</Button>
        </template>
    </ReviewCard>
</template>

<script>
import Button from 'primevue/button';
import ReviewCard from './ReviewCard.vue';

export default {
    components: {
        ReviewCard,
        Button,
    },
    props: {
        review: {
            type: Object,
            requered: true,
        }
    },
    methods: {
        editReview() {
            this.$emit('edit', this.review)
        },
        deleteReview() {
            this.$emit('delete', this.review)
        },
    }
}
</script>