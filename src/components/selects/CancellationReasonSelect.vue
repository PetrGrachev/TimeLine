<template>
    <Select v-model="selectedValue" :options="cancellationReasons" optionLabel="label" optionValue="value"
        placeholder="Изменились планы" @change="handleChange" class="custom-select" />
</template>

<script>
import Select from 'primevue/select';

export default {
    name: 'CancellatonReasonSelect',
    components: {
        Select,
    },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            cancellationReasons: [
                { label: 'Изменились планы', value: 'plans_changed' },
                { label: 'Долгое ожидание', value: 'long_wait' },
                { label: 'Нашёл другую организацию', value: 'found_alternative' },
                { label: 'Слишком высокая цена', value: 'price_too_high' },
                { label: 'Плохие отзывы', value: 'bad_reviews' },
                { label: 'Неудобное время', value: 'inconvenient_time' },
                { label: 'Проблемы с местоположением', value: 'location_issues' },
                { label: 'Другое', value: 'other' },
            ]
        };
    },
    computed: {
        selectedValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
    methods: {
        handleChange() {
            this.$emit('change');
        },
    },
};
</script>

<style scoped>
:deep(.p-select-dropdown) {
    background-color: var(--background-color);
    /* Фон select */
    color: var(--text-color);
    /* Цвет текста */
    border-radius: 0px;

}

:deep(.p-select-label) {
    background-color: var(--background-color);
    /* Фон select */
    color: var(--text-color);
    /* Цвет текста */
    border-radius: 0px;

}

.custom-select {
    border-color: var(--border-color) !important;
    border-width: 2px !important;
    border-radius: 8px;
}
</style>