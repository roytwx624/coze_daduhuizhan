<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h2>大都会展数智平台</h2>
        <p>欢迎登录/注册</p>
      </div>
      
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
        <el-form-item prop="phone">
          <el-input 
            v-model="loginForm.phone" 
            placeholder="请输入手机号"
            prefix-icon="Iphone"
          />
        </el-form-item>
        
        <el-form-item prop="code">
          <div class="code-input-group">
            <el-input 
              v-model="loginForm.code" 
              placeholder="请输入验证码"
              prefix-icon="Key"
            />
            <el-button 
              type="primary" 
              :disabled="isCounting"
              @click="handleGetCode"
              class="code-btn"
            >
              {{ isCounting ? `${count}s后重新获取` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="handleLogin" :loading="loading">
          登录 / 注册
        </el-button>
        
        <div class="agreement">
          <el-checkbox v-model="agreement">
            我已阅读并同意 <a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a>
          </el-checkbox>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Iphone, Key } from '@element-plus/icons-vue'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)
const agreement = ref(false)
const isCounting = ref(false)
const count = ref(60)

const loginForm = reactive({
  phone: '',
  code: ''
})

const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const rules = {
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const handleGetCode = () => {
  if (!loginForm.phone) {
    ElMessage.warning('请先输入手机号')
    return
  }
  
  if (!/^1[3-9]\d{9}$/.test(loginForm.phone)) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  isCounting.value = true
  ElMessage.success('验证码已发送：1234')
  
  const timer = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
      count.value = 60
    }
  }, 1000)
}

const handleLogin = () => {
  if (!agreement.value) {
    ElMessage.warning('请先同意用户协议和隐私政策')
    return
  }

  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // 模拟登录请求
      setTimeout(() => {
        loading.value = false
        if (loginForm.code === '1234') {
          localStorage.setItem('isLoggedIn', 'true')
          ElMessage.success('登录成功')
          router.push('/')
        } else {
          ElMessage.error('验证码错误')
        }
      }, 1000)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 80px; /* Header height */
}

.login-container {
  width: 400px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 24px;
    color: #204E9C;
    margin-bottom: 8px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
  }
}

.code-input-group {
  display: flex;
  gap: 12px;
  
  .code-btn {
    width: 120px;
  }
}

.submit-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin-top: 10px;
}

.agreement {
  margin-top: 20px;
  
  :deep(.el-checkbox__label) {
    font-size: 12px;
    color: #6B7280;
  }
  
  a {
    color: #204E9C;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>