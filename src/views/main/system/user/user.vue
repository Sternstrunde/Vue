<template>
  <div class="user">
    <UserSearch />
    <UserContent />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
</script>

<style scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
}
</style>
