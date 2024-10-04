<template>
    <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border-2 border-stone-800 w-1/3">
        <h3 class="text-center">Add activity</h3>
        <span class="absolute right-10 top-5" @click.prevent="onClick">Close</span>
        <span v-if="errorMsg !== undifined">{{ errorMsg }}</span>
        <FormLayout :schema="schema" :onSubmit="onSubmit">
            <template v-slot:form>
                <!-- Title field -->
                <FormField input-name="title" input-id="title" label-name="Title" placeholder="Activity's title" />
                <!-- Description field -->
                <FormField input-name="description" input-id="description" label-name="Description" placeholder="Your description" input-type="textarea" />
                <!-- Place field -->
                <FormField input-name="place" input-id="place" label-name="Place" placeholder="Activity's place" @input-blur="placeChanged" />
                <Map :center="center" :zoom="15"></Map>
            </template>
            <template v-slot:buttons>
                <ActionBtn class="ml-3 w-24">Add</ActionBtn>
            </template>
        </FormLayout>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { ActivityApiClient } from '../../utils/service/ActivityApiClient'
import { GeocodingApiClient } from '../../utils/service/GeocodingApiClient'

import useAuthStore from '../../stores/Auth'
import useVacationStore from '../../stores/Vacation'

import FormField from './FormField.vue'
import FormLayout from './FormLayout.vue'
import { TypeMessage } from '@/module/typeMessage'
import Map from '../google/Map.vue'

export default {
    data() {
        return {
            schema: {
                title: "required|min:5|max:50",
                place: "required|min:5|max:150",
                description: "required|min:5|max:100"
            },
            center: {
                lat: 0, 
                lng: 0
            },
            errorMsg: undefined,
            activityApiClient: undefined,
            geoApiClient: undefined,
            vacationId: this.$route.params.id
        }
    },
    emits: [
        'vacationAdded',
        'closeClicked'
    ],
    components: {
        FormLayout,
        FormField,
        Map
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
    },
    methods: {
        ...mapActions(useVacationStore, ['addActivities']),
        async onSubmit(values) {
            let { lat, lng } = await this.geoApiClient.getPositionOf(values.place)
            this.center.lat = lat
            this.center.lng = lng
            let result = await this.activityApiClient.addActivity(this.vacationId, values.title, values.place, values.description, lat, lng)
            if(result.type === TypeMessage.ERROR) {
                this.errorMsg = result.message
            } else {
                this.errorMsg = undefined
                result.forEach(a => this.addActivities(a))
            }
            this.$emit("vacationAdded", result)
        },
        onClick() {
            this.$emit("closeClicked")
        },
        async placeChanged(place) {
            let { lat, lng } = await this.geoApiClient.getPositionOf(place)
            this.center.lat = lat
            this.center.lng = lng
        }
    },
    created() {
        this.geoApiClient = new GeocodingApiClient()
        this.activityApiClient = new ActivityApiClient(this.user.token)
    }
}
</script>