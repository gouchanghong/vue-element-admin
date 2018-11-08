import request from '@/utils/request'

export function getOrgTree(c_showdept) {
  return request({
    url: '/jcpt/orgs/tree',
    method: 'get',
    params: { c_showdept }
  })
}

export function findOrgByPage(pagenumber, pagesize, cs, ss) {
  return request({
    url: '/jcpt/orgs/page',
    method: 'get',
    params: { pagenumber, pagesize, cs, ss }
  })
}

export function findDeptByPage(pagenumber, pagesize, cs, ss) {
  return request({
    url: '/jcpt/depts/page',
    method: 'get',
    params: { pagenumber, pagesize, cs, ss }
  })
}

export function findUserByPage(pagenumber, pagesize, cs, ss) {
  return request({
    url: '/jcpt/employees/page',
    method: 'get',
    params: { pagenumber, pagesize, cs, ss }
  })
}
