<template>
    <div class="org-timetable-card">
        <div v-if="timetable && timetable.length > 0">
            <OrgTimetable :timetable="timetable">
                <template #actions>
                    <Button @click="updateTimetable" class="action-button">Изменить</Button>
                    <Button @click="deleteTimetable" class="action-button">Удалить</Button>
                </template>
            </OrgTimetable>
        </div>
        <div v-else>
            <p><strong>Нет расписания</strong></p>
            <Button label="Добавить расписание" @click="createTimetable" class="action-button" />
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button';
import OrgTimetable from '@/components/timetable/OrgTimetable.vue';

export default {
    components: {
        OrgTimetable,
        Button,
    },
    props: {
        timetable: {
            type: Object,
            required: true,
        }
    },
    methods: {
        updateTimetable() {
            this.$emit('updateTimetable', this.timetable);
        },
        createTimetable() {
            this.$emit('createTimetable');
        },
        deleteTimetable() {
            this.$emit('deleteTimetable');
        }
    },
};
</script>

<style scoped>
.org-timetable-card {
    display: flex;
    flex-direction: column;
    /* Элементы располагаются вертикально */
    align-items: flex-start;
    /* Все элементы выравнены по левому краю */
    border: 1px solid var(--border-color);
    /* Обводка карточки */
    padding: 16px;
    /* Внутренние отступы */
    margin-top: 16px;
    /* Отступ сверху */
    border-radius: 8px;
    /* Скруглённые углы */
    background-color: var(--transparent-color);
    /* Цвет фона */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* Тень */
}

.action-button {
    align-self: flex-end;
    /* Кнопка выравнивается по правому краю */
    margin-top: 8px;
    /* Отступ сверху для кнопки */
}
</style>