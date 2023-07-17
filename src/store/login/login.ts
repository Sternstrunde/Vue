import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'

interface IloginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): IloginState => ({
    token: localCache.getCache('token') ?? '',
    userInfo: localCache.getCache('userInfo') ?? '',
    userMenus: localCache.getCache('userMenus') ?? ''
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

        // 获取登录用户的详细信息(role信息)
        // const userInforResult = await getUserInfoById(id)
        // this.userInfo = userInforResult.data

        // 根据角色请求用户的权限(菜单menus)
        // const userMenuResult = await getUserMenusByRoleId(this.userInfo.role.id)
        // this.userMenus = userMenusResult.data

        // console.log(userInforResult)
        this.userInfo = user

        localCache.setCache('userInfo', user)
        localCache.setCache('userMenus', 'userMenus')
        console.log(this.userInfo)

        router.push('/main')
      } else {
        ElMessage.error('Oops,login failure.')
      }
    }
  }
})

export default useLoginStore
