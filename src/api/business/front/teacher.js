import request from '@/utils/request'

export function page(listQuery) {
  return request({
    url: '/business/teachers/page',
    method: 'get',
    params: listQuery
  })
}

export function getById(id) {
  return request({
    url: '/business/teachers/'+id,
    method: 'get',
  })
}

export function pageCommentForTeacher(id,listQuery) {
  return request({
    url: '/business/teachers/'+id +'/comments/page',
    method: 'get',
    params: listQuery
  })
}

export function listAreasForTeacher(id) {
  return request({
    url: '/business/teachers/'+id +'/areas',
    method: 'get',
  })
}

export function listCategoriesForTeacher(id) {
  return request({
    url: '/business/teachers/'+id +'/categories',
    method: 'get',
  })
}












