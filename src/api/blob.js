import request from "../peanut/utils/request";

export function getBlobList() {
    return request.get(`/blob/getBlobList`)
}
