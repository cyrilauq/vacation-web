import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router'

import './assets/tailwind.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import GoogleSignInPlugin from "vue3-google-signin"
import VueGoogleMaps from '@fawmi/vue-google-maps'

import ActionBtn from './components/buttons/ActionBtn.vue'
import FormField from './components/forms/FormField.vue'

import VeeValidatePlugin from './includes/validation'

library.add(fas, far, fab)

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon)

app.use(GoogleSignInPlugin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})

app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GEOCODING_API_KEY,
    },
})

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

app.component("FormField", FormField)
app.component("ActionBtn", ActionBtn)

app.mount('#app')
