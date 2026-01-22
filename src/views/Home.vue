<template>
  <div class="home-page">
    <!-- 轮播 Banner -->
    <section class="banner-section">
      <el-carousel :interval="5000" :height="bannerHeight" arrow="always" indicator-position="outside">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <div class="banner-item" @click="handleBannerClick(item)">
            <img :src="item.image" :alt="item.title" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <!-- 展会日历 -->
    <section class="calendar-section">
      <div class="container">
        <div class="section-header calendar-header">
          <div class="header-left">
            <h2>展会日历</h2>
          </div>
          <div class="month-switcher">
            <el-button circle size="small" @click="prevMonth">
              <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <span class="current-date">{{ currentYear }}年{{ currentMonth }}月</span>
            <el-button circle size="small" @click="nextMonth">
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
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
              <div class="stat-label">涉及场馆</div>
            </div>
          </div>
          <div class="calendar-grid">
            <div class="calendar-header-row">
              <div class="header-day">一</div>
              <div class="header-day">二</div>
              <div class="header-day">三</div>
              <div class="header-day">四</div>
              <div class="header-day">五</div>
              <div class="header-day">六</div>
              <div class="header-day">日</div>
            </div>
            <div 
              v-for="day in calendarDays" 
              :key="day.date"
              class="calendar-day"
              :class="{ 'has-event': day.events.length > 0, 'today': day.isToday }"
            >
              <div class="day-number">{{ day.day }}</div>
              <div v-if="day.events.length > 0" class="event-count">{{ day.events.length }}</div>
              
              <!-- 悬停展示展会列表 -->
              <div v-if="day.events.length > 0" class="day-events-popover">
                <div class="popover-header">
                  <span class="date">{{ day.date }}</span>
                  <span class="count">共 {{ day.events.length }} 场展会</span>
                </div>
                <div class="popover-content">
                  <div v-for="event in day.events" :key="event.id" class="mini-event-card">
                    <div class="event-name">
                      <el-icon class="icon"><Calendar /></el-icon>
                      {{ event.name }}
                    </div>
                    <div class="event-tags">
                      <div class="tag-item">
                        <el-icon><Place /></el-icon>
                        <span>国家会议中心</span>
                      </div>
                      <div class="tag-item">
                        <el-icon><CollectionTag /></el-icon>
                        <span>电子科技</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div class="hot-badge">热门推荐</div>
            </div>
            <div class="card-content">
              <div class="content-main">
                <div class="info-area">
                  <div class="title-section">
                    <h3 class="card-title" :title="item.name">{{ item.name }}</h3>
                    <span class="industry-tag">{{ item.industry }}</span>
                  </div>
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
                </div>
              </div>
              <div class="card-footer">
                <div class="countdown-section">
                  <template v-if="getCountdown(item.time) > 0">
                    <span class="countdown-label">距开展</span>
                    <span class="countdown-days">{{ getCountdown(item.time) }}</span>
                    <span class="countdown-unit">天</span>
                  </template>
                  <template v-else>
                     <span class="countdown-label">已开展</span>
                  </template>
                </div>
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
              <el-icon :size="20"><Document /></el-icon>
            </div>
            <div class="policy-content">
              <div class="policy-header-row">
                <h3 class="policy-title">{{ policy.title }}</h3>
                <span class="policy-tag">{{ policy.category }}</span>
              </div>
              <p class="policy-summary">{{ policy.summary }}</p>
              <div class="policy-meta">
                <span class="meta-item">
                  <el-icon><OfficeBuilding /></el-icon>
                  {{ policy.publisher }}
                </span>
              </div>
            </div>
            <div class="policy-date-styled">
              <span class="day">{{ policy.publishTime.split('-')[2] }}</span>
              <span class="ym">{{ policy.publishTime.slice(0, 7).replace('-', '.') }}</span>
            </div>
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
            <el-icon :size="60"><Monitor /></el-icon>
          </div>
          <div class="map-content">
            <h3>数字产业图谱</h3>
            <p>全景展示会展产业链，精准匹配商机</p>
          </div>
          <div class="map-action">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
        <div class="core-functions">
          <div v-for="func in coreFunctions" :key="func.id" class="function-card" @click="navigateTo(func.path)">
            <div class="func-icon-wrapper">
              <component :is="func.icon" />
            </div>
            <div class="function-content">
              <h4>{{ func.title }}</h4>
              <p>{{ func.desc }}</p>
            </div>
            <div class="hover-arrow">
              <el-icon><Right /></el-icon>
            </div>
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
            v-for="(service, index) in quickServices" 
            :key="service.id"
            class="service-card"
            @click="navigateTo(service.path)"
          >
            <div class="card-decoration"></div>
            <div class="service-icon-box">
              <el-icon><component :is="service.icon" /></el-icon>
            </div>
            <div class="service-info">
              <h4>{{ service.title }}</h4>
              <p>{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
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
  Service,
  Ticket,
  Place,
  CollectionTag,
  ArrowRight,
  Right,
  Trophy,
  LocationInformation,
  ArrowLeft,
  Monitor,
  VideoCamera,
  ShoppingCart,
  DocumentChecked
} from '@element-plus/icons-vue'
import { exhibitions, policies, calendarData } from '@/data/mockData'
import banner1 from '@/assets/images/banner/banner1.png'
import banner2 from '@/assets/images/banner/banner2.png'
import banner3 from '@/assets/images/banner/banner3.png'
import banner4 from '@/assets/images/banner/banner4.png'

