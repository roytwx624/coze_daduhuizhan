<template>
  <div class="home-page">
    <!-- 轮播 Banner -->
    <section class="banner-section">
      <el-carousel :interval="5000" height="500px" arrow="always" indicator-position="outside">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <div class="banner-item" @click="handleBannerClick(item)">
            <img :src="item.image" :alt="item.title" />
            <div class="banner-content">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- 展会日历 -->
    <section class="calendar-section">
      <div class="container">
        <div class="section-header">
          <h2>展会日历</h2>
          <p class="section-desc">本月展会安排一览</p>
        </div>
        <div class="calendar-content">
          <div class="calendar-stats">
            <div class="stat-item">
              <div class="stat-number">{{ calendarData.stats.totalExhibitions }}</div>
              <div class="stat-label">本月累计展会</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">{{ calendarData.stats.totalVenues }}</div>
              <div class="stat-label">覆盖场馆</div>
            </div>
          </div>
          <div class="calendar-grid">
            <div 
              v-for="day in calendarDays" 
              :key="day.date"
              class="calendar-day"
              :class="{ 'has-event': day.events.length > 0, 'today': day.isToday }"
              @mouseenter="showEvents(day)"
            >
              <div class="day-number">{{ day.day }}</div>
              <div v-if="day.events.length > 0" class="event-count">{{ day.events.length }}</div>
            </div>
          </div>
          <transition name="fade">
            <div v-show="selectedDay.events.length > 0" class="event-tooltip">
              <div class="tooltip-header">{{ selectedDay.date }}</div>
              <div class="tooltip-list">
                <div v-for="event in selectedDay.events" :key="event.id" class="tooltip-item">
                  {{ event.name }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- 展会推荐 -->
    <section class="exhibition-section">
      <div class="container">
        <div class="section-header">
          <h2>展会推荐</h2>
          <p class="section-desc">精选优质展会，不容错过</p>
        </div>
        <div class="exhibition-grid">
          <div 
            v-for="item in exhibitions" 
            :key="item.id"
            class="exhibition-card"
            @click="goToDetail(item)"
          >
            <div class="card-image">
              <img :src="item.poster" :alt="item.name" />
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag tag-primary">{{ tag }}</span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.name }}</h3>
              <div class="card-info">
                <div class="info-item">
                  <el-icon><Calendar /></el-icon>
                  <span>{{ item.time }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Location /></el-icon>
                  <span>{{ item.venue }}</span>
                </div>
              </div>
              <div class="card-footer">
                <span class="industry-tag">{{ item.industry }}</span>
                <span class="status-tag" :class="getStatusClass(item.status)">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 展会政策 -->
    <section class="policy-section">
      <div class="container">
        <div class="section-header">
          <h2>展会政策</h2>
          <p class="section-desc">最新政策动态，助力展会发展</p>
        </div>
        <div class="policy-list">
          <div v-for="policy in policies" :key="policy.id" class="policy-item">
            <div class="policy-icon">
              <el-icon :size="24"><Document /></el-icon>
            </div>
            <div class="policy-content">
              <h3 class="policy-title">{{ policy.title }}</h3>
              <p class="policy-summary">{{ policy.summary }}</p>
              <div class="policy-meta">
                <span class="meta-item">
                  <el-icon><OfficeBuilding /></el-icon>
                  {{ policy.publisher }}
                </span>
                <span class="meta-item">
                  <el-icon><Clock /></el-icon>
                  {{ policy.publishTime }}
                </span>
              </div>
            </div>
            <span class="policy-tag tag tag-success">{{ policy.category }}</span>
          </div>
        </div>
        <div class="section-footer">
          <router-link to="/policy/search" class="btn btn-outline">查看更多政策</router-link>
        </div>
      </div>
    </section>

    <!-- 核心功能 -->
    <section class="core-section">
      <div class="container">
        <div class="digital-map-entry">
          <div class="map-visual">
            <el-icon :size="80"><DataAnalysis /></el-icon>
          </div>
          <div class="map-content">
            <h3>数字产业图谱</h3>
            <p>全景展示会展产业链，精准匹配商机</p>
          </div>
        </div>
        <div class="core-functions">
          <div v-for="func in coreFunctions" :key="func.id" class="function-card" @click="navigateTo(func.path)">
            <div class="function-icon">
              <component :is="func.icon" :size="40" />
            </div>
            <h4>{{ func.title }}</h4>
            <p>{{ func.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 快捷服务 -->
    <section class="service-section">
      <div class="container">
        <div class="section-header">
          <h2>快捷服务</h2>
          <p class="section-desc">一站式服务，便捷高效</p>
        </div>
        <div class="service-grid">
          <div 
            v-for="service in quickServices" 
            :key="service.id"
            class="service-card"
            @click="navigateTo(service.path)"
          >
            <div class="service-icon">
              <component :is="service.icon" :size="36" />
            </div>
            <h4>{{ service.title }}</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Calendar, 
  Location, 
  Document, 
  OfficeBuilding, 
  Clock, 
  DataAnalysis,
  Search,
  MapLocation,
  DocumentCopy,
  Service
} from '@element-plus/icons-vue'
import { exhibitions, policies, calendarData } from '@/data/mockData'

const router = useRouter()

// Banner数据
const bannerList = ref([
  {
    id: 1,
    title: '第三十七届制冷展',
    description: '2026年4月8-10日 中国国际展览中心（顺义馆）',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920',
    link: '/exhibition/detail/1'
  },
  {
    id: 2,
    title: '第66届中国特许加盟展',
    description: '2026年5月15-17日 国家会议中心',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1920',
    link: '/exhibition/detail/2'
  },
  {
    id: 3,
    title: '第二十七届科博会',
    description: '2026年6月10-13日 北京展览馆',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920',
    link: '/exhibition/detail/3'
  }
])

// 日历数据
const calendarDays = ref([])
const selectedDay = reactive({ date: '', events: [] })

const generateCalendarDays = () => {
  const year = 2026
  const month = 0 // 1月
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  
  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const events = calendarData.events[dateStr] || []
    days.push({
      day: i,
      date: dateStr,
      events: events,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
    })
  }
  calendarDays.value = days
}

generateCalendarDays()

const showEvents = (day) => {
  selectedDay.date = day.date
  selectedDay.events = day.events
}

// 核心功能
const coreFunctions = [
  { id: 1, title: '找展会', desc: '海量展会信息', icon: Search, path: '/exhibition/search' },
  { id: 2, title: '找场馆', desc: '优质场馆资源', icon: MapLocation, path: '/venue/search' },
  { id: 3, title: '找政策', desc: '最新政策动态', icon: DocumentCopy, path: '/policy/search' },
  { id: 4, title: '找服务', desc: '专业展会服务', icon: Service, path: '/service/search' }
]

// 快捷服务
const quickServices = [
  { id: 1, title: '展会文集', icon: Document, path: '/collection' },
  { id: 2, title: '视频中心', icon: 'VideoCamera', path: '/video' },
  { id: 3, title: '精选商城', icon: 'ShoppingCart', path: '/mall' },
  { id: 4, title: '一站式申报', icon: 'DocumentChecked', path: '/policy/apply' }
]

const handleBannerClick = (item) => {
  router.push(item.link)
}

const goToDetail = (item) => {
  router.push(`/exhibition/detail/${item.id}`)
}

const navigateTo = (path) => {
  router.push(path)
}

const getStatusClass = (status) => {
  const classMap = {
    '即将开展': 'status-upcoming',
    '报名中': 'status-booking',
    '筹备中': 'status-preparing'
  }
  return classMap[status] || ''
}
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 12px;
  }

  .section-desc {
    font-size: 16px;
    color: #6B7280;
  }
}

