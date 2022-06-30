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
instance.interceptors.response.use((response) => {
    const {data} = response
    return data
})
export default instance
