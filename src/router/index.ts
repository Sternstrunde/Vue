import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系：path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// const localRoutes=[
//   {
//     path:'/main/analysis/overview',
//     component:()=>import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path:'/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path:'/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path:'/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   },
// ]

// // 动态添加路由
// router.addRoute('main',localRoutes[0])
// router.addRoute('main',localRoutes[1])

// 用户进行刷新：判断用户是否登录以及是否包含userMenus菜单

// 导航守卫
// 参数：to(跳转到的位置)/from(从哪里跳转过来)
// 返回值：返回值决定导航的路径（不反悔或者返回undefined，默认跳转）
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (to.path.startsWith('/main') && !token) return '/login'

  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
