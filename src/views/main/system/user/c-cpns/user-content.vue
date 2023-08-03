<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <!-- <ul>
        <li v-for="item in usersList" :key="item.id">
          {{ item.name }}
        </li>
      </ul> -->
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column align="center" prop="enable" label="状态" width="80px">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt, 'YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间" />

        <el-table-column label="操作" width="160px">
          <el-button type="primary" icon="Edit" size="small" text>
            编辑
          </el-button>
          <el-button type="danger" icon="Delete" size="small" text>
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import userSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/fotamt'

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
  margin-bottom: 10px;
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
</style>
