import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let customModules = {};
const customFiles = require.context("@", true, /\.\/store\/index\.js/)
if (customFiles.keys().length) {
    customModules = customFiles(customFiles.keys()[0]).default;
}
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
    modules["peanut-" + key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
    modules[key]['namespaced'] = true
})
Object.keys(customModules).forEach((key) => {
    modules[key] = customModules[key];
})
const store = new Vuex.Store({
    modules,
})
export default store
