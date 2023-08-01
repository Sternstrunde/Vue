<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <ul>
        <li v-for="item in usersList" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import userSystemStore from '@/store/main/system/system'

const systemStore = userSystemStore()

systemStore.postUsersListAction()

const { usersList } = storeToRefs(systemStore)
console.log(usersList)
</script>

<style scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
}
</style>
