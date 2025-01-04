<template>
    <Dialog :visible="isVisible" @update:visible="$emit('update:isVisible', $event)" modal header="Расписание работника"
        :style="{ width: '50rem' }">
        <div class="timetable-dialog-container">
            <div class="timetable-form-container">
                <label>Продолжительность сеанса:</label>
                <InputNumber v-model="session_duration" suffix="  минут" />
                <!-- Формируем расписание по дням недели -->
                <div v-for="(day, index) in days" :key="index" class="form-group day-row">
                    <div class="day-checkbox">
                        <Checkbox v-model="localTimetable[day].enabled" binary />
                        <label>{{ day }}</label>
                    </div>

                    <div class="time-inputs">
                        <label>С:</label>
                        <InputMask v-model="localTimetable[day].start" mask="99:99" placeholder="Часы открытия"
                            :disabled="!localTimetable[day].enabled" />
                        <label>До:</label>
                        <InputMask v-model="localTimetable[day].over" mask="99:99" placeholder="Часы закрытия"
                            :disabled="!localTimetable[day].enabled" />
                    </div>
                </div>

                <!-- Кнопка для сохранения расписания -->
                <div class="submit-button-container">
                    <Button :label=buttonLabel @click="handleSaveTimetable" class="action-button" />
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
import InputNumber from 'primevue/inputnumber';
//TODO Сделать нормально по визуалу
export default {
    name: 'EmployeeDialog',
    components: {
        Dialog,
        Button,
        Checkbox,
        InputMask,
        InputNumber,
    },
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        schedule: {//TODO сделать передачу параметра в интерфейс
            type: Object,
            default: () => { },
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
            session_duration: 0,
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
                        this.session_duration = this.schedule.session_duration

                        this.days.forEach((day) => {
                            const weekdayNumber = weekdaysMap[day]; // Определяем номер дня недели
                            const matchingTimetableEntry = this.schedule.schedule.find(entry => entry.weekday === weekdayNumber); // Ищем соответствие в timetable

                            if (matchingTimetableEntry) {
                                // Если данные для дня недели есть
                                this.localTimetable[day] = {
                                    enabled: true,
                                    start: matchingTimetableEntry.start,
                                    over: matchingTimetableEntry.over,
                                };
                            } else {
                                // Если данных для дня недели нет
                                this.localTimetable[day] = {
                                    enabled: false,
                                    start: null,
                                    over: null,
                                };
                            }
                        });
                    }
                    else {
                        this.days.forEach((day) => {
                            this.localTimetable[day] = {
                                enabled: false,
                                start: null,
                                over: null,
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
                    start: this.localTimetable[day].start || null, // Часы открытия
                    over: this.localTimetable[day].over || null, // Часы закрытия
                }));
            console.log("Расписание работника: ", activeTimetable)
            if (this.isEditing) {
                this.$emit('update-schedule', activeTimetable, this.session_duration);
            } else {
                this.$emit('create-schedule', activeTimetable, this.session_duration);
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
.service-dialog-container {
    padding: 16px;
}

.service-form-container {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 16px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.mb-4 {
    margin-bottom: 16px;
}

.submit-button-container {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    width: 120px;
}
</style>