import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loignResult = await accountLoginRequest(account)
      console.log(loignResult.data)
      this.id = loignResult.data.id
      this.token = loignResult.data.token
      this.name = loignResult.data.name
    }
  }
})

export default useLoginStore
