import hyRequest from '@/service'

// 用户请求
export function pustUserListData() {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
