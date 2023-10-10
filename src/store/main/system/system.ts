import { deletePageById, deleteUserById, editPageData, newPageData, postPageListData, pustUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import {newUserData, editUserData } from '@/service/main/mian'

import type { ISystemState } from './type'

let userList = {
  code: 0,
  data: {
    list: [
      {
        id: 1,
        name: 'lisi',
        realname: '李四',
        cellphone: 11111111111,
        enable: 1,
        departmentId: 1,
        roleId: 1,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 2,
        name: 'zhangsan',
        realname: '张三',
        cellphone: 1111111112,
        enable: 1,
        departmentId: 2,
        roleId: 2,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 3,
        name: 'wangwu',
        realname: '王五',
        cellphone: 111111113,
        enable: 1,
        departmentId: 3,
        roleId: 3,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 4,
        name: 'xiaoer',
        realname: '小二',
        cellphone: 1111111114,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 5,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 6,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 7,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 8,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 9,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 10,
        name: '123',
        realname: '21321',
        cellphone: 123232141,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      },
      {
        id: 11,
        name: '11123',
        realname: '11123',
        cellphone: 1212121212,
        enable: 1,
        departmentId: 1399,
        roleId: 6940,
        createAt: '2022-10-17T07:42:27.000Z',
        updateAt: '2022-10-17T08:42:27.000Z'
      }
    ],
    totalCount: 11
  }
}

const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList:[],
    pageTotalCount:0,
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      // const usersListResult = await pustUserListData(queryInfo)
      this.usersList = userList.data.list
      this.usersTotalCount = userList.data.totalCount
    },
    async deleteUserByIdAction(id:number){
      // 删除数据
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 重新请求新的数据
      this.postUsersListAction({offset:0,size:10})
    },
    async newUserDataAction(userInfo:any){
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      this.postUsersListAction({offset:0,size:10})
    },
    async editUserDataAction(id:number,userInfo:any){
      const editResult = await editUserData(id,userInfo)
      console.log(editResult)


      // 重新请求新的数据
      this.postUsersListAction({offset:0,size:10})
    },
    // 针对页面的数据：增删改查
    async postPageListAction(pageName:string,queryInfo:any){
      const pageListResult = await postPageListData(pageName,queryInfo)
      const {totalCount,list} = pageListResult.data

      this.pageList = list;
      this.pageTotalCount =totalCount
    },
    async deletePageByIdAction(pageName:string,id:number){
      const deleteResult = await deletePageById(pageName,id)
      console.log(deleteResult)
      this.postPageListAction(pageName,{offset:0,size:10})
    },
    async newPageDataAction(pageName:string,pageInfo:any){
      const newResult = await newPageData(pageName,pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName,{offset:0,size:10})
    },
    async editPageDataAction(pageName:string,id:number,pageInfo:any){
      const editResult = await editPageData(pageName,id,pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName,{offset:0,size:10})
    }
  }
})

export default userSystemStore
