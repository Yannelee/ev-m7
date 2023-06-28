import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/firebase/firebase.js";
import { ref, onValue, child, get, set, remove, push } from "firebase/database";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses:[], 
    headers:[],
    selectedCourse:{},
    newCourse:{
      nombre:'',
      completado:false,
      cupos:'',
      costo:'',
      descripcion:'',
      duracion:'',
      fecha_registro:'',
      img:'',
      inscritos:'',
    },
  },
  getters: {
    totalAlumnos(state){
      let total={
        permitidos: state.courses.reduce(function (acc, obj) { return acc + parseInt(obj.cupos); }, 0),
        inscritos: state.courses.reduce(function (acc, obj) { return acc + parseInt(obj.inscritos); }, 0),
        terminados: state.courses.reduce(function (acc, obj) { return acc + (obj.completado == 'false' || obj.completado == false)}, 0),
        activos: state.courses.reduce(function (acc, obj) { return acc + (obj.completado == 'true' || obj.completado == true)}, 0),
        cursos: state.courses.length
      }
      return total
    },
  },
  mutations: {
    SET_COURSES(state, course){
      state.courses = course
    },
    SET_HEADERS(state, headers){
      state.headers = headers
    },
    SET_SELECTEDCOURSE(state, course){
      state.selectedCourse = course
    },
  },
  actions: {
    getCourses({commit}){
      onValue(ref(db, 'courses'), (snapshot) => {
        let cursos = []
        snapshot.forEach((childSnapshot) => {
          let datos = childSnapshot.val()
          datos.id = childSnapshot.key
          cursos.push(datos)
        });
        commit('SET_COURSES', cursos)
      });
    },
    getHeaders({commit}){
      get(child(ref(db), 'headers')).then((snapshot)=>{
        commit('SET_HEADERS', Object.values(snapshot.val())[0])
      }).catch((er)=>console.log(er))
    },
    getSelectedCourse({commit, state}, nombre){
      let curso = state.courses.filter(course => course.nombre == nombre)
      commit('SET_SELECTEDCOURSE', curso[0])
    },
    updateCourses(_,course){
      set(ref(db, 'courses/'+course.id), course)
      .catch((error) => console.log(error));   
    },
    addCourse(_, course){
      const newCourseKey = push(child(ref(db), 'courses')).key;
      course.id = newCourseKey
      set(ref(db, 'courses/'+newCourseKey), course)
      .catch((error) => console.log(error));   
    },
    rmvCourse(_, key){
      remove(ref(db, 'courses/'+key))
      .catch((error) => console.log(error));   
    },
  },
  modules: {
  }
})
