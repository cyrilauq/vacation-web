<template>
  <!-- Template utilisée : https://flowbite.com/blocks/marketing/login/ -->
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- Title just above the form -->
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <font-awesome-icon icon="plane" />
        S'enregistrer
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center textc">
        <h2 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white self-center">Créer un nouveau compte</h2>
        <!-- Display error messages when sending the form -->
        <span v-if="errorMessage !== undefined" class="mx-auto text-base font-semibold text-red-900 dark:text-white">{{ errorMessage }}</span>
        <FormLayout :schema="schema" :onSubmit="onSubmit">
            <template v-slot:form>
                <div class="flex flex-row justify-around w-full">
                    <!-- Firstname field -->
                    <FormField input-name="firstname" input-id="firstname" label-name="Firstname" placeholder="Your firstname" class="w-3/7" />
                    <!-- Name field -->
                    <FormField input-name="name" input-id="name" label-name="Name" placeholder="Your name" class="w-3/7" />
                </div>
                <!-- Login field -->
                <FormField input-name="login" input-id="login" label-name="Login" placeholder="Your login" />
                <!-- Email field -->
                <FormField input-name="email" input-id="email" label-name="Email" placeholder="Your email" />
                <!-- Password field -->
                <FormField input-name="password" input-type="password" input-id="password" label-name="Password" placeholder="Your password" />
                <!-- Confirm password field -->
                <FormField input-name="confirm_password" input-type="password" input-id="confirm_password" label-name="Confirm password" placeholder="Confirm password" />
                <div>
                    <input type="file" name="file" id="file" />
                </div>
            </template>
            <template v-slot:buttons>
                <!-- Submit button -->
                <ActionBtn class="w-full" @submit="onSubmit">Créer un compte</ActionBtn>
            </template>
        </FormLayout>
      </div>
    </div>
  </section>
</template>

<script>
import { ResponseError } from "@/utils/error/ResponseError.js"
import { AnonymousVacationClient } from "@/utils/service/AnonymousVacationClient"

import FormField from '../components/forms/FormField.vue'
import ActionBtn from '../components/buttons/ActionBtn.vue'
import FormLayout from '../components/forms/FormLayout.vue';
import router from "@/router/router";

export default {
    name: "Register",
    components: {
        FormField,
        ActionBtn,
        FormLayout
    },
    data() {
        return {
            authApiClient: new AnonymousVacationClient(),
            errorMessage: undefined,
            file: null,
            schema: {
                login: 'required|min:3|max:100',
                firstname: 'required|min:3|max:100|alpha_spaces' /* Will use the rule required, min(with a min value of 3), max(with a max value of 100) and alpha_spaces for the field with the name "name" */,
                name: 'required|min:3|max:100|alpha_spaces' /* Will use the rule required, min(with a min value of 3), max(with a max value of 100) and alpha_spaces for the field with the name "name" */,
                email: 'required|min:3|max:100|email' /* email condition will tell that the input must respect the format of an email */,
                password: 'required|min:9|max:100|excluded:password',
                confirm_password: 'required|passwords_mismatch:@password'
            },
        }
    },
    methods: {
        onSubmit(values) {
            //console.log(values);
            //console.log(document.querySelector('#file').files[0]);
            //console.log(document.querySelector('#file').files[0]);
            this.authApiClient.register(values.login, values.email, values.password, values.name, values.firstname, document.querySelector('#file').files[0])
                .then(result => {
                    //console.log("Register successful : " + JSON.stringify(result))
                    this.errorMessage = undefined

                    swal("Succès !", "Votre compte à été créer avec succès.", "success");
                    router.push("/")
                })
                .catch(error => {
                    if (error instanceof ResponseError) {
                    this.errorMessage = error.message;
                    } else {
                    console.error(error)
                    }
                })
        }
    }

}
</script>

<style scoped>

</style>