<template>
  <div class="user-center">
    <div class="center-header">
      <div class="user-info">
        <div class="avatar">
          <span>{{ currentUserInfo.name?.charAt(0) || '用' }}</span>
        </div>
        <div class="info">
          <h2 class="name">{{ currentUserInfo.name || '未登录' }}</h2>
          <p class="role">{{ currentUserInfo.role || '普通用户' }}</p>
          <div class="stats">
            <span class="stat-item">
              <strong>{{ currentUserInfo.pointCount || 0 }}</strong> 积分
            </span>
            <span class="stat-item">
              <strong>{{ currentUserInfo.followCount || 0 }}</strong> 关注
            </span>
            <span class="stat-item">
              <strong>{{ currentUserInfo.collectCount || 0 }}</strong> 收藏
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
            <el-icon class="icon"><User /></el-icon>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="security">
            <el-icon class="icon"><Lock /></el-icon>
            <span>账号安全</span>
          </el-menu-item>
          <el-menu-item index="collection">
            <el-icon class="icon"><Star /></el-icon>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="follow">
            <el-icon class="icon"><View /></el-icon>
            <span>我的关注</span>
          </el-menu-item>
          <el-menu-item index="benefits">
            <el-icon class="icon"><Present /></el-icon>
            <span>我的权益</span>
          </el-menu-item>
          <el-menu-item index="tickets">
            <el-icon class="icon"><Ticket /></el-icon>
            <span>我的门票</span>
          </el-menu-item>
          <el-menu-item index="reservation">
            <el-icon class="icon"><Calendar /></el-icon>
            <span>预约记录</span>
          </el-menu-item>
          <el-menu-item index="orders">
            <el-icon class="icon"><Box /></el-icon>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="reviews">
            <el-icon class="icon"><ChatDotRound /></el-icon>
            <span>我的评价</span>
          </el-menu-item>
          <el-menu-item index="invoice">
            <el-icon class="icon"><Document /></el-icon>
            <span>我的发票</span>
          </el-menu-item>
          <el-menu-item index="messages">
            <el-icon class="icon"><Bell /></el-icon>
            <span>消息通知</span>
            <el-badge v-if="unreadCount > 0" :value="unreadCount" class="badge" />
          </el-menu-item>
          <el-menu-item index="chat">
            <el-icon class="icon"><ChatLineRound /></el-icon>
            <span>在线洽谈</span>
          </el-menu-item>
          <el-menu-item index="admin">
            <el-icon class="icon"><Setting /></el-icon>
            <span>管理后台入口</span>
          </el-menu-item>
          <el-menu-item index="member">
            <el-icon class="icon"><Trophy /></el-icon>
            <span>会员管理</span>
          </el-menu-item>
          <el-menu-item index="points">
            <el-icon class="icon"><Money /></el-icon>
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
import { userInfo } from '@/data/mockData'

const router = useRouter()
const route = useRoute()

const currentUserInfo = ref({})
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
  currentUserInfo.value = userInfo || {}
  unreadCount.value = 3 // Mock unread count
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
  margin-top: 80px;
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
