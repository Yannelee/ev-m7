<template>
      <v-card width="20rem" class="mx-3 my-5">
        <v-img lazy-src="https://picsum.photos/id/11/10/6" height="20rem" width="auto" :src="course.img"></v-img>
        <v-card-title class="">
          <p class="ml-3">{{course.nombre}}</p>
        </v-card-title>
        <v-card-text>
          <v-timeline align-top dense class="text-left">

            <v-timeline-item color="deep-purple lighten-1" small>
              <div>
                <div class="font-weight-normal">
                  Costo: <strong>{{(course.costo).toLocaleString('es-CL', {style:'currency', currency:'CLP'})}}</strong> 
                </div>
                <div class="font-weight-normal">
                  Duración: <strong>{{course.duracion}}</strong> 
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item color="green" small>
              <div>
                <div class="font-weight-normal">
                  Cupos: <strong>{{course.cupos}}</strong> 
                </div>
                <div class="font-weight-normal">
                  Completado: <strong>{{course.completado== 'true' ? 'Si' :'No'}}</strong> 
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item color="deep-purple lighten-1" small>
              <div>
                <div class="font-weight-normal">
                  Fecha de Registro:
                </div>
                <div class="font-weight-normal">
                  <strong>{{course.fecha_registro}}</strong> 
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item color="green" small>
              <div>
                <div class="font-weight-normal">
                  Descripción:
                </div>
                <div class="font-weight-normal">
                  <strong>{{course.descripcion}}</strong> 
                </div>
              </div>
            </v-timeline-item>

          </v-timeline>
        </v-card-text>
      </v-card>
</template>

<script>
  export default {
    name:'card-comp',
    props:{
      course:{
        type: Object
      },
    },
    data: () => ({
    })
  }
</script>