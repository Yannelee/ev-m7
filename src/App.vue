<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import  Navbar from "@/components/Navbar.vue";
export default {
  name: 'App',
  components:{
    Navbar
  },
  data: () => ({
    //
  }),
};
</script>

<style>
#app{
  text-align: center;
}
  .theme--light.v-application{
    background-color: transparent;
  }
</style>
