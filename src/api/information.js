import request from "../peanut/utils/request";

export function getTree(params) {
    return request.post("information/getTree", params)
}
export function getCacheDict(params) {
    return request.get("dictValue/getCacheDict", params)
}
export function getInfo(params) {
    return request.get("information/getInfo", params)
}
export function saveInfo(params) {
    return request.post("information/saveInfo", params)
}
