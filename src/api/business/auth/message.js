import request from '@/utils/request'


export function page(listQuery) {
  return request({
    url: '/business/auth/messages/me/page',
    method: 'get',
    params: listQuery
  })
}

export function deleteById(id) {
  return request({
    url: '/business/auth/messages/me/'+id,
    method: 'delete',
  })
}

export function readById(id) {
  return request({
    url: '/business/auth/messages/me/'+id +'/read',
    method: 'patch',
  })
}

export function save(data) {
  return request({
    url: '/business/auth/messages/me',
    method: 'post',
    data,
  })
}


export function countNotReadMessage() {
  return request({
    url: '/business/auth/messages/me/countNotReadMessage',
    method: 'get',
  })
}
