import axios from "axios";
import {baseURL, timeout, contentType} from "./../config/index"
import dayjs from "dayjs";

export default axios.create({
    baseURL,
    timeout,
    headers: {
        'Content-Type': contentType,
    }
})
