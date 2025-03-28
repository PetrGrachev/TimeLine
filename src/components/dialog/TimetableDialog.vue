<template>
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Добавить расписание"
        :style="{ width: '50rem' }">
        <div class="timetable-dialog-container">
            <div class="timetable-form-container">
                <!-- Формируем расписание по дням недели -->
                <div v-for="(day, index) in days" :key="index" class="form-group day-row">
                    <div class="day-checkbox">
                        <Checkbox v-model="localTimetable[day].enabled" binary />
                        <label><i class="fas fa-calendar-day"></i> {{ day }}</label>
                    </div>

                    <div class="time-inputs">
                        <label><i class="fas fa-clock"></i> С:</label>
                        <InputMask v-model="localTimetable[day].open" mask="99:99" placeholder="Часы открытия"
                            :disabled="!localTimetable[day].enabled" />
                        <label>До:</label>
                        <InputMask v-model="localTimetable[day].close" mask="99:99" placeholder="Часы закрытия"
                            :disabled="!localTimetable[day].enabled" />
                    </div>

                    <div class="break-time-inputs">
                        <label><i class="fas fa-coffee"></i> Перерыв С:</label>
                        <InputMask v-model="localTimetable[day].break_start" mask="99:99" placeholder="Начало перерыва"
                            :disabled="!localTimetable[day].enabled" />
                        <label>До:</label>
                        <InputMask v-model="localTimetable[day].break_end" mask="99:99" placeholder="Конец перерыва"
                            :disabled="!localTimetable[day].enabled" />
                    </div>
                </div>

                <!-- Кнопка для сохранения расписания -->
                <div class="submit-button-container">
                    <Button :label="buttonLabel" @click="handleSaveTimetable" class="action-button" />
                </div>
            </div>
        </div>
    </Dialog>
</template>


<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputMask from 'primevue/inputmask';
//TODO Сделать нормально по визуалу
export default {
    name: 'EmployeeDialog',
    components: {
        Dialog,
        Button,
        Checkbox,
        InputMask,
    },
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        timetable: {//TODO сделать передачу параметра в интерфейс
            type: Array,
            default: () => [],
        },
        isEditing: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            days: [
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
                "Воскресенье",
            ],
            localTimetable: {},
        };
    },
    computed: {
        buttonLabel() {
            return this.isEditing ? "Сохранить" : "Создать"; // Возвращает текст кнопки
        },
    },
    watch: {
        isVisible: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    const weekdaysMap = {
                        "Понедельник": 1,
                        "Вторник": 2,
                        "Среда": 3,
                        "Четверг": 4,
                        "Пятница": 5,
                        "Суббота": 6,
                        "Воскресенье": 7,
                    };

                    if (this.isEditing) {

                        this.days.forEach((day) => {
                            const weekdayNumber = weekdaysMap[day]; // Определяем номер дня недели
                            const matchingTimetableEntry = this.timetable.find(entry => entry.weekday === weekdayNumber); // Ищем соответствие в timetable

                            if (matchingTimetableEntry) {
                                // Если данные для дня недели есть
                                this.localTimetable[day] = {
                                    enabled: true,
                                    open: matchingTimetableEntry.open,
                                    close: matchingTimetableEntry.close,
                                    break_start: matchingTimetableEntry.break_start,
                                    break_end: matchingTimetableEntry.break_end,
                                };
                            } else {
                                // Если данных для дня недели нет
                                this.localTimetable[day] = {
                                    enabled: false,
                                    start: null,
                                    over: null,
                                    break_start: null,
                                    break_end: null,
                                };
                            }
                        });
                    }
                    else {
                        this.days.forEach((day) => {
                            this.localTimetable[day] = {
                                enabled: false,
                                open: null,
                                close: null,
                                break_start: null,
                                break_end: null,
                            };
                        });
                    }
                }
            }
        }
    },

    methods: {
        handleSaveTimetable() {
            // Сопоставляем дни недели с их числовым значением
            const weekdaysMap = {
                "Понедельник": 1,
                "Вторник": 2,
                "Среда": 3,
                "Четверг": 4,
                "Пятница": 5,
                "Суббота": 6,
                "Воскресенье": 7,
            };

            const activeTimetable = Object.keys(this.localTimetable)
                .filter((day) => this.localTimetable[day].enabled) // Оставляем только включённые дни
                .map((day) => ({
                    weekday: weekdaysMap[day], // Преобразуем день в числовое значение
                    open: this.localTimetable[day].open || null, // Часы открытия
                    close: this.localTimetable[day].close || null, // Часы закрытия
                    break_start: this.localTimetable[day].break_start || null, // Начало перерыва
                    break_end: this.localTimetable[day].break_end || null, // Конец перерыва
                }));
            console.log("Расписание: ", activeTimetable)
            if (this.isEditing) {
                this.$emit('update-timetable', activeTimetable);
            } else {
                this.$emit('create-timetable', activeTimetable);
            }

            this.resetDialog(); // Сброс состояния диалога
        },
        resetDialog() {
            this.localService = {
                name: '',
                description: '',
                cost: '',
            };
            this.$emit('update:isVisible', false);
        },
    },
};
</script>

<style scoped>
.timetable-dialog-container {
    padding: 16px;
}

.timetable-form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.day-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
}

.time-inputs,
.break-time-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
}

.submit-button-container {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    width: 120px;
}
</style>