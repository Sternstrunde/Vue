import hyRequest from '@/service'

// 用户请求
export function pustUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}

export function deleteUserById(id: number){
  return hyRequest.delete({
    url:`/users/${id}`
  })
}



// 针对页面的网络请求： 增删改查
export function postPageListData(pageName:string, queryInfo:any){
  return hyRequest.post({
    url:`/${pageName}/list`,
    data:queryInfo
  })
}


export function deletePageById(pageName:string,id: number){
  return hyRequest.delete({
    url:`/${pageName}/${id}`
  })
}


export function newPageData(pageName:string,queryInfo:any){
  return hyRequest.post({
    url:`/${pageName}/`,
    data:queryInfo,
  })
}


export function editPageData(pageName:string,id:number,pageInfo:any){
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data:pageInfo
  })
}
