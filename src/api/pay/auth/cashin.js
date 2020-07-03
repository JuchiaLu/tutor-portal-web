import request from '@/utils/request'


export function page(listQuery) {
  return request({
    url: '/pay/auth/cashins/me/page',
    method: 'get',
    params: listQuery
  })
}
