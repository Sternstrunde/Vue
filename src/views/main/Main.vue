<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MainMenu :is-Fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @foldchange="handleChange" />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
// import router from '@/router'
// import { localCache } from '@/utils/cache'

// function handleExitClick() {
//   localCache.removeCache('token')
//   router.push('/login')
// }

const isCollapse = ref(false)
function handleChange(isFold: boolean) {
  console.log(isFold)
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s ease;
    scrollbar-width: none;
    --ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
