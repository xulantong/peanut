export default {
    install(Vue) {
        /* 全局事件总线 */
        Vue.prototype.$baseEventBus = new Vue()
    }
}
