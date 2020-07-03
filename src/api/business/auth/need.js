import request from '@/utils/request'


export function isMyPublish(needId) {
  return request({
    url: '/business/auth/needs/me/'+needId+'/isMyPublish',
    method: 'get',
  })
}

export function isMyAppoint(needId) {
  return request({
    url: '/business/auth/needs/me/'+needId +'/isMyAppoint',
    method: 'get',
  })
}


export function chooseTeacherForNeed(needId,teacherId) {
  return request({
    url: '/business/auth/needs/me/'+needId +'/teacher/'+teacherId,
    method: 'patch',
  })
}

export function save(data) {
  return request({
    url: '/business/auth/needs/me',
    method: 'post',
    data:data
  })
}

export function page(query) {
  return request({
    url: '/business/auth/needs/me/page',
    method: 'get',
    params:query
  })
}

export function close(needId) {
  return request({
    url: '/business/auth/needs/me/'+needId +'/close',
    method: 'patch',
  })
}

export function softDelete(needId) {
  return request({
    url: '/business/auth/needs/me/'+needId +'/delete',
    method: 'patch',
  })
}


