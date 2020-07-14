import request from '@/utils/request'

const userApi = {
  Login: '/LPGSystemManage/loginAccount',
  Logout: '/LPGSystemManage/admin/logout',
  Authority: '/LPGSystemManage/admin/sysAuthority/findKeys',
  MemuFirst: '/LPGSystemManage/admin/sysAuthority/findMemuFirst'
}

/**
 * 登录接口
 * parameter: {
 *     account: '',
 *     password: '',
 *     remember_me: true,
 * }
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
/**
 * 获取权限
 */
export function getAuthority () {
  return request({
    url: userApi.Authority,
    method: 'get'
  })
}
/**
 * 获取导航
 */
export function getMemu () {
  return request({
    url: userApi.MemuFirst,
    method: 'get'
  })
}

/**
 * 退出
 */
export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
