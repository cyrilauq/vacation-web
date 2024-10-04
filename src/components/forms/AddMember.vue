<script>
import {UserApiClient} from "@/utils/service/UserApiClient";
import { mapState } from 'pinia'
import useAuthStore from "@/stores/Auth"
import {ResponseError} from "@/utils/error/ResponseError";
import {VacationApiClient} from "@/utils/service/VacationApiClient";
import swal from "sweetalert";

export default {
  name: "AddMember",
  props: {
    vacationId: String
  },
  data() {
    return {
      userApiClient: undefined,
      vacationApiClient: undefined,
      userSearchResult: undefined,
      userSearchError: undefined
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useAuthStore, ['isAuth'])
  },
  mounted() {
    this.userApiClient = new UserApiClient(this.user.token)
    this.vacationApiClient = new VacationApiClient(this.user.token)
  },
  methods: {
    onSubmitSearch(value) {
      // Appel API de recherche
      this.userApiClient.searchMembers(value.userField).then(users_array => {
        if(!users_array) {
          this.userSearchResult = undefined
          this.userSearchError = "Aucun utilisateur trouvé"
        } else {
          this.userSearchResult = users_array
          this.userSearchError = undefined
        }
      }).catch(error => {
        if (error instanceof ResponseError) {
          this.userSearchError = error.message;
        } else {
          console.error(error.message)
        }
      })
    },
    onAddMember(value) {
      if(!value.userToAdd) {
        swal("Mandatory user selection", "You must select a user", "error");
        return
      }

      this.vacationApiClient.addMember(value.userToAdd, this.vacationId).then(response => {
        let responseContent = `User received an invite and must accept it to be added.`
        swal("User added", responseContent, "success")
      }).catch(error => {
        if (error instanceof ResponseError) {
          swal("Error occured", error.message, "error")
        } else {
          swal("Error occured", error.message, "error")
          console.error(error.message)
        }
      })
    },
    validateUserSearch(value) {
      if(!value || value.length <= 2) {
        return 'Minimum 3 characters required to search'
      }
      return true;
    }
  }
}
</script>

<template>
  <!-- Template : https://v1.tailwindcss.com/components/forms -->
  <Form class="w-full max-w-sm pb-5" @submit="onSubmitSearch">
    <div class="flex items-center border-b border-teal-500 py-2">
      <Field type="text" name="userField" :rules="validateUserSearch" placeholder="Utilisateur" class="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"/>
      <button type="submit" class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
      <ErrorMessage name="userSearch"/>
    </div>
  </Form>

  <!-- Template : https://flowbite.com/docs/forms/radio/#radio-list-group -->
  <Form @submit="onAddMember" v-if="this.userSearchResult !== undefined">
    <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li v-for="user in userSearchResult" class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
          <Field name="userToAdd" type="radio" :value="user.uid" :id="user.uid" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
          <label :for="user.uid" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{user.firstname}} {{user.name}} - {{user.email}}</label>
        </div>
      </li>
    </ul>
    <button type="submit" class="ml-5 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
      <font-awesome-icon :icon="['fas', 'user-plus']" />
    </button>
  </Form>
  <span v-else>{{userSearchError}}</span>

</template>

<style scoped>

</style>