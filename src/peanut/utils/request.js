import axios from "axios";
import {baseURL, timeout, contentType} from "./../config/index"
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

instance.interceptors.response.use((response) => {
    const {data} = response
    const {code, msg} = data;
    if(!code||[200].includes(code)){
        return data
    }else {
        return Promise.reject(msg||"error")
    }
})
export default instance
