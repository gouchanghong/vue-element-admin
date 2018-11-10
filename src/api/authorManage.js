import request from '@/utils/request'

/**
 * 获取角色列表（分页）
 * @param params 查询条件
 * @param pagenumber 页码
 * @param pagesize 每页条数
 */
export function getRoleList(params, pagenumber, pagesize) {
  return request({
    url: '/jcpt/roles/page?' + (params || ''),
    method: 'get',
    params: { pagenumber, pagesize }
  })
}

/**
 * 根据角色ID获取角色
 * @param id
 */
export function getRole(id) {
  return request({
    url: '/jcpt/roles/' + id,
    method: 'get'
  })
}

/**
 * 新增角色
 * @param data
 */
export function saveRole(data) {
  return request({
    url: '/jcpt/role',
    method: 'post',
    data
  })
}

/**
 * 编辑角色
 * @param data
 */
export function updateRole(data) {
  return request({
    url: '/jcpt/role',
    method: 'put',
    data
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id) {
  return request({
    url: '/jcpt/role/' + id,
    method: 'delete'
  })
}

/**
 * 根据角色ID获取资源树
 * @param id
 */
export function getResouceTreeByRoleId(id) {
  return request({
    url: '/jcpt/role/' + id + '/resources/tree',
    method: 'get'
  })
}
/**
 * 保存指定角色分配的资源
 * @param roleid
 * @param resourceids
 */
export function saveRoleResources(roleid, resourceids) {
  const data = { roleid, resourceids }
  return request({
    url: '/jcpt/role/resources',
    method: 'put',
    data
  })
}
