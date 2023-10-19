<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick">新建用户</el-button>
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
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160px">
          <template #default="scope">
            <el-button v-if="isUpdate" type="primary" icon="Edit" size="small" text @click="handleEditBtnClick(scope.row)">
              编辑
            </el-button>
            <el-button v-if="isDelete" type="danger" icon="Delete" size="small" text @click="handleDeleteBtnClick(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import userSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/fotamt'
import usePermissions from '@/hooks/usePermissions';


// 定义事件
const emit = defineEmits(['newClick','editClick'])

// 用户的权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')


// 发送action 请求usersList
const systemStore = userSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 获取userlist数据，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)
console.log(usersList)

// 页码相关的逻辑

function handleSizeChange() {
  fetchUserListData()
  console.log('page-size change', pageSize.value)
}
function handleCurrentChange() {
  fetchUserListData()
  console.log('page-size change', currentPage.value)
}
// 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if(!isQuery) return
  const size = pageSize.value
  const offest = (currentPage.value - 1) * size

  const info = { size, offest }

  const queryInro = {...info,...formData}
  console.log(queryInro)

  systemStore.postUsersListAction(info)
}


defineExpose({ fetchUserListData, handleNewUserClick })

// 删除
function handleDeleteBtnClick(id:number){
  console.log(id)
  systemStore.deleteUserByIdAction(id)
}


function handleEditBtnClick(data:any){
  emit('editClick',data)
}


// 新建用户
function handleNewUserClick(){
  console.log('-------新建用户')
  emit('newClick')
}
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

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
