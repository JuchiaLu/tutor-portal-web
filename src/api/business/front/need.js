import request from '@/utils/request'

export function page(listQuery) {
  return request({
    url: '/business/needs/page',
    method: 'get',
    params: listQuery
  })
}

export function getById(id) {
  return request({
    url: '/business/needs/'+id,
    method: 'get',
  })
}



export function pageTeachersForNeed(id) {
  return request({
    url: '/business/needs/'+id+'/teachers/page',
    method: 'get',
  })
}






