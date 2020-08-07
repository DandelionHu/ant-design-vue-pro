import request from '@/utils/request'
// 进销存管理接口
const entersSellsSavesApi = {
  // 操作日志
  operationLog: '/LPGEntersSellsSaves/admin/operationLog/page',
  operationLogExport: '/LPGEntersSellsSaves/admin/operationLog/pageExport',
  // 数据备份
  dataBackupFindAll: '/LPGEntersSellsSaves/admin/dataBackup/findAll'
}
/**
 * 操作日志列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function operationLog (parameter) {
  return request({
    url: entersSellsSavesApi.operationLog,
    method: 'post',
    data: parameter
  })
}
/**
 * 导出
 * parameter: {
 *     creator: '',
 *     startTime: '',
 *     endTime: '',
 *     token: '',
 * }
 */
export function operationLogExport (parameter) {
  return request({
    url: entersSellsSavesApi.operationLogExport,
    method: 'post',
    data: parameter
  })
}
/**
 * 数据备份列表
 * parameter: {
 *     page: '',
 *     size: '',
 * }
 */
export function dataBackupFindAll (parameter) {
  return request({
    url: entersSellsSavesApi.dataBackupFindAll,
    method: 'post',
    data: parameter
  })
}
