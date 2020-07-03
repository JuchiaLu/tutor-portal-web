import request from '@/utils/request'

export function listForMe(listQuery) {
  return request({
    url: '/business/auth/areas/me',
    method: 'get',
    params: listQuery
  })
}

export function putForMe(data) {
  return request({
    url: '/business/auth/areas/me',
    method: 'put',
    data:data
  })
}
