// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'LPGSystemInformation',
    component: BasicLayout,
    meta: { title: '信息管理' },
    children: [
      {
        path: '/LPGSystemInformation',
        name: 'LPGSystemInformation',
        redirect: '/LPGSystemInformation/account/department/dep-list',
        component: RouteView,
        meta: {
          title: '人员管理',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: [ 'LPGSystemInformation' ]
        },
        children: [
          {
            path: '/LPGSystemInformation/account/organization/org-list',
            name: 'OrgList',
            component: () => import('@/views/LPGSystemInformation/account/organization/OrgList'),
            meta: { title: '组织列表', keepAlive: true, permission: ['LPGSystemInformation'] }
          },
          {
            path: '/LPGSystemInformation/account/department/dep-list',
            name: 'DepList',
            component: () => import('@/views/LPGSystemInformation/account/department/DepList'),
            meta: { title: '部门列表', keepAlive: true, permission: ['LPGSystemInformation'] }
          },
          {
            path: '/LPGSystemInformation/customer/gascustomer/gas-list',
            name: 'GasList',
            component: () => import('@/views/LPGSystemInformation/customer/gascustomer/GasList'),
            meta: { title: '燃气用户信息', keepAlive: true, permission: ['LPGSystemInformation'] }
          },
          {
            path: '/LPGInvoicing/system/operation/ope-list',
            name: 'OpeList',
            component: () => import('@/views/LPGInvoicing/system/operation/OpeList'),
            meta: { title: '操作日志', keepAlive: true, permission: ['LPGInvoicing'] }
          },
          {
            path: '/LPGInvoicing/system/dataBackup/data-list',
            name: 'DataList',
            component: () => import('@/views/LPGInvoicing/system/dataBackup/DataList'),
            meta: { title: '数据备份', keepAlive: true, permission: ['LPGInvoicing'] }
          },
          {
            path: '/LPGInvoicing/ERPReport/saleList/sale-list',
            name: 'SaleList',
            component: () => import('@/views/LPGInvoicing/ERPReport/saleList/SaleList'),
            meta: { title: '销售报表(气站)', keepAlive: true, permission: ['LPGInvoicing'] }
          }
        ]
      }
    ]
  },
  {
    path: '/LPGInvoicing',
    name: 'LPGInvoicing',
    component: BasicLayout,
    meta: { title: '气站进销存' },
    children: [
      {
        path: '/LPGInvoicing/ERPReport',
        name: 'ERPReport',
        component: RouteView,
        meta: {
          title: 'ERP报表',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: [ 'LPGInvoicing' ]
        },
        children: [
          {
            path: '/LPGInvoicing/ERPReport/saleList/sale-list',
            name: 'SaleList',
            component: () => import('@/views/LPGInvoicing/ERPReport/saleList/SaleList'),
            meta: { title: '销售报表(气站)', keepAlive: true, permission: ['LPGInvoicing'] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由，不需要登录可以访问的路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/LoginNew')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }
]
