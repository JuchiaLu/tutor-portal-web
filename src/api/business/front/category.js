import request from '@/utils/request'


export function listByParentId(id) {
  return request({
    url: '/business/categories/parentId/'+id,
    method: 'get',
  })
}

export function list(listQuery) {
  return request({
    url: '/business/categories',
    method: 'get',
    params: listQuery
  })
}







