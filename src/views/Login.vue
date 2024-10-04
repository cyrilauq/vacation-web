<template>
    <!-- Template de login : https://flowbite.com/blocks/marketing/login/ -->
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <!-- Title just above the form -->
            <h2 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <font-awesome-icon icon="plane" />
                Se connecter
            </h2>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <!-- Title within the form -->
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Se connecter à votre compte
                    </h1>
                    <Form class="space-y-4 md:space-y-6" @submit="onSubmit">
                        <div>
                            <!-- Login field -->
                            <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre login</label>
                            <Field type="text" name="login" :rules="validateLogin" placeholder="Login" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="login"/>
                        </div>
                        <div>
                            <!-- Password field -->
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <Field type="password" name="password" :rules="validatePassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <ErrorMessage name="password"/>
                        </div>
                        <!-- Submit button -->
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>

                        <!-- Display error messages when sending the form -->
                        <span v-if="errorMessage !== undefined" class="flex items-center content-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">{{ errorMessage }}</span>

                        <!-- Create an account link -->
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Pas encore de compte ? <RouterLink class="font-medium text-primary-600 hover:underline dark:text-primary-500" :to="{ name: 'register' }">S'enregistrer</RouterLink>
                        </p>
                    </Form>
                    <GoogleSignInButton
                        @success="handleLoginSuccess"
                        @error="handleLoginError"
                    ></GoogleSignInButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {ResponseError} from "@/utils/error/ResponseError.js";
import {AnonymousVacationClient} from "@/utils/service/AnonymousVacationClient";
import router from "@/router/router";
import swal from 'sweetalert';

import { mapActions } from 'pinia'
import useAuthStore from '../stores/Auth';

import { GoogleSignInButton } from "vue3-google-signin";

export default {
  name: "Login",
  components: {
    GoogleSignInButton,
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      authApiClient: new AnonymousVacationClient(),
      errorMessage: undefined
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogin']),
    onSubmit(values) {
      this.authApiClient.login(values['login'], values['password']).then(data => {
        localStorage.setItem("token", data.token)
        this.isAuth = true
        this.errorMessage = undefined
        this.onLogin(data)

        swal("Succès !", "Vous êtes connecté.", "success");
        router.push("/dashboard")
      }).catch(error => {
        if (error instanceof ResponseError) {
          this.errorMessage = error.message;
        } else {
          console.error(error.message)
        }
      })
    },
    validatePassword(value) {
      if (!value) {
        return 'This field is required';
      }
      return true;
    },
    validateLogin(value) {
      if(!value) {
        return 'This field is required';
      }
      return true;
    },
    // handle success event
    async handleLoginSuccess(response) {
        const { credential } = response;
        //console.log("Access Token", credential);
        const user = await this.authApiClient.loginGoogle(credential);
        this.onLogin(user);
        this.$router.push({ name: "home" });
    },
    // handle an error event
    handleLoginError() {
        console.error("Login failed");
    }
  }

}
</script>