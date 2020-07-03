import request from '@/utils/request'

export function listForMe(listQuery) {
  return request({
    url: '/business/auth/categories/me',
    method: 'get',
    params: listQuery
  })
}

export function putForMe(data) {
  return request({
    url: '/business/auth/categories/me',
    method: 'put',
    data:data
  })
}
