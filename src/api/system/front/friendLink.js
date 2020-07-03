import request from '@/utils/request'

export function list(listQuery) {
  return request({
    url: '/system/friendLinks',
    method: 'get',
    params: listQuery
  })
}
