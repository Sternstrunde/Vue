<template>
  <div class="department">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">ws1111:{{ scope.row[scope.prop] }}</template>
      <template #parent="scope">22222:{{ scope.row[scope.prop] }}</template>
    </PageContent>
    <PageModal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch  from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import {ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { computed } from 'vue'
import userMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const modalConfigRef = computed(()=>{
  const mainStore = userMainStore();
  const departments = mainStore.entireDepartment.map(item =>{
    return {label:item.name,value:item.id}
  })
  modalConfig.formItems.forEach((item)=>{
    if(item.prop === 'parentId'){
      item.options?.push(...departments)
    }
  })
  return modalConfig
})


// 点击search，content的操作
const {contentRef,handleQueryClick,handleResetClick}  = usePageContent()

const {modalRef,handleEditClick,handleNewClick} = usePageModal()

</script>

<style scoped></style>
