import request from '@/utils/request'

export function login(data) {
  // 登录
  return request({
    url: '/acl/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // 获取用户信息
  return request({
    url: '/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // 退出登录
  return request({
    url: '/acl/index/logout',
    method: 'post'
  })
}
