import PeanutRemoteTable from "./PeanutRemoteTable"
import PeanutEmpty from "./PeanutEmpty"
import peanutIcon from "./peanutIcon";
import peanutDescriptions from "./peanutDescriptions";

export default {
    install(Vue){
        Vue.component("PeanutRemoteTable", PeanutRemoteTable)
        Vue.component("PeanutEmpty", PeanutEmpty)
        Vue.component("peanutIcon",peanutIcon)
        Vue.component("peanutDescriptions",peanutDescriptions)

    }
}
