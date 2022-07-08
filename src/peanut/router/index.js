import Vue from 'vue'
import VueRouter from 'vue-router'
import layouts from "./../layouts"

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: () => import('@/peanut/views/sys/login/index'),
    },
    {
        path: '/login',
        component: () => import('@/peanut/views/sys/login/index'),
    },
    {
        path: '/changePassword',
        component: () => import('@/peanut/views/sys/changePassword/index'),

    },
]

export default new VueRouter({
    routes: routes
})
