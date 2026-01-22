<template>
  <div class="venue-overview">
    <div class="container">
      <div class="page-header">
        <h2>场馆概览</h2>
      </div>

      <!-- 核心指标 -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="icon-wrapper blue">
            <el-icon><OfficeBuilding /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">384</div>
            <div class="label">国内场馆总数 (个)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper green">
            <el-icon><School /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">12</div>
            <div class="label">会议中心 (个)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper orange">
            <el-icon><DataBoard /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">184</div>
            <div class="label">会展中心 (个)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper purple">
            <el-icon><FullScreen /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">2665</div>
            <div class="label">场馆总面积 (万㎡)</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section">
        <div class="chart-card">
          <div class="card-header">
            <h3>场馆区域分布</h3>
          </div>
          <div class="chart-container" ref="regionChartRef"></div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>重点场馆空窗期分析</h3>
          </div>
          <div class="vacancy-list">
            <div v-for="(item, index) in vacancyData" :key="index" class="vacancy-item">
              <div class="venue-name">
                <span class="rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
                {{ item.name }}
              </div>
              <div class="progress-wrapper">
                <el-progress 
                  :percentage="item.rate" 
                  :color="getProgressColor(index)"
                  :format="formatProgress"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门场馆列表 -->
      <div class="venues-list-section">
        <div class="card-header">
          <h3>热门场馆办展情况</h3>
          <el-button link type="primary">查看更多 <el-icon><ArrowRight /></el-icon></el-button>
        </div>
        <el-table :data="venueData" style="width: 100%" stripe>
          <el-table-column prop="name" label="场馆名称" min-width="180">
            <template #default="scope">
              <div class="venue-cell">
                <span class="venue-name-text">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="area" label="办展总面积 (㎡)" width="150" align="right" />
          <el-table-column prop="count" label="办展次数" width="100" align="center" />
          <el-table-column prop="industries" label="主要行业" min-width="200">
            <template #default="scope">
              <div class="tags-wrapper">
                <el-tag 
                  v-for="tag in scope.row.industries" 
                  :key="tag" 
                  size="small" 
                  effect="plain"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="latestExhibition" label="最新展会" min-width="200" show-overflow-tooltip />
          <el-table-column prop="date" label="展会时间" width="180" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { 
  OfficeBuilding, 
  School, 
  DataBoard, 
  FullScreen,
  ArrowRight
} from '@element-plus/icons-vue'

const regionChartRef = ref(null)
let regionChart = null

const vacancyData = [
  { name: '广州保利世贸展览馆', rate: 78.14 },
  { name: '上海新国际博览中心', rate: 75.14 },
  { name: '广交会场馆', rate: 45.90 },
  { name: '北京首都会展中心', rate: 42.35 },
  { name: '宁波国际会展中心', rate: 31.97 },
  { name: '厦门国际会展中心', rate: 31.15 },
  { name: '中国西部国际博览城', rate: 30.05 }
]

const venueData = [
  {
    name: '上海新国际博览中心',
    area: '8,501,076',
    count: 135,
    industries: ['交通工具', '仪器仪表', '体育休闲', '信息通信'],
    latestExhibition: '2025 Arts中国国际轨道交通展览会',
    date: '2025-12-17 ~ 2025-12-19'
  },
  {
    name: '广交会场馆',
    area: '7,796,820',
    count: 99,
    industries: ['交通工具', '体育休闲', '信息通信', '光电技术'],
    latestExhibition: '2025 广州文化产业交易会',
    date: '2025-12-19 ~ 2025-12-21'
  },
  {
    name: '日本东京有明国际会展中心',
    area: '6,546,651',
    count: 207,
    industries: ['交通工具', '仪器仪表', '信息通信', '光电技术'],
    latestExhibition: '2025 日本工业清洗设备及清洗剂展',
    date: '2025-12-03 ~ 2025-12-05'
  },
  {
    name: '德国慕尼黑新国际博览中心',
    area: '4,376,515',
    count: 48,
    industries: ['交通工具', '光电技术', '化工橡塑', '医疗健康'],
    latestExhibition: '2025 德国慕尼黑电子展',
    date: '2025-11-18 ~ 2025-11-21'
  },
  {
    name: '美国拉斯维加斯国际会展中心',
    area: '3,169,928',
    count: 69,
    industries: ['交通工具', '信息通信', '化工橡塑', '医疗健康'],
    latestExhibition: '美国有机产品展 | 美国西部植物提取物展',
    date: '2025-10-29 ~ 2025-10-30'
  }
]

const getProgressColor = (index) => {
  if (index === 0) return '#F56C6C'
  if (index === 1) return '#E6A23C'
  if (index === 2) return '#409EFF'
  return '#67C23A'
}

const formatProgress = (percentage) => {
  return `${percentage}%`
}

const initCharts = () => {
  if (regionChartRef.value) {
    regionChart = echarts.init(regionChartRef.value)
    regionChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['华东', '华北', '华南', '西南', '华中', '东北', '西北', '港澳台'],
        axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: 'value',
        name: '场馆数量 (个)'
      },
      series: [
        {
          name: '场馆数量',
          type: 'bar',
          barWidth: '60%',
          data: [156, 60, 55, 27, 26, 24, 20, 16],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3B82F6' },
              { offset: 1, color: '#60A5FA' }
            ]),
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    })
  }
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (regionChart) regionChart.dispose()
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (regionChart) regionChart.resize()
}
</script>

<style lang="scss" scoped>
.venue-overview {
  padding: 40px 0 80px;
  background-color: #F9FAFB;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 16px;
    color: #6B7280;
    max-width: 800px;
    margin: 0 auto;
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  .icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    flex-shrink: 0;

    &.blue {
      background: rgba(59, 130, 246, 0.1);
      color: #3B82F6;
    }
    &.green {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
    }
    &.orange {
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
    }
    &.purple {
      background: rgba(139, 92, 246, 0.1);
      color: #8B5CF6;
    }
  }

  .stat-info {
    .value {
      font-size: 32px;
      font-weight: 700;
      color: #1F2937;
      line-height: 1.2;
      font-family: 'DIN Alternate', sans-serif;
    }
    .label {
      font-size: 14px;
      color: #6B7280;
      margin-top: 4px;
    }
  }
}

.charts-section {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  height: 420px;
  display: flex;
  flex-direction: column;

  .card-header {
    margin-bottom: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      padding-left: 12px;
      border-left: 4px solid #3B82F6;
      line-height: 1;
    }
  }
}

.chart-container {
  flex: 1;
  width: 100%;
}

.vacancy-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  .vacancy-item {
    margin-bottom: 20px;

    .venue-name {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      color: #4B5563;
      margin-bottom: 8px;

      .rank {
        width: 20px;
        height: 20px;
        background: #F3F4F6;
        color: #9CA3AF;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;

        &.top {
          background: #3B82F6;
          color: white;
        }
      }
    }

    .progress-wrapper {
      padding-left: 32px;
    }
  }
}

.venues-list-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1F2937;
      padding-left: 12px;
      border-left: 4px solid #3B82F6;
      line-height: 1;
    }
  }

  .venue-cell {
    font-weight: 500;
    color: #1F2937;
  }

  .tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}

@media (max-width: 1200px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-section {
    grid-template-columns: 1fr;
    
    .chart-card {
      height: 360px;
    }
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>