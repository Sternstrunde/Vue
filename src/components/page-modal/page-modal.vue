<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle" width="30%" center>
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="`el-${item.type}`"></component> -->
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
              />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%;" >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" style="width: 100%;"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
        </template>
        <!-- <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导"/>
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择部门" style="width:100%">
            <template v-for="item in entireDepartment" :key="item.id">
              <el-option label="item.name" :value="item.id" />
            </template>
            <el-option label="研发部" value="basketball" />
            <el-option label="维修部" value="football" />
          </el-select>
        </el-form-item> -->
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
// import userMainStore from '@/store/main/main';
// import { storeToRefs } from 'pinia';
import userSystemStore from '@/store/main/system/system';
import type {IModalProps} from './type'

interface IProps {
  modalConfig: {
    pageName:string,
    header:{
      newTitle:string,
      editTitle:string
    },
    formItems:any[]
  }

}
const prop = defineProps<IModalProps>()
const centerDialogVisible = ref(false)
const initialData:any = {}
for(const item of prop.modalConfig.formItems){
  initialData[item.prop] = item.initialValue ?? ''
}

const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()



const systemStore = userSystemStore()
// const mainStore = userMainStore()
// const {entireDepartment}  = storeToRefs(mainStore)

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
      const item  = prop.modalConfig.formItems.find(item => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

function handleConfirmClick(){
  centerDialogVisible.value = false

 if(!isNewRef.value && editData.value){
   // 编辑部门
   systemStore.editPageDataAction(prop.modalConfig.pageName,editData.value.id,formData)

 }else{
  // 新建部门
  systemStore.newPageDataAction(prop.modalConfig.pageName, formData)
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
