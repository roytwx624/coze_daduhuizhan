<template>
  <div class="exhibition-detail-page">
    <!-- Banner -->
    <div class="detail-banner">
      <img src="@/assets/images/exhibition_photo/640.png" alt="展会banner" class="banner-img" />
      <div class="banner-overlay">
        <div class="banner-content">
          <h1>第三十七届制冷展</h1>
          <div class="banner-address">
            <el-icon><Location /></el-icon>
            <span>上海新国际博览中心</span>
          </div>
          <div class="banner-time">
            <el-icon><Calendar /></el-icon>
            <span>2026年4月8日～4月10日</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 基础信息 -->
      <div class="base-info-section">
        <div class="top-actions">
          <el-button 
            v-for="btn in topButtons" 
            :key="btn.key"
            type="primary" 
            size="small"
            :icon="btn.icon"
          >
            {{ btn.name === '获取报名分享链接' ? '分享' : btn.name }}
          </el-button>
        </div>
        <div class="info-header">
          <div class="logo-section">
            <img src="@/assets/images/exhibition_logo/29c8ec5114f2db4d1cb1189e46fc885b.jpeg" alt="展会logo" class="exhibition-logo" />
          </div>
          <div class="title-section">
            <h1 class="exhibition-title">第三十七届制冷展</h1>
            <div class="basic-meta">
              <div class="meta-item">
                <el-icon><Calendar /></el-icon>
                <span>2026年4月8日</span>
              </div>
              <div class="meta-item">
                <el-icon><Location /></el-icon>
                <span>上海新国际博览中心</span>
              </div>
              <div class="countdown-section">
                <span class="countdown-label">距开展</span>
                <span class="countdown-days">{{ countdownDays }}</span>
                <span class="countdown-unit">天</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="info-content">
          <!-- 展会行业分类已隐藏 -->
          <div class="info-row">
            <div class="info-label">主办单位：</div>
            <div class="info-value">中国制冷学会、中国制冷空调工业协会、北京国际展览中心有限公司、上海市制冷学会、上海冷冻空调行业协会</div>
          </div>
          <div class="info-row">
            <div class="info-label">展会简介：</div>
            <div class="info-value description">
              中国制冷展全称为“国际制冷、空调、供暖、通风及食品冷冻加工展览会”，始创于1987年，由中国国际贸易促进委员会北京市分会、中国制冷学会、中国制冷空调工业协会共同主办，是获得国际展览业协会（UFI）、美国商务部和中国展览馆协会认证的全球制冷暖通空调行业专业展会。展会采取北京、上海两地交替举办的模式，2024年展会选址中国国际展览中心（顺义馆），2025年展会移师上海新国际博览中心。
            </div>
          </div>
          
          <!-- 核心信息 -->
          <div class="core-info-section">
            <div class="core-info-item">
              <div class="core-info-value">1年1届</div>
              <div class="core-info-label">举办周期</div>
            </div>
            <div class="core-info-item">
              <div class="core-info-value">6.0万平方米</div>
              <div class="core-info-label">展览面积</div>
            </div>
            <div class="core-info-item">
              <div class="core-info-value">1000家</div>
              <div class="core-info-label">展商数量</div>
            </div>
            <div class="core-info-item">
              <div class="core-info-value">8.0万人</div>
              <div class="core-info-label">观众数量</div>
            </div>
          </div>
          <!-- 标签区域 -->
          <div class="tags-section">
            <div class="tag-group">
              <span class="tag-label">行业标签：</span>
              <el-tag v-for="tag in industryTags" :key="tag" class="industry-tag">{{ tag }}</el-tag>
            </div>
            <div class="tag-group">
              <span class="tag-label">其他标签：</span>
              <el-tag v-for="tag in popularTags" :key="tag" class="popular-tag">{{ tag }}</el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷功能 -->
      <div class="quick-functions-section">
        <div class="section-header">
          <h2 class="section-title">快捷功能</h2>
        </div>
        <div class="functions-grid">
          <div class="function-card" v-for="card in buttonCards" :key="card.key">
            <div class="function-icon">
              <el-icon class="icon-large"><component :is="card.icon" /></el-icon>
            </div>
            <h4 class="function-name">{{ card.name }}</h4>
            <p class="function-desc">{{ card.desc }}</p>
            <el-button type="primary" class="function-button">
              {{ card.name === '获取报名分享链接' ? '获取报名分享链接' : card.name }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 展会资讯与展商名录 -->
      <div class="combined-section">
        <!-- 展会资讯 -->
        <div class="news-section">
          <div class="section-header">
            <h2 class="section-title">
              展会资讯
              <router-link to="/news" class="view-more-text">查看更多</router-link>
            </h2>
          </div>
          <div class="news-list">
            <div class="news-item" v-for="(news, index) in exhibitionNews" :key="index">
              <div class="news-image">
                <img src="/src/assets/images/exhibition_photo/640.png" :alt="news.title" />
              </div>
              <div class="news-content">
                <h3 class="news-title">{{ news.title }}</h3>
                <p class="news-description">{{ news.desc }}</p>
                <div class="news-meta">
                  <span class="news-category">展会资讯</span>
                  <span class="news-time">{{ news.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 展商名录 -->
        <div class="exhibitor-section">
          <div class="section-header">
            <h2 class="section-title">
              展商名录
              <a href="#" class="view-more-text">查看更多展商</a>
            </h2>
          </div>
          <div class="exhibitor-list">
            <div class="exhibitor-item" v-for="(exhibitor, index) in exhibitors" :key="index">
              <div class="exhibitor-icon">
                <el-icon :size="24"><OfficeBuilding /></el-icon>
              </div>
              <div class="exhibitor-name">{{ exhibitor.name }}</div>
              <div class="exhibitor-booth">
                <span class="booth-label">展位：</span>
                <span class="booth-value">{{ exhibitor.booth }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资料下载 -->
      <div class="download-section">
        <div class="section-header">
          <h2 class="section-title">资料下载</h2>
        </div>
        <div class="download-grid">
          <div v-for="(item, index) in downloadItems" :key="index" class="download-item">
            <div class="download-icon">
              <el-icon class="file-icon"><Document /></el-icon>
            </div>
            <div class="download-info">
              <h4 class="download-name">{{ item.name }}</h4>
              <span class="download-size">{{ item.size }}</span>
            </div>
            <el-button type="primary" class="download-button">下载</el-button>
          </div>
        </div>
      </div>

      <!-- 交通指南 -->
      <div class="traffic-section">
        <h2 class="section-title">交通指南</h2>
        <div class="traffic-content">
          <div class="traffic-item">
            <h3 class="traffic-title">地铁线路</h3>
            <div class="traffic-desc">
              <p>1. 乘坐地铁7号线至花木路站，步行约10分钟即可到达上海新国际博览中心</p>
              <p>2. 乘坐地铁2号线至龙阳路站，换乘磁悬浮或公交至上海新国际博览中心</p>
            </div>
          </div>
          <div class="traffic-item">
            <h3 class="traffic-title">公交线路</h3>
            <div class="traffic-desc">
              <p>1. 乘坐大桥六线、申江线、方川线等公交至上海新国际博览中心站</p>
              <p>2. 乘坐机场三线、机场六线至龙阳路地铁站，换乘其他交通工具至上海新国际博览中心</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Calendar, 
  Location, 
  Star, 
  EditPen, 
  Ticket, 
  Monitor, 
  Share, 
  Document, 
  Download, 
  User, 
  OfficeBuilding,
  Grid
} from '@element-plus/icons-vue'

const router = useRouter()

// 右上角按钮数据
const topButtons = ref([
  { icon: Star, name: '关注', key: 'follow' },
  { icon: Share, name: '获取报名分享链接', key: 'share' },
  { icon: Monitor, name: '访问官网', key: 'website' }
])

// 计算倒计时天数
const countdownDays = ref(0)

// 初始化倒计时
const initCountdown = () => {
  const now = new Date()
  const eventDate = new Date('2026-04-08')
  const diffTime = eventDate - now
  countdownDays.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// 页面加载时初始化倒计时
initCountdown()

// 标签数据
const industryTags = ref(['制冷设备', '空调系统', '暖通技术', '热泵设备', '通风系统'])
const popularTags = ref(['国家级展会', '热门展会', 'UFI认证', '第三十七届'])

// 按钮卡片数据
const buttonCards = ref([
  { 
    icon: EditPen, 
    name: '参展留资', 
    desc: '提交参展意向信息', 
    key: 'register'
  },
  { 
    icon: Ticket, 
    name: '观众预登记', 
    desc: '提前登记，快速入场', 
    key: 'preRegister'
  },
  { 
    icon: Ticket, 
    name: '领取免费地铁票', 
    desc: '参展观众专享，免费领取地铁票', 
    key: 'getTicket'
  },
  { 
    icon: Share, 
    name: '获取报名分享链接', 
    desc: '分享报名链接给亲友，获取礼券', 
    key: 'shareLink'
  }
])

// 展会资讯数据
const exhibitionNews = ref([
  {
    title: '2026中国制冷展观众预登记指南',
    desc: '第三十七届国际制冷、空调、供暖、通风及食品冷冻加工展览会（简称"2026中国制冷展"）将于2026年4月8至10日在北京·首都国际会展中心举办。本届展会以"数智塑冷暖，零碳启新程"（Empower refrigeration and heat pump with digital intelligence for a new chapter of carbon neutrality）为主题，设置A1、A2、B1、B2、B3五个展馆，总面积115,000平方米，预计将吸引全球近30个国家和地区的1,000余家企业和机构参展，80,000余名专业观众和买家参观洽谈，同期举办主题论坛、专题研讨会、技术交流会等70余场会议活动，更有多个主题示范专区精彩亮相。',
    time: '2026-02-05 00:00:00',
    source: '官方发布'
  },
  {
    title: '锁定黄金交流位！2026中国制冷展会议室预订通道正式开启',
    desc: '2026年4月8日-10日，第三十七届中国制冷展将在首都国际会展中心盛大举办，同期将举办系列专属技术交流会，场地已锁定首都国际会议中心，会议室资源同步开放预订，助力企业高效链接行业资源、精准传递核心技术。',
    time: '2026-02-02 00:00:00',
    source: '官方发布'
  },
  {
    title: '2026中国制冷展广告位火热开售！',
    desc: '第三十七届国际制冷、空调、供暖、通风及食品冷冻加工展览会将于2026年4月8日-10日在首都国际会展中心（北京）全新启航！',
    time: '2026-01-19 00:00:00',
    source: '官方发布'
  },
  {
    title: '产学融合路演示范专区成功亮相2025中国制冷展',
    desc: '2025年4月27-29日，第二届产学融合路演示范专区（以下简称"路演专区"）在第三十六届中国制冷展E3G31展位上隆重举办。',
    time: '2025-05-09 00:00:00',
    source: '官方发布'
  }
])

// 展商名录数据
const exhibitors = ref([
  { name: '爱迪生节能科技股份有限公司', booth: 'W4D53' },
  { name: '珠海格力电器股份有限公司', booth: 'W2D25,E1F31,E4F31' },
  { name: '珠海三友环境技术有限公司', booth: 'W3B41' },
  { name: '郑州炜盛电子科技有限公司', booth: 'W1C35' },
  { name: '淄博铭丰塑业有限公司', booth: 'W4E47' },
  { name: '诸暨市英能制冷配件厂', booth: 'W1B49' },
  { name: '诸暨市晶弘制冷设备有限公司', booth: 'E2A15' },
  { name: '郑州炜盛电子科技有限公司', booth: 'W1C35' }
])

// 资料下载数据
const downloadItems = ref([
  { name: '展会导览图', format: 'PDF', size: '2.5MB' },
  { name: '展商手册', format: 'PDF', size: '15.8MB' },
  { name: '会刊', format: 'PDF', size: '32.1MB' }
])
</script>

<style lang="scss" scoped>
.exhibition-detail-page {
  padding-top: 80px;
  background-color: #F9FAFB;
}

.detail-banner {
  width: 100%;
  height: 320px;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;

  .banner-img {
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
    align-items: center;
    justify-content: center;
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

    .banner-address,
    .banner-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
      margin: 0 0 12px 0;
      opacity: 0.9;
    }
  }

  @media (max-width: 768px) {
    height: 280px;

    .banner-content {
      padding: 24px;

      h1 {
        font-size: 24px;
      }
    }
  }
}


.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.base-info-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
  position: relative;
}

.top-actions {
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  gap: 12px;
}

.top-actions :deep(.el-button) {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
  transition: all 0.3s ease;
  background-color: #2563EB;
  border-color: #2563EB;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    background-color: #1D4ED8;
    border-color: #1D4ED8;
  }
}

.info-header {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-start; // 与h1保持对齐

  .logo-section {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f0f2f5;
    margin-top: 4px; // 微调与h1对齐

    .exhibition-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .title-section {
    flex: 1;

    .exhibition-title {
      font-size: 28px;
      font-weight: 700;
      color: #303133;
      margin-bottom: 12px;
    }

    .basic-meta {
      display: flex;
      gap: 24px;
      font-size: 16px;
      color: #606266;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .countdown-section {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        background: #EFF6FF;
        border-radius: 20px;
      }

      .countdown-label {
        font-size: 12px;
        color: #6B7280;
      }

      .countdown-days {
        font-size: 16px;
        font-weight: 600;
        color: #2563EB;
      }

      .countdown-unit {
        font-size: 12px;
        color: #6B7280;
      }
    }
  }
}

.info-content {
  .info-row {
    display: flex;
    margin-bottom: 20px;

    .info-label {
      width: 120px;
      font-weight: 600;
      color: #303133;
      font-size: 16px;
      flex-shrink: 0;
    }

    .info-value {
      flex: 1;
      color: #606266;
      font-size: 16px;
      line-height: 1.6;

      &.description {
        text-align: justify;
      }
    }
  }

  // 核心信息区域
  .core-info-section {
    display: flex;
    gap: 24px;
    margin: 24px 0;

    .core-info-item {
      flex: 1;
      text-align: center;
      padding: 16px 16px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
      transition: all 0.3s ease;
      border: 1px solid #bae6fd;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
        border-color: #38bdf8;
      }

      .core-info-value {
        font-size: 18px;
        font-weight: 700;
        color: #0369a1;
        margin-bottom: 6px;
        font-family: 'DIN Alternate', Arial, sans-serif;
      }

      .core-info-label {
        font-size: 13px;
        color: #0c4a6e;
        font-weight: 500;
      }
    }
  }

  // 标签区域样式
  .tags-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;

    .tag-group {
      margin-bottom: 12px;
      display: flex;
      align-items: flex-end; // 文字和标签都在div底部展示
      flex-wrap: wrap;
      gap: 12px;
      min-height: 32px; // 确保对齐效果
      
      // 确保标签和标题对齐
      .tag-label {
        font-weight: 600;
        color: #303133;
        font-size: 16px;
        white-space: nowrap;
        width: 80px; // 固定宽度确保对齐
        text-align: right;
        margin-bottom: 0;
      }

      .industry-tag,
      .popular-tag {
        margin-right: 8px;
        margin-bottom: 0;
        border-radius: 4px;
        background: #EFF6FF;
        color: #2563EB;
        font-size: 12px;
        padding: 2px 8px;
      }
    }
  }
}

