import axios from 'axios'

const requests = axios.create({
    baseURL: "/dev",
    timeout: 5000 // 请求超时
})

export default requests