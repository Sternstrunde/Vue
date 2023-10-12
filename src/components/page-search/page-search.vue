<template>
  <div class="search">
    <el-form :model="searchFrom" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="`el-${item.type}`"></component> -->
              <template v-if="item.type === 'input'">
                <el-input v-model="searchFrom[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                v-model="searchFrom[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="large"
              />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchFrom[item.prop]" :placeholder="item.placeholder" >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" style="width: 100%;"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        size="large"
        type="primary"
        icon="Search"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface IProps {
  searchConfig:{
    formItem:any[]
  }
}

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const props = defineProps<IProps>()

const initialForm: any={}
for(const item of props.searchConfig.formItem){
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchFrom = reactive(initialForm)



// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
}
function handleQueryClick() {
  emit('queryClick', searchFrom)
  // console.log('handleQueryClick', searchFrom)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
