import {forEachTree, filterTree,deepCloneWithJson} from "@/peanut/utils/index"

const exportsObj = {
    forEachTree,
    filterTree,
    deepCloneWithJson
};

/**
 * 基础工具函数集
 */
const baseUtils = {
    install(Vue) {
        Object.keys(exportsObj).forEach(item => {
            Vue.prototype["$" + item] = exportsObj[item];
        })
    }
}

export default baseUtils;
