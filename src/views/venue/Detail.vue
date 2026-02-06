<template>
  <div class="venue-detail-page">
    <!-- 顶部场馆信息 -->
    <div class="venue-header">
      <div class="venue-banner">
        <img :src="venue?.image" :alt="venue?.name" />
        <div class="banner-overlay">
          <div class="banner-content">
            <h1>{{ venue?.name }}</h1>
            <div class="banner-address">
              <el-icon><Location /></el-icon>
              <span>北京市朝阳区天辰东路7号</span>
            </div>
            <div class="banner-stats">
              <div class="stat-item">
                <span class="stat-value">270,000㎡</span>
                <span class="stat-label">场馆面积</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">530,000㎡</span>
                <span class="stat-label">总建筑面积</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">6,400㎡</span>
                <span class="stat-label">最大单厅面积</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">2009</span>
                <span class="stat-label">正式运营时间</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="container">
      <!-- 场馆介绍 -->
      <div class="intro-section">
        <div class="intro-images">
          <el-carousel :interval="5000">
            <el-carousel-item v-for="(image, index) in venueImages" :key="index">
              <img :src="image" :alt="venue?.name + '图片'" style="width: 100%; height: 100%; object-fit: cover;" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="intro-text">
          <h3><el-icon class="title-icon"><Document /></el-icon> 场馆介绍</h3>
          <p>国家会议中心由北京北辰实业股份有限公司投资建设，总建筑面积53万平方米。作为2008年奥运会的国际广播中心和主新闻中心所在地，于2009年11月正式运营。场馆深耕标准化建设，服务了万余场会展活动，成为行业标杆场馆。十余年来，国家会议中心已从奥运场馆成长为国家级会展旗舰场馆、高端国事政务活动接待场馆。服务保障了2014APEC领导人会议周、亚洲文明对话大会、2022年北京冬奥会和冬残奥会、2024年中非合作论坛峰会、三届“一带一路”国际合作高峰论坛等高端国务和政务活动。</p>
          <p>场馆始终担负着大国外交的使命与任务，践行着用服务搭起沟通世界桥梁的承诺。国家会议中心秉承“中国服务、国际标准”的品质要求，助力北京“四个中心”功能建设，守正创新，迎接挑战，奔向更加美好的未来。</p>
          <div class="intro-actions">
            <el-button type="primary" plain class="action-button">
              <el-icon><Star /></el-icon>
              收藏
            </el-button>
            <el-button type="primary" plain class="action-button">
              <el-icon><Share /></el-icon>
              分享
            </el-button>
            <el-button type="primary" class="action-button">
              <el-icon><Link /></el-icon>
              访问官网
            </el-button>
          </div>
        </div>
      </div>

      <!-- 快捷功能 -->
      <div class="quick-functions-section">
        <h2><el-icon class="title-icon"><Grid /></el-icon> 快捷功能</h2>
        <div class="functions-grid">
          <div class="function-card">
            <div class="function-icon">
              <el-icon class="icon-large"><View /></el-icon>
            </div>
            <h4 class="function-name">VR看馆</h4>
            <p class="function-desc">360°全景查看场馆环境</p>
            <el-button type="primary" class="function-button">立即体验</el-button>
          </div>
          <div class="function-card">
            <div class="function-icon">
              <el-icon class="icon-large"><Position /></el-icon>
            </div>
            <h4 class="function-name">场馆留资</h4>
            <p class="function-desc">提交需求，获取专业方案</p>
            <el-button type="primary" class="function-button">立即留资</el-button>
          </div>
          <div class="function-card">
            <div class="function-icon">
              <el-icon class="icon-large"><OfficeBuilding /></el-icon>
            </div>
            <h4 class="function-name">预订临时会议室</h4>
            <p class="function-desc">快速预订适合的会议空间</p>
            <el-button type="primary" class="function-button">立即预订</el-button>
          </div>
          <div class="function-card">
            <div class="function-icon">
              <el-icon class="icon-large"><Grid /></el-icon>
            </div>
            <h4 class="function-name">摆台方案推荐</h4>
            <p class="function-desc">根据需求推荐最优布局</p>
            <el-button type="primary" class="function-button">查看方案</el-button>
          </div>
        </div>
      </div>

      <!-- 展会日历 -->
      <div class="calendar-section">
        <div class="section-header calendar-header">
          <div class="header-left">
            <h2><el-icon class="title-icon"><Calendar /></el-icon> 展会日历</h2>
          </div>
          <div class="calendar-controls">
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
        </div>
        <div class="calendar-content">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- 会议空间 -->
      <div class="meeting-spaces-section">
        <h2><el-icon class="title-icon"><OfficeBuilding /></el-icon> 会议空间</h2>
        <div class="exhibition-halls">
          <div v-for="hall in exhibitionHalls" :key="hall.id" class="hall-card">
            <h4 class="hall-name">{{ hall.name }}</h4>
            <div class="hall-info">
              <p class="hall-basic">{{ hall.basicInfo }}</p>
              <p class="hall-area">面积：{{ hall.area }}</p>
              <p class="hall-capacity">最多容纳：{{ hall.capacity }}人</p>
            </div>
            <div class="hall-layouts">
              <span class="layout-label">布局及容纳人数：</span>
              <div class="layout-tags">
                <el-tag v-for="layout in hall.layouts" :key="layout" size="small" class="layout-tag">{{ layout }}</el-tag>
              </div>
            </div>
            <el-button type="primary" class="simulate-button">模拟摆台</el-button>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="contact-section">
        <h2><el-icon class="title-icon"><Phone /></el-icon> 联系方式</h2>
        <div class="contact-info">
          <div class="contact-left">
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <span><strong>联系方式：</strong>{{ contactInfo.phone }}</span>
            </div>
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <span><strong>邮箱：</strong>{{ contactInfo.email }}</span>
            </div>
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <span><strong>地址：</strong>{{ venue?.address }}</span>
            </div>
            <div class="contact-item">
              <el-icon><Clock /></el-icon>
              <span><strong>工作时间：</strong>{{ contactInfo.hours }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 资料下载 -->
      <div class="download-section">
        <h2><el-icon class="title-icon"><Document /></el-icon> 资料下载</h2>
        <div class="download-grid">
          <div v-for="download in downloads" :key="download.id" class="download-item">
            <div class="download-icon">
              <el-icon class="file-icon"><Document /></el-icon>
            </div>
            <div class="download-info">
              <h4 class="download-name">{{ download.name }}</h4>
              <span class="download-size">{{ download.size }}</span>
            </div>
            <el-button type="primary" class="download-button">下载</el-button>
          </div>
        </div>
      </div>

      <!-- 交通指南 -->
      <div class="transport-section">
        <h2><el-icon class="title-icon"><Position /></el-icon> 交通指南</h2>
        <div class="transport-detail">
          <div class="transport-item">
            <div class="transport-header">
              <el-icon class="transport-icon"><Location /></el-icon>
              <h3>地铁出行</h3>
            </div>
            <p>{{ transportInfo.subway }}</p>
          </div>
          <div class="transport-item">
            <div class="transport-header">
              <el-icon class="transport-icon"><Position /></el-icon>
              <h3>公交出行</h3>
            </div>
            <p>{{ transportInfo.bus }}</p>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, Phone, Message, Location, Clock, User, VideoCamera, Calendar, Link, ArrowLeft, ArrowRight, Document, DataAnalysis, Star, Share, View, Position, OfficeBuilding, Grid } from '@element-plus/icons-vue'
