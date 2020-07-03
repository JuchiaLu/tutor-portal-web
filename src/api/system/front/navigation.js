import request from '@/utils/request'

export function list(listQuery) {
  return request({
    url: '/system/navigations',
    method: 'get',
    params: listQuery
  })
}
