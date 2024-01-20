import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ContactPage from "../pages/ContactPage.vue";

const routes = [
    {
        name: 'home',
        component: HomePage,
        path: '/'
    },
    {
        name: 'contact',
        component: ContactPage,
        path: '/contato'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router