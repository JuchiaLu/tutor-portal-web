import request from '@/utils/request'

export function save(data){
  return request({
    url: '/system/auth/advices',
    method: 'post',
    data: data
  });
}
