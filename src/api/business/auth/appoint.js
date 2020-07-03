import request from '@/utils/request'

export function postForMe(needId) {
  return request({
    url: '/business/auth/appoints/me/'+needId,
    method: 'post',
  })
}

export function page(listQuery) {
  return request({
    url: '/business/auth/appoints/me/page',
    method: 'get',
    params: listQuery
  })
}

export function cancel(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/cancel',
    method: 'patch',
  })
}

export function endCourse(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/endCourse',
    method: 'patch',
  })
}

export function right(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/right',
    method: 'patch',
  })
}


export function agreeClose(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/agreeClose',
    method: 'patch',
  })
}

export function rejectClose(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/rejectClose',
    method: 'patch',
  })
}

export function deleteForTeacher(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/teacher',
    method: 'delete',
  })
}

//-------------------------------------------------------------

// 分页
export function studentPage(listQuery) {
  return request({
    url: '/business/auth/appoints/me/student/page',
    method: 'get',
    params: listQuery
  })
}

// 获取支付宝付款地址
export function getPayRedirectUrl(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+appointId + '/student/payRedirectUrl',
    method: 'get',
  })
}

// 取消付款
export function studentClose(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/close',
    method: 'patch',
  })
}

// 试教通过
export function studentPass(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/pass',
    method: 'patch',
  })
}

// 试教不通过
export function studentNotPass(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/notPass',
    method: 'patch',
  })
}

//主动结课
export function studentEndCourse(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/endCourse',
    method: 'patch',
  })
}

//申请关闭
export function studentCloseCourse(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/closeCourse',
    method: 'patch',
  })
}

//同意结课
export function studentAgreeCloseCourse(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/agreeCloseCourse',
    method: 'patch',
  })
}

//拒绝结课
export function studentRejectCloseCourse(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/rejectCloseCourse',
    method: 'patch',
  })
}

// 软删除
export function deleteForStudent(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student',
    method: 'delete',
  })
}

//维权
export function studentRight(appointId) {
  return request({
    url: '/business/auth/appoints/me/'+ appointId +'/student/right',
    method: 'patch',
  })
}
