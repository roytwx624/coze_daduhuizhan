<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <section class="page-header">
      <div class="container">
        <h1>关于我们</h1>
        <p>专业的会展服务平台，连接会展行业全链路</p>
      </div>
    </section>

    <!-- 平台定位 -->
    <section class="platform-section">
      <div class="container">
        <div class="section-content">
          <div class="content-text">
            <h2>平台定位</h2>
            <div class="text-block">
              <p>会展服务平台是北京北辰会展集团倾力打造的综合性数字化会展服务平台。平台依托北辰实业集团30余年会展行业运营经验，整合全国优质会展资源，为参展商、主办方、场馆方、服务商及观众提供全方位、一站式的会展服务。</p>
              <p>我们致力于通过数字化手段，打破传统会展行业的地域限制，构建线上线下融合的会展新生态。平台汇聚海量展会信息、权威政策资源、优质服务商、专业场馆信息，实现会展资源的精准匹配和高效对接。</p>
              <p>未来，我们将持续深耕会展行业，不断创新服务模式，打造成为中国领先的会展服务平台，推动会展产业的数字化转型升级，助力行业高质量发展。</p>
            </div>
          </div>
          <div class="content-image">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" alt="平台定位" />
          </div>
        </div>
      </div>
    </section>

    <!-- 核心数据 -->
    <section class="stats-section">
      <div class="container">
        <div class="section-header">
          <h2>平台核心数据</h2>
          <p class="section-desc">用数据说话，见证平台成长</p>
        </div>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-card">
            <div class="stat-icon">
              <component :is="stat.icon" :size="48" />
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 平台优势 -->
    <section class="advantage-section">
      <div class="container">
        <div class="section-header">
          <h2>平台优势</h2>
          <p class="section-desc">专业、权威、高效，我们与众不同</p>
        </div>
        <div class="advantage-grid">
          <div v-for="item in advantages" :key="item.id" class="advantage-card">
            <div class="advantage-icon">
              <component :is="item.icon" :size="40" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="timeline-section">
      <div class="container">
        <div class="section-header">
          <h2>发展历程</h2>
          <p class="section-desc">持续创新，不断前行</p>
        </div>
        <div class="timeline">
          <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  TrendCharts, 
  User, 
  OfficeBuilding, 
  ShoppingCart,
  Star,
  Shield,
  Platform,
  DataAnalysis,
  Coordinate,
  Trophy
} from '@element-plus/icons-vue'
import { platformStats } from '@/data/mockData'

const stats = ref([
  {
    id: 1,
    icon: TrendCharts,
    number: platformStats.exhibitions,
    label: '展会数'
  },
  {
    id: 2,
    icon: User,
    number: platformStats.exhibitors,
    label: '展商数'
  },
  {
    id: 3,
    icon: OfficeBuilding,
    number: platformStats.venues,
    label: '场馆数'
  },
  {
    id: 4,
    icon: ShoppingCart,
    number: platformStats.services,
    label: '服务商数'
  },
  {
    id: 5,
    icon: Star,
    number: platformStats.cities,
    label: '覆盖城市'
  },
  {
    id: 6,
    icon: Trophy,
    number: platformStats.users,
    label: '累计用户'
  }
])

const advantages = ref([
  {
    id: 1,
    icon: Shield,
    title: '权威背书',
    desc: '北辰实业集团旗下，30余年会展行业经验，政府支持，值得信赖'
  },
  {
    id: 2,
    icon: Platform,
    title: '资源丰富',
    desc: '汇聚全国优质展会、场馆、服务商资源，实现一站式服务'
  },
  {
    id: 3,
    icon: DataAnalysis,
    title: '数据驱动',
    desc: '基于大数据分析，精准匹配需求，提升参展效率'
  },
  {
    id: 4,
    icon: Coordinate,
    title: '线上线下融合',
    desc: '打造数字会展生态，突破时空限制，拓展展会价值'
  }
])

const timeline = ref([
  {
    year: '2018',
    title: '平台成立',
    desc: '北辰会展集团启动数字化战略，成立会展服务平台项目组'
  },
  {
    year: '2019',
    title: '试运营',
    desc: '平台上线试运营，首批入驻展会50场，服务商200家'
  },
  {
    year: '2020',
    title: '快速扩张',
    desc: '覆盖城市扩展至30个，展会数量突破500场，用户数达10万'
  },
  {
    year: '2021',
    title: '功能升级',
    desc: '推出视频中心、线上商城等新功能，完善服务体系'
  },
  {
    year: '2022',
    title: '生态完善',
    desc: '入驻展会超过1000场，服务商5000家，用户数突破50万'
  },
  {
    year: '2023',
    title: '品牌升级',
    desc: '平台进行全面品牌升级，打造全新的视觉体系和服务体验'
  },
  {
    year: '2024',
    title: '跨越发展',
    desc: '用户数突破100万，成为行业领先的会展服务平台'
  },
  {
    year: '2025',
    title: '创新突破',
    desc: '推出数字产业图谱、AI智能匹配等创新功能，引领行业数字化'
  },
  {
    year: '2026',
    title: '持续领跑',
    desc: '平台影响力持续扩大，成为会展行业数字化标杆'
  }
])
</script>

<style lang="scss" scoped>
.about-page {
  padding-top: 80px;
}

.page-header {
  background: linear-gradient(135deg, #204E9C 0%, #2563EB 100%);
  color: white;
  padding: 80px 0;
  text-align: center;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 20px;
    opacity: 0.9;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 56px;

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

// 平台定位
.platform-section {
  padding: 80px 0;
  background: white;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.content-text {
  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 32px;
  }

  .text-block {
    p {
      font-size: 16px;
      line-height: 1.8;
      color: #4B5563;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.content-image {
  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

// 核心数据
.stats-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: white;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, rgba(32, 78, 156, 0.08), rgba(37, 99, 235, 0.08));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #204E9C;
  }

  .stat-info {
    flex: 1;
  }

  .stat-number {
    font-size: 36px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 4px;
    font-family: 'DIN Alternate', Arial, sans-serif;
  }

  .stat-label {
    font-size: 14px;
    color: #6B7280;
  }
}

// 平台优势
.advantage-section {
  padding: 80px 0;
  background: white;
}

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.advantage-card {
  background: #F9FAFB;
  padding: 40px 32px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

    .advantage-icon {
      background: #204E9C;
      color: white;
    }
  }

  .advantage-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: rgba(32, 78, 156, 0.08);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #204E9C;
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    color: #6B7280;
    line-height: 1.6;
  }
}

// 发展历程
.timeline-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.timeline-item {
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #204E9C, #2563EB);
    border-radius: 4px 0 0 4px;
  }
}

.timeline-year {
  font-size: 28px;
  font-weight: 700;
  color: #204E9C;
  margin-bottom: 16px;
  font-family: 'DIN Alternate', Arial, sans-serif;
}

.timeline-content {
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
    line-height: 1.6;
  }
}

@media (max-width: 1024px) {
  .section-content {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .advantage-grid {
    grid-template-columns: 1fr;
  }

  .timeline {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 36px;
  }

  .page-header p {
    font-size: 16px;
  }

  .stats-grid,
  .timeline {
    grid-template-columns: 1fr;
  }
}
</style>
