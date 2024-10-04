<template>    
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <!-- Title just above the form -->
            <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Contacter l'administrateur
            </h1>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div v-if="message !== undefined" class="text-center pt-3">
                    <span>{{ message }}</span>
                </div>
                <FormLayout :schema="schema" :input-default="inputDefault" :onSubmit="onSubmit">
                    <template v-slot:form>
                        <!-- Firstname field -->
                        <FormField input-name="firstname" input-id="firstname" label-name="Firstname" placeholder="Your firstname" />
                        <!-- Name field -->
                        <FormField input-name="name" input-id="name" label-name="Name" placeholder="Your name" />
                        <!-- Mail field -->
                        <FormField input-name="mail" input-id="mail" label-name="Mail" placeholder="Your mail" />
                        <!-- Message field -->
                        <FormField input-name="message" input-id="message" label-name="Message" placeholder="Your message" input-type="textarea" />
                    </template>
                    <template v-slot:buttons>
                        <!-- Submit button -->
                        <ActionBtn class="w-full">Envoyer</ActionBtn>
                    </template>
                </FormLayout>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'pinia';

import { ContactApiClient } from '../../utils/service/ContactApiClient'

import useAuthStore from '../../stores/Auth'
import FormField from './FormField.vue'
import FormLayout from './FormLayout.vue'

export default {
    name: "ContactForm",
    props: {
        name: String,
        firstname: String,
        mail: String
    },
    data() {
        return {
            schema: {
                message: 'required|min:10|max:100',
                firstname: 'required|min:3|max:100|alpha_spaces' /* Will use the rule required, min(with a min value of 3), max(with a max value of 100) and alpha_spaces for the field with the name "name" */,
                name: 'required|min:3|max:100|alpha_spaces' /* Will use the rule required, min(with a min value of 3), max(with a max value of 100) and alpha_spaces for the field with the name "name" */,
                mail: 'required|min:3|max:100|email' /* email condition will tell that the input must respect the format of an email */,
            },
            inputDefault: {
                name: this.name,
                firstname: this.firstname,
                mail: this.mail
            },
            message: undefined,
            apiClient: new ContactApiClient()
        };
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        ...mapState(useAuthStore, ['isAuth'])
    },
    methods: {
        async onSubmit(values) {
            this.message = await this.apiClient.contact(values.name, values.firstname, values.mail, values.message);
        }
    },
    components: { FormField, FormLayout }
}
</script>