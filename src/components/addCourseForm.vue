<template>
  <div>
    <v-text-field
      v-model="newCourse.nombre"
      :rules="inputRequired"
      label="Nombre del Curso"
      required
    ></v-text-field>

    <v-text-field
      v-model="newCourse.img"
      :rules="inputRequired.concat(urlRules)"
      label="URL imagen"
      required
    ></v-text-field>

    <v-text-field
      v-model.number="newCourse.cupos"
      :rules="inputRequired.concat(numberRules)"
      label="Cupos"
      required
    ></v-text-field>

    <v-text-field
      v-model.number="newCourse.inscritos"
      :rules="inputRequired.concat(numberRules)"
      label="Inscritos"
      required
    ></v-text-field>

    <v-text-field
      v-model.number="newCourse.costo"
      :rules="inputRequired"
      label="Costo"
      required
    ></v-text-field>

    <v-text-field
      v-model="newCourse.duracion"
      :rules="inputRequired"
      label="Duración"
      required
    ></v-text-field>

    <v-text-field
      v-model="newCourse.descripcion"
      :rules="inputRequired"
      label="Descripción"
      required
    ></v-text-field>

    <v-text-field
      v-model="newCourse.fecha_registro"
      label="Fecha Registro"
      required
      disabled
    ></v-text-field>

    <v-checkbox
      v-model="newCourse.completado"
      label="Curso Terminado?"
      required
    ></v-checkbox>

    <v-alert v-if="cupos" type="error">La cantidad de inscritos no debe ser mayor que la cantidad de cupos.</v-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
  export default {
    name: 'addCourse-comp',
    props:{
      cupos:{
        type: Boolean
      }
    },
    data: () => ({
      inputRequired:[v => !!v || 'Debes completar este campo'],
      urlRules: [v => /^(http)+/.test(v) || 'URL debe ser válida'],
      numberRules: [v => /[0-9]+/.test(v) || 'Sólo se permiten numeros'],
    }),
    computed:{
      ...mapState(['newCourse'])
    },
  }
</script>

<style>

</style>