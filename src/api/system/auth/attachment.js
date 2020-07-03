import request from '@/utils/request'

export function save(fileobj){
  let param = new FormData();
  // 上传文件对象 名称file与后台控制器参数要一致
  param.append('file',fileobj.file);
  return request({
    method: 'post',
    // 上传地址
    url: '/system/auth/attachments',
    // 定义上传头
    headers: {'Content-Type':'multipart/form-data'},
    data: param
  });
}
