import { VacationApiClient } from '@/utils/service/VacationApiClient';
<template>
    <div>
        <!-- Display error messages when sending the form -->
        <span v-if="errorMessage !== undefined" class="flex items-center content-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">{{ errorMessage }}</span>
        <FormLayout :schema="login_schema" :onSubmit="onSubmitLogin">
            <template v-slot:form>
                <!-- Login field -->
                <FormField input-name="login" input-id="login" label-name="Login" placeholder="Your login" />
                <!-- Password field -->
                <FormField input-name="password" input-type="password" input-id="password" label-name="Password" placeholder="Your password" />
            </template>
            <template v-slot:buttons>
                <!-- Submit button -->
                <ActionBtn class="w-full">Se connecter</ActionBtn>
            </template>
        </FormLayout>
    </div>
</template>

<script>
import ActionBtn from '../buttons/ActionBtn.vue';
import FormLayout from './FormLayout.vue'
import { AnonymousVacationClient } from '@/utils/service/AnonymousVacationClient';

export default {
    name: "LoginForm",
    data() {
        return {
            authApiClient: new AnonymousVacationClient(),
            login_schema: {
                login: 'required',
                password: 'required',
            },
            errorMessage: undefined,
        };
    },
    emits: [
        'successfull-logged',
    ],
    methods: {
        onSubmitLogin(values) {
            this.authApiClient.login(values.login, values.password).then(data => {
                this.$emit('successfull-logged', data)
            }).catch(error => {
                this.errorMessage = error.message
            });
        }
    },
    components: { FormLayout, ActionBtn }
}
</script>