// Banner
.banner-section {
  margin-bottom: 80px;

  :deep(.el-carousel__item) {
    overflow: hidden;
  }

  .banner-item {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .banner-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 60px 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    text-align: center;

    h2 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    p {
      font-size: 20px;
      opacity: 0.9;
    }
  }
}

// 展会日历
.calendar-section {
  background: #F9FAFB;
  padding: 80px 0;
  margin-bottom: 80px;
}

.calendar-content {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.calendar-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-width: 280px;

  .stat-item {
    text-align: center;
    flex: 1;
  }

  .stat-number {
    font-size: 48px;
    font-weight: 700;
    color: #204E9C;
    margin-bottom: 8px;
    font-family: 'DIN Alternate', Arial, sans-serif;
  }

  .stat-label {
    font-size: 14px;
    color: #6B7280;
  }

  .stat-divider {
    width: 1px;
    height: 60px;
    background: #E5E7EB;
  }
}

.calendar-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  font-size: 18px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #204E9C;
    color: white;
    transform: translateY(-2px);
  }

  &.has-event {
    background: rgba(32, 78, 156, 0.08);
    color: #204E9C;
    font-weight: 600;

    &:hover {
      background: #204E9C;
      color: white;
    }
  }

  &.today {
    border: 2px solid #204E9C;
  }

  .event-count {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    background: #DC2626;
    color: white;
    font-size: 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.event-tooltip {
  position: fixed;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1000;

  .tooltip-header {
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #E5E7EB;
  }

  .tooltip-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tooltip-item {
    font-size: 14px;
    color: #6B7280;
    padding: 8px 12px;
    background: #F9FAFB;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: #F3F4F6;
      color: #204E9C;
    }
  }
}

