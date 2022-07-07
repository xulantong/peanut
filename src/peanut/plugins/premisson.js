import router from '@/peanut/router'
import store from '@/peanut/store'
import layouts from "../layouts";

let routes = [
    {
        path: '/test',
        name: 'test',
        component: layouts,
        meta: {
            title: "待办事项",
        },
        children: [
            {
                path: 'todolist',
                name: 'todolist',
                component: () => import("@/views/todoList"),
                meta: {
                    title: "待办事项",
                }

            },
            {
                path: 'info',
                name: 'info',
                component: () => import("@/views/information"),
                meta: {
                    title: "个人介绍",
                }

            },

        ]
    }
]
const resolveRoute = function (routes) {
    routes.forEach(route => {
        route?.children?.forEach(item => {
            item.fullPath = (route.path || '') +'/'+ (item.path || "")
            if (item.children && item.children.length)
                resolveRoute(item, item.children)
        })
    })

}
resolveRoute(routes)
routes.forEach(route => router.addRoute(route))
store.commit('peanut-routes/setRoutes', routes)
