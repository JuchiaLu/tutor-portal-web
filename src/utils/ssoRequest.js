import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service2 = axios.create({
  baseURL: '/api/auth',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service2.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Basic d2ViLXBvcnRhbDp3ZWItcG9ydGFs'
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service2.interceptors.response.use(

  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error.response) // for debug
    if(error.response.data.message){
      Message({
        message: error.response.data.message,
        type: 'warning',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service2
