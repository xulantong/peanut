import peanutLayoutTop from "./peanutLayoutTop"
import peanutLayoutTopLeft from "./peanutLayoutTopLeft";
import peanutLayoutTopRight from "./peanutLayoutTopRight";
import peanutLayoutSide from "./peanutLayoutSide";
import peanutLayoutTabs from "./peanutLayoutTabs";
import peanutLayoutMain from "./peanutLayoutMain";
import peanutLayoutMenu from "./peanutLayoutMenu";


export default {
    install(Vue) {
        Vue.component("peanutLayoutTop",peanutLayoutTop)
        Vue.component("peanutLayoutTopLeft",peanutLayoutTopLeft)
        Vue.component("peanutLayoutTopRight",peanutLayoutTopRight)
        Vue.component("peanutLayoutSide",peanutLayoutSide)
        Vue.component("peanutLayoutTabs",peanutLayoutTabs)
        Vue.component("peanutLayoutMain",peanutLayoutMain)
        Vue.component("peanutLayoutMenu",peanutLayoutMenu)
    }
}
