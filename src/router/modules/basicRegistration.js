import Layout from '@/views/layout/Layout'

const basicRegistrationRouter = {
  path: '/search-org',
  component: Layout,
  redirect: '/search-org/list',
  name: 'search-org',
  meta: {
    title: 'excel'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/basicRegistration/SearchOrg'),
      name: 'search-org-list',
      meta: { title: '部门查询' }
    }
  ]
}

export default basicRegistrationRouter
