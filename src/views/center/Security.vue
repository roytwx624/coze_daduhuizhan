<template>
  <div class="security-page">
    <div class="page-header">
      <h2>账号安全</h2>
      <p class="subtitle">保护您的账号安全，设置强密码并定期更换</p>
    </div>

    <div class="security-content">
      <div class="security-card">
        <h3 class="card-title">修改密码</h3>
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="120px">
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入当前密码" show-password />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
            <div class="password-strength">
              <div class="strength-bar">
                <div class="strength-item" :class="getStrengthClass(0)"></div>
                <div class="strength-item" :class="getStrengthClass(1)"></div>
                <div class="strength-item" :class="getStrengthClass(2)"></div>
                <div class="strength-item" :class="getStrengthClass(3)"></div>
              </div>
              <span class="strength-text">{{ passwordStrengthText }}</span>
            </div>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdatePassword">修改密码</el-button>
            <el-button @click="resetPasswordForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="security-card">
        <h3 class="card-title">手机绑定</h3>
        <div class="phone-info">
          <div class="info-item">
            <span class="label">已绑定手机：</span>
            <span class="value">{{ maskedPhone }}</span>
          </div>
          <div class="info-item">
            <span class="label">绑定时间：</span>
            <span class="value">2024-01-15</span>
          </div>
          <el-button type="primary" @click="handleChangePhone">更换手机号</el-button>
        </div>
      </div>

      <div class="security-card">
        <h3 class="card-title">邮箱绑定</h3>
        <div class="email-info">
          <div class="info-item">
            <span class="label">已绑定邮箱：</span>
            <span class="value">{{ maskedEmail }}</span>
          </div>
          <div class="info-item">
            <span class="label">绑定时间：</span>
            <span class="value">2024-01-15</span>
          </div>
          <el-button type="primary" @click="handleChangeEmail">更换邮箱</el-button>
        </div>
      </div>

      <div class="security-card">
        <h3 class="card-title">登录设备管理</h3>
        <div class="devices-list">
          <div v-for="(device, index) in devices" :key="index" class="device-item">
            <div class="device-info">
              <div class="device-icon"><el-icon><component :is="device.icon" /></el-icon></div>
              <div class="device-details">
                <div class="device-name">{{ device.name }}</div>
                <div class="device-time">最后登录：{{ device.lastLogin }}</div>
              </div>
            </div>
            <div class="device-actions">
              <el-tag v-if="device.current" type="success">当前设备</el-tag>
              <el-button v-else type="danger" size="small" @click="handleRemoveDevice(index)">移除</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="security-card">
        <h3 class="card-title">安全设置</h3>
        <div class="security-settings">
          <div class="setting-item">
            <div class="setting-info">
              <h4>登录保护</h4>
              <p>开启后，登录时需要验证码</p>
            </div>
            <el-switch v-model="securitySettings.loginProtection" />
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h4>异地登录提醒</h4>
              <p>账号在异地登录时发送通知</p>
            </div>
            <el-switch v-model="securitySettings.locationAlert" />
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <h4>密码修改提醒</h4>
              <p>密码修改时发送通知</p>
            </div>
            <el-switch v-model="securitySettings.passwordAlert" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Monitor, Phone } from '@element-plus/icons-vue'

const passwordFormRef = ref(null)

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordStrength = ref(0)
const passwordStrengthText = computed(() => {
  const strengths = ['请输入密码', '密码强度：弱', '密码强度：中', '密码强度：强', '密码强度：很强']
  return strengths[passwordStrength.value]
})

const validateOldPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入当前密码'))
  } else {
    callback()
  }
}

const validateNewPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入新密码'))
  } else if (value.length < 8 || value.length > 20) {
    callback(new Error('密码长度为8-20位'))
  } else {
    calculatePasswordStrength(value)
    callback()
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次输入新密码'))
  } else if (value !== passwordForm.value.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules = {
  oldPassword: [{ validator: validateOldPassword, trigger: 'blur' }],
  newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
}

const maskedPhone = '138****8888'
const maskedEmail = 'zhang***@example.com'

const devices = ref([
  {
    name: 'Windows Chrome 浏览器',
    icon: Monitor,
    lastLogin: '2024-01-20 14:30',
    current: true
  },
  {
    name: 'iPhone Safari 浏览器',
    icon: Phone,
    lastLogin: '2024-01-19 09:15',
    current: false
  },
  {
    name: 'Mac Chrome 浏览器',
    icon: Monitor,
    lastLogin: '2024-01-18 16:45',
    current: false
  }
])

const securitySettings = ref({
  loginProtection: true,
  locationAlert: true,
  passwordAlert: true
})

const calculatePasswordStrength = (password) => {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*]/.test(password)) strength++
  
  passwordStrength.value = Math.min(strength, 4)
}

const getStrengthClass = (index) => {
  if (index < passwordStrength.value) {
    const classes = ['weak', 'medium', 'strong', 'very-strong']
    return classes[Math.min(passwordStrength.value - 1, 3)]
  }
  return ''
}

const handleUpdatePassword = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('密码修改成功，请重新登录')
      passwordForm.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      passwordStrength.value = 0
    }
  })
}

const resetPasswordForm = () => {
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  passwordStrength.value = 0
  passwordFormRef.value.clearValidate()
}

const handleChangePhone = () => {
  ElMessage.info('跳转到更换手机号页面')
}

const handleChangeEmail = () => {
  ElMessage.info('跳转到更换邮箱页面')
}

const handleRemoveDevice = (index) => {
  devices.value.splice(index, 1)
  ElMessage.success('设备移除成功')
}
</script>

<style lang="scss" scoped>
.security-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 10px 0;
  }

  .subtitle {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
}

.security-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.security-card {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .card-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 25px 0;
    padding-bottom: 15px;
    border-bottom: 2px solid #e5e7eb;
  }

  .password-strength {
    margin-top: 10px;

    .strength-bar {
      display: flex;
      gap: 5px;
      margin-bottom: 8px;

      .strength-item {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background: #e5e7eb;
        transition: all 0.3s;

        &.weak {
          background: #ef4444;
        }

        &.medium {
          background: #f59e0b;
        }

        &.strong {
          background: #22c55e;
        }

        &.very-strong {
          background: #2563eb;
        }
      }
    }

    .strength-text {
      font-size: 14px;
      color: #6b7280;
    }
  }
}

.phone-info,
.email-info {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .info-item {
    display: flex;
    gap: 10px;
    font-size: 15px;

    .label {
      color: #6b7280;
      font-weight: 500;
    }

    .value {
      color: #111827;
      font-weight: 600;
    }
  }
}

.devices-list {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .device-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      background: #eff6ff;
      transform: translateX(5px);
    }

    .device-info {
      display: flex;
      gap: 15px;
      align-items: center;

      .device-icon {
        font-size: 32px;
      }

      .device-details {
        .device-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 5px;
        }

        .device-time {
          font-size: 14px;
          color: #6b7280;
        }
      }
    }

    .device-actions {
      .el-tag {
        font-weight: 600;
      }
    }
  }
}

.security-settings {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;

    .setting-info {
      flex: 1;

      h4 {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
        margin: 0 0 5px 0;
      }

      p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .security-card {
    padding: 20px;
  }

  .devices-list {
    .device-item {
      flex-direction: column;
      text-align: left;
      gap: 15px;
    }
  }

  .security-settings {
    .setting-item {
      flex-direction: column;
      text-align: left;
      gap: 15px;
    }
  }
}
</style>
