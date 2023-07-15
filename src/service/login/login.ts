import { localCache } from '@/utils/cache'
import hyRequest from '..'

export function accountLoginRequest(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: '/users/${id}',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
