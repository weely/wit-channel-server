const axios = require('axios')
const Qs = require('qs')

const service = axios.create({
  // baseURL: '/',
  withCredentials: true,
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = Qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    const status = res.data.code || 200
    if (status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } 
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = service