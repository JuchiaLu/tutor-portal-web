import request from '@/utils/ssoRequest'
const qs = require('qs');

export function getAccessTokenByCode(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function getAccessTokenByPassword(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data:qs.stringify(data)
  })
}
