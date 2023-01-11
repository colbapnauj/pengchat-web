import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { rutaProtegida: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { rutaProtegida: false }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

router.beforeEach((to, from, next) => {
    if (to.meta.rutaProtegida) {
        if (store.getters.authenticatedUser) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})

export default router
