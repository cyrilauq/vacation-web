import { defineStore } from "pinia";
import User from '../module/user'

// TODO: Bug, le store perd son state quand on change de route (retourne à false)
export default defineStore("auth", {
    state: () => ({
        isAuth: false,
        user: undefined
    }),
    getters: {
        token: () => localStorage.getItem("token")
    },
    actions: {
        onLogin(user) {
            this.user = new User(
                user.name,
                user.uid,
                user.firstname,
                user.mail,
                user.token
            );
            this.isAuth = true;
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        onLogout() {
            this.isAuth = false;
            this.user = undefined;
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})