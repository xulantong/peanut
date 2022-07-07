import Vue from 'vue'
import App from './App.vue'
import store from './peanut/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './peanut/router'
import "./peanut"

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
