import request from "../peanut/utils/request";

export function getBarData() {
    return request.get("epidemic/getBarData")
}

export function getLineData() {
    return request.get("epidemic/getLineData")
}

export function getCardData() {
    return request.get("epidemic/getCardData")
}

export function getSelectData() {
    return request.get("epidemic/getSelectData")
}
