<template>
    <ContactForm :firstname="firstname" :name="name" :mail="mail" />
</template>

<script>
import { mapState } from 'pinia';

import useAuthStore from '../stores/Auth';
import ContactForm from "../components/forms/ContactForm.vue";

export default {
    data() {
        return {
            name: this.isAuth ? this.user.name : "",
            firstname: this.isAuth ? this.user.firstname : "",
            mail: this.isAuth ? this.user.mail : ""
        };
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        ...mapState(useAuthStore, ['isAuth'])
    },
    components: { ContactForm }
}
</script>