const router = useRouter()

// Banner高度自适应
const bannerHeight = ref('380px')

const updateBannerHeight = () => {
  const width = window.innerWidth
  // 保持 1920:380 的比例
  const height = Math.floor(width * (380 / 1920))
  // 设置最大高度为 380px (当宽度 > 1920 时)
  bannerHeight.value = (width > 1920 ? 380 : height) + 'px'
}

onMounted(() => {
  updateBannerHeight()
  window.addEventListener('resize', updateBannerHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBannerHeight)
})

// Banner数据
const bannerList = ref([
  {
    id: 1,
    title: '中国制冷展 2026',
    description: '2026年4月8-10日 中国国际展览中心（顺义馆）',
    image: banner1,
    link: '/exhibition/detail/1'
  },
  {
    id: 2,
    title: '北京插画艺术展',
    description: 'GAF 2026',
    image: banner2,
    link: '/exhibition/detail/2'
  },
  {
    id: 3,
    title: '第66届中国特许加盟展',
    description: '2026.5.29-31 北京国家会议中心',
    image: banner3,
    link: '/exhibition/detail/3'
  },
  {
    id: 4,
    title: '第二十七届中国北京国际科技产业博览会',
    description: 'THE 27TH CHINA BEIJING INTERNATIONAL HIGH-TECH EXPO',
    image: banner4,
    link: '/exhibition/detail/4'
  }
])

// 日历数据
const calendarDays = ref([])
const selectedDay = reactive({ date: '', events: [] })
const currentDate = ref(new Date(2026, 0, 1))
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  generateCalendarDays()
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  generateCalendarDays()
}

