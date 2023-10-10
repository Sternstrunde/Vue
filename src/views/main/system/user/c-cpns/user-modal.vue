<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名"/>
        </el-form-item>
        <el-form-item label="密码" v-if="isNewRef" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width:100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option label="item.name" :value="item.id" />
            </template>
            <el-option label="篮球" value="basketball" />
            <el-option label="足球" value="football" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width:100%">
            <!-- <template v-for="item in entireDepartment" :key="item.id">
              <el-option label="item.name" :value="item.id" />
            </template> -->
            <el-option label="研发部" value="basketball" />
            <el-option label="维修部" value="football" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">
          新建
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import userMainStore from '../../../../../store/main/main';
import { storeToRefs } from 'pinia';
import userSystemStore from '@/store/main/system/system';

const centerDialogVisible = ref(false)
const formData = reactive<any>({
  name:'',
  realname:'',
  password:'',
  cellphone: '',
  roleId: '',
  departmentId:''
})
const isNewRef = ref(true)
const editData = ref()

const systemStore = userSystemStore()
const mainStore = userMainStore()
const {entireRoles, entireDepartment}  = storeToRefs(mainStore)

// 定义设置centerDialogVisible 方法
function setModalVisible(isNew:boolean = true,itemdata?:any){
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if(!isNew && itemdata){ // 编辑数据
    for(const key in formData){
      formData[key] = itemdata[key]
    }
    editData.value = itemdata
  }else{ // 新建数据
    for(const key in formData){
      formData[key] = ''
    }
    editData.value = null
  }
}

function handleConfirmClick(){
  centerDialogVisible.value = false

 if(!isNewRef.value && editData.value){
   // 编辑用户
   systemStore.editUserDataAction(editData.value.id,formData)

 }else{
  // 新建用户
  systemStore.newUserDataAction(formData)
 }
}

// 暴露属性和方法
defineExpose({setModalVisible})

</script>

<style scoped lang="less">
.modal{
  .form{
    padding: 0 20px ;
  }
}
</style>
