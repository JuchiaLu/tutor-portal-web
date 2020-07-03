import request from '@/utils/request'

export function listByCode(code) {
  return request({
    url: '/business/dicts/code/'+code,
    method: 'get',
  })
}
