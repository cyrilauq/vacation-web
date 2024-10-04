import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'

export const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/About.vue')
    }
] 