import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: "/api", // "/dev-api"
    // timeout: 5000 // 请求超时
})

// 请求拦截器
request.interceptors.request.use(config => {
    store.dispatch({type:'SHOW'}) // 打开加载效果
    return config
  }, error => {
    // 出现异常
    store.dispatch({type:'HIDE'}) // 关闭加载效果
    return Promise.reject(error);
  })
  // 响应拦截器
  request.interceptors.response.use(response =>{
    store.dispatch({type:'HIDE'}) // 关闭加载效果
    return response
  }, error => {
    store.dispatch({type:'HIDE'}) // 关闭加载效果
    return Promise.reject(error);
})

export default request