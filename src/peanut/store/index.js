import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// require.context(directory,useSubdirectories,regExp)
// directory:表示检索的目录
// useSubdirectories：表示是否检索子文件夹
// regExp:匹配文件的正则表达式,一般是文件名

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
