<template>
  <header class="site-header">
    <div class="main-header">
      <div class="container">
        <div class="header-content">
          <!-- Logo区 -->
          <div class="logo-section">
            <router-link to="/" class="logo">
              <img src="@/assets/images/logo/logo-icon-sdhz.0795949a.png" alt="Logo" class="logo-icon" />
              <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                <text x="0" y="28" font-size="22" font-weight="bold" fill="#FFFFFF" font-family="PingFang SC, Microsoft YaHei">大都会展数智平台</text>
              </svg>
            </router-link>
          </div>

          <!-- 导航菜单 -->
          <nav class="main-nav">
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/" class="nav-link" active-class="active">首页</router-link>
              </li>
              
              <li class="nav-item" @mouseenter="showExhibitionMenu = true" @mouseleave="showExhibitionMenu = false">
                <div class="nav-link has-submenu" :class="{ active: $route.path.startsWith('/exhibition') }">
                  找展会
                </div>
                <transition name="dropdown">
                  <ul v-show="showExhibitionMenu" class="dropdown-menu">
                    <li><router-link to="/exhibition/overview">展会概览</router-link></li>
                    <li><router-link to="/exhibition/search">展会搜索</router-link></li>
                    <li><router-link to="/video">视频中心</router-link></li>
                    <li><router-link to="/collection">展会文集</router-link></li>
                    <li><router-link to="/mall">线上商城</router-link></li>
                  </ul>
                </transition>
              </li>

              <li class="nav-item" @mouseenter="showVenueMenu = true" @mouseleave="showVenueMenu = false">
                <div class="nav-link has-submenu" :class="{ active: $route.path.startsWith('/venue') }">
                  找场馆
                </div>
                <transition name="dropdown">
                  <ul v-show="showVenueMenu" class="dropdown-menu">
                    <li><router-link to="/venue/overview">场馆概览</router-link></li>
                    <li><router-link to="/venue/search">场馆搜索</router-link></li>
                  </ul>
                </transition>
              </li>

              <li class="nav-item" @mouseenter="showPolicyMenu = true" @mouseleave="showPolicyMenu = false">
                <div class="nav-link has-submenu" :class="{ active: $route.path.startsWith('/policy') }">
                  找政策
                </div>
                <transition name="dropdown">
                  <ul v-show="showPolicyMenu" class="dropdown-menu">
                    <li><router-link to="/policy/search">政策搜索</router-link></li>
                    <li><router-link to="/policy/apply">一站式报批</router-link></li>
                  </ul>
                </transition>
              </li>

              <li class="nav-item" @mouseenter="showServiceMenu = true" @mouseleave="showServiceMenu = false">
                <div class="nav-link has-submenu" :class="{ active: $route.path.startsWith('/bidding') }">
                  找服务
                </div>
                <transition name="dropdown">
                  <ul v-show="showServiceMenu" class="dropdown-menu">
                    <li><router-link to="/bidding">招投标信息</router-link></li>
                  </ul>
                </transition>
              </li>

              <li class="nav-item">
                <router-link to="/about" class="nav-link" active-class="active">关于我们</router-link>
              </li>
            </ul>
          </nav>

          <!-- 用户区域 -->
          <div class="user-section">
            <template v-if="isLoggedIn">
              <div class="user-info">
                <el-badge :value="unreadCount" :hidden="unreadCount === 0" class="message-badge">
                  <div class="message-icon-container" @click="goToMessages">
                    <el-icon :size="20" class="bell-icon">
                      <Bell />
                    </el-icon>
                  </div>
                </el-badge>
                <el-dropdown @command="handleCommand">
                  <div class="user-avatar-container">
                    <el-icon :size="20" class="user-icon">
                      <User />
                    </el-icon>
                    <span class="user-name">{{ user.name }}</span>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                      <el-dropdown-item command="password">修改密码</el-dropdown-item>
                      <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-login">登录 / 注册</router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Bell, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const showExhibitionMenu = ref(false)
const showVenueMenu = ref(false)
const showPolicyMenu = ref(false)
const showServiceMenu = ref(false)

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const unreadCount = ref(3)

// 从localStorage读取用户信息
const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    return JSON.parse(userInfo)
  }
  return {
    name: '管理员',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  }
}

const user = ref(getUserInfo())

// 监听路由变化，重新检查登录状态
watch(
  () => route.path,
  () => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
    user.value = getUserInfo()
  }
)

// 监听登录状态变化
const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  user.value = getUserInfo()
}

// 初始化时检查一次登录状态
checkLoginStatus()

const goToMessages = () => {
  router.push('/center/messages')
}

const handleCommand = (command) => {
  switch(command) {
    case 'personal':
      router.push('/center')
      break
    case 'password':
      router.push('/center/security')
      break
    case 'logout':
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userInfo')
      isLoggedIn.value = false
      user.value = getUserInfo()
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
  z-index: 1000;
  background: transparent;
}

.main-header {
  height: 80px;
  background: #204E9C; /* Blue background */
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
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
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.logo-icon {
  height: 32px;
  width: auto;
  object-fit: contain;
}

.logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  border-radius: 6px;

  &.active,
  &:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
  }
}

.dropdown-menu {
  position: absolute;
  top: 80px; /* Adjust to match header height */
  left: 50%;
  transform: translateX(-50%);
  min-width: 160px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  border: 1px solid #F3F4F6;
  z-index: 10000; /* Ensure dropdown is above map and other elements */

  li {
    list-style: none;
  }

  a {
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    color: #374151;
    transition: all 0.2s ease;
    text-align: center;

    &:hover {
      background: #F9FAFB;
      color: #204E9C;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: white;
    border-left: 1px solid #F3F4F6;
    border-top: 1px solid #F3F4F6;
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
  gap: 20px;
  cursor: pointer;
}

.user-avatar-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .user-icon {
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
  }
  
  .user-name {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
}

.message-badge {
  :deep(.el-badge__content) {
    background: #DC2626;
    border: none;
  }
}

.message-icon-container {
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.bell-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;

  .message-icon-container:hover & {
    color: #FFFFFF;
  }
}

.btn-login {
  padding: 8px 24px;
  background: white;
  color: #111827;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #F3F4F6;
    transform: translateY(-1px);
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
