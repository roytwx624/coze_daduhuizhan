<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <div class="illustration">
          <!-- 设计师提供的登录插画 -->
          <img src="@/assets/images/login/login.png" alt="登录插画" class="login-image" />
        </div>
      </div>
      <div class="login-right">
        <h2 class="login-title">登录大都会展数智平台</h2>
        
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入用户名"
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <div class="login-options">
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>

          <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">
            登录
          </el-button>
          
          <div class="register-link">
            没有账号? <a href="#" class="register-btn">立即注册</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // 模拟登录请求 - 支持固定用户名密码登录
      setTimeout(() => {
        loading.value = false
        // 模拟用户名密码：admin / 123456
        if (loginForm.username === 'admin' && loginForm.password === '123456') {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userInfo', JSON.stringify({
            name: '管理员',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
          }))
          ElMessage.success('登录成功')
          router.push('/')
        } else {
          ElMessage.error('用户名或密码错误')
        }
      }, 1000)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1E88E5 0%, #2196F3 50%, #4FC3F7 100%);
  padding: 80px 20px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    animation: wave 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -30%;
    width: 160%;
    height: 160%;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    animation: wave 12s ease-in-out infinite reverse;
  }
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.login-container {
  width: 800px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.login-left {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #B0DFFD;
  padding: 40px;
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 400px;
}

.login-right {
  width: 50%;
  padding: 60px 40px;
}

.login-title {
  font-size: 20px;
  color: #263238;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
}

.login-form {
  width: 100%;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  .forgot-password {
    color: #1976D2;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  background: #1976D2;
  border: none;
  border-radius: 8px;
  
  &:hover {
    background: #1565C0;
  }
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #607D8B;
  
  .register-btn {
    color: #1976D2;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>