import { getEntireDepartment, getEntireRoles, newUserData } from '@/service/main/mian'
import {defineStore} from 'pinia'
import { pustUserListData } from '../../service/main/system/system';


interface IMainState{
  entireRoles:any[],
  entireDepartment:any[],
}

const userMainStore = defineStore('main',{
  state:():IMainState=>({
    entireRoles:[],
    entireDepartment:[],
  }),
  actions:{
    async fetchEntireDataAction(){
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartment()
      console.log(rolesResult,departmentResult)

      // 保存数据
      this.entireRoles = rolesResult.data.list;
      this.entireDepartment = departmentResult.data.list;
    },
  }
})


export default userMainStore
