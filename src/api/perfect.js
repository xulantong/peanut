import request from "../peanut/utils/request";

export function getBookInfo(params) {
    return request.get(`perfect/getBookInfo`, params)
}

export function getPersonInfo(params) {
    return request.get(`perfect/getPersonInfo`, params)
}
