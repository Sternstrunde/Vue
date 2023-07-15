<template>
  <div class="main">
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'

function handleExitClick() {
  localCache.removeCache('token')
  router.push('/login')
}
</script>

<style lang="css" scoped>
.main {
  color: red;
}
</style>
