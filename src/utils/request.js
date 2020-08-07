import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 406) {
      notification.error({
        message: '登录失效',
        description: '登录失效，请重新登录'
      })
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// 请求拦截
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  Vue.prototype.$message.loading('加载中..', 0)
  // 循环data，检测是否有数组
  for (const key in config.data) {
    if (Array.isArray(config.data[key])) {
      // 是数组,阻止深度序列化
      config.data = qs.stringify(config.data, { indices: false })
      return config
    }
  }
  config.data = qs.stringify(config.data) // 转为formdata数据格式
  return config
}, errorHandler)

// 响应拦截器
request.interceptors.response.use((response) => {
  Vue.prototype.$message.destroy()
  const { code, message, isSuccess } = response.data
  if (code !== -1 && isSuccess) {
    // 获取数据成功
    return response.data
  } else {
    Vue.prototype.$notification['error']({
      message: '错误',
      description: message,
      duration: 4
    })
  }
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
