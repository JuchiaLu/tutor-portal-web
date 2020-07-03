import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const bearerToken  = getToken()
    if (bearerToken) {
      config.headers['Authorization'] = "bearer "+bearerToken
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug

    if(error.response.data.message){
      let message = error.response.data.message
      if(error.response.data.data){
        message = message+':'+JSON.stringify(error.response.data.data)
      }
      Message({
        message: message,
        type: 'warning',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