import { venues } from '@/data/mockData'

const route = useRoute()
const router = useRouter()
const venueId = computed(() => parseInt(route.params.id))

// 响应式数据
const activeTab = ref('intro')
const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth() + 1)
const calendarDays = ref([])
const searchKeyword = ref('')

// 获取场馆信息
const venue = computed(() => {
  const foundVenue = venues.find(v => v.id === venueId.value);
  if (foundVenue) {
    return {
      ...foundVenue,
      height: foundVenue.height || '5.0',
      builtYear: foundVenue.builtYear || '2009'
    };
  }
  return {
    id: 1,
    name: '国家会议中心',
    image: '/src/assets/images/venues/527424142127173.jpg',
    address: '北京市朝阳区天辰东路7号',
    area: 270000,
    height: '5.0',
    builtYear: '2009',
    description: '国家会议中心外形优美，它的立面设计取自中国古代建筑屋檐的曲线概念，对传统的建筑形式赋予现代的演绎，同时又象征一座桥梁，与奥运公园的其他建筑遥相呼应，体现人文、信息的沟通和交流、跨向未来。',
    facilities: ['中央空调', '电梯', '停车场', 'Wi-Fi', '餐饮服务'],
    rating: 4.8
  };
})

// 场馆特色
const venueFeatures = ref([
  '先进的会议设施',
  '灵活的空间布局',
  '完善的配套服务',
  '便捷的交通位置',
  '专业的技术支持',
  '丰富的办展经验'
])

