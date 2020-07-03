import request from '@/utils/request'

export function listByParentId(id) {
  return request({
    url: '/business/areas/parentId/'+id,
    method: 'get',
  })
}

export function list(listQuery) {
  return request({
    url: '/business/areas',
    method: 'get',
    params: listQuery
  })
}







