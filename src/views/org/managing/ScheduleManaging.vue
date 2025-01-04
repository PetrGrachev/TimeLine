<template>
    <div>
        <h2>Расписание организации</h2>
        <OrgTimetableEditable :timetable="timetable" @updateTimetable="updateTimetableDialog"
            @deleteTimetable="removeTimetable" @createTimetable="createTimetableDialog" />

        <h2>Расписание сотрудников</h2>
        <div v-for="pair in workerSchedules" :key="pair.worker.worker_id" class="worker-schedule-card">
            <WorkerSchedule :worker="pair.worker" :schedule="pair.schedule" @updateSchedule="updateScheduleDialog"
                @createSchedule="createScheduleDialog" @deleteSchedule="removeSchedule" />
        </div>
        <TimetableDialog :isVisible="isVisible" @update:isVisible="isVisible = $event" :timetable="timetable"
            :isEditing="isEditing" @create-timetable="createTimetable" @update-timetable="changeTimetable" />

        <ScheduleDialog :isVisible="isVisibleSchedule" @update:isVisible="isVisibleSchedule = $event"
            :schedule="selectedSchedule" :isEditing="isEditingSchedule" @create-schedule="createSchedule"
            @update-schedule="changeSchedule" />
    </div>
</template>

<script>
import { AddSchedule, deleteSchedule, getSchedules, updateSchedule } from '../../../api/scheduleApi';
import { addTimetable, deleteTimetable, getTimetable, updateTimetable } from '../../../api/timetableApi';
import { getWorkers } from '../../../api/workersApi';
import ScheduleDialog from '../../../components/dialog/ScheduleDialog.vue';
import TimetableDialog from '../../../components/dialog/TimetableDialog.vue';
import OrgTimetableEditable from '../../../components/OrgTimetableEditable.vue';
import WorkerSchedule from '../../../components/WorkerSchedule.vue';

