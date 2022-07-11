import router from '@/peanut/router'
import store from '@/peanut/store'
import {getMenuTree} from "../api/sys";

let routes = []
getMenuTree().then(res=>{
    routes = res.result
    resolveRoute(routes)
    routes.forEach(route => router.addRoute(route))
    store.commit('peanut-routes/setRoutes', routes)
})
const resolveRoute = function (routes) {
    routes.forEach(route => {
        route.component = getLayoutComponent(route.componentPath)
        delete route.componentPath
        route?.children?.forEach(item => {
            item.fullPath = (route.path || '') + '/' + (item.path || "")
            item.component = getLayoutComponent(item.componentPath)
            if (item.children && item.children.length)
                resolveRoute(item)
        })
    })

}

function getLayoutComponent(path) {
    return () => ((async () => {
        if (path.includes('@/peanut/')) {
            return await import("@/peanut/" + path.replace("@/peanut/", ''))
        } else {
            return await import("@/views/" + path.replace("@/views/", ''))
        }

    })())

}


