<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon>
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>

      <!-- <el-icon size="30"><Fold /></el-icon>
      <el-icon size="30"><Expand /></el-icon> -->
    </div>
    <div class="content">
      <div class="breadcrumb">
        <HeaderCrumb></HeaderCrumb>
      </div>
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'

const isFold = ref(false)

// 内部自定义事件
const emit = defineEmits(['foldchange'])

function handleMenuIconClick() {
  // 1 内部改变状态
  isFold.value = !isFold.value

  // 2 将事件和状态传递给父组件
  emit('foldchange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
