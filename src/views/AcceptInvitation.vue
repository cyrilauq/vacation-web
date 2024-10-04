<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center mx-auto">
            <!-- Title just above the form -->
            <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Accept invitation
            </h1>
            <div v-if="isLogged">
                <!-- Display error messages when sending the form -->
                <span v-if="errorMessage !== undefined" class="flex items-center content-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">{{ errorMessage }}</span>
                <FormLayout :schema="invit_schema" :onSubmit="onSubmitAccept">
                    <template v-slot:buttons>
                        <!-- Submit button -->
                        <ActionBtn class="w-full">Accepter l'invitation</ActionBtn>
                    </template>
                </FormLayout>
            </div>
            <template v-else>
                <span>First you need to log in</span>
                <LoginForm @successfull-logged="onLogged" />
            </template>
        </div>
    </section>
</template>

<script>
import { VacationApiClient } from '../utils/service/VacationApiClient'

import FormLayout from '../components/forms/FormLayout.vue'
import ActionBtn from '../components/buttons/ActionBtn.vue'
import LoginForm from '../components/forms/LoginForm.vue'
import { TypeMessage } from '../module/typeMessage'
import swal from 'sweetalert'

export default {
    name: "AcceptInvitation",
    components: { FormLayout, ActionBtn, LoginForm },
    data() {
        return {
            token: undefined,
            isLogged: false,
            errorMessage: undefined
        }
    },
    methods: {
        async onSubmitAccept() {
            let result = await new VacationApiClient(this.token).acceptInvitation("vbcvbvcbcv", this.$route.params.invitationId)
            if(result.type === TypeMessage.ERROR) {
                this.errorMessage = result.contenu
            } else {
                await swal("Invitation accepted", "success", "THe invitation is accepted you're now a member of the vacation!")
            }
        },
        onLogged(user) {
            this.token = user.token
            this.isLogged = true
        }
    }
}
</script>