// 交通信息
const transportInfo = ref({
  subway: '地铁8号线、15号线奥林匹克公园站A口出站，步行约10分钟',
  bus: '公交83路、85路、510路、645路到国家会议中心站下车',
  drive: '北京市朝阳区天辰东路7号，可从北四环北辰桥或北五环奥林西路进入'
})

// 周边设施
const surroundings = ref([
  '奥林匹克公园',
  '鸟巢',
  '水立方',
  '北辰购物中心',
  '北京盘古七星酒店',
  '北京五洲皇冠国际酒店'
])

// 场馆轮播图片
const venueImages = ref([
  '/src/assets/images/venuedetail/1/3583-5dcecfd2c245820393f45fc3eccda5be.jpg',
  '/src/assets/images/venuedetail/1/3d34-2e38c93de49118b72321b73330ef143e.jpg',
  '/src/assets/images/venuedetail/1/a262-4f79ec76843a8e2f0f8223a62c6d7dbb.png',
  '/src/assets/images/venuedetail/1/u=1128872623,3952748564&fm=253&app=138&f=JPEG.jpeg'
])

// 展厅信息
const exhibitionHalls = ref([
  {
    id: 1,
    name: '1号展厅',
    basicInfo: '1F-长宽220×100m-层高12m-灯下高度10m',
    area: '5500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  },
  {
    id: 2,
    name: '2号展厅',
    basicInfo: '1F-长宽220×100m-层高12m-灯下高度10m',
    area: '5500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  },
  {
    id: 3,
    name: '3号展厅',
    basicInfo: '1F-长宽220×100m-层高12m-灯下高度10m',
    area: '5500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  },
  {
    id: 4,
    name: '4号展厅',
    basicInfo: '1F-长宽220×100m-层高12m-灯下高度10m',
    area: '5500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  },
  {
    id: 5,
    name: '5号展厅',
    basicInfo: '0F-长宽209×86m-层高5m-灯下高度4m',
    area: '6500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  },
  {
    id: 6,
    name: '6号展厅',
    basicInfo: '0F-长宽209×100m-层高10m-灯下高度5m',
    area: '6500㎡',
    capacity: '5000',
    layouts: ['剧院式5000人', '课桌式2700人', '岛屿式2000人', '酒会式2000人', 'U型式2500人']
  }
])

// 展会日历事件
const calendarEvents = ref([
  { id: 1, date: '2026-12-05', name: '中国国际展览中心' },
  { id: 2, date: '2026-12-10', name: '北京国际汽车展览会' },
  { id: 3, date: '2026-12-15', name: '中国国际医疗器械展' },
  { id: 4, date: '2026-12-20', name: '北京国际家居展' },
  { id: 5, date: '2026-12-25', name: '中国国际电子展' }
])

// 会议空间
const meetingSpaces = ref([
  {
    id: 1,
    name: '大会议厅',
    features: ['面积：5000㎡', '容纳：3000人', '配备：LED屏幕、音响系统'],
    capacity: 3000
  },
  {
    id: 2,
    name: '中会议厅',
    features: ['面积：2000㎡', '容纳：1000人', '配备：投影设备、音响系统'],
    capacity: 1000
  },
  {
    id: 3,
    name: '小会议厅',
    features: ['面积：500㎡', '容纳：200人', '配备：视频会议系统'],
    capacity: 200
  },
  {
    id: 4,
    name: '多功能厅',
    features: ['面积：1500㎡', '容纳：800人', '配备：舞台、灯光系统'],
    capacity: 800
  },
  {
    id: 5,
    name: '贵宾厅',
    features: ['面积：300㎡', '容纳：50人', '配备：高端家具、茶道'],
    capacity: 50
  },
  {
    id: 6,
    name: '新闻发布厅',
    features: ['面积：800㎡', '容纳：300人', '配备：记者席、直播设备'],
    capacity: 300
  }
])

// 联系方式
const contactInfo = ref({
  phone: '010-12345678',
  email: 'info@nationalconventioncenter.com',
  hours: '周一至周五 9:00-18:00',
  contactPerson: '张经理'
})

// 资料下载
const downloads = ref([
  { id: 1, name: '国家会议中心2.5D导视图.pdf', size: '2.5MB' },
  { id: 2, name: '国家会议中心-平面图及参数.pdf', size: '1.8MB' },
  { id: 3, name: '国家会议中心-配套设施.pdf', size: '1.2MB' }
])

// 方法
const formatArea = (area) => {
  if (area >= 10000) {
    return (area / 10000).toFixed(1) + '万'
  }
  return area.toLocaleString()
}

const hasEventOnDate = (date) => {
  const dateStr = date.getFullYear() + '-' + 
    String(date.getMonth() + 1).padStart(2, '0') + '-' + 
    String(date.getDate()).padStart(2, '0')
  return calendarEvents.value.some(event => event.date === dateStr)
}

// 日历方法
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
    let events = []
    
    // 添加2月17日的大都庙会事件
    if (month === 1 && i === 17) { // 2月是索引1
      events = [{ id: 1, name: '大都庙会' }]
    }
    
    days.push({
      day: i,
      date: dateStr,
      events: events,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
      isEmpty: false
    })
  }

  // Calculate remaining cells to fill the last row (7 columns)
  const totalCells = days.length
  const remainingCells = 7 - (totalCells % 7)
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: '', date: `next-${i}`, isEmpty: true, events: [] })
    }
  }

  calendarDays.value = days
}

