<template>
    <div class="avatar-container">
        <!-- Аватарка пользователя -->
        <UserAvatar :avatarUrl="uuid" :name="name" class="avatar" />

        <!-- Кнопка удаления (крестик) -->
        <button class="delete-button" @click="$emit('delete', uuid)">
            <i class="fas fa-times"></i>
        </button>

        <!-- Скрытый input[type="file"], стилизованный как кнопка -->
        <label class="edit-button">
            <input type="file" accept="image/*" @change="handlePhotoUpload" class="hidden-upload" />
            <i class="fas fa-pencil-alt"></i>
        </label>
    </div>
</template>

<script>
import UserAvatar from './UserAvatar.vue';

export default {
    components: {
        UserAvatar,
    },
    props: {
        uuid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    methods: {
        handlePhotoUpload(event) {
            const file = event.target.files[0];
            this.$emit("upload", file)
        }
    }
}
</script>

<style scoped>
.avatar-container {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Полностью скрытый FileUpload */
.hidden-upload {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}

/* Кнопка редактирования (значок карандаша) */
.edit-button {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #0F4EB3;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-size: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* При наведении кнопка увеличивается */
.edit-button:hover {
    background-color: #1A6CDB;
    transform: scale(1.1);
}

/* Кнопка удаления (крестик) */
.delete-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-size: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* При наведении кнопка увеличивается */
.delete-button:hover {
    background-color: #c0392b;
    transform: scale(1.1);
}
</style>