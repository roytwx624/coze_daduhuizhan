<template>
  <div class="profile-page">
    <div class="page-header">
      <h2>个人资料</h2>
      <p class="subtitle">完善个人信息，获得更好的服务体验</p>
    </div>

    <el-form :model="profileForm" :rules="rules" ref="formRef" label-width="120px" class="profile-form">
      <div class="form-section">
        <h3 class="section-title">基本信息</h3>
        
        <div class="avatar-section">
          <div class="avatar-preview">
            <span class="avatar-placeholder">{{ profileForm.name?.charAt(0) || '用' }}</span>
          </div>
          <div class="avatar-actions">
            <el-button type="primary" @click="handleUploadAvatar">上传头像</el-button>
            <p class="upload-tip">支持JPG、PNG格式，文件大小不超过2MB</p>
          </div>
        </div>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="profileForm.name" placeholder="请输入真实姓名" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="profileForm.phone" placeholder="请输入手机号码" disabled>
            <template #append>
              <el-button @click="handleVerifyPhone">验证</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="profileForm.email" placeholder="请输入邮箱地址" />
        </el-form-item>

        <el-form-item label="所属行业" prop="industry">
          <el-select v-model="profileForm.industry" placeholder="请选择所属行业">
            <el-option label="电子科技" value="电子科技" />
            <el-option label="智能制造" value="智能制造" />
            <el-option label="家居建材" value="家居建材" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>

        <el-form-item label="职位" prop="position">
          <el-input v-model="profileForm.position" placeholder="请输入您的职位" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">企业信息</h3>
        
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="profileForm.companyName" placeholder="请输入企业名称" />
        </el-form-item>

        <el-form-item label="企业规模" prop="companySize">
          <el-select v-model="profileForm.companySize" placeholder="请选择企业规模">
            <el-option label="1-50人" value="1-50人" />
            <el-option label="51-200人" value="51-200人" />
            <el-option label="201-500人" value="201-500人" />
            <el-option label="500人以上" value="500人以上" />
          </el-select>
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">身份认证</h3>
        
        <div class="auth-status">
          <div class="auth-item">
            <div class="auth-icon" :class="profileForm.realNameAuth ? 'verified' : 'unverified'">
              <i v-if="profileForm.realNameAuth">✓</i>
              <i v-else>!</i>
            </div>
            <div class="auth-info">
              <h4>实名认证</h4>
              <p>{{ profileForm.realNameAuth ? '已认证' : '未认证' }}</p>
            </div>
            <el-button v-if="!profileForm.realNameAuth" type="primary" @click="handleRealNameAuth">去认证</el-button>
          </div>

          <div class="auth-item">
            <div class="auth-icon" :class="profileForm.companyAuth ? 'verified' : 'unverified'">
              <i v-if="profileForm.companyAuth">✓</i>
              <i v-else>!</i>
            </div>
            <div class="auth-info">
              <h4>企业认证</h4>
              <p>{{ profileForm.companyAuth ? '已认证' : '未认证' }}</p>
            </div>
            <el-button v-if="!profileForm.companyAuth" type="primary" @click="handleCompanyAuth">去认证</el-button>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)

const profileForm = ref({
  avatar: '',
  name: '',
  phone: '138****8888',
  email: '',
  industry: '',
  position: '',
  companyName: '',
  companySize: '',
  realNameAuth: false,
  companyAuth: false
})

const rules = {
  name: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  industry: [
    { required: true, message: '请选择所属行业', trigger: 'change' }
  ],
  position: [
    { required: true, message: '请输入您的职位', trigger: 'blur' }
  ]
}

onMounted(() => {
  profileForm.value = {
    avatar: '',
    name: '张三',
    phone: '138****8888',
    email: 'zhangsan@example.com',
    industry: '电子科技',
    position: '产品经理',
    companyName: '某某科技有限公司',
    companySize: '201-500人',
    realNameAuth: true,
    companyAuth: false
  }
})

const handleUploadAvatar = () => {
  ElMessage.info('头像上传功能待开发')
}

const handleVerifyPhone = () => {
  ElMessage.info('手机验证功能待开发')
}

const handleRealNameAuth = () => {
  ElMessage.info('跳转实名认证页面')
}

const handleCompanyAuth = () => {
  ElMessage.info('跳转企业认证页面')
}

const handleCancel = () => {
  ElMessage.info('已取消')
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('保存成功')
    }
  })
}
</script>

<style lang="scss" scoped>
.profile-page {
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

.profile-form {
  .form-section {
    margin-bottom: 40px;
    padding: 30px;
    background: #f9fafb;
    border-radius: 8px;

    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 25px 0;
      padding-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
    }
  }

  .avatar-section {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
    padding: 25px;
    background: #fff;
    border-radius: 8px;

    .avatar-preview {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4px solid #eff6ff;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-placeholder {
        font-size: 48px;
        font-weight: 700;
        color: #fff;
      }
    }

    .avatar-actions {
      flex: 1;

      .upload-tip {
        margin: 10px 0 0 0;
        font-size: 13px;
        color: #9ca3af;
      }
    }
  }

  .auth-status {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .auth-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: #fff;
      border-radius: 8px;

      .auth-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 700;

        &.verified {
          background: #dcfce7;
          color: #16a34a;
        }

        &.unverified {
          background: #fef3c7;
          color: #d97706;
        }
      }

      .auth-info {
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

  .form-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    background: #f9fafb;
    border-radius: 8px;
  }
}

@media (max-width: 768px) {
  .profile-form {
    .form-section {
      padding: 20px;
    }

    .avatar-section {
      flex-direction: column;
      text-align: center;
    }

    .auth-status {
      .auth-item {
        flex-direction: column;
        text-align: center;
      }
    }
  }
}
</style>