onMounted(() => {
  // 初始化逻辑
  console.log('场馆详情页加载完成', venue.value)
  generateCalendarDays()
})
</script>

<style lang="scss" scoped>
.venue-detail-page {
  min-height: 100vh;
  background: #F9FAFB;
}

// 顶部场馆信息
.venue-header {
  position: relative;
  margin-bottom: 40px;
}

.venue-banner {
  position: relative;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4));
    display: flex;
    align-items: flex-end;
  }

  .banner-content {
    padding: 40px;
    color: white;
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;

    h1 {
      font-size: 36px;
      margin: 0 0 16px 0;
      font-weight: bold;
    }

    .banner-address {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
      margin: 0 0 32px 0;
      opacity: 0.9;
    }

    .banner-stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 32px;
      margin-top: 24px;

      .stat-item {
        text-align: center;
        min-width: 180px;

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
          color: white;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

// 容器
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 0 24px;
}

// 标题图标样式
.title-icon {
  color: #2563EB;
  margin-right: 8px;
  font-size: 20px;
  vertical-align: middle;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  margin-top: 0;
  margin-bottom: 0;
}

// 场馆介绍
.intro-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  gap: 32px;
  align-items: stretch;

  .intro-images {
    flex: 1;
    max-width: 50%;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    :deep(.el-carousel) {
      border-radius: 8px;
      overflow: hidden;
      flex: 1;
    }

    :deep(.el-carousel__container) {
      height: 100% !important;
    }

    :deep(.el-carousel__item) {
      height: 100%;
    }

    :deep(.el-carousel__item img) {
      height: 100%;
      object-fit: cover;
    }
  }

  .intro-text {
    flex: 1;
    max-width: 50%;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 20px 0;
      color: #1F2937;
    }

    p {
      font-size: 14px;
      line-height: 1.8;
      color: #4B5563;
      margin: 0 0 16px 0;
    }

    .intro-actions {
      margin-top: auto;
      margin-top: 32px;
      display: flex;
      gap: 12px;

      .action-button {
        flex: 1;
        min-width: 120px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    flex-direction: column;

    .intro-images,
    .intro-text {
      max-width: 100%;
    }

    .intro-images {
      margin-bottom: 24px;
      height: 300px;
    }
  }
}

// 快捷功能
.quick-functions-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1F2937;
  }

  .functions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .function-card {
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 32px 24px;
    text-align: center;
    transition: all 0.3s ease;
    background: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #2563EB 0%, #60A5FA 100%);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      border-color: #2563EB;

      &::before {
        transform: scaleX(1);
      }
    }

    .function-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: #EFF6FF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      .icon-large {
        font-size: 32px;
        color: #2563EB;
      }

      &:hover {
        background: #DBEAFE;
        transform: scale(1.1);
      }
    }

    .function-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 12px 0;
      color: #1F2937;
    }

    .function-desc {
      font-size: 14px;
      color: #6B7280;
      margin: 0 0 24px 0;
      line-height: 1.5;
    }

    .function-button {
      width: 100%;
      background-color: #2563EB;
      border-color: #2563EB;
      transition: all 0.3s ease;

      &:hover {
        background-color: #1D4ED8;
        border-color: #1D4ED8;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
      }
    }
  }
}

