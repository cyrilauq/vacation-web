<script>
import Header from './components/global/Header.vue';
import useAuthStore from './stores/Auth';

import { mapState, mapActions } from 'pinia';

export default {
    name: "App",
    components: {
        Header
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        ...mapState(useAuthStore, ['token']),
    },
    methods: {
        ...mapActions(useAuthStore, ['onLogin']),
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user !== undefined && user !== null) {
            this.onLogin(user);
        }
    },
    unmounted() {
        if(this.user !== undefined && this.user !== null) {
            localStorage.setItem("user", JSON.stringify(this.user));
        }
    }
}
</script>

<template>
  <Header></Header>

  <RouterView />
</template>
