<template>
    <div class="error-page">
      <h1>{{ errorCode }}</h1>
      <p>{{ errorMessage }}</p>
      <router-link to="/auth/login">Вернуться на главную</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorPage',
    props: {
      errorCode: {
        type: Number,
        default: 404,
      },
      errorMessage: {
        type: String,
        default: 'Страница не найдена',
      },
    },
  };
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 6rem;
    color: #0F4EB3;
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  a {
    color: #0F4EB3;
    text-decoration: underline;
  }
  </style>
  