.function-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.function-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-left: 12px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%);
    border-radius: 2px;
  }
}

.section-header {
  margin-bottom: 20px;
}

.view-more-text {
  font-size: 14px;
  color: #3B82F6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  min-width: 100px;
  width: fit-content;
  
  &:hover {
    color: #1D4ED8;
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    font-size: 12px;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(4px);
  }
}

.news-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  gap: 16px;
  margin-top: 24px;
}

.news-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  min-height: 480px;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  .news-image {
    width: 100%;
    height: 280px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    min-width: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-width: 0;
    }
  }

  .news-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    width: 100%;
    min-width: 0;
  }

  .news-title {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 8px;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .news-description {
    font-size: 13px;
    color: #6B7280;
    margin-bottom: 12px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-shrink: 0;
    width: 100%;
  }

  .news-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: #9CA3AF;
    margin-top: auto;
    padding-top: 8px;
    border-top: 1px solid #F3F4F6;
    width: 100%;
    flex-wrap: wrap;

    .news-category {
      background: #EFF6FF;
      color: #2563EB;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 11px;
    }

    .news-time {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .news-views {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}

@media (max-width: 1024px) {
  .news-list {
    grid-template-columns: 1fr;
  }

  .news-item {
    flex-direction: row;
    gap: 16px;

    .news-image {
      width: 180px;
      height: 100px;
    }
  }
}

@media (max-width: 768px) {
  .news-item {
    flex-direction: column;

    .news-image {
      width: 100%;
      height: 140px;
    }
  }
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

// 快捷功能
.quick-functions-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;

  .functions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 24px;
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

.function-section {
  display: none;
}

.combined-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
}

.exhibitor-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 0;
}

.exhibitor-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.exhibitor-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 16px;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #bae6fd;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
      border-color: #38bdf8;
    }

    .exhibitor-icon {
      margin-bottom: 6px;
      color: #0369a1;
      transition: all 0.3s ease;
    }

    .exhibitor-name {
      font-size: 16px;
      font-weight: 700;
      color: #0369a1;
      margin-bottom: 6px;
      text-align: center;
      font-family: 'DIN Alternate', Arial, sans-serif;
    }

    .exhibitor-booth {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #0c4a6e;
      font-size: 13px;
      font-weight: 500;
      text-align: center;

      .booth-label {
        font-weight: 600;
      }
    }
  }

.download-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;

  .download-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-top: 24px;

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

.traffic-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 30px;
}

.traffic-content {
  .traffic-item {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    .traffic-title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 12px;
    }

    .traffic-desc {
      color: #606266;
      line-height: 1.6;

      p {
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
  }

  .function-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .exhibitor-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .info-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .basic-meta {
    flex-direction: column;
    gap: 12px !important;
  }

  .info-row {
    flex-direction: column;
    gap: 8px;
  }

  .function-grid {
    grid-template-columns: 1fr;
  }
}
</style>