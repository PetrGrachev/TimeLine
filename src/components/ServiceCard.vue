<template>
    <h3 class="service-name">{{ service.name }}</h3>
    <p class="service-description">{{ service.description }}</p>
    <p class="service-price"><strong>{{ service.cost }} ₽</strong></p>
    <div class="service-actions">
        <slot name="actions"></slot>
    </div>
</template>

<script>
export default {
    props: {
        service: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
/* Service card */
.service-card {
    padding: 20px;
    background-color: var(--card-background-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.service-card:hover {
    background-color: var(--background-color);
}

.service-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.service-description {
    font-size: 14px;
    margin-bottom: 10px;
    color: #555;
}

.service-price {
    font-size: 16px;
    font-weight: bold;
    color: #0F4EB3;
}
</style>