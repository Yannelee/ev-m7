<template>
  <div>
    <v-app-bar color="deep-purple" dark class="align-center">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Cursos <v-icon class="mb-1">mdi-book-open-page-variant</v-icon></v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon to="/admin">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn icon @click="logOut" v-if="user.currentUser">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn icon to="/login" v-if="!user.currentUser">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <router-link to="/">Inicio</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.currentUser">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/admin">Admin</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.currentUser">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logOut" ><router-link to="/">LogOut</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!user.currentUser">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/admin">LogIn</router-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name:'navbar-comp',
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed:{
    user(){
      const auth = getAuth()
      return auth
    }
  },
  methods:{
    logOut(){
      const auth = getAuth()
      signOut(auth)
      .then(()=>{
        this.$router.push('/').catch(()=>{});
      })
      .catch(e =>{
        console.log(e);
      })
    }
  },
}
</script>