const generateCalendarDays = () => {
  const year = currentYear.value
  const month = currentDate.value.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  
  const days = []
  
  // Calculate the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ...)
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  // Adjust to make Monday = 0, Sunday = 6 (since our calendar starts on Monday)
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // Add empty placeholders for days before the 1st
  for (let i = 0; i < startOffset; i++) {
    days.push({
      day: '',
      date: `prev-${i}`,
      events: [],
      isToday: false,
      isEmpty: true
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const events = calendarData.events[dateStr] || []
    days.push({
      day: i,
      date: dateStr,
      events: events,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
      isEmpty: false
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
  { id: 1, title: '展会文集', desc: '行业报告下载', icon: Document, path: '/collection' },
  { id: 2, title: '视频中心', desc: '精彩回放观看', icon: VideoCamera, path: '/video' },
  { id: 3, title: '精选商城', desc: '展会周边购买', icon: ShoppingCart, path: '/mall' },
  { id: 4, title: '一站式申报', desc: '政策补贴申请', icon: DocumentChecked, path: '/policy/apply' }
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

const getCountdown = (timeStr) => {
  if (!timeStr) return 0
  const startDate = timeStr.split('至')[0]
  const target = new Date(startDate).getTime()
  const now = new Date().getTime()
  const diff = target - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const getExhibitionDateParts = (timeStr) => {
  if (!timeStr) return { day: '', ym: '' }
  const startDate = timeStr.split('至')[0]
  const date = new Date(startDate)
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return { day, ym: `${year}.${month}` }
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
  padding-top: 80px; /* Match fixed header height exactly */
}

.section-header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 8px;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 4px;
      background: #2563EB;
      border-radius: 2px;
    }
  }

  .section-desc {
    font-size: 16px;
    color: #6B7280;
    margin-top: 12px;
  }
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  .header-left {
    h2 {
      margin-bottom: 0;
      text-align: left;
      
      &::after {
        display: none;
      }
    }
  }

  .month-switcher {
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 6px 12px;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .current-date {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      min-width: 100px;
      text-align: center;
      font-feature-settings: "tnum";
    }
  }
}

// Banner
.banner-section {
  margin-bottom: 24px;

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
}

// 展会日历
.calendar-section {
  background: #F9FAFB;
  padding: 24px 0;
  margin-bottom: 24px;
}

.calendar-content {
  display: flex;
  gap: 24px;
  align-items: stretch; /* 确保高度一致 */
}

.calendar-stats {
  display: flex;
  flex-direction: column; /* 改为垂直排列 */
  justify-content: center;
  gap: 24px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-width: 200px; /* 调整宽度 */

  .stat-item {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .stat-number {
    font-size: 32px;
    font-weight: 700;
    color: #2563EB;
    margin-bottom: 8px;
    font-family: 'DIN Alternate', Arial, sans-serif;
  }

  .stat-label {
    font-size: 14px;
    color: #6B7280;
  }

  .stat-divider {
    width: 100%;
    height: 1px;
    background: #E5E7EB;
    margin: 12px 0;
  }
}

.calendar-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  align-content: start;
}

.calendar-header-row {
  display: contents; /* Allows children to participate in the grid layout */

  .header-day {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #6B7280;
    background: #F3F4F6;
    border-radius: 8px;
  }
}

.calendar-day {
  height: 60px; /* 进一步降低高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  font-size: 16px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #2563EB;
    color: white;
    transform: translateY(-2px);
    z-index: 100;

    .day-events-popover {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  &.has-event {
    background: #EFF6FF;
    color: #2563EB;
    font-weight: 600;

    &:hover {
      background: #2563EB;
      color: white;
    }
  }

  &.today {
    border: 2px solid #2563EB;
  }

  .event-count {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background: #2563EB !important;
    color: white;
    font-size: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.day-events-popover {
  display: none;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  margin-bottom: 16px;
  cursor: default;
  color: #374151;
  text-align: left;
  z-index: 1000;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  }

  .popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #E5E7EB;
    
    .date {
      font-weight: 600;
      color: #1F2937;
    }
    
    .count {
      font-size: 12px;
      color: #6B7280;
    }
  }

  .mini-event-card {
    padding: 10px;
    background: #F9FAFB;
    border-radius: 8px;
    margin-bottom: 8px;
    border-left: 3px solid #2563EB;
    
    &:last-child {
      margin-bottom: 0;
    }

    .event-name {
      font-size: 14px;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;

      .icon {
        color: #2563EB;
      }
    }

    .event-tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      margin-top: 4px;
    }

    .tag-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #6B7280;

      .el-icon {
        color: #9CA3AF;
      }
    }

    .industry-badge {
      font-size: 11px;
      padding: 2px 8px;
      background: #F3F4F6;
      color: #4B5563;
      border-radius: 4px;
    }
  }
}

// 展会推荐
.exhibition-section {
  padding: 24px 0;
  margin-bottom: 24px;
}

.exhibition-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 1920*1080一行4个 */
  gap: 24px;
}

.exhibition-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

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

  .hot-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #3B82F6, #2563EB); /* Blue Gradient */
    color: white;
    padding: 4px 12px;
    border-radius: 20px 0 20px 0;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    z-index: 10;
  }
}

  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .title-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .industry-tag {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    background: #EFF6FF;
    color: #2563EB;
    white-space: nowrap;
    flex-shrink: 0;
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
    margin-top: auto;
    /* Ensure consistent spacing */
    min-height: 48px; 
  }

  .countdown-section {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: 4px;
    
    .countdown-label {
      font-size: 12px;
      color: #6B7280;
    }
    
    .countdown-days {
      font-size: 24px; /* Increased size */
      font-weight: 700;
      color: #2563EB; /* Blue */
      font-family: 'DIN Alternate', sans-serif;
      line-height: 1;
    }
    
    .countdown-unit {
      font-size: 12px;
      color: #2563EB; /* Blue */
      font-weight: 500;
    }
  }

  .status-tag {
    font-size: 13px;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 500;

    &.status-upcoming {
      background: #EFF6FF; /* Blue bg */
      color: #2563EB; /* Blue text */
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
  padding: 24px 0;
  margin-bottom: 24px;
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
  width: 60px;
  height: 60px;
  background: #EFF6FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563EB;
  font-size: 32px;
  flex-shrink: 0;
}

.policy-content {
  flex: 1;
}

.policy-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.policy-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0;
}

.policy-tag {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    background: #EFF6FF;
    color: #2563EB;
    font-weight: 500;
  }

.policy-summary {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
  line-height: 1.6;
}

.policy-meta {
    display: flex;
    justify-content: space-between; /* Move date to the right */
    align-items: center;
    gap: 24px;
    margin-top: auto; /* Ensure it stays at the bottom if content is short */

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

  .policy-date-styled {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    border-left: 1px solid #E5E7EB;
    margin-left: 12px;
    min-width: 80px;

    .day {
      font-size: 32px;
      font-weight: 700;
      color: #2563EB;
      line-height: 1;
      font-family: 'DIN Alternate', sans-serif;
      margin-bottom: 4px;
    }

    .ym {
      font-size: 13px;
      color: #6B7280;
      font-weight: 500;
    }
  }

.section-footer {
  text-align: center;
}

// 核心功能
.core-section {
  padding: 24px 0;
  margin-bottom: 24px;
}

.digital-map-entry {
  display: flex;
  align-items: center;
  gap: 32px;
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  color: white;
  padding: 32px;
  border-radius: 20px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(30, 58, 138, 0.3);
  }

  .map-visual {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .map-content {
    flex: 1;

    h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    p {
      font-size: 15px;
      opacity: 0.9;
    }
  }

  .map-action {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.3s ease;
  }

  &:hover .map-action {
    background: white;
    color: #2563EB;
    transform: translateX(8px);
  }
}

.core-functions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.function-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Left align content */
    justify-content: space-between;
    text-align: left;
    gap: 16px;
    background: linear-gradient(135deg, #1E3A8A, #3B82F6); /* Matched with map entry */
    padding: 32px;
    border-radius: 20px;
    box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.3);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 100%;
    min-height: 360px;
    position: relative;
    overflow: hidden;
    color: white;

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 30px -10px rgba(30, 58, 138, 0.4);
      
      .func-icon-wrapper {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(12px);
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      .hover-arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Decorative circle */
    &::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -60px;
      width: 240px;
      height: 240px;
      background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .func-icon-wrapper {
      width: 56px; /* Smaller icon wrapper */
      height: 56px;
      background: rgba(255, 255, 255, 0.1); /* Frosted glass */
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px; /* Smaller icon size */
      transition: all 0.4s ease;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .function-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      position: relative;
      z-index: 1;

      h4 {
        font-size: 22px;
        font-weight: 700;
        color: white;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      p {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.85);
        line-height: 1.6;
        margin: 0;
        max-width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .hover-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: white;
      color: #2563EB;
      border-radius: 50%;
      position: absolute;
      bottom: 32px;
      right: 32px;
      opacity: 0;
      transform: translateX(10px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }

// 快捷服务
.service-section {
  padding: 24px 0;
  margin-bottom: 24px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.service-card {
  position: relative;
  background: white;
  padding: 32px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  border: 1px solid #E5E7EB; // Light grey border
  min-height: 200px;
  overflow: hidden;

  .card-decoration {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 120px;
    height: 120px;
    background: #EFF6FF; // Very light blue
    border-radius: 50%;
    z-index: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.1);
    border-color: #3B82F6; // Blue border

    .card-decoration {
      transform: scale(1.2);
    }
    
    .service-icon-box {
      transform: scale(1.1);
    }
  }

  .service-icon-box {
    position: relative;
    z-index: 1;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563EB; // Blue icon
    font-size: 40px;
    transition: all 0.3s ease;
    background: transparent; // Remove grey bg
    border-radius: 0; // Remove circle bg
  }

  .service-info {
    position: relative;
    z-index: 1;
    flex: unset;

    h4 {
      font-size: 18px;
      font-weight: 700;
      color: #1F2937;
      margin-bottom: 8px;
    }

    p {
      font-size: 13px;
      color: #6B7280;
      line-height: 1.5;
      max-width: 200px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 1200px) {
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
