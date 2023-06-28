<template>
  <div class="home">
    <v-container class="coursesList">
    <h1 class="">LISTA DE CURSOS</h1>
      <v-row class="justify-space-around">
        <Card :v-if="course!=undefined" v-for="course in courses" :key="course.nombre" :course="course"/>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/Cards.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'home-comp',
  components: {
    Card, 
  },
  computed:{
    ...mapState(['courses']),
  },
  methods:{
    ...mapActions(['getCourses']),
  },
  created(){
    this.getCourses()
  }
}
</script>
