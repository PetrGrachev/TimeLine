<template>
    <section class="section-container">
      <h2>Информация</h2>
      <div class="info-item">
        <i class="fas fa-phone"></i>
        <p>+7 999 666 5252</p>
      </div>
      <div class="info-item">
        <i class="fas fa-map-marker-alt"></i>
        <p>ул. Магомета Гаджиева, 16, Махачкала</p>
      </div>
      <div class="info-item">
        <i class="fas fa-clock"></i>
        <p>24/7</p>
      </div>
      <div class="info-item">
        <i class="fas fa-envelope"></i>
        <p>oldboybarbershop.com</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'InfoSection',
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
  
</style>
  