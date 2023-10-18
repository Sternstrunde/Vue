<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick">{{ contentConfig.header?.btnTitle ?? '新建数据' }}</el-button>
    </div>
    <div class="table">
      <!-- <ul>
        <li v-for="item in usersList" :key="item.id">
          {{ item.name }}
        </li>
      </ul> -->
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item" >
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'" align="center">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button v-if="isUpdate" type="primary" icon="Edit" size="small" text @click="handleEditBtnClick(scope.row)">
                  编辑
                </el-button>
                <el-button v-if="isDelete" type="danger" icon="Delete" size="small" text @click="handleDeleteBtnClick(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item" hName="18">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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
import useLoginStore from '../../store/login/login';
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig:{
    pageName:string,
    header?:{
      title?: string,
      btnTitle?: string
    },
    propList: any[],
    childrenTree?: any
  }
}



// 定义事件
const emit = defineEmits(['newClick','editClick'])

const prop = defineProps<IProps>();
console.log(prop)


// 获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${prop.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${prop.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${prop.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${prop.contentConfig.pageName}:query`)


// 发送action 请求usersList
const systemStore = userSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 获取userlist数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
console.log(pageList)

// 页码相关的逻辑

function handleSizeChange() {
  fetchPageListData()
  console.log('page-size change', pageSize.value)
}
function handleCurrentChange() {
  fetchPageListData()
  console.log('page-size change', currentPage.value)
}
// 用于发送网络请求
function fetchPageListData(formData: any = {}) {

  if(!isQuery) return

  const size = pageSize.value
  const offest = (currentPage.value - 1) * size

  const info = { size, offest }

  const queryInro = {...info,...formData}
  console.log(queryInro)

  systemStore.postPageListAction(prop.contentConfig.pageName,queryInro)
}

defineExpose({ fetchPageListData, handleNewUserClick })

// 删除
function handleDeleteBtnClick(id:number){
  console.log(id)
  systemStore.deletePageByIdAction(prop.contentConfig.pageName,id)
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
