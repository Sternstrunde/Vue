<template>
  <div class="main-menu">
    <div class="logo">
      <img src="" alt="" class="img" />
      <h2 v-show="!isFold" class="title">管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activePath"
        active-text-color="#fff"
        :collapse="isFold"
        text-color="#b7bdc3"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item
            index="1-1"
            @click="handleItemClick('/main/analysis/overview')"
            >核心技术</el-menu-item
          >
          <el-menu-item
            index="1-2"
            @click="handleItemClick('/main/analysis/dashboard')"
            >商品统计</el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item
            index="2-1"
            @click="handleItemClick('/main/system/user')"
            >用户管理</el-menu-item
          >
          <el-menu-item index="2-2">部门管理</el-menu-item>
          <el-menu-item index="2-3">菜单管理</el-menu-item>
          <el-menu-item
            index="2-4"
            @click="handleItemClick('/main/system/role')"
            >角色管理</el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item index="3-1">商品类型</el-menu-item>
          <el-menu-item index="3-2">商品信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item index="4-1">你的故事</el-menu-item>
          <el-menu-item index="4-2">故事列表</el-menu-item>
        </el-sub-menu> -->
        <!-- 遍历整个菜单-->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { firstMenu, mapPathToMenu } from '@/utils/map-menus'

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const route = useRouter()
const routers = route.currentRoute.value.fullPath

let activePath = computed(() => {
  const pathMenu = mapPathToMenu(route.currentRoute.value.fullPath, userMenus)
  return pathMenu.id + ''
})

const router = useRouter()
const handleItemClick = function (address: any) {
  router.push(address.url)
}
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
