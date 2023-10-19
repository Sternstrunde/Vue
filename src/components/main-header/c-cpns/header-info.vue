<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 个人信息· -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" src="circleUrl" />
          <span class="name">{{loginStore.userInfo.name}}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'

const loginStore = useLoginStore()
const router = useRouter()
function handleExitClick() {
  localCache.removeCache('token')
  localCache.removeCache('userInfo')
  localCache.removeCache('userMenus')
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.operation {
  display: inline-flex;
  margin-left: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .name {
    margin-left: 5px;
  }
}
.info {
  :global(.el-dropdown-menu_item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
