import PeanutRemoteTable from "./PeanutRemoteTable"
import PeanutEmpty from "./PeanutEmpty"
export default {
    install(Vue){
        Vue.component("PeanutRemoteTable", PeanutRemoteTable)
        Vue.component("PeanutEmpty", PeanutEmpty)
    }
}
