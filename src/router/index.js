import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import EditCourse from '../views/EditCourse.vue'
import { getAuth } from "firebase/auth";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home, 
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{
      private:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      login: true
    }
  },
  {
    path: '/admin/edit/:course',
    name: 'editCourse',
    component: EditCourse,
    meta:{
      private:true
    }
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from, next)=>{
  const auth = getAuth()
  let user = auth.currentUser
  let private_route = to.meta.private
  let login_route = to.meta.login

  if(private_route && !user){
    next('/login')
  }else if(login_route && user){
    next('/')
  } else{
    next()
  }
})

export default router
