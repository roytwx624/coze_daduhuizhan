<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <div class="illustration">
          <!-- 3D科技感插图 -->
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 背景网格 -->
            <rect x="0" y="0" width="300" height="300" fill="url(#gridBg)"/>
            <!-- 主体结构 -->
            <g opacity="0.8">
              <!-- 底部平台 -->
              <path d="M50 200L100 250L200 250L250 200" fill="#E0F7FA" stroke="#4FC3F7" stroke-width="2"/>
              <!-- 中间结构 -->
              <path d="M100 150L150 200L150 100L100 150" fill="#B3E5FC" stroke="#29B6F6" stroke-width="2"/>
              <path d="M200 150L150 200L150 100L200 150" fill="#81D4FA" stroke="#03A9F4" stroke-width="2"/>
              <!-- 顶部结构 -->
              <path d="M125 100L150 75L175 100L150 125L125 100" fill="#4FC3F7" stroke="#0288D1" stroke-width="2"/>
              <!-- 齿轮 -->
              <circle cx="150" cy="150" r="25" fill="#2196F3" stroke="#0D47A1" stroke-width="2"/>
              <path d="M150 125V100M150 200V225M125 150H100M200 150H225M175 175L200 200M100 200L125 175M100 100L125 125M200 100L175 125" stroke="#0D47A1" stroke-width="3" stroke-linecap="round"/>
              <!-- 连接线 -->
              <path d="M150 75L150 100" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5"/>
              <path d="M150 125L150 150" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5"/>
              <path d="M150 175L150 200" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5"/>
              <path d="M125 150L100 150" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5"/>
              <path d="M175 150L200 150" stroke="#2196F3" stroke-width="2" stroke-dasharray="5,5"/>
              <!-- 装饰点 -->
              <circle cx="125" cy="125" r="5" fill="#03A9F4"/>
              <circle cx="175" cy="125" r="5" fill="#03A9F4"/>
              <circle cx="125" cy="175" r="5" fill="#03A9F4"/>
              <circle cx="175" cy="175" r="5" fill="#03A9F4"/>
            </g>
            <!-- 发光效果 -->
            <defs>
              <radialGradient id="gridBg" cx="150" cy="150" r="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#E1F5FE" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#B3E5FC" stop-opacity="0.2"/>
              </radialGradient>
            </defs>
          </svg>
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
      // 模拟登录请求
      setTimeout(() => {
        loading.value = false
        // 这里可以根据实际情况修改登录逻辑
        localStorage.setItem('isLoggedIn', 'true')
        ElMessage.success('登录成功')
        router.push('/')
      }, 1000)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  min-height: calc(100vh - 380px); /* 减去header和footer的高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1E88E5 0%, #2196F3 50%, #4FC3F7 100%);
  padding: 40px 20px;
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
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  padding: 40px;
}

.illustration {
  display: flex;
  align-items: center;
  justify-content: center;
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