import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Chat from '@/views/user-chat'

Vue.use(VueRouter)

// 配置路由表
const routes = [ {
  // 登录页
  path: '/login',
  component: Login
}, {
  // 主页
  path: '/',
  // component: Tabbar
  component: () => import('@/views/tabbar'),
  children: [{
    // 默认子路由
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  }, {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/qa',
    name: 'qa',
    component: () => import('@/views/qa')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my')
  } ]
},
{
  name: 'user-chat',
  path: '/user/chat',
  component: Chat
}, {
  path: '/user/:userId',
  name: 'user',
  component: () => import('@/views/user')
}, {
  path: '/search',
  name: 'search',
  component: () => import('@/views/search')
}, {
  path: '/article/:articleId',
  name: 'article',
  component: () => import('@/views/article'),
  props: true// 将动态路由参数映射到组件中
},
{ // 我的作品
  path: '/my-article/:type?', // /my-article /my-article/a /my-article/b
  name: 'my-article',
  component: () => import('@/views/user-articles'),
  props: true
}
]

const router = new VueRouter({
  routes
})

export default router
