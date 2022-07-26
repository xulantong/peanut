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
