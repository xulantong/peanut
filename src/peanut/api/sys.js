import request from "../utils/request";

export function login(params) {
    return request.post('sys/login', params)
}
export function checkPassword(params) {
    return request.post(`/sys/checkPassword`, params)
}
export function changePassword(params) {
    return request.post(`/sys/changePassword`, params)
}
export function getMenuTree(params) {
    return request.post(`/sys/getMenuTree`, params)
}
