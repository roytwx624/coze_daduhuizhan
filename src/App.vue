<template>
  <div id="app">
    <!-- 登录页面也显示Header和Footer -->
    <Header />
    <!-- 为场馆搜索页面单独处理，避免地图样式影响其他页面 -->
    <div v-if="$route.name === 'VenueSearch'" class="venue-search-wrapper">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <main v-else class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="$route.name !== 'VenueSearch'" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

onMounted(() => {
  document.title = '大都会展数智平台 - 专业展会信息平台'
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 80px - 300px);
  position: relative;
  z-index: 1;
}

/* 场馆搜索页面容器 */
.venue-search-wrapper {
  flex: 1;
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
