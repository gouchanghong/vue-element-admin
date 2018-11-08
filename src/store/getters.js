const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  resources: state => state.user.resources,
  childResources: state => state.user.childResources,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  passwordChangeDialogVisible: state => state.app.passwordChangeDialogVisible,
  logoutConfirmDialogVisible: state => state.app.logoutConfirmDialogVisible,
  searchOperator: state => state.app.searchOperator
}
export default getters
