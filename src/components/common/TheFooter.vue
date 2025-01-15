<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>О компании</h3>
        <p>Мы предоставляем лучшие услуги в индустрии. Узнайте больше о нас и нашей команде.</p>
      </div>
      <div class="footer-section">
        <h3>Контакты</h3>
        <ul>
          <li><i class="pi pi-phone"></i> +7 999 123-45-67</li>
          <li><i class="pi pi-envelope"></i> info@company.com</li>
          <li><i class="pi pi-map-marker"></i> Каширское шоссе, д. 31, Москва, Россия</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Полезные ссылки</h3>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contact">Контакты</router-link></li>
          <li><router-link to="/privacy">Политика конфиденциальности</router-link></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} TimeLine. Все права защищены.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.site-footer {
  margin-top: 80px;
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 10px 0;
  font-family: "Century Gothic", sans-serif;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
}

.footer-section {
  max-width: 300px;
}

.footer-section h3 {
  font-weight: bold;
  margin-bottom: 5px;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 5px;
}

.footer-section a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #1A6CDB;
}

.footer-bottom {
  text-align: center;
  padding: 5px;
  border-top: 1px solid var(--border-color);
}
</style>