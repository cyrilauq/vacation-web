<script>
import {VacationApiClient} from "@/utils/service/VacationApiClient";
import {mapState} from "pinia";
import useAuthStore from "@/stores/Auth";
import {ResponseError} from "@/utils/error/ResponseError";
import BasicCard from "@/components/global/BasicCard.vue";
import ToggleButton from "@/components/global/ToggleButton.vue";

export default {
  name: "Dashboard",
  components: {ToggleButton, BasicCard},
  data() {
    return {
      vacationApiClient: undefined,
      errorMessage: undefined,
      vacations: undefined
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useAuthStore, ['isAuth'])
  },
  mounted() {
    this.vacationApiClient = new VacationApiClient(this.user.token);
    // Code that will run only after the
    // entire view has been rendered
    this.vacationApiClient.getVacations(this.user.token).then(vacations => {
      if(!vacations) {
        //console.log("Pas de vacances : " + JSON.stringify(vacations, null, 4))
        this.vacations = undefined
        this.errorMessage = "Aucune vacance trouvée pour cette date"
      } else {
        //console.log("Vacances trouvées : " + JSON.stringify(vacations, null, 4))
        this.errorMessage = undefined
        this.vacations = vacations
      }
    }).catch(error => {
        console.error(error);
      if (error instanceof ResponseError) {
        this.errorMessage = error.message;
      } else {
        console.error(error.message)
      }
    })
  }
}
</script>

<template>
  <div class="about">
    <h1>This is the dashboard</h1>

    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Your vacations</h2>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 list-none">
      <template v-for="vacation in vacations">
        <li class="pb-5">
          <RouterLink :to="{path : '/vacation/' + vacation.id}">
            <BasicCard
                :title="vacation.title"
                :content="`${vacation.description}. Will be held at ${vacation.place} from ${new Date(vacation.dateTimeBegin).toDateString()} to ${new Date(vacation.dateTimeEnd).toDateString()}`">
            </BasicCard>
          </RouterLink>
        </li>
      </template>
    </ul>

    <span v-if="vacations === undefined">Pas de vacances</span>
  </div>
</template>

<style scoped>

</style>