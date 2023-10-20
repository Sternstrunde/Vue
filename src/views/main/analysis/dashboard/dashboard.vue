<template>
  <div class="dashboard">
    <!-- 顶部数字的数据展示 -->
    <el-row :gutter="10">
      <!-- <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <CountCard v-bind="item" />
        </el-col>
      </template> -->
      <template v-for="item in 4" :key="item">
        <el-col :span="6">
          <CountCard title="商品总销量" :number1="509989" tips="商品总销量" :number2="509989" subtitle="商品总销量" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <BaseChart></BaseChart>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <PieEchart></PieEchart>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <LineEchart></LineEchart>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import {PieEchart,LineEchart} from '@/components/page-acharts/index'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style scoped lang="less">
.dashboard{

}
</style>
