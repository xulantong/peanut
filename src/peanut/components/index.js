import DiscoRemoteTable from "./DiscoRemoteTable"
import PeanutRemoteTable from "./PeanutRemoteTable"
import PeanutEmpty from "./PeanutEmpty"
import PeanutIcon from "./PeanutIcon";
import PeanutDescriptions from "./PeanutDescriptions";
import PeanutSearchForm from "./PeanutSearchForm";
import ElTable from "./ElTable";
import ElementUI from 'element-ui';

export default {
    install(Vue){
        Vue.use(ElementUI, {
            size: 'small'
        })
        Vue.component("PeanutRemoteTable", PeanutRemoteTable)
        Vue.component("PeanutEmpty", PeanutEmpty)
        Vue.component("PeanutIcon",PeanutIcon)
        Vue.component("PeanutDescriptions",PeanutDescriptions)
        Vue.component("PeanutSearchForm",PeanutSearchForm)
        Vue.component("ElTable",ElTable)
        Vue.component("DiscoRemoteTable",DiscoRemoteTable)
    }
}
