import axios from "axios";
import {baseURL, timeout, contentType} from "./../config/index"
import store from "../store";
import dayjs from "dayjs";

const instance = axios.create({
    baseURL,
    timeout,
    headers: {
        'Content-Type': contentType,
    }
})
instance.postForm = function (url, data, config = {}) {
    return instance.post(url, data, {
        ...config,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

instance.uploadForm = function (url, data, config = {}) {
    let formData = new FormData();
    if (data) {
        for (let field in data) {
            if (data[field] !== null && data[field] !== undefined) {
                formData.append(field, data[field]);
            }
        }
    }
    return instance.post(url, formData, {
        ...config,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

instance.interceptors.request.use((config) => {
    store.getters["peanut-user/accessToken"] && (config.headers.token = store.getters["peanut-user/accessToken"])
    return config
}, (err) => {
    throw err
})

instance.interceptors.response.use((response) => {
    const {data} = response
    const {code, msg} = data;
    if (!code || [200].includes(code)) {
        return data
    } else {
        return Promise.reject(msg || "error")
    }
}, (err) => {
    let {message} = err
    if (message === 'Network Error') {
        message = '后端接口连接异常'
    }
    if (message.includes('timeout')) {
        message = '后端接口请求超时'
    }
    if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
    }
    return Promise.reject(message)

})
export default instance
