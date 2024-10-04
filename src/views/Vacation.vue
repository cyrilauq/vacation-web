<script>
import { mapState, mapActions } from 'pinia'

import useAuthStore from '../stores/Auth'
import useVacationStore from '../stores/Vacation'

import ActivitiesWrapper from "@/components/vacation/ActivitiesWrapper.vue"
import { VacationApiClient } from '@/utils/service/VacationApiClient'

import { TypeMessage } from "@/module/typeMessage"
import MembersWrapper from "@/components/vacation/MembersWrapper.vue"
import AddMember from "@/components/forms/AddMember.vue";
import WeatherHandler from "@/components/vacation/WeatherHandler.vue";
import VacationDates from '@/components/vacation/VacationDates.vue'

import { RouterView, RouterLink } from 'vue-router'
import AddActivity from '../components/forms/AddActivity.vue'

export default {
    name: "Vacation",
    components: { WeatherHandler, AddMember, MembersWrapper, ActivitiesWrapper, VacationDates, RouterView, RouterLink, AddActivity },
    data() {
        return {
            isForecastShowed: false,
            vacationId: this.$route.params.id,
            addActivityFormIsVisible: false
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        ...mapState(useAuthStore, ['isAuth']),
        ...mapState(useVacationStore, ['vacation']),
        ...mapState(useVacationStore, ['activities']),
    },
    methods: {
        ...mapActions(useVacationStore, ['setVacation']),
        ...mapActions(useVacationStore, ['setPlanning']),
        ...mapActions(useVacationStore, ['setActivities']),
        ...mapActions(useVacationStore, ['setMembers']),
        ...mapActions(useVacationStore, ['publish']),
        async onPublish() {
            let result = await this.vacationApiClient.publish(this.vacationId);
            if(result.type === TypeMessage.ERROR) {
                await swal("Erreur !", result.contenu, "error");
            } else {
                this.publish()
                await swal("Succès !", result.contenu, "success");
            }
        },
        showForecast() {
            this.isForecastShowed = true
        },
        onAddActivity() {
            if(!this.vacation.isPublished) {
                this.addActivityFormIsVisible = !this.addActivityFormIsVisible
            }
        },
        async onExport() {
            let result = await this.vacationApiClient.exportPlanning(this.vacationId);
            if(result.type === TypeMessage.ERROR) {
                await swal("Erreur !", result.contenu, "error");
            } else {
                await swal("Succès !", result.contenu, "success");
            }
        },
        async onActivityAdded() {
            this.onAddActivity()
            await swal("Succès !", "The activity was added with success", "success")
        }
    },
    async created() {
        this.vacationApiClient = new VacationApiClient(this.user.token)

        var result = await this.vacationApiClient.getVacationById(this.vacationId)
        if(result.type === undefined) {
            this.setVacation(result)
        } else {
            this.$router.push("/")
        }
        
        if(!this.activities.length > 0) {
            var getResult = await this.vacationApiClient.getPlanningForVacation(this.$route.params.id)
            if(getResult.type !== undefined) {
                this.errorMessage = getResult
            } else {
                this.setPlanning(getResult)
                this.errorMessage = undefined
            }
        }

        var membersResult = await this.vacationApiClient.getMembers(this.$route.params.id)
        if(membersResult.type !== undefined) {
            this.errorMessage = membersResult.contenu
        } else {
            this.setMembers(membersResult)
            this.errorMessage = undefined
        }

        var actResult = await this.vacationApiClient.getActivities(this.$route.params.id)
        if(actResult.type !== undefined) {
            this.errorMessage = actResult.contenu
        } else {
            this.setActivities(actResult)
            this.errorMessage = undefined
        }
    }
}
</script>

<template>
    <div class="mx-auto w-3/5 grid">
        <AddActivity class="fixed justify-self-center z-20 top-0" 
            v-show="addActivityFormIsVisible"
            v-if="!vacation.isPublished" 
            @vacation-added="onActivityAdded"
            @close-clicked="onAddActivity" />
        <div>
            <div class="mt-4 flex flex-row justify-between">
                <div>
                    <h1 class="ml-2 text-3xl">{{ vacation.name }}</h1>
                    <p class="ml-2 my-3">{{ vacation.description }}</p>
                    <VacationDates class="ml-2" :date-begin="vacation.date_begin" :time-begin="vacation.time_begin" :date-end="vacation.date_end" :time-end="vacation.time_end"></VacationDates>
                    <div class="ml-2">
                        <template v-if="!vacation.isPublished">
                            <ActionBtn class="w-24" @click.prevent="onPublish">Publish</ActionBtn>
                            <ActionBtn class="ml-3 w-24" @click.prevent="onAddActivity">Add activity</ActionBtn>
                        </template>
                        <ActionBtn class="ml-3 w-24" @click.prevent="onExport">Export</ActionBtn>
                    </div> 
                </div>
                <img :src="vacation.picturePath ?? '/img/img_placeholder.png'" :alt="'Picutre for vacation: ' + vacation.name" class="h-60" />
            </div>
            <div class="inline-flex space-x-1 pt-2 pb-2">
                <RouterLink :to="{ name: 'vacation_activities' }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                    Activities
                </RouterLink>
                <RouterLink :to="{ name: 'vacation_members' }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                    Members
                </RouterLink>
                <RouterLink :to="{ name: 'vacation_planning' }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                    Planning
                </RouterLink>
                <RouterLink :to="{ name: 'tchat' }" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                    Tchat
                </RouterLink>
            </div>
            <div class="flex flex-wrap">
                <RouterView></RouterView>
                <div class="weather pl-5" >
                    <button v-if="!this.isForecastShowed" @click="showForecast" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" title="Show weather forecast for the next 4 days">Show weather forecast</button>
                    <WeatherHandler v-else :latitude="this.vacation.latitude" :longitude="this.vacation.longitude"></WeatherHandler>
                </div>
            </div>
        </div>
    </div>
</template>