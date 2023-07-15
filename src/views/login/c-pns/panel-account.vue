<template>
  <div class="pane-account">
    <!-- <el-form label-width="60px" :model="account" :rules="rules">
      <el-form-item label="账号" props="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" props="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form> -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login.ts'

interface RuleForm {
  name: string
  password: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  password: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6-20位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上字母组成',
      trigger: 'change'
    }
  ]
})

const loginStore = useLoginStore()
// 3. 执行帐号的登录逻辑
function loginAction() {
  // console.log('111111', ruleForm.name, ruleForm.password)
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      const name = ruleForm.name
      const password = ruleForm.password

      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('验证失败')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
