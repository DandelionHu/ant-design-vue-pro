import request from '@/utils/request'
// 信息管理接口
const systemManageApi = {
  // 部门
  SysDeptFindList: '/LPGSystemManage/admin/sysDept/findList',
  SysDeptSaveDept: '/LPGSystemManage/admin/sysDept/saveDept',
  SysDeptFindById: '/LPGSystemManage/admin/sysDept/findById',
  SysDeptDeleteAll: '/LPGSystemManage/admin/sysDept/deleteAll'
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
    url: systemManageApi.SysDeptFindList,
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
    url: systemManageApi.SysDeptSaveDept,
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
    url: systemManageApi.SysDeptFindById,
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
    url: systemManageApi.SysDeptDeleteAll,
    method: 'post',
    data: parameter
  })
}
