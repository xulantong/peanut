import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./peanut"

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