// 展会推荐
.exhibition-section {
  padding: 80px 0;
  margin-bottom: 80px;
}

.exhibition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.exhibition-card {
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
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .card-tags {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  .info-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #6B7280;

    .el-icon {
      color: #9CA3AF;
    }
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.industry-tag {
  font-size: 13px;
  color: #6B7280;
}

.status-tag {
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;

  &.status-upcoming {
    background: rgba(220, 38, 38, 0.1);
    color: #DC2626;
  }

  &.status-booking {
    background: rgba(5, 150, 105, 0.1);
    color: #059669;
  }

  &.status-preparing {
    background: rgba(245, 158, 11, 0.1);
    color: #F59E0B;
  }
}

// 展会政策
.policy-section {
  background: #F9FAFB;
  padding: 80px 0;
  margin-bottom: 80px;
}

.policy-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.policy-item {
  display: flex;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateX(4px);
  }
}

.policy-icon {
  width: 48px;
  height: 48px;
  background: rgba(32, 78, 156, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #204E9C;
  flex-shrink: 0;
}

.policy-content {
  flex: 1;
}

.policy-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
}

.policy-summary {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
  line-height: 1.6;
}

.policy-meta {
  display: flex;
  gap: 24px;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #9CA3AF;

    .el-icon {
      color: #9CA3AF;
    }
  }
}

.section-footer {
  text-align: center;
}

// 核心功能
.core-section {
  padding: 80px 0;
  margin-bottom: 80px;
}

.digital-map-entry {
  display: flex;
  align-items: center;
  gap: 32px;
  background: linear-gradient(135deg, #204E9C, #2563EB);
  color: white;
  padding: 48px;
  border-radius: 20px;
  margin-bottom: 48px;

  .map-visual {
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map-content {
    flex: 1;

    h3 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      font-size: 18px;
      opacity: 0.9;
    }
  }
}

.core-functions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.function-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    .function-icon {
      background: #204E9C;
      color: white;
    }
  }

  .function-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: rgba(32, 78, 156, 0.08);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #204E9C;
    transition: all 0.3s ease;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
  }
}

// 快捷服务
.service-section {
  padding: 80px 0;
  margin-bottom: 80px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.service-card {
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    .service-icon {
      background: linear-gradient(135deg, #204E9C, #2563EB);
      color: white;
    }
  }

  .service-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 20px;
    background: rgba(32, 78, 156, 0.08);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #204E9C;
    transition: all 0.3s ease;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
  }
}

@media (max-width: 1440px) {
  .exhibition-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .core-functions,
  .service-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .exhibition-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .calendar-content {
    flex-direction: column;
  }

  .calendar-stats {
    width: 100%;
  }

  .digital-map-entry {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .exhibition-grid,
  .core-functions,
  .service-grid {
    grid-template-columns: 1fr;
  }

  .calendar-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .section-header h2 {
    font-size: 28px;
  }
}
</style>
