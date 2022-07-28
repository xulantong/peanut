/**
 * 过滤树形结构
 *
 */
export function filterTree(targetTree, filter, children = "children") {
    let arr = [];
    let tree = JSON.parse(JSON.stringify(targetTree))
    if (tree.length) {
        tree.forEach(item => {
            if (!filter || filter(item)) {
                arr.push(item);
            }
            if (item[children] && item[children]?.length) {
                item[children] = filterTree(item[children], filter, children);
            } else {
                item[children] = null;
            }
        })
    }
    return arr;
}

/**
 * 遍历树结构
 *
 */
export function forEachTree(tree, resolver, children = "children") {
    if (tree?.length) {
        tree.forEach(item => {
            resolver?.(item);
            if (item?.[children]) {
                forEachTree(item[children], resolver, children);
            }
        });
    }
}

/**
 * 深度拷贝
 *
 */
export function deepCloneWithJson(obj) {
    if (!obj) {
        return null
    }
    return JSON.parse(JSON.stringify(obj))
}
/**
 * 根据条件修改树形数据
 *
 */
export function changeTree(targetTree, filter, callBack, children = 'children') {
    if (!targetTree) {
        return null
    }
    let tree = this.$deepCloneWithJson(targetTree)
    tree.forEach(item => {
        if (filter(item)) {
            callBack(item)
        } else {
            item[children] = item[children] && this.changeTree(item[children], filter, callBack, children)
        }
    })
    return tree
}
/**
 * 数值千分位格式化
 *
 */
export function formatThousands(value) {
    if (value) {
        let prefix = value < 0 ? "-" : "";
        value = value.toString().replace("-", "");
        let arr = value.split(".");
        arr[0] = arr[0].split("").reverse().map((item, i) => i && i % 3 === 0 ? item + "," : item).reverse().join("")
        return prefix + arr.join(".")
    }
    return value;
}

