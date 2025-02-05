<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal :header="text"
        :style="{ width: '30rem', textAlign: 'center' }">
        <div class="dialog-content">
            <div class="button-group">
                <Button @click="handleYes" class="action-button confirm">Да</Button>
                <Button @click="handleNo" class="action-button cancel">Нет</Button>
            </div>
        </div>
    </Dialog>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'DeletionDialog',
    components: {
        Dialog,
        Button,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    },
    data() {
        return {

        };
    },
    methods: {
        handleYes() {
            this.$emit('yes')
        },
        handleNo() {
            this.$emit('no')
        }
    },
};
</script>

<style scoped>
.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button-group {
    display: flex;
    gap: 15px;
    /* Отступ между кнопками */
    justify-content: center;
    width: 100%;
}

/* Кнопки */
.action-button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    min-width: 100px;
    /* Минимальная ширина для одинаковых кнопок */
}

/* Кнопка "Да" */
.action-button.confirm {
    background-color: #0F4EB3;
    color: white;
}

.action-button.confirm:hover {
    background-color: #1A6CDB;
    transform: scale(1.05);
}

/* Кнопка "Нет" */
.action-button.cancel {
    background-color: #ccc;
    color: #333;
}

.action-button.cancel:hover {
    background-color: #bbb;
    transform: scale(1.05);
}
</style>