import PeanutRemoteTable from "./PeanutRemoteTable"
import PeanutEmpty from "./PeanutEmpty"
import peanutIcon from "./peanutIcon";

export default {
    install(Vue){
        Vue.component("PeanutRemoteTable", PeanutRemoteTable)
        Vue.component("PeanutEmpty", PeanutEmpty)
        Vue.component("peanutIcon",peanutIcon)

    }
}
