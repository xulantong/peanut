import request from "../utils/request";

export function login(params) {
    return request.post('sys/login', params)
}
