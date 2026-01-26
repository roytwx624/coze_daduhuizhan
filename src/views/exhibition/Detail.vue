<template>
  <div class="exhibition-detail-page">
    <!-- Banner -->
    <div class="detail-banner">
      <img src="@/assets/images/banner/banner1.png" alt="展会banner" class="banner-img" />
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
            {{ btn.name }}
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
            </div>
          </div>
        </div>
        
        <div class="info-content">
          <div class="info-row">
            <div class="info-label">展会行业分类：</div>
            <div class="info-value">制冷、空调、暖通、热泵及通风设备</div>
          </div>
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
        </div>
      </div>

      <!-- 按钮卡片模块 -->
      <div class="button-cards-section">
        <div class="cards-grid">
          <div class="button-card" v-for="card in buttonCards" :key="card.key">
            <div class="card-icon">
              <el-icon :size="32"><component :is="card.icon" /></el-icon>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ card.name }}</h3>
              <p class="card-desc">{{ card.desc }}</p>
            </div>
            <el-button type="primary" size="small" plain>
              {{ card.name }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 展会资讯与展商名录 -->
      <div class="combined-section">
        <!-- 展会资讯 -->
        <div class="news-section">
          <h2 class="section-title">展会资讯</h2>
          <div class="news-list">
            <div class="news-item" v-for="(news, index) in exhibitionNews" :key="index">
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-desc">{{ news.desc }}</p>
              <div class="news-meta">
                <el-icon><Clock /></el-icon>
                <span>{{ news.time }}</span>
                <span class="news-source">来源：{{ news.source }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 展商名录 -->
        <div class="exhibitor-section">
          <h2 class="section-title">展商名录</h2>
          <div class="exhibitor-list">
            <div class="exhibitor-item" v-for="(exhibitor, index) in exhibitors" :key="index">
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
        <h2 class="section-title">资料下载</h2>
        <div class="download-list">
          <div class="download-item" v-for="(item, index) in downloadItems" :key="index">
            <div class="download-info">
              <el-icon class="download-icon"><Document /></el-icon>
              <span class="download-name">{{ item.name }}</span>
              <div class="download-meta">
                <span class="download-format">{{ item.format }}</span>
                <span class="download-size">{{ item.size }}</span>
              </div>
            </div>
            <el-button type="primary" size="small">
              <el-icon><Download /></el-icon>
              下载
            </el-button>
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
import { 
  Calendar, 
  Location, 
  Star, 
  EditPen, 
  Ticket, 
  Monitor, 
  Share, 
  Clock, 
  Document, 
  Download 
} from '@element-plus/icons-vue'

// 右上角按钮数据
const topButtons = ref([
  { icon: Star, name: '关注', key: 'follow' },
  { icon: Monitor, name: '访问官网', key: 'website' },
  { icon: Share, name: '获取分享链接', key: 'share' }
])

// 按钮卡片数据
const buttonCards = ref([
  { 
    icon: EditPen, 
    name: '参展留资', 
    desc: '填写参展信息，获取展会最新动态', 
    key: 'register'
  },
  { 
    icon: Ticket, 
    name: '观众预登记', 
    desc: '提前登记，快速入场，享受专属福利', 
    key: 'preRegister'
  },
  { 
    icon: Ticket, 
    name: '领取免费地铁票', 
    desc: '参展观众专享，免费领取地铁票', 
    key: 'getTicket'
  }
])

// 展会资讯数据
const exhibitionNews = ref([
  {
    title: '第三十七届制冷展即将盛大开幕',
    desc: '第三十七届制冷展将于2026年4月8日在上海新国际博览中心盛大开幕，展会将展示最新的制冷、空调、暖通、热泵及通风设备技术和产品。',
    time: '2026-03-20 14:30',
    source: '官方发布'
  },
  {
    title: '制冷展参展商名录正式发布',
    desc: '第三十七届制冷展参展商名录已正式发布，共有来自全球20多个国家和地区的500多家企业参展。',
    time: '2026-03-15 10:15',
    source: '官方发布'
  },
  {
    title: '制冷展观众预登记通道已开启',
    desc: '第三十七届制冷展观众预登记通道已正式开启，预登记观众可享受快速入场、免费午餐等福利。',
    time: '2026-03-01 09:00',
    source: '官方发布'
  }
])

// 展商名录数据
const exhibitors = ref([
  { name: '珠海爱迪生节能科技股份有限公司', booth: 'W4D53' },
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
  background-color: #f5f7fa;
}

.detail-banner {
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px;

  .banner-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.base-info-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

.info-header {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: center;

  .logo-section {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f0f2f5;

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
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.news-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.news-item {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .news-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 12px;
  }

  .news-desc {
    color: #606266;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .news-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #909399;
    font-size: 14px;
  }

  .news-source {
    margin-left: auto;
    font-weight: 500;
  }
}

.button-cards-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.button-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: #f5f7fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    background-color: #ecf5ff;
    border-color: #409eff;
  }
}

.card-icon {
  margin-bottom: 16px;
  color: #409eff;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #606266;
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.5;
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
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 0;
}

.exhibitor-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.exhibitor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ecf5ff;
    transform: translateY(-1px);
  }

  .exhibitor-name {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }

  .exhibitor-booth {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #606266;
    font-size: 14px;

    .booth-label {
      font-weight: 600;
    }
  }
}

.download-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.download-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .download-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;

      .download-icon {
        font-size: 24px;
        color: #409eff;
      }

      .download-name {
        font-size: 16px;
        color: #303133;
        font-weight: 500;
      }

      .download-meta {
        display: flex;
        gap: 12px;
        align-items: center;
        font-size: 14px;
        color: #909399;
      }

      .download-format {
        padding: 2px 8px;
        background-color: #ecf5ff;
        color: #409eff;
        border-radius: 4px;
        font-size: 12px;
      }

      .download-size {
        font-size: 13px;
      }
    }
}

.traffic-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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