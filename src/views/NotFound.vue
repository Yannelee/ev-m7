<template>
  <div class="notFound">
    <div class="background"></div>
    <h1 class="notFound__text">LA PÁGINA SOLICITADA NO EXISTE</h1>
    <router-link to="/">VOLVER A INICIO</router-link>  
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .background{
    height: 100vh !important;
    width: 100% !important;
    background-color: #D9AFD9;
    background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .notFound__text{
    font-size: 3rem;
  }
</style>