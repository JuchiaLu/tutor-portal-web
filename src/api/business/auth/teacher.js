import request from '@/utils/request'


// 获取我的信息 DTO
export function getMe() {
  return request({
    url: '/business/auth/teachers/me',
    method: 'get',
  })
}

export function patchMe(data) {
  return request({
    url: '/business/auth/teachers/me',
    method: 'patch',
    data: data,
  })
}

export function cashout(data) {
  return request({
    url: '/business/auth/teachers/me/cashout',
    method: 'patch',
    data: data,
  })
}












