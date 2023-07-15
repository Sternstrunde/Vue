import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache('token') ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loignResult = await accountLoginRequest(account)
      console.log(loignResult.data)
      this.id = loignResult.data.id
      this.token = loignResult.data.token
      this.name = loignResult.data.name

      //
      // localStorage.setItem('token', this.token)
      // localStorage.setItem('userInfo', JSON.stringify({}))
      localCache.setCache('token', this.token)
    }
  }
})

export default useLoginStore
