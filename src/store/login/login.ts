import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { ElMessage } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
import user from '@/router/main/system/user/user'

interface IloginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): IloginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: any) {
      // 帐号登录，获取token等信息
      // const loignResult = await accountLoginRequest(account)
      // console.log(loignResult.data)
      // this.id = loignResult.data.id
      // this.token = loignResult.data.token
      // this.name = loignResult.data.name

      // //
      // // localStorage.setItem('token', this.token)
      // // localStorage.setItem('userInfo', JSON.stringify({}))
      // localCache.setCache('token', this.token)

      // 3.页面跳转（main页面）

      if (account.name == '12345678' && account.password == '12345678') {
        const id = 23123123
        // localCache.setCache('userInfo', JSON.stringify(account))

        // 进行本地缓存
        localCache.setCache('token', 'zll')
        ElMessage({
          message: 'Congrats, login successfully.',
          type: 'success'
        })

        const user = {
          id: 1,
          name: 'coderwhy',
          realname: 'coderwhy',
          cellphone: 12569875190,
          enable: 1,
          role: {
            id: 1,
            name: '超级管理员',
            intro: '所有权限'
          }
        }

        const userMenus = [
          {
            name: '系统总览',
            id: 1,
            icon: 'main-icon-Monitor',
            url: '/main/analysis',
            children: [
              { name: '核心技术', url: '/main/analysis/overview', id: 11 },
              { name: '商品统计', url: '/main/analysis/dashboard', id: 12 }
            ]
          },
          {
            name: '系统管理',
            id: 4,
            icon: 'main-icon-Setting',
            url: '/main/system',
            children: [
              { name: '用户管理', url: '/main/system/user', id: 41 },
              { name: '部门管理', url: '/main/system/department', id: 42 },
              { name: '菜单管理', url: '/main/system/menu', id: 43 },
              { name: '角色管理', url: '/main/system/role', id: 44 }
            ]
          },
          {
            name: '商品中心',
            id: 2,
            icon: 'main-icon-ShoppingBag',
            url: '/main/product',
            children: [
              { name: '商品类型', url: '/main/product/category', id: 21 },
              { name: '商品信息', url: '/main/product/goods', id: 22 }
            ]
          },
          {
            name: '随便聊聊',
            id: 3,
            icon: 'main-icon-Shop',
            url: '/main/story',
            children: [
              { name: '你的故事', url: '/main/story/chat', id: 31 },
              { name: '故事列表', url: '/main/story/list', id: 32 }
            ]
          }
        ]

        this.userMenus = userMenus
        // 获取登录用户的详细信息(role信息)
        // const userInforResult = await getUserInfoById(id)
        // this.userInfo = userInforResult.data

        // 根据角色请求用户的权限(菜单menus)
        // const userMenuResult = await getUserMenusByRoleId(this.userInfo.role.id)
        // this.userMenus = userMenusResult.data

        // console.log(userInforResult)
        this.userInfo = user

        localCache.setCache('userInfo', this.userInfo)
        localCache.setCache('userMenus', this.userMenus)
        // console.log(this.userMenus)

        mapMenusToRoutes(this.userMenus)

        router.push('/main')
      } else {
        ElMessage.error('Oops,login failure.')
      }
    },
    loadLocalCacheAction() {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
