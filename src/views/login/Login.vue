<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>

<script setup lang="ts">
import { MessageBox } from '@element-plus/icons-vue'
import loginPanel from './c-pns/login-panel.vue'
</script>

<style lang="css" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
