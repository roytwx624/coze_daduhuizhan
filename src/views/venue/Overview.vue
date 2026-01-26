<template>
  <div class="venue-overview">
    <!-- Banner区域 -->
    <div class="banner">
      <div class="container">
        <div class="banner-content">
          <h2>场馆概览</h2>
          <p class="banner-description">
            整合多维度场馆数据，通过可视化图表清晰呈现场馆总量、地域分布、面积结构及热门场馆等核心指标，帮助平台用户快速了解场馆资源分布，为展会规划、场馆选择提供数据支撑，提升决策精准度与效率。
          </p>
        </div>
      </div>
    </div>
    
    <div class="container">

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
            <h3>场馆区域面积分布</h3>
          </div>
          <div class="chart-container" ref="regionChartRef"></div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>热门场馆办展情况</h3>
          </div>
          <div class="chart-container" ref="cityChartRef"></div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>区域场馆数量分布</h3>
          </div>
          <div class="chart-container" ref="regionCountChartRef"></div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>城市场馆数量分布</h3>
          </div>
          <div class="chart-container" ref="cityCountChartRef"></div>
        </div>
        <div class="chart-card">
          <div class="card-header">
            <h3>场馆面积分布</h3>
          </div>
          <div class="chart-container" ref="areaChartRef"></div>
        </div>
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
const cityChartRef = ref(null)
const regionCountChartRef = ref(null)
const cityCountChartRef = ref(null)
const areaChartRef = ref(null)
let regionChart = null
let cityChart = null
let regionCountChart = null
let cityCountChart = null
let areaChart = null

const initCharts = () => {
  // 场馆区域面积分布图表
  if (regionChartRef.value) {
    regionChart = echarts.init(regionChartRef.value)
    regionChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}m² ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        data: ['华东', '华南', '华北', '西南', '华中', '西北', '东北', '港澳台']
      },
      series: [
        {
          name: '场馆区域面积分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 11023307, name: '华东', itemStyle: { color: '#3B82F6' } },
            { value: 5613696, name: '华南', itemStyle: { color: '#67C23A' } },
            { value: 3247931, name: '华北', itemStyle: { color: '#E6A23C' } },
            { value: 1705200, name: '西南', itemStyle: { color: '#F56C6C' } },
            { value: 1525595, name: '华中', itemStyle: { color: '#409EFF' } },
            { value: 1347350, name: '西北', itemStyle: { color: '#909399' } },
            { value: 1089682, name: '东北', itemStyle: { color: '#E066FF' } },
            { value: 1093511, name: '港澳台', itemStyle: { color: '#667EEA' } }
          ]
        }
      ]
    })
  }
  
  // 热门场馆办展情况图表
  if (cityChartRef.value) {
    cityChart = echarts.init(cityChartRef.value)
    cityChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['上海新国际博览中心', '广州交投琶洲会展', '上海世博展览馆', '上海光大大会展中心', '成都世纪城新国际会展中心', '广州保利世贸博览馆', '郑州国际会展中心', '深圳会展中心', '国家会展中心（上海）', '中国国际展览中心（朝阳馆）', '北京全国农业展览馆', '宁波国际会展中心', '南京国际展览中心', '西安曲江国际会展中心'],
        axisTick: { alignWithLabel: true },
        axisLabel: {
          rotate: 45,
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        name: '数量 (场)'
      },
      series: [
        {
          name: '办展数量',
          type: 'bar',
          barWidth: '60%',
          data: [2883, 2091, 1195, 1153, 1147, 1005, 978, 940, 877, 691, 626, 595, 559, 506, 503],
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
  
  // 区域场馆数量分布图表
  if (regionCountChartRef.value) {
    regionCountChart = echarts.init(regionCountChartRef.value)
    regionCountChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}个 ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        data: ['华东', '华北', '华南', '西南', '华中', '东北', '西北', '港澳台']
      },
      series: [
        {
          name: '区域场馆数量分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 156, name: '华东', itemStyle: { color: '#3B82F6' } },
            { value: 60, name: '华北', itemStyle: { color: '#67C23A' } },
            { value: 55, name: '华南', itemStyle: { color: '#E6A23C' } },
            { value: 27, name: '西南', itemStyle: { color: '#F56C6C' } },
            { value: 26, name: '华中', itemStyle: { color: '#409EFF' } },
            { value: 24, name: '东北', itemStyle: { color: '#909399' } },
            { value: 20, name: '西北', itemStyle: { color: '#E066FF' } },
            { value: 16, name: '港澳台', itemStyle: { color: '#667EEA' } }
          ]
        }
      ]
    })
  }
  
  // 城市场馆数量分布图表
  if (cityCountChartRef.value) {
    cityCountChart = echarts.init(cityCountChartRef.value)
    cityCountChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['北京市', '上海市', '广州市', '杭州市', '重庆市', '太原市', '苏州市', '宁波市', '济南市', '武汉市', '南京市', '沈阳市', '天津市', '青岛市', '成都市', '石家庄市'],
        axisTick: { alignWithLabel: true },
        axisLabel: {
          rotate: 45,
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        name: '数量 (个)'
      },
      series: [
        {
          name: '场馆数量',
          type: 'bar',
          barWidth: '60%',
          data: [19, 17, 14, 8, 7, 7, 7, 6, 6, 6, 6, 6, 5, 5, 5, 5],
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
  
  // 场馆面积分布图表
  if (areaChartRef.value) {
    areaChart = echarts.init(areaChartRef.value)
    areaChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} (平方米) ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        data: ['5万以上', '3万到4万', '2万以下', '2万到3万', '4万到5万']
      },
      series: [
        {
          name: '场馆面积分布',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 150, name: '5万以上', itemStyle: { color: '#3B82F6' } },
            { value: 80, name: '3万到4万', itemStyle: { color: '#67C23A' } },
            { value: 120, name: '2万以下', itemStyle: { color: '#E6A23C' } },
            { value: 90, name: '2万到3万', itemStyle: { color: '#F56C6C' } },
            { value: 60, name: '4万到5万', itemStyle: { color: '#409EFF' } }
          ]
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
  if (cityChart) cityChart.dispose()
  if (regionCountChart) regionCountChart.dispose()
  if (cityCountChart) cityCountChart.dispose()
  if (areaChart) areaChart.dispose()
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  if (regionChart) regionChart.resize()
  if (cityChart) cityChart.resize()
  if (regionCountChart) regionCountChart.resize()
  if (cityCountChart) cityCountChart.resize()
  if (areaChart) areaChart.resize()
}
</script>

<style lang="scss" scoped>
.venue-overview {
  padding: 0 0 80px;
  background-color: #F9FAFB;
  min-height: 100vh;
}

/* Banner样式 */
.banner {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: white;
  padding: 60px 0;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  /* 添加margin-top确保banner从header底部开始 */
  margin-top: 80px;
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

@media (max-width: 768px) {
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

/* page-header样式已被banner替换，不再需要 */

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
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  height: 500px;
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
      height: 400px;
    }
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>