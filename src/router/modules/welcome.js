import Layout from '@/views/layout/Layout'

const welcomeRouter = {
  path: '/welcome',
  component: Layout,
  redirect: '/welcome/index',
  name: 'Welcome'
}

export default welcomeRouter
