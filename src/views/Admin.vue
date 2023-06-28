<template>
  <v-container>
    <h1>Administración</h1>
    <Table/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from "@/components/Table.vue";
export default {
  name:'admin-comp',
  components:{
    Table
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

<style>

</style>