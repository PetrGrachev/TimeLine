<template>
    <!-- Если есть аватарка, показываем изображение -->
    <Avatar v-if="avatarUrl" :image="avatarUrl" class="mr-2" size="normal" shape="circle" />

    <!-- Если аватарки нет, показываем первую букву имени -->
    <Avatar v-else :label="getInitial(name)" :style="getAvatarStyle(name)" class="mr-2" size="normal" shape="circle" />
</template>

<script>
import Avatar from 'primevue/avatar';

export default {
    components: {
        Avatar,
    },
    props: {
        avatarUrl: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    methods: {
        getInitial(name) {
            if (!name) return 'N';
            return name.charAt(0).toUpperCase(); // Берем первую букву и делаем её заглавной
        },
        getAvatarStyle(name) {
            const colors = [
                { backgroundColor: '#A1C4FD', color: '#2A2A2A' }, // Светло-голубой
                { backgroundColor: '#C3F0CA', color: '#2A2A2A' }, // Мятный
                { backgroundColor: '#FDE2E4', color: '#2A2A2A' }, // Светло-розовый
                { backgroundColor: '#FFF1B8', color: '#2A2A2A' }, // Светло-жёлтый
                { backgroundColor: '#D7D3F5', color: '#2A2A2A' }, // Сиреневый
                { backgroundColor: '#FFE4C0', color: '#2A2A2A' }, // Персиковый
            ];

            // Генерируем индекс на основе имени пользователя
            const index = Math.abs([...name].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;

            // Возвращаем соответствующий стиль
            return colors[index];
        },
    }
}
</script>

<style scoped></style>