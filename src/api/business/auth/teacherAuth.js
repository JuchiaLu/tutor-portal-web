import request from '@/utils/request'

export function getForMe() {
  return request({
    url: '/business/auth/teacherAuths/me',
    method: 'get',
  })
}

export function putForMe(data) {
  return request({
    url: '/business/auth/teacherAuths/me',
    method: 'put',
    data:data
  })
}
