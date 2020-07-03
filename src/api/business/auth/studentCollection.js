import request from '@/utils/request'


export function page(listQuery) {
  return request({
    url: '/business/auth/studentCollects/me/teachers/page',
    method: 'get',
    params: listQuery
  })
}

export function deleteByTeacherId(teacherId) {
  return request({
    url: '/business/auth/studentCollects/me/teacherId/'+teacherId,
    method: 'delete',
  })
}


export function save(teacherId) {
  return request({
    url: '/business/auth/studentCollects/me/teacherId/'+teacherId,
    method: 'post',
  })
}
