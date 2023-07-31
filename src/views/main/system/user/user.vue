<template>
  <div class="user">
    <UserSearch />
    <div class="content">
      <div class="header"></div>
      <div class="table"></div>
      <div class="pagination"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
