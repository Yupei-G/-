import axios from 'axios'
import $vuex from '@/store/index'

export function request(config) {
  /* 1、创建axios实例 */
  const instance = axios.create({
    baseURL: 'http://localhost:3000/', // 设置请求的公共路径
    timeout: 5000 // 设置请求超时时间
  })
  /* 2、发送请求拦截 */
  instance.interceptors.request.use(
    configs => {
      if (config.request) {
        config.request(configs)
      }
      return configs;
    },
    error => {
      if (config.requesterror) {
        config.request(error)
      }
      return error
    }
  )
    
  /* 3、响应数据拦截器 */
  instance.interceptors.response.use(
     // token 可以判断已过期，重定向到登录页面
    response => {
      if (config.response) {
        config.response(response) // 请求成功回调函数
      }
      return response;
    },
    error => {
      if (config.responseerror) {
        config.responseerror(error) // 请求失败回调函数
      }
      return error
    }
  )

  /* 4、发送网络请求 */
  return instance(config)
}