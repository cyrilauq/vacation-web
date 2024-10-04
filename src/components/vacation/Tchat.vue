<template>
    <div>
        <template v-if="errorMessage === ''">
            <ul class="max-h-96 overflow-auto flex flex-col" ref="container">
                <li v-for="m in messages" :class="{ 'self-end': m.uid === user.id, 'text-right': m.uid === user.id, 'bg-gray-900': m.uid === user.id, 'bg-gray-950': m.uid !== user.id }" class="bg-opacity-25 py-6 px-3 w-1/2">
                    <div>
                        <span><span class="font-bold">{{ m.username ?? m.uid }}</span>, {{ m.sendDateTime }}</span>
                        <p style="line-break: anywhere;">{{ m.message }}</p>
                        <span></span>
                    </div>
                </li>
            </ul>
            <div>
                <textarea v-model="message" class="w-2/5 text-black"></textarea>
                <ActionBtn @click="onSend">Send</ActionBtn>
            </div>
        </template>
        <p v-else>{{ errorMessage }}</p>
    </div>
</template>

<script>
    import Pusher from 'pusher-js'

    import useAuthStore from '../../stores/Auth'

    import { mapState } from 'pinia'
    
    import { MessageApiClient } from '../../utils/service/MessageApiClient'
import { TypeMessage } from '../../module/typeMessage'

    export default {
        name:"Tchat",
        data() {
            return {
                messages: [],
                messageApiClient: undefined,
                message: "",
                errorMessage: undefined
            }
        },
        computed: {
            ...mapState(useAuthStore, ['user']),
        },
        methods: {
            addMessage(message) {
                //console.log(message);
                this.messages.push(message)
                const container = this.$refs.container;
                container.scrollTop = container.scrollHeight + 150;
            },
            onSend() {
                var result = this.messageApiClient.sendMessage(this.$route.params.id, this.message)
                this.message = ""      
                //console.log(result);
            }
        },
        async mounted() {
            this.messageApiClient = new MessageApiClient(this.user.token)
            Pusher.logToConsole = false

            var pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
                cluster: 'eu',
                encrypted: true
            })

            var channel = pusher.subscribe(this.$route.params.id)
            channel.bind('send-message', (data) => {
                this.addMessage(data)
            })

            var result = await this.messageApiClient.getMessage(this.$route.params.id)
            //console.log(result)
            if(result.type === TypeMessage.ERROR) {
                this.errorMessage = result.contenu
            } else {
                this.errorMessage = ""
                this.messages = result
            }
        }
    }
</script>