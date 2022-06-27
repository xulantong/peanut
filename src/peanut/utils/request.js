import axios from "axios";
import {baseURL, timeout, contentType} from "./../config/index"

export default axios.create({
    baseURL,
    timeout,
    headers: {
        'Content-Type': contentType,
    }
})
