import Profile from '../views/Profile.vue'
import Dashboard from "@/views/Dashboard.vue";

export const userRoutes = [
    {
        name: "profile",
        path: "/profile/:uid",
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        name: "invitations",
        path: "/invitations",
        component: () => import("../views/Invitations.vue"),
        meta: { requiresAuth: true },
    }
]