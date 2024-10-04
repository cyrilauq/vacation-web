<script>
import useVacationStore from '../../stores/Vacation'
import useAuthStore from '../../stores/Auth'

import { mapState, mapActions } from 'pinia'

import BasicCard from "@/components/global/BasicCard.vue"

import { VacationApiClient } from '@/utils/service/VacationApiClient'
import { ResponseError } from "@/utils/error/ResponseError"
import PlanifyActivity from "@/components/forms/PlanifyActivity.vue";
import AddActivity from "@/components/forms/AddActivity.vue";
import ActionBtn from '../buttons/ActionBtn.vue'
import Vacation from '../../stores/Vacation'

export default {
  name: "ActivitiesWrapper",
  data() {
      return {
        activitiesErrorMessage: undefined,
        planActivityFormIsVisible: false,
        selectedActivityId: undefined
      }
  },
  components: { AddActivity, PlanifyActivity, BasicCard, ActionBtn },
  computed: {
      ...mapState(useAuthStore, ['user']),
      ...mapState(useVacationStore, ['vacation']),
      ...mapState(useVacationStore, ['activities']),
  },
  methods: {
    ...mapActions(useVacationStore, ['setActivities']),
    onActivityPlanned() {
      this.onFormInteraction()
      swal("Succès !", "The activity was planned !", "success")
    },
    onFormInteraction() {
      this.planActivityFormIsVisible = !this.planActivityFormIsVisible
    },
    activityClicked(activityId) {
      this.selectedActivityId = activityId
      this.planActivityFormIsVisible = true
    }
  }
}
</script>

<template>
    <div>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white max-w-md">These are the vacation activities</h2>
        <PlanifyActivity :activityId="this.selectedActivityId" class="fixed self-center top-56" v-if="planActivityFormIsVisible"
        @activity-planned="onActivityPlanned"
        @close-clicked="onFormInteraction">
        </PlanifyActivity>
        <ul class="max-w-md space-y-0 text-gray-500 list-inside dark:text-gray-400 list-none">
            <template v-for="activity in activities">
            <li class="pb-2">
              <BasicCard :title="activity.title" :content="`${activity.description}. Will be held at ${activity.place}`">
                <ActionBtn @click="activityClicked(activity.activityId)" v-if="!vacation.isPublished">Plannify</ActionBtn>
              </BasicCard>
            </li>
            </template>
        </ul>

        <span v-if="activities === undefined">No activities</span>
        <span v-else>{{activitiesErrorMessage}}</span>
    </div>
</template>