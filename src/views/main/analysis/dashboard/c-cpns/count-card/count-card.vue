<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{title}}</span>
      <el-tooltip  :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!-- <span v-if="amout === 'saleroom'">￥</span> -->
      <span class="count" ref="countRefs">{{number1}}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <!-- <span v-if="amout === 'saleroom'">￥</span> -->
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CountUp} from 'countup.js'
import { ref, onMounted } from 'vue';


interface IProps{
  amout?:string,
  title?: string,
  tips?: string,
  number1?: number,
  number2?: number,
  subtitle?: string,
}

const props = withDefaults(defineProps<IProps>(),{
  amout:'saleroom',
  title:'商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})

//  创建countUP的实例对象
// 参数一： 执行动画的元素
// 参数二： 数字增加 10000
const countRefs = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
const countOption = {
  prefix: props.amout === 'saleroom' ? "￥" : ''
}
onMounted(()=>{
  const countup1 = new CountUp(countRefs.value!,props.number1,countOption)
  const countup2 = new CountUp(count2Ref.value!,props.number2,countOption)
  countup1.start()
  countup2.start()
})

</script>

<style scoped lang="less">
.count-card{
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  .header{
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0,0,0,0.45);
    justify-content: space-between;

    align-items: flex-end;
  }
  .content{
    display: flex;
    margin-left: 0px;
    font-size:26px;
    color:rgba(0,0,0,0.85);
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .footer{
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color:rgba(0,0,0,0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
