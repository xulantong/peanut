import {forEachTree, filterTree,formatThousands, changeTree, deepCloneWithJson} from "@/peanut/utils/index"

const exportsObj = {
    forEachTree,
    filterTree,
    deepCloneWithJson,
    changeTree,
    formatThousands
};

/**
 * 基础工具函数集
 * 基于一个重要的Vue内置关系，VueComponent.prototype.__proto__ = Vue.prototype
 * 所以组件实例中的this,也就是vc,可以通过隐式原型属性访问到Vue.prototype身上的方法和属性
 */
const baseUtils = {
    install(Vue) {
        Object.keys(exportsObj).forEach(item => {
            Vue.prototype["$" + item] = exportsObj[item];
        })
    }
}

export default baseUtils;
