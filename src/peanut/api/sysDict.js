import request from "../utils/request";

export function getDict(params) {
    return request.post("sysDict/getDict", params)
}
