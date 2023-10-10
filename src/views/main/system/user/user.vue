<template>
  <div class="user">
    <UserSearch @query-click="handleQueryClick"  />
    <UserContent ref="contentUserRef" @new-click="handleShowClick" @edit-click="handleEditClick" />
    <UserModal ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentUserRef = ref<InstanceType<typeof UserContent>>()
const dialogRef = ref<InstanceType<typeof UserModal>>()
function handleQueryClick(formData: any) {
  console.log(formData)
  contentUserRef.value?.fetchUserListData(formData)
}

// 对modal组件的操作
function handleShowClick(){
  dialogRef.value?.setModalVisible()
}

function handleEditClick(itemdata:any){
  console.log(itemdata)
  dialogRef.value?.setModalVisible(false,itemdata)
}

</script>

<style scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
