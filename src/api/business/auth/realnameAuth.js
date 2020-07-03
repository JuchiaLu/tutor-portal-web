import request from '@/utils/request'

export function getForMe() {
  return request({
    url: '/business/auth/realnameAuths/me',
    method: 'get',
  })
}

export function putForMe(data) {
  return request({
    url: '/business/auth/realnameAuths/me',
    method: 'put',
    data:data
  })
}
