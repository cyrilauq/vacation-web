<script>
import useAuthStore from '../../stores/Auth'
import {mapActions, mapState} from "pinia";
export default {
  name: "Header",
  computed: {
    ...mapState(useAuthStore, ['isAuth'])
  },
  methods: {
    ...mapActions(useAuthStore, ['onLogout']),
    logout() {
      this.onLogout()
    }
  }
}
</script>

<template>
  <!-- Template : https://www.tailwindtoolbox.com/templates/fixed-header -->
  <header>
    <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full z-10 top-0 sticky">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
          <RouterLink :to="{name : 'home'}">
            <span class="text-2xl pl-2"><font-awesome-icon icon="sun" /> HELMo Vacation</span>
          </RouterLink>
        </a>
      </div>

      <div class="flex-grow flex items-center w-auto pt-0" id="nav-content">
        <!-- Routes that are shown to connected and anonymous users -->
        <ul class="list-reset flex justify-end flex-1 items-center">
          <li class="mr-3">
            <!-- This set of classes is for the ACTIVE link -->
            <RouterLink class="inline-block py-2 px-4 text-white no-underline" :to="{name : 'about'}">About</RouterLink>
            <RouterLink class="inline-block py-2 px-4 text-white no-underline" :to="{name : 'contact'}">Contact</RouterLink>
          </li>
        </ul>

        <!-- Routes that are shown only to anonymous users -->
        <ul v-if="!isAuth" class="list-reset flex justify-end flex-1 items-center">
          <li class="mr-3">
            <RouterLink class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" :to="{ name: 'register' }">Register</RouterLink>
          </li>
          <li class="mr-3">
            <RouterLink class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" :to="{ name: 'login' }">Login</RouterLink>
          </li>
        </ul>

        <!-- Routes that are shown only to connected users -->
        <ul v-else class="list-reset flex justify-end flex-1 items-center">
          <li class="mr-3">
            <RouterLink class="inline-block py-2 px-4 text-white no-underline" :to="{name : 'dashboard'}">Dashboard</RouterLink>
            <RouterLink class="inline-block py-2 px-4 text-white no-underline" :to="{name : 'invitations'}">Invitations</RouterLink>
            <RouterLink class="inline-block py-2 px-4 text-white no-underline" :to="{name : 'add-vacation'}">Add vacation</RouterLink>
            <RouterLink @click="logout" class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" :to="{ name: 'home' }">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style></style>