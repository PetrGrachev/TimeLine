<template>
    <div class="order-history">
        <nav class="top-nav">
            <button @click="changeSection('EmployeeManaging')"
                :class="{ active: currentTab === 'EmployeeManaging' }">Cотрудники</button>
            <button @click="changeSection('ServicesManaging')"
                :class="{ active: currentTab === 'ServicesManaging' }">Услуги</button>
            <button @click="changeSection('ScheduleManaging')"
                :class="{ active: currentTab === 'ScheduleManaging' }">Расписание</button>
            <button @click="changeSection('ImagesManaging')"
                :class="{ active: currentTab === 'ImagesManaging' }">Изображения</button>
        </nav>
        <router-view />
    </div>

</template>


<script>

export default {
    data() {
        return {
            currentTab: 'EmployeeManaging',
        }
    },
    methods: {
        changeSection(section) {
            this.currentTab = section;
            const routeName = section.charAt(0).toUpperCase() + section.slice(1);
            this.$router.push({ name: routeName }); // Навигация через this.$router
        },
    }
}
</script>
<style scoped>
.order-history {
    margin-top: 20px;
    width: 100%;
}

.top-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.top-nav button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: var(--input-background-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
    background-color: #0F4EB3;
    color: var(--input-background-color);
}

.top-nav button:hover {
    background-color: var(--button-hover);
}
</style>