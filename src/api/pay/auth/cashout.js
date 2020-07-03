import request from '@/utils/request'


export function page(listQuery) {
  return request({
    url: '/pay/auth/cashouts/me/page',
    method: 'get',
    params: listQuery
  })
}
