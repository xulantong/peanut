import Vue from 'vue'
import VueRouter from 'vue-router'
import layouts from "./../layouts"

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: () => import('@/peanut/views/login/index'),
    },
    {
        path: '/login',
        component: () => import('@/peanut/views/login/index'),
    },
]

export default new VueRouter({
    routes: routes
})
