<template>
  <teleport to="body">
    <div 
      class="floating-window" 
      :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
      @mousedown="startDrag"
    >
      <transition name="fade">
        <div v-show="showBackToTop" class="floating-item" @click="scrollToTop">
          <el-icon :size="20"><Top /></el-icon>
          <span class="tooltip">返回顶部</span>
        </div>
      </transition>

      <div class="floating-item" @click="showPhoneModal">
        <el-icon :size="20"><Phone /></el-icon>
        <span class="tooltip">电话客服</span>
      </div>

      <div class="floating-item" @mouseenter="showQRCode = true" @mouseleave="showQRCode = false">
        <el-icon :size="20"><Grid /></el-icon>
        <span class="tooltip">小程序</span>
        <!-- 二维码弹出 -->
        <transition name="fade">
          <div v-show="showQRCode" class="qr-modal">
            <div class="qr-content">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://exhibition.com/miniapp" alt="小程序二维码" />
              <p>扫码进入小程序</p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 电话客服弹窗 -->
    <el-dialog
      v-model="phoneModalVisible"
      title="联系客服"
      width="400px"
      center
      append-to-body
    >
      <div class="phone-content">
        <div class="phone-number">
          <el-icon :size="32" color="#2563EB"><Phone /></el-icon>
          <p>客服热线</p>
          <h2>400-123-1234</h2>
        </div>
        <p class="work-time">服务时间：9:00 - 18:00（工作日）</p>
      </div>
    </el-dialog>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Top, Phone, Grid } from '@element-plus/icons-vue'

const showQRCode = ref(false)
const showBackToTop = ref(false)
const phoneModalVisible = ref(false)

const position = ref({
  x: 0,
  y: 0
})

let isDragging = false
let startX = 0
let startY = 0
let initialX = 0
let initialY = 0

const startDrag = (e) => {
  if (e.target.closest('.floating-item')) return
  
  isDragging = true
  startX = e.clientX
  startY = e.clientY
  initialX = position.value.x
  initialY = position.value.y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging) return
  
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  
  position.value.x = initialX + dx
  position.value.y = initialY + dy
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const showPhoneModal = () => {
  phoneModalVisible.value = true
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 初始化位置（右下角）
  position.value = {
    x: -60,
    y: window.innerHeight - 300
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.floating-window {
  position: fixed;
  right: 20px;
  bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
  cursor: move;
  user-select: none;
}

.floating-item {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #204E9C, #2563EB);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(32, 78, 156, 0.3);
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(32, 78, 156, 0.4);

    .tooltip {
      opacity: 1;
      transform: translateX(-8px);
    }
  }
}

.tooltip {
  position: absolute;
  right: 60px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.3s ease;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 6px solid rgba(0, 0, 0, 0.8);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
}

.qr-modal {
  position: absolute;
  right: 60px;
  bottom: 0;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 180px;
  pointer-events: none; /* Avoid blocking hover */
}

.qr-content {
  img {
    width: 160px;
    height: 160px;
    display: block;
    margin-bottom: 12px;
  }

  p {
    font-size: 13px;
    color: #6B7280;
    margin: 0;
  }
}

.phone-content {
  text-align: center;
  padding: 20px 0;
}

.phone-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  p {
    font-size: 14px;
    color: #6B7280;
    margin: 0;
  }

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: #204E9C;
    margin: 0;
    font-family: 'DIN Alternate', Arial, sans-serif;
  }
}

.work-time {
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  margin-top: 16px;
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
