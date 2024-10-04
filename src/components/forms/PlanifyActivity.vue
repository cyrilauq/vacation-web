<template>
  <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border-2 border-stone-800 w-1/4">
    <h3 class="text-center">Plan activity</h3>
    <span class="absolute right-10 top-5" @click.prevent="onClick">Close</span>
    <FormLayout :onSubmit="onSubmit">
      <template v-slot:form>
        <div class="flex flex-row justify-around">
          <!-- DateTime begin field -->
          <FormField input-name="date_begin" input-id="date_begin" label-name="Date begin" placeholder="Vacation date begin" input-type="datetime-local" />
        </div>
        <div class="flex flex-row justify-around">
          <!-- DateTime end field -->
          <FormField input-name="date_end" input-id="date_end" label-name="Date end" placeholder="Vacation date end" input-type="datetime-local" />
        </div>
      </template>
      <template v-slot:buttons>
        <ActionBtn class="ml-3 w-24">Planify</ActionBtn>
      </template>
    </FormLayout>
  </div>
</template>

<script>
import FormLayout from "@/components/forms/FormLayout.vue"
import useAuthStore from '../../stores/Auth'
import useVacationStore from '../../stores/Vacation'

import { mapState, mapActions } from 'pinia'

import {ActivityApiClient} from "@/utils/service/ActivityApiClient"
import {TypeMessage} from "@/module/typeMessage"

export default {
  name: "PlanifyActivity",
  components: {FormLayout},
  data() {
    return {
      activityApiClient: undefined
    }
  },
  emits: [
    'activityPlanned',
    'closeClicked'
  ],
  computed: {
    ...mapState(useAuthStore, ['user']),
  },
  methods: {
    ...mapActions(useVacationStore, ['addPlanning']),
    async onSubmit(values) {
      if(values.date_begin && values.date_end) {
        const result = await this.activityApiClient.planActivity(this.activityId, values.date_begin, values.date_end)
        if(result.type === TypeMessage.ERROR) {
          await swal("Error", "An error occured", "error")
        } else {
          this.$emit("activityPlanned")
        }
      } else {
        await swal("Error", "The fields are required", "error")
      }
    },
    onClick() {
      this.$emit("closeClicked")
    }
  },
  props: {
    activityId: String
  },
  created() {
    this.activityApiClient = new ActivityApiClient(this.user.token)
  }
}
</script>