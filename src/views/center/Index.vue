<template>
  <div class="user-center">
    <div class="center-header">
      <div class="user-info">
        <div class="avatar">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" :alt="userInfo.name" />
          <span v-else>{{ userInfo.name?.charAt(0) || '用' }}</span>
        </div>
        <div class="info">
          <h2 class="name">{{ userInfo.name || '未登录' }}</h2>
          <p class="role">{{ userInfo.role || '普通用户' }}</p>
          <div class="stats">
            <span class="stat-item">
              <strong>{{ userInfo.pointCount || 0 }}</strong> 积分
            </span>
            <span class="stat-item">
              <strong>{{ userInfo.followCount || 0 }}</strong> 关注
            </span>
            <span class="stat-item">
              <strong>{{ userInfo.collectCount || 0 }}</strong> 收藏
            </span>
          </div>
        </div>
      </div>
      <div class="quick-actions">
        <el-button type="primary" @click="goToProfile">编辑资料</el-button>
        <el-button @click="goToSettings">账号设置</el-button>
      </div>
    </div>

    <div class="center-content">
      <div class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="profile">
            <i class="icon">👤</i>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="security">
            <i class="icon">🔒</i>
            <span>账号安全</span>
          </el-menu-item>
          <el-menu-item index="collection">
            <i class="icon">❤️</i>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="follow">
            <i class="icon">⭐</i>
            <span>我的关注</span>
          </el-menu-item>
          <el-menu-item index="benefits">
            <i class="icon">🎁</i>
            <span>我的权益</span>
          </el-menu-item>
          <el-menu-item index="tickets">
            <i class="icon">🎟️</i>
            <span>我的门票</span>
          </el-menu-item>
          <el-menu-item index="reservation">
            <i class="icon">📅</i>
            <span>预约记录</span>
          </el-menu-item>
          <el-menu-item index="orders">
            <i class="icon">📦</i>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="reviews">
            <i class="icon">💬</i>
            <span>我的评价</span>
          </el-menu-item>
          <el-menu-item index="invoice">
            <i class="icon">📄</i>
            <span>我的发票</span>
          </el-menu-item>
          <el-menu-item index="messages">
            <i class="icon">🔔</i>
            <span>消息通知</span>
            <el-badge v-if="unreadCount > 0" :value="unreadCount" class="badge" />
          </el-menu-item>
          <el-menu-item index="chat">
            <i class="icon">💭</i>
            <span>在线洽谈</span>
          </el-menu-item>
          <el-menu-item index="admin">
            <i class="icon">🔧</i>
            <span>管理后台入口</span>
          </el-menu-item>
          <el-menu-item index="member">
            <i class="icon">👑</i>
            <span>会员管理</span>
          </el-menu-item>
          <el-menu-item index="points">
            <i class="icon">💰</i>
            <span>我的积分</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mockData } from '@/data/mockData'

const router = useRouter()
const route = useRoute()

const userInfo = ref({})
const unreadCount = ref(0)

const activeMenu = computed(() => {
  const path = route.path
  if (path.includes('/center/profile')) return 'profile'
  if (path.includes('/center/security')) return 'security'
  if (path.includes('/center/collection')) return 'collection'
  if (path.includes('/center/follow')) return 'follow'
  if (path.includes('/center/benefits')) return 'benefits'
  if (path.includes('/center/tickets')) return 'tickets'
  if (path.includes('/center/reservation')) return 'reservation'
  if (path.includes('/center/orders')) return 'orders'
  if (path.includes('/center/reviews')) return 'reviews'
  if (path.includes('/center/invoice')) return 'invoice'
  if (path.includes('/center/messages')) return 'messages'
  if (path.includes('/center/chat')) return 'chat'
  if (path.includes('/center/admin')) return 'admin'
  if (path.includes('/center/member')) return 'member'
  if (path.includes('/center/points')) return 'points'
  return 'profile'
})

onMounted(() => {
  userInfo.value = mockData.userProfile || {}
  unreadCount.value = mockData.unreadCount || 0
})

const handleMenuSelect = (index) => {
  router.push(`/center/${index}`)
}

const goToProfile = () => {
  router.push('/center/profile')
}

const goToSettings = () => {
  router.push('/center/security')
}
</script>

<style lang="scss" scoped>
.user-center {
  min-height: 100vh;
  background: #f9fafb;
  padding: 40px 0;
}

.center-header {
  background: #fff;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    display: flex;
    gap: 20px;
    align-items: center;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      border: 4px solid #eff6ff;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      .name {
        font-size: 28px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 8px 0;
      }

      .role {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 15px;
      }

      .stats {
        display: flex;
        gap: 30px;

        .stat-item {
          font-size: 14px;
          color: #4b5563;

          strong {
            font-size: 20px;
            color: #2563eb;
            font-weight: 700;
          }
        }
      }
    }
  }

  .quick-actions {
    display: flex;
    gap: 15px;
  }
}

.center-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  min-height: 600px;
}

.sidebar {
  width: 260px;
  background: #f8fafc;
  border-right: 1px solid #e5e7eb;
  border-radius: 8px 0 0 8px;

  .sidebar-menu {
    border: none;
    background: transparent;
    height: 100%;

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      padding: 0 25px;
      color: #4b5563;
      font-size: 15px;
      transition: all 0.3s;
      display: flex;
      align-items: center;

      .icon {
        font-size: 18px;
        margin-right: 12px;
      }

      &.is-active {
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        color: #2563eb;
        border-right: 3px solid #2563eb;
        font-weight: 600;
      }

      &:hover {
        background: #f1f5f9;
      }

      .badge {
        margin-left: auto;
      }
    }
  }
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .center-header {
    flex-direction: column;
    gap: 20px;

    .user-info {
      flex-direction: column;
      text-align: center;

      .avatar {
        width: 80px;
        height: 80px;
        font-size: 36px;
      }

      .info {
        .name {
          font-size: 24px;
        }

        .stats {
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
      }
    }
  }

  .center-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 8px 8px 0 0;

    .sidebar-menu {
      .el-menu-item {
        padding: 0 15px;
      }
    }
  }
}
</style>
