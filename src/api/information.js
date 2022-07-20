import request from "../peanut/utils/request";

export function getTree(params) {
    return request.post("information/getTree", params)
}
