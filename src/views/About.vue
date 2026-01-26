<template>
  <div class="about-page">
    <!-- 平台定位 - 改为banner样式 -->
    <div class="banner">
      <div class="container">
        <div class="banner-content">
          <h2>大都会展数智平台</h2>
          <p class="banner-description">
            大都会展将围绕会展全产业链，以展会全流程数字服务与价值创造为主线，围绕会展数字化服务、高效运营和数据价值，依托业务探索新型商业模式，沉淀并积累基于数据价值的核心竞争力，打造“一站式”会展生态服务及数据聚合平台，构建“内容+平台+服务”全链条竞争优势，打造会展行业“数字门户”。
          </p>
        </div>
      </div>
    </div>

    <!-- 核心数据 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-card">
            <div class="stat-icon">
              <component :is="stat.icon" :size="32" />
            </div>
            <div class="stat-info">
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-number">{{ stat.number }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <h2>联系我们</h2>
            <div class="info-list">
              <p class="company-name">首都会展(集团)有限公司</p>
              <p>地址：北京市朝阳区天辰东路7号国家会议中心一期北区写字楼（E5门）4层</p>
              <p>电话：010-64994602</p>
              <p>网址：http://shouhuigroup.com</p>
              <p>邮箱：info@shouhuigroup.com</p>
            </div>
          </div>
          <div class="contact-image">
            <img src="@/assets/images/about/20260123-174443.png" alt="联系我们" />
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
  ShoppingCart,
  DataAnalysis,
  Document
} from '@element-plus/icons-vue'

const stats = ref([
  {
    id: 1,
    icon: Document,
    number: '12988',
    label: '平台入驻展商总数'
  },
  {
    id: 2,
    icon: TrendCharts,
    number: '451',
    label: '平台服务展会总数'
  },
  {
    id: 3,
    icon: ShoppingCart,
    number: '3244',
    label: '平台入驻服务商数量'
  },
  {
    id: 4,
    icon: DataAnalysis,
    number: '234512',
    label: '实现供需对接次数'
  }
])
</script>

<style lang="scss" scoped>
.about-page {
  padding-top: 80px;
  padding-bottom: 80px;
}

// Banner样式
.banner {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 60px 0;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  opacity: 0.5;
}

.banner-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.banner h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.banner-description {
  font-size: 18px;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  opacity: 0.9;
  font-weight: 300;
}

// 核心数据
.stats-section {
  padding: 40px 0;
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #F9FAFB;
  padding: 32px 24px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    // 不同卡片不同颜色背景
    background: #EFF6FF;
    color: #2563EB;
  }
  
  &:nth-child(2) .stat-icon {
    background: #ECFDF5;
    color: #059669;
  }
  
  &:nth-child(3) .stat-icon {
    background: #FFF7ED;
    color: #EA580C;
  }
  
  &:nth-child(4) .stat-icon {
    background: #F5F3FF;
    color: #7C3AED;
  }

  .stat-info {
    flex: 1;
  }

  .stat-label {
    font-size: 13px;
    color: #6B7280;
    margin-bottom: 4px;
  }

  .stat-number {
    font-size: 28px;
    font-weight: 700;
    color: #1F2937;
    font-family: 'DIN Alternate', Arial, sans-serif;
  }
}

// 联系我们
.contact-section {
  padding: 60px 0;
  background: white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: stretch;
}

.contact-info {
  background: #F9FAFB;
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 32px;
  }

  .info-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      font-size: 16px;
      line-height: 2;
      color: #374151;
      margin-bottom: 8px;
    }
    
    .company-name {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 16px;
    }
  }
}

.contact-image {
  background: #F9FAFB;
  padding: 32px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .banner {
    padding: 40px 20px;
  }
  
  .banner h2 {
    font-size: 32px;
  }
  
  .banner-description {
    font-size: 16px;
  }
}
</style>
