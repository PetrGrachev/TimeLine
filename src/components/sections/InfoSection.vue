<template>
  <section class="section-container">
    <h2>Информация</h2>
    <div class="info-item">
      <i class="fas fa-phone"></i>
      <p>{{ org.telephone }}</p>
    </div>
    <div class="info-item">
      <i class="fas fa-map-marker-alt"></i>
      <p>{{ org.address }}, {{ org.city }}</p>
    </div>
    <div class="info-item">
      <i class="fas fa-clock"></i>
      
      
      <div class="timetable">
        <div v-for="day in org.timetable" :key="day.weekday" class="timetable-day">
          <strong>{{ getWeekdayName(day.weekday) }}:</strong>
          <span v-if="day.open && day.close">
            {{ day.open }} - {{ day.close }}
            <span v-if="day.break_start && day.break_end">
              (Перерыв: {{ day.break_start }} - {{ day.break_end }})
            </span>
          </span>
          <span v-else>Выходной</span>
        </div>
      </div>
      
    </div>
  </section>
</template>
  
  <script>
  export default {
    name: 'InfoSection',
    props:{
      org:{
      type: Object,
      required: true,
      }
    },
    methods: {
    getWeekdayName(weekday) {
      const weekdays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
      ];
      return weekdays[weekday - 1]; // Учитываем, что weekday начинается с 1
    },
  },
  };
  </script>

  <style scoped>
  /* General section styles */
  .section-container {
    padding: 20px;
    margin: 20px;
    background-color: var(--transparent-color);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Info section with icons */
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .info-item i {
    margin-right: 10px;
  }
  
  .timetable {
  display: flex;
  flex-direction: column; /* Располагаем элементы в колонку */
  gap: 5px; /* Добавляем небольшой отступ между днями */
}

.timetable-day {
  display: flex;
  align-items: center;
  gap: 5px; /* Отступ между днем недели и временем */
}
</style>
  