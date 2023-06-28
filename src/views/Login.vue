<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="mx-10"
    >
      <v-alert v-if="errorUser" type="error">Error en email o contraseña</v-alert>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="pass"
        :counter="6"
        :rules="passRules"
        label="Contraseña"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Ingresar
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Borrar Formulario
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name:'login-comp',
  data: () => ({
    valid: true,
    errorUser: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+\..+/.test(v) || 'Ingresa un email válido',
    ],
    pass: '',
    passRules: [
      v => !!v || 'Contraseña es requerida',
      v => (v && v.length == 6) || 'Contraseña debe tener 6 caracteres',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.pass)
        .then((userCredential) => {
          this.errorUser = false
          const user = userCredential.user;
          console.log(user);
          setTimeout(() => {
            this.$router.push({path: `/admin`})
          }, 500);
        })
        .catch((error) => {
          this.errorUser = true
          console.log(error);
        });
    },
    reset() {
      this.$refs.form.reset()
      this.errorUser = false
    },
  },
}
</script>

<style>

</style>