<template>
    <VacationSectionLayout :title="title">
        <template v-slot:content>
            <ul v-if="hasActivities" class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 list-none">
              <ToggleButton @toggled="() => descendingPlanning" @untoggled="() => ascendingPlanning" content-message="Trier par ordre décroissant ?"></ToggleButton>
                <li class="pb-5" v-for="activity in activities">
                    <BasicCard :title="activity.title">
                        <p>{{ `${activity.description}.\n Will be held at ${activity.place}` }}</p>
                        <p>{{ `From ${activity.beginDate} at ${activity.beginTime} to ${activity.endDate} at ${activity.endTime}` }}</p>
                    </BasicCard>
                </li>
            </ul>
        </template>
        <template v-slot:messages>
            <span v-if="!hasActivities">No activities found</span>
        </template>
    </VacationSectionLayout>
</template>

<script>
import useAuthStore from '../../stores/Auth'
import useVacationStore from '../../stores/Vacation'

import { mapState } from 'pinia'

import BasicCard from "@/components/global/BasicCard.vue"

import VacationSectionLayout from './VacationSectionLayout.vue'
import ToggleButton from "@/components/global/ToggleButton.vue";

export default {
  name: "Planning",
  data() {
      return {
          title: "The planning of the vacation",
          activities: []
      }
  },
  components: {ToggleButton, BasicCard, VacationSectionLayout },
  mounted() {
    if (this.planning.length > 0) {
      this.activities = this.planning
    }
  },
  computed: {
      ...mapState(useAuthStore, ['user']),
      ...mapState(useVacationStore, ['planning']),
      hasActivities() {
        return this.activities.length > 0
      },
      ascendingPlanning() {
        this.activities.sort ((a, b) => {
          const beginDateA = a.beginDate
          const beginTimeA = a.beginTime

          const [dayA, monthA, yearA] = beginDateA.split('-').map(Number);
          const [hourA, minuteA] = beginTimeA.split(':').map(Number);

          const dateA = new Date(yearA, monthA -1, dayA, hourA, minuteA)

          const beginDateB = b.beginDate
          const beginTimeB = b.beginTime

          const [dayB, monthB, yearB] = beginDateB.split('-').map(Number);
          const [hourB, minuteB] = beginTimeB.split(':').map(Number);

          const dateB = new Date(yearB, monthB -1, dayB, hourB, minuteB)

          return dateA - dateB
        })
      },
    descendingPlanning() {
      this.activities.sort ((a, b) => {
        const beginDateA = a.beginDate
        const beginTimeA = a.beginTime

        const [dayA, monthA, yearA] = beginDateA.split('-').map(Number);
        const [hourA, minuteA] = beginTimeA.split(':').map(Number);

        const dateA = new Date(yearA, monthA -1, dayA, hourA, minuteA)

        const beginDateB = b.beginDate
        const beginTimeB = b.beginTime

        const [dayB, monthB, yearB] = beginDateB.split('-').map(Number);
        const [hourB, minuteB] = beginTimeB.split(':').map(Number);

        const dateB = new Date(yearB, monthB -1, dayB, hourB, minuteB)

        return dateB - dateA
      })
    }
  },
}
</script>