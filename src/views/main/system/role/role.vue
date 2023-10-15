<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
     />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal
      ref="modalRef"
      :modal-config="modalConfig"
    >
      <template #menuList> <span>菜单列表</span></template>
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-content.vue';
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';

const {contentRef,handleQueryClick,handleResetClick}  = usePageContent()

const {modalRef,handleEditClick,handleNewClick} = usePageModal()



</script>

<style scoped>
.role{

}
</style>
