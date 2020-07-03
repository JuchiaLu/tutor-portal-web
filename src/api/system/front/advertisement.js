import request from '@/utils/request'

export function list(listQuery) {
  return request({
    url: '/system/advertisements',
    method: 'get',
    params: listQuery
  })
}
