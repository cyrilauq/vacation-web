<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center mx-auto">
            <!-- Title just above the form -->
            <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Add a vacation
            </h1>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div v-if="message !== undefined" class="text-center pt-3">
                    <span>{{ message }}</span>
                </div>
                <FormLayout :schema="schema" :onSubmit="submit">
                    <template v-slot:form>
                        <!-- Title field -->
                        <FormField input-name="title" input-id="title" label-name="Title" placeholder="Vacation title" />
                        <!-- Description field -->
                        <FormField input-name="description" input-id="description" label-name="Description" placeholder="Your description" input-type="textarea" />
                        <div class="flex flex-row justify-around">
                            <!-- Date begin field -->
                            <FormField input-name="date_begin" input-id="date_begin" label-name="Date begin" placeholder="Vacation date begin" input-type="date" />
                            <!-- Hour begin field -->
                            <FormField input-name="hour_begin" input-id="hour_begin" label-name="Hour begin" placeholder="Vacation hour begin" input-type="time" />
                        </div>
                        <div class="flex flex-row justify-around">
                            <!-- Date end field -->
                            <FormField input-name="date_end" input-id="date_end" label-name="Date end" placeholder="Vacation date end" input-type="date" />
                            <!-- Hour end field -->
                            <FormField input-name="hour_end" input-id="hour_end" label-name="Hour end" placeholder="Vacation hour end" input-type="time" />
                        </div>
                        <!-- Place field -->
                        <FormField @input-blur="searchPlace" input-name="place" input-id="place" label-name="Place" placeholder="Vacation place" />
                        <Map :center="center" :zoom="15"></Map>
                        <FileUpload @files-dropped="fileChanged" />
                    </template>
                    <template v-slot:buttons>
                        <!-- Submit button -->
                        <ActionBtn>Create</ActionBtn>
                    </template>
                </FormLayout>
            </div>
        </div>
    </section>
</template>

<script>
import { VacationApiClient } from '../utils/service/VacationApiClient'
import { GeocodingApiClient } from '../utils/service/GeocodingApiClient'
import useAuthStore from '../stores/Auth'
import Map from '../components/google/Map.vue'

import { Vacation } from '../module/vacation'

import { mapState } from 'pinia'

import FormLayout from '../components/forms/FormLayout.vue'
import FileUpload from '../components/forms/FileUpload.vue'
import ActionBtn from '../components/buttons/ActionBtn.vue'

export default {
    name: "AddVacation",
    components: { FormLayout, Map, FileUpload, ActionBtn },
    data() {
        return {
            schema: {
                description: 'required|min:10|max:100',
                title: 'required|min:3|max:100',
                place: 'required|min:3|max:100',
            },
            center: {
                lat: 0, 
                lng: 0
            },
            country: null,
            file: undefined,
            message: "",
            latitude: 0,
            longitude: 0,
            apiClient: undefined,
            apiGeoClient: new GeocodingApiClient()
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        ...mapState(useAuthStore, ['token']),
    },
    methods: {
        fileChanged(files) {
            this.file = files[0]
        },
        async submit(values) {
            // TODO : format time like this HH:mm
            this.message = await this.apiClient.addVacation(
                new Vacation({
                    name: values.title,
                    description: values.description,
                    date_begin: this.formatDate(values.date_begin),
                    date_end: this.formatDate(values.date_end),
                    time_begin: values.hour_begin,
                    time_end: values.hour_end,
                    place: values.place,
                    longitude: this.center.lng,
                    latitude: this.center.lat,
                    country: this.country
                }),
                this.user.id,
                this.file
            );
        },
        async searchPlace(place) {
            //console.log(`Received place: ${place}`)
            let { lat, lng, country } = await this.apiGeoClient.getPositionOf(place)
            //console.log(lat, " ", lng, " ", country)
            this.country = country
            this.center.lat = lat
            this.center.lng = lng
        },
        formatDate(date) {
            let temp = new Date(date);
            let result = `${temp.getDate()}/${temp.getMonth() + 1}/${temp.getFullYear()}`;
            //console.log(result);
            return result;
        }
    },
    created() {
        this.apiClient = new VacationApiClient(this.user.token)
    }
}
</script>