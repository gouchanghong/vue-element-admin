import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: () => import('@/views/welcome/index')
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  /** 基础注册菜单 start**/
  {
    path: '/search-org',
    component: Layout,
    redirect: '/search-org/list',
    name: 'search-org',
    meta: {
      title: '机构查询', roles: ['/search-org']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/basicRegistration/SearchOrg'),
        name: 'search-org-list',
        meta: { title: '机构查询', icon: 'documentation', roles: ['/search-org'] }
      }
    ]
  },
  {
    path: '/search-dept',
    component: Layout,
    redirect: '/search-dept/list',
    name: 'search-dept',
    meta: {
      title: '机构查询', roles: ['/search-dept']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/basicRegistration/SearchDept'),
        name: 'search-dept-list',
        meta: { title: '部门查询', icon: 'documentation', roles: ['/search-dept'] }
      }
    ]
  },
  {
    path: '/search-user',
    component: Layout,
    redirect: '/search-user/list',
    name: 'search-user',
    meta: {
      title: '机构查询', roles: ['/search-user']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/basicRegistration/SearchUser'),
        name: 'search-user-list',
        meta: { title: '人员查询', icon: 'documentation', roles: ['/search-user'] }
      }
    ]
  },
  /** 基础注册菜单 end**/
  /** 权限管理菜单 start**/
  {
    path: '/manage-user',
    component: Layout,
    redirect: '/manage-user/list',
    name: 'manage-user',
    meta: {
      title: '用户管理', roles: ['/manage-user']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/authorManage/ManageUser'),
        name: 'manage-user-list',
        meta: { title: '用户管理', icon: 'documentation', roles: ['/manage-user'] }
      }
    ]
  },

  {
    path: '/manage-role',
    component: Layout,
    redirect: '/manage-role/list',
    name: 'manage-role',
    meta: {
      title: '角色管理', roles: ['/manage-role']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/authorManage/ManageRole'),
        name: 'manage-role-list',
        meta: { title: '角色管理', icon: 'documentation', roles: ['/manage-role'] }
      }
    ]
  },

  {
    path: '/manage-resource',
    component: Layout,
    redirect: '/manage-resource/list',
    name: 'manage-resource',
    meta: {
      title: '资源管理', roles: ['/manage-resource']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/authorManage/ManageResource'),
        name: 'manage-role-list',
        meta: { title: '资源管理', icon: 'documentation', roles: ['/manage-resource'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
