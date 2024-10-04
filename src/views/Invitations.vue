<template>
    <div class="mx-auto w-3/5 grid">
        <h1>All your invitations</h1>
        <div class="mt-4 flex flex-row justify-between">
            <ul class="max-w-md space-y-0 text-gray-500 list-inside dark:text-gray-400 list-none">
                <li class="pb-2" v-for="invitation in invitations">
                    <BasicCard :title="invitation.vacationName" :content="`Invitation for vacation: ${invitation.vacationName}`" >
                        <ActionBtn v-if="!invitation.isAccepted" @click="onAccepted(invitation.vacationId, invitation.invitationId)">Accept</ActionBtn>
                    </BasicCard>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'

import useAuthStore from '../stores/Auth'
import { UserApiClient } from '@/utils/service/UserApiClient'
import { TypeMessage } from '@/module/typeMessage'
import { VacationApiClient } from '@/utils/service/VacationApiClient'
import BasicCard from '@/components/global/BasicCard.vue'
import ActionBtn from '../components/buttons/ActionBtn.vue'

export default {
    name: "InvitationsView",
    data() {
        return {
            userApiClient: undefined,
            vacationApiClient: undefined,
            invitations: [],
            errorMessage: undefined
        }
    },
    components: {
        BasicCard, ActionBtn
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
    },
    methods: {
        async onAccepted(vacationId, invitationId) {
            let result = await this.vacationApiClient.acceptInvitation(vacationId, invitationId)
            if(result.type === TypeMessage.ERROR) {
                await swal("Erreur !", result.contenu, "error");
            } else {
                await swal("Succès !", result.contenu, "success");
            }
        }
    },
    async mounted() {
        this.userApiClient = new UserApiClient(this.user.token)
        this.vacationApiClient = new VacationApiClient(this.user.token)
        
        let result = await this.userApiClient.getInvitations()
        if(result.type === TypeMessage.ERROR) {
            this.errorMessage = result.contenu
        } else {
            this.invitations = result
        }
    }
}
</script>