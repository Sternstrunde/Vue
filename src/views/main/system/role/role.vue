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
      :other-info="otherInfo"
    >
      <template #menuList>
        <el-tree
        ref="treeRef"
        :data="entireMenus"
        show-checkbox
        node-key="id"
        highlight-current
        :props="{children: 'children', label: 'name'}"
        @check="handleElTreeCheck"
      />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import {ref, nextTick} from 'vue'
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from '@/components/page-content/page-content.vue';
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
import userMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia';
import type { ElTree } from 'element-plus';
import {mapMenuListToIds} from '@/utils/map-menus'

const {contentRef,handleQueryClick,handleResetClick}  = usePageContent()

const {modalRef,handleEditClick,handleNewClick} = usePageModal(editCallback)

const mainStore = userMainStore()

const {entireMenus} = storeToRefs(mainStore)

const otherInfo = ref({})

const treeRef = ref<InstanceType<typeof ElTree>>()

function handleElTreeCheck(data1:any,data2:any){
  const menuList = [...data2.checkdKeys, ...data2.halfCheckedKeys]

  otherInfo.value = {menuList}
}

function editCallback(itemData:any){
  console.log(itemData.menuList)

  nextTick(()=>{
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}


</script>

<style scoped>
.role{

}
</style>
