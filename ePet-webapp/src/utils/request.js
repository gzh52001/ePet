import axios from 'axios'

const request = axios.create({
    baseURL: "/api", // "/dev-api"
    // timeout: 5000 // 请求超时
})

export default request