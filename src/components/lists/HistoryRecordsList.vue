<template>
    <RecordsList :orders="orders">
        <template #actions="{ order }">
            <button @click.stop="handleLeaveReview(order)" class="action-button" :class="{ 'reviewed': order.reviewed }"
                :disabled="order.reviewed">
                <i :class="order.reviewed ? 'fas fa-check' : 'fas fa-comment'"></i>
                {{ order.reviewed ? 'Отзыв оставлен' : 'Оставить отзыв' }}
            </button>
            <button @click.stop="handleRepeatOrder(order)" class="action-button">
                <i class="fas fa-redo-alt"></i> Повторить
            </button>
        </template>
    </RecordsList>
</template>

<script>
import RecordsList from './RecordsList.vue';

export default {
    components: {
        RecordsList,
    },
    props: {
        orders: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleLeaveReview(order) {
            this.$emit('leave-review', order);
        },
        handleRepeatOrder(order) {
            this.$emit('repeat-order', order);
        },
    }
}
</script>

<style>
.action-button {
    padding: 8px 12px;
    background-color: #0F4EB3;
    color: var(--light-text);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.action-button:hover {
    background-color: #1A6CDB;
}

.action-button.reviewed {
    background-color: #28a745;
    /* Зеленый цвет */
    cursor: default;
}

.action-button.reviewed:hover {
    transform: none;
    /* Убираем анимацию наведения */
}
</style>