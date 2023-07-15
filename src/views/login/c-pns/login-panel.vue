<template>
  <div class="login-panel">
    <!-- 顶部的标题-->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间tabs切换-->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!--1.账号登录的Pane-->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <div>
            <PanelAccount ref="accountRef" />
          </div>
        </el-tab-pane>
        <!--2.手机登录的Pane-->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <div>
            <PanelPhone></PanelPhone>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域-->
    <div class="control-account">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    // console.log('用户在进行账号登录')
    // 1. 获取子组件的实例
    // console.log(isRemPwd.value)

    accountRef.value?.loginAction(isRemPwd.value)
    if (isRemPwd.value) {
    }
    // 2.调用方法
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;

    --el-button-size: 40px;
  }
}
</style>
