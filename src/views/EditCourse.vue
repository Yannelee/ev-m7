<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container class="px-10">
      <h1>Editar Curso: {{ selectedCourse.nombre }}</h1>
      <v-row>
        <v-col>
          <v-text-field
            v-model="selectedCourse.nombre"
            :rules="inputRequired"
            label="Nombre del Curso"
            required
          ></v-text-field>

          <v-text-field
            v-model.number="selectedCourse.cupos"
            :rules="inputRequired.concat(numberRules)"
            label="Cupos"
            required
          ></v-text-field>

          <v-text-field
            v-model.number="selectedCourse.inscritos"
            :rules="inputRequired.concat(numberRules)"
            label="Inscritos"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="selectedCourse.costo"
            :rules="inputRequired"
            label="Costo"
            required
          ></v-text-field>

          <v-text-field
            v-model="selectedCourse.duracion"
            :rules="inputRequired"
            label="Duración"
            required
          ></v-text-field>


          <v-text-field
            v-model="selectedCourse.fecha_registro"
            label="Fecha Registro"
            required
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field
        v-model="selectedCourse.img"
        :rules="inputRequired.concat(urlRules)"
        label="URL imagen"
        required
      ></v-text-field>

      <v-textarea
        v-model="selectedCourse.descripcion"
        :rules="inputRequired"
        label="Descripción"
        rows="1"
        auto-grow
        outlined
        required
      ></v-textarea>

      <v-checkbox
        v-model="selectedCourse.completado"
        label="Curso completado"
        required
      ></v-checkbox>

      <v-alert v-if="cupos" type="error">La cantidad de inscritos no debe ser mayor que la cantidad de cupos.</v-alert>

      <v-btn color="error" to="/admin" class="mx-2">
        Cancelar y Volver
      </v-btn>

      <v-btn color="success" @click="edit()" class="mx-2">
        Editar
      </v-btn>

    </v-container>
  </v-form>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name:'edit-comp',
  data () {
    return {
      valid: true,
      cupos: false,
      inputRequired:[v => !!v || 'Debes completar este campo'],
      urlRules: [v => /^(http)+/.test(v) || 'URL debe ser válida'],
      numberRules: [v => /[0-9]+/.test(v) || 'Sólo se permiten numeros'],
    }
  },
  computed:{
    ...mapState(['selectedCourse']),
  },
  methods:{
    ...mapActions(['updateCourses']),

    edit(){
      if(this.selectedCourse.inscritos <= this.selectedCourse.cupos){
        if(this.selectedCourse.completado === true) this.selectedCourse.inscritos = 0
        this.updateCourses(this.selectedCourse)
        this.$router.push('/admin')
      } else{
        this.cupos = true
      }
    },
  },
  created(){
    if(!this.selectedCourse.nombre) this.$router.push('/error')
  },
}
</script>

<style>

</style>