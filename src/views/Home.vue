<script>
import {ResponseError} from "@/utils/error/ResponseError";
import {ErrorMessage, Field, Form} from "vee-validate";
import {AnonymousVacationClient} from "@/utils/service/AnonymousVacationClient";

export default {
    name: "Home",
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data() {
    return {
      anonymousVacationClient: new AnonymousVacationClient(),
      errorMessage: undefined,
      vacations: undefined
    }
  },
  methods: {
    onSubmit(values) {
      this.anonymousVacationClient.getUsersByPlace(values['date']).then(vacations => {
        if(!vacations) {
          this.vacations = undefined
          this.errorMessage = "Aucune vacance trouvée pour cette date"
        } else {
          this.errorMessage = undefined
          this.vacations = vacations
        }
      }).catch(error => {
        if (error instanceof ResponseError) {
          this.errorMessage = error.message;
        } else {
          console.error(error.message)
        }
      })
    },
    validateDate(value) {
      if (!value) {
        return 'This field is required';
      }
      return true;
    }
  }
}
</script>

<template>
  <main>
    <h2>Recherche d'utilisateurs en vacances pour une date</h2>
    <Form @submit="onSubmit">
      <Field type="date" name="date" :rules="validateDate" class="dark:bg-dark-bg mt-1 block rounded border-gray-400 text-sm dark:border-gray-600 dark:text-white dark:[color-scheme:dark]"/>
      <ErrorMessage name="date"/>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Valider</button>

      <span v-if="errorMessage !== undefined">{{ errorMessage }}</span>
    </Form>

    <template v-if="vacations !== undefined">
      <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Utilisateurs en vacances pour cette date:</h3>
      <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li v-for="(value, key) in vacations">
          {{key}} : {{value}}
        </li>
      </ul>
    </template>
  </main>
</template>
