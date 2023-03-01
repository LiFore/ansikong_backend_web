import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '系统首页', icon: 'home' },
  { path: '/', title: '投诉列表', icon: 'comments' },
  { path: '/', title: '数据看板', icon: 'database' }
])

export const menuAside = supplementPath([
  {
    title: '快速访问',
    icon: 'tachometer',
    children: [
      { path: '/index', title: '系统首页' },
      { path: '/+', title: '投诉列表' },
      { path: '/', title: '数据看板' }
    ]
  },
  {
    title: '订单管理',
    icon: 'tasks',
    children: [
      { path: '/orders/list', title: '订单列表' },
      { path: '/orders/comments', title: '评价管理' },
      { path: '/orders/statistics', title: '订单统计' }
    ]
  },
  {
    title: '客户管理',
    icon: 'male',
    children: [
      { path: '/clients/list', title: '客户列表' },
      { path: '/clients/profile', title: '老人档案' },
      { path: '/users/list', title: '用户列表' }
    ]
  },
  {
    title: '服务管理',
    icon: 'user-md',
    children: [
      { path: '/index', title: '服务商列表' },
      { path: '/', title: '服务管理' }
    ]
  },
  {
    title: '财务管理',
    icon: 'dollar',
    children: [
      { path: '/index', title: '回款管理' },
      { path: '/', title: '收入统计' },
      { path: '/', title: '费用管理' }
    ]
  },
  {
    title: '统计分析',
    icon: 'tachometer',
    children: [
      { path: '/index', title: '用户分析' },
      { path: '/', title: '服务商分析' },
      { path: '/', title: '财务分析' }
    ]
  },
  { path: '/index', title: '系统设置', icon: 'home' }
])
