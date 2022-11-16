import router from '@/peanut/router'
import store from '@/peanut/store'
import {getMenuTree} from "../api/sys";


/**
 * 全局路由守卫
 * */

router.beforeResolve((to, from, next) => {
    if (!localStorage.getItem('token') && to.path !== '/') {
        store.commit('peanut-user/setAccessToken', '')
        router.replace({path: '/'})
    }

    document.title = getPageTitle(to)
    next()
})

function getPageTitle(to) {
    return to.matched.map(item => item.meta.title).join(' - ')
}

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
        route.meta.title = route.text
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


