<template>
  <div class="role">
    <pageSearch :search-config="searchConfig" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue';
import searchConfig from './config/search.config'
</script>

<style scoped>
.role{

}
</style>
