import PeanutRemoteTable from "./PeanutRemoteTable"
import PeanutEmpty from "./PeanutEmpty"
import PeanutIcon from "./PeanutIcon";
import PeanutDescriptions from "./PeanutDescriptions";

export default {
    install(Vue){
        Vue.component("PeanutRemoteTable", PeanutRemoteTable)
        Vue.component("PeanutEmpty", PeanutEmpty)
        Vue.component("PeanutIcon",PeanutIcon)
        Vue.component("PeanutDescriptions",PeanutDescriptions)

    }
}