// 展会日历
.calendar-section {
  background: white;
  padding: 24px;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.calendar-section h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #1F2937;
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
    }
  }

  .calendar-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .month-switcher {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #F9FAFB;
    padding: 6px 12px;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .current-date {
      font-size: 14px;
      font-weight: 600;
      color: #1F2937;
      min-width: 100px;
      text-align: center;
    }
  }
}

.calendar-content {
  display: flex;
  gap: 24px;
  align-items: stretch;
}

.calendar-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-width: 200px;

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
}

.calendar-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  align-content: start;
}

.calendar-header-row {
  display: contents;

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
  height: 60px;
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

  .day-number {
    z-index: 1;
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
  min-width: 300px;
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

  .popover-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .mini-event-card {
    padding: 8px;
    background: #F9FAFB;
    border-radius: 8px;
    border-left: 3px solid #2563EB;

    .event-name {
      font-size: 13px;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      line-height: 1.2;

      .icon {
        color: #2563EB;
        font-size: 12px;
      }
    }
  }
}

// 会议空间
.meeting-spaces-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1F2937;
  }

  .exhibition-halls {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 20px;

    .hall-card {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 20px;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }

      .hall-name {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: #1F2937;
      }

      .hall-info {
        margin-bottom: 16px;

        .hall-basic {
          font-size: 14px;
          color: #3B82F6;
          margin: 0 0 8px 0;
        }

        .hall-area,
        .hall-capacity {
          font-size: 14px;
          color: #4B5563;
          margin: 0 0 8px 0;
        }
      }

      .hall-layouts {
        margin-bottom: 20px;

        .layout-label {
          font-size: 14px;
          color: #4B5563;
          display: block;
          margin-bottom: 8px;
        }

        .layout-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .layout-tag {
            background-color: #EFF6FF;
            border-color: #DBEAFE;
            color: #2563EB;
          }
        }
      }

      .simulate-button {
        width: 100%;
        background-color: #2563EB;
        border-color: #2563EB;

        &:hover {
          background-color: #1D4ED8;
          border-color: #1D4ED8;
        }
      }
    }
  }
}

// 联系方式
.contact-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1F2937;
  }

  .contact-info {
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .el-icon {
        color: #3B82F6;
        font-size: 18px;
      }

      span {
        color: #4B5563;

        strong {
          color: #1F2937;
          font-weight: 600;
        }
      }
    }
  }
}

// 资料下载
.download-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1F2937;
  }

  .download-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;

    .download-item {
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        border-color: #2563EB;
      }

      .download-icon {
        width: 60px;
        height: 60px;
        background: #EFF6FF;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .file-icon {
          font-size: 24px;
          color: #2563EB;
        }
      }

      .download-info {
        flex: 1;
        min-width: 0;

        .download-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #1F2937;
          line-height: 1.4;
        }

        .download-size {
          font-size: 14px;
          color: #6B7280;
        }
      }

      .download-button {
        flex-shrink: 0;
        background-color: #2563EB;
        border-color: #2563EB;

        &:hover {
          background-color: #1D4ED8;
          border-color: #1D4ED8;
        }
      }
    }
  }
}

// 交通指南
.transport-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #1F2937;
  }

  .transport-detail {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .transport-item {
      .transport-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .transport-icon {
        color: #2563EB;
        font-size: 18px;
      }

      h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #1F2937;
      }

      p {
        margin: 0;
        color: #4B5563;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .venue-banner {
    height: 300px;

    .banner-content {
      padding: 24px;

      h1 {
        font-size: 24px;
      }

      .banner-stats {
        gap: 20px;

        .stat-value {
          font-size: 20px;
        }
      }
    }
  }

  .container {
    padding: 0 16px;
  }

  .intro-section {
    flex-direction: column;

    .intro-images,
    .intro-text {
      max-width: 100%;
    }

    .intro-images {
      margin-bottom: 24px;
    }
  }

  .functions-grid {
    grid-template-columns: 1fr;
  }

  .download-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    flex-direction: column;
    gap: 20px;
  }
}
</style>