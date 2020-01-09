import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

// 配置路由表
const routes = [{
  path: '/',
  redirect: 'login'
}, {
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  routes
})

export default router
