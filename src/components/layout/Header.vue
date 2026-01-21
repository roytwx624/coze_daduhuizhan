<template>
  <header class="site-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo区 -->
        <div class="logo-section">
          <router-link to="/" class="logo">
            <svg width="160" height="48" viewBox="0 0 160 48" fill="none">
              <rect x="0" y="0" width="48" height="48" rx="8" fill="#204E9C"/>
              <path d="M24 12 L32 28 H16 L24 12Z" fill="white"/>
              <text x="56" y="32" font-size="18" font-weight="bold" fill="#204E9C">会展服务平台</text>
            </svg>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
            </li>
            
            <li class="nav-item" @mouseenter="showExhibitionMenu = true" @mouseleave="showExhibitionMenu = false">
              <div class="nav-link has-submenu">
                找展会
                <svg class="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <transition name="dropdown">
                <ul v-show="showExhibitionMenu" class="dropdown-menu">
                  <li><router-link to="/exhibition/search">展会搜索</router-link></li>
                  <li><router-link to="/video">视频中心</router-link></li>
                  <li><router-link to="/collection">展会文集</router-link></li>
                  <li><router-link to="/mall">线上商城</router-link></li>
                </ul>
              </transition>
            </li>

            <li class="nav-item" @mouseenter="showVenueMenu = true" @mouseleave="showVenueMenu = false">
              <div class="nav-link has-submenu">
                找场馆
                <svg class="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <transition name="dropdown">
                <ul v-show="showVenueMenu" class="dropdown-menu">
                  <li><router-link to="/venue/search">场馆搜索</router-link></li>
                </ul>
              </transition>
            </li>

            <li class="nav-item" @mouseenter="showPolicyMenu = true" @mouseleave="showPolicyMenu = false">
              <div class="nav-link has-submenu">
                找政策
                <svg class="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <transition name="dropdown">
                <ul v-show="showPolicyMenu" class="dropdown-menu">
                  <li><router-link to="/policy/search">政策搜索</router-link></li>
                  <li><router-link to="/policy/apply">一站式报批</router-link></li>
                </ul>
              </transition>
            </li>

            <li class="nav-item" @mouseenter="showServiceMenu = true" @mouseleave="showServiceMenu = false">
              <div class="nav-link has-submenu">
                找服务
                <svg class="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <transition name="dropdown">
                <ul v-show="showServiceMenu" class="dropdown-menu">
                  <li><router-link to="/hotel/search">酒店搜索</router-link></li>
                  <li><router-link to="/service/search">展会服务搜索</router-link></li>
                  <li><router-link to="/bidding">招投标信息</router-link></li>
                </ul>
              </transition>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">关于我们</router-link>
            </li>
          </ul>
        </nav>

        <!-- 用户区域 -->
        <div class="user-section">
          <template v-if="isLoggedIn">
            <div class="user-info" @click="goToPersonal">
              <el-badge :value="unreadCount" :hidden="unreadCount === 0" class="message-badge">
                <el-icon :size="20" class="bell-icon">
                  <Bell />
                </el-icon>
              </el-badge>
              <el-dropdown @command="handleCommand">
                <div class="user-avatar">
                  <img :src="user.avatar" :alt="user.name" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                    <el-dropdown-item command="orders">我的订单</el-dropdown-item>
                    <el-dropdown-item command="settings">设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <template v-else>
            <button class="btn btn-login" @click="handleLogin">登录 / 注册</button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bell } from '@element-plus/icons-vue'

const router = useRouter()

const showExhibitionMenu = ref(false)
const showVenueMenu = ref(false)
const showPolicyMenu = ref(false)
const showServiceMenu = ref(false)

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const unreadCount = ref(3)

const user = ref({
  name: '张三',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
})

const goToPersonal = () => {
  router.push('/personal')
}

const handleLogin = () => {
  // 登录逻辑
  router.push('/login')
}

const handleCommand = (command) => {
  switch(command) {
    case 'personal':
      router.push('/personal')
      break
    case 'orders':
      router.push('/personal/orders')
      break
    case 'settings':
      router.push('/personal/profile')
      break
    case 'logout':
      localStorage.removeItem('isLoggedIn')
      isLoggedIn.value = false
      router.push('/')
      break
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo-section {
  flex-shrink: 0;
}

.logo {
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;

  &.has-submenu {
    .arrow-icon {
      transition: transform 0.3s ease;
    }
  }

  &:hover,
  &.active {
    color: #204E9C;
    background: rgba(32, 78, 156, 0.08);

    .arrow-icon {
      transform: rotate(180deg);
    }
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 8px;
  margin-top: 8px;

  a {
    display: block;
    padding: 10px 16px;
    font-size: 14px;
    color: #374151;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(32, 78, 156, 0.08);
      color: #204E9C;
    }
  }
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.message-badge {
  position: relative;

  :deep(.el-badge__content) {
    background: #DC2626;
  }
}

.bell-icon {
  color: #6B7280;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #204E9C;
  }
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #F3F4F6;
  transition: border-color 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #204E9C;
  }
}

.btn-login {
  padding: 10px 24px;
  background: linear-gradient(135deg, #204E9C, #2563EB);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1440px) {
  .nav-link {
    padding: 8px 12px;
    font-size: 15px;
  }
}

@media (max-width: 1024px) {
  .nav-list {
    gap: 4px;
  }

  .nav-link {
    padding: 8px 10px;
    font-size: 14px;
  }
}
</style>
