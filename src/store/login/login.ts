import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { log } from 'console'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache('token') ?? ''
  }),
  actions: {
    async loginAccountAction(account: any) {
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
        localCache.setCache('token', 'zll')
        ElMessage({
          message: 'Congrats, login successfully.',
          type: 'success'
        })

        // 获取登录用户的详细信息(role信息)
        const userInforResult = await getUserInfoById(id)
        console.log(userInforResult)

        router.push('/main')
      } else {
        ElMessage.error('Oops,login failure.')
      }
    }
  }
})

export default useLoginStore
