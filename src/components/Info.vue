<template>
  <div class="my-3">
    <v-alert dense outlined color="purple" class="text-left">
      <v-icon color="purple">mdi-account-multiple</v-icon> Cantidad total de alumnos permitidos: <strong>{{info.permitidos}}</strong> alumnos.
    </v-alert>
    <v-alert dense outlined color="brown" class="text-left">
      <v-icon color="brown">mdi-account-check</v-icon> Cantidad total de alumnos inscritos: <strong>{{info.inscritos}}</strong> alumnos.
    </v-alert>
    <v-alert dense outlined color="teal" class="text-left">
      <v-icon color="teal">mdi-account-plus</v-icon> Cantidad total de cupos restantes: <strong>{{info.permitidos - info.inscritos}}</strong> alumnos.
    </v-alert>
    <v-alert dense outlined color="pink" class="text-left">
      <v-icon color="pink">mdi-playlist-remove</v-icon> Cantidad total de cursos terminados: <strong>{{info.terminados}}</strong> cursos.
    </v-alert>
    <v-alert dense outlined color="blue" class="text-left">
      <v-icon color="blue">mdi-playlist-check</v-icon> Cantidad total de cursos activos: <strong>{{info.activos}}</strong> cursos.
    </v-alert>
    <v-alert dense outlined color="orange" class="text-left">
      <v-icon color="orange">mdi-bell-ring</v-icon> Cantidad total de cursos: <strong>{{info.cursos}}</strong> cursos.
    </v-alert>
  </div>
</template>

<script>
export default {
  name:'info-comp',
  props:{
    info:{
      type:Object
    }
  }
}
</script>

<style>
  .v-alert__wrapper{
    text-align: left !important;
  }
</style>