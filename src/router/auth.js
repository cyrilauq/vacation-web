import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
]