<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建部门' : '编辑部门'" width="30%" center>
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导"/>
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择部门" style="width:100%">
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
  leader:'',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

const systemStore = userSystemStore()
const mainStore = userMainStore()
const {entireDepartment}  = storeToRefs(mainStore)

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
   // 编辑部门
   systemStore.editPageDataAction('department',editData.value.id,formData)

 }else{
  // 新建部门
  systemStore.newPageDataAction('department', formData)
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