export default {
    components: {
        OrgTimetableEditable,
        WorkerSchedule,
        TimetableDialog,
        ScheduleDialog,
    },
    data() {
        return {
            timetable: null,
            schedules: [],
            workers: [],
            id: 0,
            isVisible: false,
            isVisibleSchedule: false,
            isEditing: false,
            selectedSchedule: null,
            isEditingSchedule: false,
            selectedWorkerId: 0,
        };
    },
    computed: {
        workerSchedules() {
            // Определяем базовую структуру пустого расписания
            const defaultSchedule = {
                worker_id: null,
                openTime: null,
                closeTime: null,
                breakStart: null,
                breakEnd: null,
            };

            // Создаём массив пар { worker, schedule }
            return this.workers.map(worker => {
                const schedule = this.schedules.find(s => s.worker_id === worker.worker_id) || { ...defaultSchedule, worker_id: worker.id };
                return { worker, schedule };
            });
        },
    },
    mounted() {
        const id = localStorage.getItem('id');
        this.id = id;
        getTimetable(id)
            .then((timetable) => {
                this.timetable = timetable;
                console.log(timetable)
            })
            .catch(error => {
                console.error("Ошибка загрузки timetable:", error);
            });

        getWorkers(id, 100, 1)
            .then((data) => {
                this.workers = data.workers;
            })
            .catch(error => {
                console.error("Ошибка загрузки workers:", error);
            });

        getSchedules(id, 100, 1)
            .then((schedules) => {
                this.schedules = schedules;
            })
            .catch(error => {
                console.error("Ошибка загрузки schedules:", error);
            });
    },
    methods: {
        createTimetableDialog() {
            this.isVisible = true;
            this.isEditing = false;
        },
        updateTimetableDialog() {
            this.isVisible = true;
            this.isEditing = true;
        },
        updateScheduleDialog(schedule, worker) {
            this.isVisibleSchedule = true;
            this.isEditingSchedule = true;
            this.selectedWorkerId = worker.worker_id;
            this.selectedSchedule = schedule;
        },
        createScheduleDialog(worker) {
            this.isVisibleSchedule = true;
            this.isEditingSchedule = false;
            this.selectedWorkerId = worker.worker_id;
        },
        removeTimetable() {
            deleteTimetable(this.id)
                .then(() => {
                })
                .catch(error => {
                    console.error("Ошибка удаления timetable:", error);
                });
        },
        removeSchedule(worker) {
            deleteSchedule(this.id, worker.worker_id)
                .then(() => {
                })
                .catch(error => {
                    console.error("Ошибка удаления schedule:", error);
                });
        },
        createTimetable(newTimetable) {
            addTimetable(this.id, newTimetable)
                .then(() => {
                })
                .catch(error => {
                    console.error("Ошибка создания timetable:", error);
                });
        },
        changeTimetable(newTimetable) {
            this.syncTimetable(this.timetable, newTimetable)
            getTimetable(this.id)
                .then((timetable) => {
                    this.timetable = timetable;
                })
                .catch(error => {
                    console.error("Ошибка загрузки timetable:", error);
                });
        },
        createSchedule(schedule, session_duration) {
            AddSchedule(this.id, this.selectedWorkerId, schedule, session_duration)
                .then(() => {
                    console.log('Расписание:', schedule)
                })
                .catch(error => {
                    console.error("Ошибка изменения schedule:", error);
                });
        },
        changeSchedule(schedule, session_duration) {
            this.syncSchedule(this.selectedSchedule.schedule, schedule, session_duration)
            getWorkers(this.id, 100, 1)
                .then((data) => {
                    this.workers = data.workers;
                })
                .catch(error => {
                    console.error("Ошибка загрузки workers:", error);
                });

            getSchedules(this.id, 100, 1)
                .then((schedules) => {
                    this.schedules = schedules;
                })
                .catch(error => {
                    console.error("Ошибка загрузки schedules:", error);
                });
        },
        syncTimetable(oldTimetable, newTimetable) {
            console.log("Старое расписание:", oldTimetable)
            console.log("Новое расписание:", newTimetable)

            const oldDaysMap = new Map(oldTimetable.map(day => [day.weekday, day]));
            const newDaysMap = new Map(newTimetable.map(day => [day.weekday, day]));

            // Массив для хранения дней, которые нужно обновить
            const daysToUpdate = [];
            const daysToAdd = [];
            // 1. Обновление дней (update)
            for (const [weekday, newDay] of newDaysMap) {
                if (oldDaysMap.has(weekday)) {
                    const oldDay = oldDaysMap.get(weekday);
                    if (oldDay.open !== newDay.open || oldDay.close !== newDay.close || oldDay.break_start !== newDay.break_start || oldDay.break_end !== newDay.break_end) {

                        daysToUpdate.push(newDay);
                        // Если данные отличаются, вызываем update

                    }
                    oldDaysMap.delete(weekday); // Удаляем из старого, так как обработан
                } else {
                    daysToAdd.push(newDay);
                    // 2. Создание новых дней (create)

                }
            }

            // 3. Удаление дней (delete)
            for (const oldDay of oldDaysMap.values()) {
                deleteTimetable(this.id, oldDay.weekday)
                    .then(() => {
                    })
                    .catch(error => {
                        console.error("Ошибка удаления timetable:", error);
                    });
            }

            // 4. Вызов updateTimetable одним запросом
            if (daysToUpdate.length > 0) {
                updateTimetable(this.id, daysToUpdate)
                    .then(() => {
                        console.log('Расписание:', daysToUpdate)
                    })
                    .catch(error => {
                        console.error("Ошибка изменения timetable:", error);
                    });
            }
            if (daysToAdd.length > 0) {
                addTimetable(this.id, daysToAdd)
                    .then(() => {
                        console.log('Расписание:', daysToAdd)
                    })
                    .catch(error => {
                        console.error("Ошибка добавления timetable:", error);
                    });
            }
        },
        syncSchedule(oldSchedule, newSchedule, session_duration) {
            console.log("Старое расписание:", oldSchedule)
            console.log("Новое расписание:", newSchedule)

            const oldDaysMap = new Map(oldSchedule.map(day => [day.weekday, day]));
            const newDaysMap = new Map(newSchedule.map(day => [day.weekday, day]));

            // Массив для хранения дней, которые нужно обновить
            const daysToUpdate = [];
            const daysToAdd = [];
            // 1. Обновление дней (update)
            for (const [weekday, newDay] of newDaysMap) {
                if (oldDaysMap.has(weekday)) {
                    const oldDay = oldDaysMap.get(weekday);
                    if (oldDay.start !== newDay.start || oldDay.over !== newDay.over) {

                        daysToUpdate.push(newDay);
                        // Если данные отличаются, вызываем update

                    }
                    oldDaysMap.delete(weekday); // Удаляем из старого, так как обработан
                } else {
                    daysToAdd.push(newDay);
                    // 2. Создание новых дней (create)

                }
            }

            // 3. Удаление дней (delete)
            for (const oldDay of oldDaysMap.values()) {
                deleteSchedule(this.id, this.selectedWorkerId, oldDay.weekday)
                    .then(() => {
                    })
                    .catch(error => {
                        console.error("Ошибка удаления timetable:", error);
                    });
            }

            // 4. Вызов updateTimetable одним запросом
            if (daysToUpdate.length > 0) {
                updateSchedule(this.id, this.selectedWorkerId, daysToUpdate, session_duration)
                    .then(() => {
                        console.log('Расписание:', daysToUpdate)
                    })
                    .catch(error => {
                        console.error("Ошибка изменения timetable:", error);
                    });
            }
            if (daysToAdd.length > 0) {
                AddSchedule(this.id, this.selectedWorkerId, daysToAdd, session_duration)
                    .then(() => {
                        console.log('Расписание:', daysToAdd)
                    })
                    .catch(error => {
                        console.error("Ошибка добавления timetable:", error);
                    });
            }
        },
    }
};
</script>
<style scoped>
.worker-schedule-card {
    display: flex;
    flex-direction: column;
    /* Карточка выравнивает содержимое по вертикали */
    align-items: flex-start;
    /* Все элементы выровнены по левому краю */
    border: 1px solid var(--border-color);
    /* Обводка карточки */
    padding: 16px;
    /* Внутренние отступы */
    margin-top: 16px;
    /* Отступ сверху между карточками */
    border-radius: 8px;
    /* Скруглённые углы */
    background-color: var(--transparent-color);
    /* Прозрачный или заданный цвет фона */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* Тень */
}
</style>