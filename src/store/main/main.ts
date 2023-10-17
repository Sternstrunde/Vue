import { getEntireDepartment, getEntireMenus, getEntireRoles, newUserData } from '@/service/main/mian'
import {defineStore} from 'pinia'
import { pustUserListData } from '../../service/main/system/system';


interface IMainState{
  entireRoles:any[],
  entireDepartment:any[],
  entireMenus: any[]
}

const userMainStore = defineStore('main',{
  state:():IMainState=>({
    entireRoles:[],
    entireDepartment:[],
    entireMenus: [],
  }),
  actions:{
    async fetchEntireDataAction(){
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      const menuResult = await getEntireMenus()
      console.log(rolesResult,departmentResult,menuResult)

      // 保存数据
      this.entireRoles = rolesResult.data.list;
      this.entireDepartment = departmentResult.data.list;
      this.entireMenus = menuResult.data.list
    },
  }
})


export default userMainStore
