<template>
  <v-container class="table">
    <v-data-table
      :headers="headers"
      :items="courses"
      class="elevation-1"
    >
      <template v-slot:[`item.costo`]="{ item }">
        <v-chip color="green" dark v-if="item.costo">
          {{ (item.costo).toLocaleString('es-CL', {style:'currency', currency:'CLP'})}}
        </v-chip>
      </template>
      <template v-slot:[`item.fecha_registro`]="{ item }">
        <v-chip color="green"  dark>
          {{ item.fecha_registro }}
        </v-chip>
      </template>
      <template v-slot:[`item.completado`]="{ item }">
        <v-chip :color="(item.completado === true) ? 'primary' :'secondary'" dark>
          {{ item.completado === true ? 'Si' :'No' }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" color="orange" @click="editItem(item.nombre)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteItem(item.nombre)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="init">
          Reset
        </v-btn>
      </template>
    <template v-slot:top>
        <v-btn color="primary" @click="addNewCourse" >AGREGAR CURSO</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Agregar Nuevo Curso</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <Form :cupos="cupos"/>
                  </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="cancel">
                Cancelar
              </v-btn>
              <v-btn color="success" @click="guardar">
                Agregar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Confirma que quiere eliminar el curso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialogDelete = false">Cancelar</v-btn>
              <v-btn color="success" text @click="remove">Confirmo</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    </v-data-table>
    <Info :info="totalAlumnos"/>
  </v-container>
</template>

<script>
import Info from '@/components/Info.vue'
import Form from '@/components/addCourseForm.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name:'table-com',
  components:{
    Info,
    Form,
  },
  props:{
  },
  data () {
    return {
      valid: true,
      dialog: false,
      dialogDelete: false,
      courseToDelete: -1,
      route:'',
      cupos: false,
    }
  },
  computed:{
    ...mapState(['headers', 'courses', 'newCourse']),
    ...mapGetters(['totalAlumnos']),
  },
  methods:{
    ...mapActions(['getHeaders',  'getSelectedCourse', 'addCourse', 'rmvCourse']),
    editItem(nombre){
      this.getSelectedCourse(nombre)
      this.$router.push(`/admin/edit/${nombre}`)
    },
    addNewCourse(){
      this.dialog = true,
      this.getDate()
    },
    guardar(){
      if(this.newCourse.cupos >= this.newCourse.inscritos){
        this.$refs.form.validate()
        this.cupos = false
        if(this.newCourse.completado === true) this.newCourse.inscritos = 0
        this.addCourse(this.newCourse)
        this.dialog = false
        setTimeout(() => this.$refs.form.reset(), 1000);
      }else{
        this.cupos = true
      }
    },
    deleteItem(nombre){
      this.dialogDelete = true
      this.courseToDelete = this.courses.find(course => course.nombre == nombre)
    },
    remove(){
      this.dialogDelete = false
      this.rmvCourse(this.courseToDelete.id)
      this.init()
    },
    cancel(){
      this.dialog = false
      this.$refs.form.reset()
    },
    init(){
      this.getHeaders()
    },
    getDate(){
      let fecha = new Date().toLocaleDateString('en-GB')
      this.newCourse.fecha_registro = fecha
      return fecha
    },
  },
  created(){
    this.init()
  },
}
</script>