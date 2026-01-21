<template>
  <div class="video-center-page">
    <div class="container">
      <!-- 直播推荐 -->
      <section class="section live-recommendation">
        <div class="section-header">
          <h2>
            <el-icon><VideoCamera /></el-icon>
            直播推荐
          </h2>
          <div class="section-actions">
            <el-tag type="danger" effect="dark" class="live-tag">正在直播</el-tag>
            <el-link type="primary" @click="viewMoreLive">查看更多 &gt;</el-link>
          </div>
        </div>
        <div class="video-grid">
          <div
            v-for="item in liveList"
            :key="item.id"
            class="video-card live-card"
            @click="enterLive(item)"
          >
            <div class="card-cover">
              <img :src="item.cover" :alt="item.title" />
              <div class="live-overlay">
                <el-tag type="danger" effect="dark" size="large">正在直播</el-tag>
                <el-tag v-if="item.memberOnly" type="warning" effect="dark" size="small" class="member-tag">
                  会员专享
                </el-tag>
              </div>
              <div class="viewer-count">
                <el-icon><View /></el-icon>
                {{ formatNumber(item.viewerCount) }}人在线
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-exhibition">{{ item.exhibitionName }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 直播预约 -->
      <section class="section live-booking">
        <div class="section-header">
          <h2>
            <el-icon><Clock /></el-icon>
            直播预约
          </h2>
          <el-link type="primary" @click="viewMoreBooking">查看更多 &gt;</el-link>
        </div>
        <div class="video-grid">
          <div v-for="item in upcomingList" :key="item.id" class="video-card">
            <div class="card-cover">
              <img :src="item.cover" :alt="item.title" />
              <div class="time-overlay">
                <el-icon><Timer /></el-icon>
                {{ formatTime(item.startTime) }}
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-exhibition">{{ item.exhibitionName }}</p>
              <div class="card-footer">
                <span class="start-time">{{ item.startTime }}</span>
                <el-button
                  :type="item.booked ? 'info' : 'primary'"
                  size="small"
                  :disabled="item.booked"
                  @click.stop="bookLive(item)"
                >
                  {{ item.booked ? '已预约' : '预约' }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 直播回看 -->
      <section class="section live-replay">
        <div class="section-header">
          <h2>
            <el-icon><Film /></el-icon>
            直播回看
          </h2>
          <el-link type="primary" @click="viewMoreReplay">查看更多 &gt;</el-link>
        </div>
        <div class="video-grid">
          <div
            v-for="item in replayList"
            :key="item.id"
            class="video-card replay-card"
            @click="watchReplay(item)"
          >
            <div class="card-cover">
              <img :src="item.cover" :alt="item.title" />
              <div class="replay-overlay">
                <el-tag effect="dark" size="large">回放</el-tag>
                <el-tag v-if="item.memberOnly" type="warning" effect="dark" size="small" class="member-tag">
                  会员专享
                </el-tag>
              </div>
              <div class="duration">
                <el-icon><VideoPlay /></el-icon>
                {{ item.duration }}
              </div>
              <div class="views">
                <el-icon><View /></el-icon>
                {{ formatNumber(item.views) }}次观看
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-exhibition">{{ item.exhibitionName }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  VideoCamera, 
  Clock, 
  Film, 
  View, 
  Timer, 
  VideoPlay 
} from '@element-plus/icons-vue'
import { videos } from '@/data/mockData'

const router = useRouter()

const liveList = ref(videos.live)
const upcomingList = ref(videos.upcoming.map(item => ({ ...item, booked: false })))
const replayList = ref(videos.replay)

// 进入直播
const enterLive = (item) => {
  if (item.memberOnly) {
    // 检查是否是会员
    const isMember = localStorage.getItem('memberLevel')
    if (!isMember) {
      ElMessage.warning('此直播为会员专享内容，请先开通会员')
      router.push('/personal/membership')
      return
    }
  }
  router.push(`/video/live/${item.id}`)
}

// 预约直播
const bookLive = (item) => {
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (!isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }

  item.booked = true
  ElMessage({
    message: '预约成功！开播前30分钟将通过短信和站内信提醒您',
    type: 'success'
  })
}

// 观看回放
const watchReplay = (item) => {
  if (item.memberOnly) {
    const isMember = localStorage.getItem('memberLevel')
    if (!isMember) {
      ElMessage.warning('此回放为会员专享内容，请先开通会员')
      router.push('/personal/membership')
      return
    }
  }
  router.push(`/video/replay/${item.id}`)
}

// 格式化数字
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toString()
}

// 格式化时间显示
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) {
    return `${days}天后`
  } else if (hours > 0) {
    return `${hours}小时后`
  } else {
    return '即将开始'
  }
}

// 查看更多
const viewMoreLive = () => {
  router.push('/video?type=live')
}

const viewMoreBooking = () => {
  router.push('/video?type=booking')
}

const viewMoreReplay = () => {
  router.push('/video?type=replay')
}
</script>

<style lang="scss" scoped>
.video-center-page {
  padding: 100px 0 60px;
  min-height: calc(100vh - 80px);
  background: #F9FAFB;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E5E7EB;

  h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 28px;
    font-weight: 700;
    color: #1F2937;
    margin: 0;

    .el-icon {
      color: #204E9C;
    }
  }

  .section-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .live-tag {
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.video-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  &.live-card:hover .card-cover img {
    transform: scale(1.05);
  }
}

.card-cover {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.live-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.member-tag {
  width: fit-content;
}

.viewer-count {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  backdrop-filter: blur(10px);
}

.time-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  backdrop-filter: blur(10px);
}

.replay-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.duration {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  backdrop-filter: blur(10px);
}

.views {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-exhibition {
  font-size: 13px;
  color: #6B7280;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
}

.start-time {
  font-size: 13px;
  color: #6B7280;
}

@media (max-width: 1440px) {
  .video-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-header h2 {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .video-center-page {
    padding: 100px 16px 40px;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
