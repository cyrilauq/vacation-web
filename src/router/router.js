import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes.js'
import { authRoutes } from './auth.js'
import { vacationRoutes } from './vacations.js'
import { userRoutes } from './user.js'
import useAuthStore from '../stores/Auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...routes,
        ...authRoutes,
        ...vacationRoutes,
        ...userRoutes
    ]
})

router.beforeEach((to, from, next) => {
    //console.log('Global Guard');
    // console.log(to.meta);
    // console.log(to, from);

    //console.log(to);
    if (to.fullPath.indexOf("#") != -1) {
        next({
            path: to.fullPath.substring(to.fullPath.indexOf("#") + 1)
        })
        return
    }

    if (!to.meta.requiresAuth) {
        next();
        return;
    }

    const store = useAuthStore();
    //console.log(`Is the user logged in? ${store.isAuth}`);

    if (store.isAuth) {
        next();
    } else {
        next({ name: 'home' });
    }
});

export default router
