<template>
  <div class="department">
    <PageSearch :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <PageContent :content-config="contentConfig" ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" >
      <template #leader="scope">ws1111:{{ scope.row[scope.prop] }}</template>
      <template #parent="scope">22222:{{ scope.row[scope.prop] }}</template>
    </PageContent>
    <PageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch  from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import {ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'


// 点击search，content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo:any){
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick(){
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof PageModal>>();

function handleNewClick(){
  modalRef.value?.setModalVisible()
}

function handleEditClick(itemData:any){
  modalRef.value?.setModalVisible(false,itemData)
}
</script>

<style scoped></style>
