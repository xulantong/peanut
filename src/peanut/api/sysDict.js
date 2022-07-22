import request from "../utils/request";

export function getDict(params) {
    return request.post("sysDict/getDict", params)
}
export function appendDict(params) {
    return request.post("sysDict/append", params)
}
export function deleteDict(params) {
    return request.post("sysDict/delete", params)
}
export function getAllDict(params) {
    return request.get("sysDict/getAllDict", params)
}
export function getDictValue(params) {
    return request.post("dictValue/getDictValue", params)
}
export function appendValue(params) {
    return request.post("dictValue/appendValue", params)
}
export function deleteValue(params) {
    return request.post("dictValue/deleteValue", params)
}

