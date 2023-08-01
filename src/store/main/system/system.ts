import { pustUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

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
      }
    ],
    totalCount: 10
  }
}

const userSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    postUsersListAction() {
      // const usersListResult = await pustUserListData()
      this.usersList = userList.data.list
      this.usersTotalCount = userList.data.totalCount
    }
  }
})

export default userSystemStore
