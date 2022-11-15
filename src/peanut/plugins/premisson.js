import router from '@/peanut/router'
import store from '@/peanut/store'
import {getMenuTree} from "../api/sys";


/**
 * 全局路由守卫
 * */

router.beforeResolve((to, from, next) => {
    //todo  token检验
    console.log(to)
    document.title = to.meta.title || "后台解决方案"
    next()
})


let routes = []
getMenuTree().then(res => {
    routes = res.result
    resolveRoute(routes)
    routes.forEach(route => router.addRoute(route))
    store.commit('peanut-routes/setRoutes', routes)
})
const resolveRoute = function (routes) {
    routes?.forEach(route => {
        route.component = getLayoutComponent(route.componentPath)
        delete route.componentPath
        route?.children?.forEach(item => {
            item.fullPath = (route.path || '') + '/' + (item.path || "")
            item.meta.title = item.text
            item.component = getLayoutComponent(item.componentPath)
            if (item?.children?.length)
                resolveRoute(route?.children)
        })
    })
}

function getLayoutComponent(path) {
    return () => ((async () => {
        if (path.includes('@/peanut/')) {
            return import("@/peanut/" + path.replace("@/peanut/", ''))
        } else {
            return import("@/views/" + path.replace("@/views/", ''))
        }

    })())

}


