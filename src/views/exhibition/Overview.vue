<template>
  <div class="exhibition-overview">
    <div class="container">
      <div class="page-header">
        <h2>展会概览</h2>
      </div>

      <!-- 核心指标 -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="icon-wrapper blue">
            <el-icon><DataAnalysis /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">2,845</div>
            <div class="label">年度展会总数 (场)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper green">
            <el-icon><FullScreen /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">1,245</div>
            <div class="label">展览总面积 (万㎡)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper orange">
            <el-icon><Shop /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">45,210</div>
            <div class="label">参展企业 (家)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper purple">
            <el-icon><User /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">1,280</div>
            <div class="label">观展人数 (万人次)</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section">
        <!-- 左侧：历年新增展会 -->
        <div class="chart-card large">
          <div class="card-header">
            <h3>历年新增展会</h3>
          </div>
          <div class="chart-container" ref="trendChartRef"></div>
        </div>
        
        <!-- 右侧：行业分布 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>热门行业分布</h3>
          </div>
          <div class="chart-container" ref="industryChartRef"></div>
        </div>
      </div>

      <div class="charts-section">
        <!-- 左侧：地域分布 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>展会地域分布 TOP10</h3>
          </div>
          <div class="chart-container" ref="regionChartRef"></div>
        </div>
        
        <!-- 右侧：展会规模 -->
        <div class="chart-card large">
          <div class="card-header">
            <h3>展会规模占比</h3>
          </div>
          <div class="chart-container" ref="scaleChartRef"></div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { 
  DataAnalysis, 
  FullScreen, 
  Shop, 
  User,
  ArrowRight
} from '@element-plus/icons-vue'

const trendChartRef = ref(null)
const industryChartRef = ref(null)
const regionChartRef = ref(null)
const scaleChartRef = ref(null)

let trendChart = null
let industryChart = null
let regionChart = null
let scaleChart = null



const initCharts = () => {
  // 1. 历年新增展会
  if (trendChartRef.value) {
    trendChart = echarts.init(trendChartRef.value)
    trendChart.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#eee',
        borderWidth: 1,
        textStyle: { color: '#333' }
      },
      legend: {
        data: ['会展数', '新增会展比例'],
        top: 0,
        left: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2022', '2023', '2024', '2025', '2026'],
        axisLine: { lineStyle: { color: '#E5E7EB' } },
        axisLabel: { color: '#6B7280' }
      },
      yAxis: [
        {
          type: 'value',
          name: '会展数',
          min: 0,
          max: 3000,
          splitLine: { lineStyle: { type: 'dashed', color: '#E5E7EB' } },
          axisLabel: { formatter: '{value}' }
        },
        {
          type: 'value',
          name: '新增会展比例',
          min: 0,
          max: 35,
          splitLine: { show: false },
          axisLabel: { formatter: '{value}%' }
        }
      ],
      series: [
        {
          name: '会展数',
          type: 'bar',
          data: [564, 2683, 2175, 1963, 696],
          itemStyle: { color: '#3B82F6' }
        },
        {
          name: '新增会展比例',
          type: 'line',
          yAxisIndex: 1,
          data: [5.57, 34.70, 16.08, 18.70, 6.98],
          itemStyle: { color: '#10B981' },
          lineStyle: { width: 3 },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }
      ]
    })
  }

  // 2. 行业分布
  if (industryChartRef.value) {
    industryChart = echarts.init(industryChartRef.value)
    industryChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        bottom: '0%',
        left: 'center',
        icon: 'circle'
      },
      series: [
        {
          name: '热门行业分布',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
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
            { value: 794, name: '食品饮料', itemStyle: { color: '#3B82F6' } },
            { value: 526, name: '机械工业', itemStyle: { color: '#10B981' } },
            { value: 485, name: '交通工具', itemStyle: { color: '#F59E0B' } },
            { value: 476, name: '房产家居', itemStyle: { color: '#8B5CF6' } },
            { value: 416, name: '建材五金', itemStyle: { color: '#EC4899' } },
            { value: 343, name: '农林牧渔', itemStyle: { color: '#60A5FA' } },
            { value: 260, name: '医疗保健', itemStyle: { color: '#34D399' } },
            { value: 230, name: '美容美发', itemStyle: { color: '#FBBF24' } },
            { value: 227, name: '能源矿产', itemStyle: { color: '#A78BFA' } },
            { value: 223, name: '文化教育', itemStyle: { color: '#F472B6' } }
          ]
        }
      ]
    })
  }

  // 3. 地域分布
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
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['广东', '上海', '北京', '山东', '浙江', '江苏', '四川', '河南', '福建', '陕西'],
        axisTick: { alignWithLabel: true },
        axisLabel: {
          rotate: 45,
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        name: '数量 (个)',
        splitLine: { lineStyle: { type: 'dashed', color: '#E5E7EB' } }
      },
      series: [
        {
          name: '展会数量',
          type: 'bar',
          data: [1448, 1174, 577, 540, 506, 434, 321, 319, 251, 213],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#3B82F6'
          },
          barWidth: '60%'
        }
      ]
    })
  }

  // 4. 规模占比
  if (scaleChartRef.value) {
    scaleChart = echarts.init(scaleChartRef.value)
    scaleChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center'
      },
      series: [
        {
          name: '会展面积统计',
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
            { value: 25, name: '5千平方米以下', itemStyle: { color: '#F56C6C' } },
            { value: 30, name: '5千到2万平方米', itemStyle: { color: '#3B82F6' } },
            { value: 40, name: '2万到10万平方米', itemStyle: { color: '#67C23A' } },
            { value: 15, name: '10万平方米以上', itemStyle: { color: '#E6A23C' } }
          ]
        }
      ]
    })
  }
}

const handleResize = () => {
  trendChart?.resize()
  industryChart?.resize()
  regionChart?.resize()
  scaleChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  trendChart?.dispose()
  industryChart?.dispose()
  regionChart?.dispose()
  scaleChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.exhibition-overview {
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

    &.blue { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
    &.green { background: rgba(16, 185, 129, 0.1); color: #10B981; }
    &.orange { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
    &.purple { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; }
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
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  .chart-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    height: 420px;
    display: flex;
    flex-direction: column;

    &.large { grid-column: span 1; }
    &.medium { grid-column: span 1; }

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
}

.chart-container {
  flex: 1;
  width: 100%;
}

.exhibitions-list-section {
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

  .exhibition-name-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: #1F2937;
  }

  .rank-badge {
    width: 24px;
    height: 24px;
    background: #F3F4F6;
    color: #9CA3AF;
    border-radius: 4px;
    display: inline-flex;
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

@media (max-width: 1200px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>