import request from '@/utils/request'

export function page(listQuery) {
  return request({
    url: '/system/notices/page',
    method: 'get',
    params: listQuery
  })
}
