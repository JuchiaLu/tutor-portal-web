import request from '@/utils/request'

export function page(listQuery) {
  return request({
    url: '/business/auth/comments/me/page',
    method: 'get',
    params: listQuery
  })
}


export function saveCommentForTeacher(data,appointId) {
  return request({
    url: '/business/auth/comments/me/'+ appointId + '/save',
    method: 'Post',
    data: data
  })
}

export function saveCommentForStudent(data,appointId) {
  return request({
    url: '/business/auth/comments/me/'+ appointId + '/student/save',
    method: 'Post',
    data: data
  })
}



