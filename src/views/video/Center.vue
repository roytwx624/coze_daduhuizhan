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
            <el-link type="primary" @click="viewMoreLive">查看更多 &gt;</el-link>
          </div>
        </div>
        <div class="video-grid">
          <div
            v-for="item in recommendedVideos"
            :key="item.id"
            class="video-card"
            :class="{
              'live-card': item.isLive,
              'upcoming-card': item.upcoming,
              'replay-card': item.replay
            }"
            @click="handleVideoClick(item)"
          >
            <div class="card-cover">
              <img :src="item.cover" :alt="item.title" />
              <div class="live-overlay">
                  <el-tag v-if="item.memberOnly" type="warning" effect="dark" size="small" class="member-tag">
                    会员专享
                  </el-tag>
                </div>
              <div class="duration" v-if="item.duration">
                <el-icon><VideoPlay /></el-icon>
                {{ item.duration }}
              </div>
              <div class="time-overlay" v-if="item.upcoming && item.startTime">
                <el-icon><Timer /></el-icon>
                {{ formatTime(item.startTime) }}
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">
                <span v-if="item.isLive" class="live-status-tag">
                  <el-icon><VideoCamera /></el-icon> 直播中
                </span>
                <span v-if="item.replay" class="replay-tag">
                  <el-icon><VideoPlay /></el-icon> 回放
                </span>
                {{ item.title }}
              </h3>
              <p class="card-exhibition">{{ item.exhibitionName }}</p>
              <div class="card-footer">
                <span v-if="item.isLive" class="start-time">
                  <el-icon class="time-icon"><Clock /></el-icon> 正在直播
                </span>
                <span v-else-if="item.upcoming" class="start-time">
                  <el-icon class="time-icon"><Clock /></el-icon> {{ item.startTime }}
                </span>
                <span v-else-if="item.replay" class="start-time">
                  <el-icon class="time-icon"><Clock /></el-icon> {{ item.uploadTime || '2026-01-23' }}
                </span>
                <div v-if="item.upcoming" class="action-buttons">
                  <el-button
                    :type="item.booked ? 'info' : 'primary'"
                    size="small"
                    :disabled="item.booked"
                    @click.stop="bookLive(item)"
                  >
                    <el-icon><Timer /></el-icon>
                    {{ item.booked ? '已预约' : '预约' }}
                  </el-button>
                </div>
                <span v-else class="views-count">
                  <el-icon><View /></el-icon> {{ formatNumber(item.viewerCount || item.views || 0) }}次观看
                </span>
              </div>
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
                <span class="start-time">
                  <el-icon class="time-icon"><Clock /></el-icon> {{ item.startTime }}
                </span>
                <el-button
                  :type="item.booked ? 'info' : 'primary'"
                  size="small"
                  :disabled="item.booked"
                  @click.stop="bookLive(item)"
                >
                  <el-icon><Timer /></el-icon>
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
                <el-tag v-if="item.memberOnly" type="warning" effect="dark" size="small" class="member-tag">
                  会员专享
                </el-tag>
              </div>
              <div class="duration">
                <el-icon><VideoPlay /></el-icon>
                {{ item.duration }}
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">
                <span class="replay-tag">
                  <el-icon><VideoPlay /></el-icon> 回放
                </span>
                {{ item.title }}
              </h3>
              <p class="card-exhibition">{{ item.exhibitionName }}</p>
              <div class="card-footer">
                <span class="start-time">
                  <el-icon class="time-icon"><Clock /></el-icon> {{ item.uploadTime || '2026-01-23' }}
                </span>
                <span class="views-count">
                  <el-icon><View /></el-icon> {{ formatNumber(item.views) }}次观看
                </span>
              </div>
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
  VideoPlay, 
  StarFilled 
} from '@element-plus/icons-vue'
import { videos } from '@/data/mockData'
import exhibition1 from '@/assets/images/exhibition/20260122-111812.430-1.jpg'
import exhibition2 from '@/assets/images/exhibition/20260122-111812.430-2.jpg'
import exhibition3 from '@/assets/images/exhibition/20260122-111812.430-3.jpg'
import exhibition4 from '@/assets/images/exhibition/插画展.png'

const router = useRouter()

const exhibitionImages = [exhibition2, exhibition3, exhibition1, exhibition4]

const liveList = ref([...videos.live, ...videos.live].map((item, index) => ({ 
    ...item, 
    id: item.id + (index >= videos.live.length ? 100 : 0), // Ensure unique IDs
    cover: exhibitionImages[index % 4],
    isLive: true
  })))
const upcomingList = ref([...videos.upcoming, ...videos.upcoming].map((item, index) => ({ 
    ...item, 
    id: item.id + (index >= videos.upcoming.length ? 100 : 0), // Ensure unique IDs
    booked: false,
    cover: exhibitionImages[index % 4],
    upcoming: true
  })))
const replayList = ref([...videos.replay, ...videos.replay].map((item, index) => ({ 
    ...item,
    id: item.id + (index >= videos.replay.length ? 100 : 0), // Ensure unique IDs
    cover: exhibitionImages[index % 4],
    replay: true
  })))

// 推荐视频列表：优先展示2个直播中的视频，然后是直播预约和直播回看
const recommendedVideos = ref([])

// 初始化推荐视频
const initRecommendedVideos = () => {
  const tempVideos = []
  
  // 添加前2个直播中的视频
  tempVideos.push(...liveList.value.slice(0, 2))
  
  // 添加1个直播预约视频
  if (upcomingList.value.length > 0) {
    tempVideos.push({ ...upcomingList.value[0], upcoming: true })
  }
  
  // 添加1个直播回看视频
  if (replayList.value.length > 0) {
    tempVideos.push({ ...replayList.value[0], replay: true })
  }
  
  recommendedVideos.value = tempVideos
}

// 初始化推荐视频
initRecommendedVideos()

// 处理视频点击事件
const handleVideoClick = (item) => {
  if (item.isLive) {
    enterLive(item)
  } else if (item.upcoming) {
    // 进入直播预约详情或预约页面
    bookLive(item)
  } else if (item.replay) {
    watchReplay(item)
  }
}

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

.views-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6B7280;
}

.time-icon {
  color: #204E9C;
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
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  .live-status-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #F56C6C;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 6px;
    border-radius: 4px;
    margin-right: 4px;
    vertical-align: middle;
  }
  
  .replay-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #204E9C;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 6px;
    border-radius: 4px;
    margin-right: 4px;
    vertical-align: middle;
  }
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

.member-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  min-width: 80px;
  justify-content: center;
  background: linear-gradient(135deg, #FBBF24, #F59E0B); /* Yellow gradient */
  color: white;
  font-weight: 600;
  border-radius: 20px 0 20px 0;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
}

.tag-icon {
  font-size: 14px;
}

.tag-text {
  font-size: 12px;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.start-time {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6B7280;
}

@media (max-width: 1440px) {
  .video-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
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
