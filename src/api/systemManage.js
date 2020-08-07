import request from '@/utils/request'
// 信息管理接口
const systemManageApi = {
  // 燃气用户
  sysGuestFindGuests: '/LPGSystemManage/admin/sysGuest/findGuests',
  sysGuestFindById: '/LPGSystemManage/admin/sysGuest/findById',
  // 部门
  sysDeptFindList: '/LPGSystemManage/admin/sysDept/findList',
  sysDeptSaveDept: '/LPGSystemManage/admin/sysDept/saveDept',
  sysDeptFindById: '/LPGSystemManage/admin/sysDept/findById',
  sysDeptDeleteAll: '/LPGSystemManage/admin/sysDept/deleteAll',
  // 人员
  sysManagerFindList: '/LPGSystemManage/admin/sysManager/findManagers',
  // 组织
  sysOrgFindOrgs: '/LPGSystemManage/admin/sysOrg/findOrgs',
  sysOrgSaveOrg: '/LPGSystemManage/admin/sysOrg/saveOrg',
  sysOrgFindById: '/LPGSystemManage/admin/sysOrg/findById',
  sysOrgCreateCodeAgain: '/LPGSystemManage/admin/sysOrg/createCodeAgain',
  sysOrgDeleteByIds: '/LPGSystemManage/admin/sysOrg/deleteByIds'
}
/**
 * 燃气用户列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function sysGuestFindGuests (parameter) {
  return request({
    url: systemManageApi.sysGuestFindGuests,
    method: 'post',
    data: parameter
  })
}
/**
 * 燃气用户详情
 * parameter: {
 *       id: '',
 * }
 */
export function sysGuestFindById (parameter) {
  return request({
    url: systemManageApi.sysGuestFindById,
    method: 'post',
    data: parameter
  })
}

/**
 * 部门列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function sysDeptFindList (parameter) {
  return request({
    url: systemManageApi.sysDeptFindList,
    method: 'post',
    data: parameter
  })
}
/**
 * 保存部门
 * parameter: {
 *     name: '',
 * }
 */
export function sysDeptSaveDept (parameter) {
  return request({
    url: systemManageApi.sysDeptSaveDept,
    method: 'post',
    data: parameter
  })
}
/**
 * 部门详情
 * parameter: {
 *     id: '',
 * }
 */
export function sysDeptFindById (parameter) {
  return request({
    url: systemManageApi.sysDeptFindById,
    method: 'post',
    data: parameter
  })
}
/**
 * 删除部门
 * parameter: {
 *     id: [],
 * }
 */
export function sysDeptDeleteAll (parameter) {
  return request({
    url: systemManageApi.sysDeptDeleteAll,
    method: 'post',
    data: parameter
  })
}
/**
 * 人员列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function sysManagerFindList (parameter) {
  return request({
    url: systemManageApi.sysManagerFindList,
    method: 'post',
    data: parameter
  })
}
/**
 * 组织列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function sysOrgFindOrgs (parameter) {
  return request({
    url: systemManageApi.sysOrgFindOrgs,
    method: 'post',
    data: parameter
  })
}
/**
 * 添加组织
 * parameter: {
 *     name: ''
 * }
 */
export function sysOrgSaveOrg (parameter) {
  return request({
    url: systemManageApi.sysOrgSaveOrg,
    method: 'post',
    data: parameter
  })
}
/**
 * 组织详情
 * parameter: {
 *     id: '',
 * }
 */
export function sysOrgFindById (parameter) {
  return request({
    url: systemManageApi.sysOrgFindById,
    method: 'post',
    data: parameter
  })
}
/**
 * 门卡重制
 * parameter: {
 *     id: '',
 * }
 */
export function sysOrgCreateCodeAgain (parameter) {
  return request({
    url: systemManageApi.sysOrgCreateCodeAgain,
    method: 'post',
    data: parameter
  })
}
/**
 * 删除
 * parameter: {
 *     id: [],
 * }
 */
export function sysOrgDeleteByIds (parameter) {
  return request({
    url: systemManageApi.sysOrgDeleteByIds,
    method: 'post',
    data: parameter
  })
}
