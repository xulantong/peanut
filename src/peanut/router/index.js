import Vue from 'vue'
import VueRouter from 'vue-router'
import layouts from "./../layouts"

Vue.use(VueRouter)


const routes = [
    {
        path: '/login',
        component: () => import('../views/login/index'),
        hidden: true,
    },
    {
        path: '/todolist',
        name: 'todolist',
        component: () => import("./../../views/todoList"),
    }
]

export default new VueRouter({
    // name: 'RouterDefault',
    routes: routes
})
