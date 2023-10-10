<template>
  <div class="department">
    <PageSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <PageContent ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <PageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch  from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import {ref } from 'vue'

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
