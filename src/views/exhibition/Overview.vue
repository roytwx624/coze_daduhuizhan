<template>
  <div class="exhibition-overview">
    <div class="container">
      <!-- Banner区域 -->
      <div class="banner">
        <div class="container">
          <div class="banner-content">
            <h2>展会概览</h2>
            <p class="banner-description">
              整合多维度宏观展会数据，通过可视化图表清晰呈现展会总量、地域分布、行业结构及周期变化等核心指标，帮助平台用户快速把握行业趋势与优质资源，为参展规划、资源对接提供数据支撑，提升决策精准度与效率。
            </p>
          </div>
        </div>
      </div>

      <!-- 核心指标 -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="icon-wrapper blue">
            <el-icon><Document /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">7,872 <span class="unit">场</span></div>
            <div class="label">所有会展</div>
          </div>
        </div>
        <div class="stat-card" v-if="false">
          <div class="icon-wrapper green">
            <el-icon><Calendar /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">568 <span class="unit">场</span></div>
            <div class="label">排期中</div>
          </div>
        </div>
        <div class="stat-card" v-if="false">
          <div class="icon-wrapper orange">
            <el-icon><CircleCheck /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">7,304 <span class="unit">场</span></div>
            <div class="label">已结束</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper purple">
            <el-icon><MapLocation /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">38,392 <span class="unit">万平方米</span></div>
            <div class="label">总面积</div>
          </div>
        </div>
        <div class="stat-card" v-if="false">
          <div class="icon-wrapper blue">
            <el-icon><Building /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">4,771 <span class="unit">个</span></div>
            <div class="label">主办单位</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper green">
            <el-icon><OfficeBuilding /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">3,450 <span class="unit">个</span></div>
            <div class="label">承办单位</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="icon-wrapper orange">
            <el-icon><Shop /></el-icon>
          </div>
          <div class="stat-info">
            <div class="value">387 <span class="unit">个</span></div>
            <div class="label">举办场馆</div>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section" style="grid-template-columns: repeat(2, 1fr);">
        <!-- 左侧：历年新增展会 -->
        <div class="chart-card large">
          <div class="card-header">
            <h3>历年新增展会</h3>
          </div>
          <div class="chart-container" ref="trendChartRef"></div>
        </div>
        
        <!-- 右侧：地域分布 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>展会地域分布 TOP10</h3>
          </div>
          <div class="chart-container" ref="regionChartRef"></div>
        </div>
      </div>

      <div class="charts-section" style="grid-template-columns: repeat(3, 1fr);">
        <!-- 左侧：行业分布 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>热门行业分布</h3>
          </div>
          <div class="chart-container" ref="industryChartRef"></div>
        </div>
        
        <!-- 中间：展会规模 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>展会规模占比</h3>
          </div>
          <div class="chart-container" ref="scaleChartRef"></div>
        </div>
        
        <!-- 右侧：举办周期 -->
        <div class="chart-card medium">
          <div class="card-header">
            <h3>举办周期</h3>
          </div>
          <div class="chart-container" ref="periodChartRef"></div>
        </div>
      </div>

      <!-- 新增：月度展会数量变化 -->
      <div class="charts-section">
        <div class="chart-card large" style="grid-column: span 3;">
          <div class="card-header">
            <h3>月度展会数量变化</h3>
          </div>
          <div class="chart-container" ref="monthlyChartRef"></div>
        </div>
      </div>

      <!-- Top10 展示区域 -->
      <div class="top10-section">
        <!-- 举办场馆 Top10 -->
        <div class="top10-card">
          <div class="card-header">
            <h3>举办场馆 TOP10</h3>
          </div>
          <div class="top10-list">
            <div v-for="(item, index) in venueTop10" :key="index" class="top10-item">
              <span class="rank">{{ index + 1 }}</span>
              <span class="name">{{ item.name }}</span>
              <span class="count">{{ item.count }}场</span>
            </div>
          </div>
        </div>
        
        <!-- 主办单位 Top10 -->
        <div class="top10-card">
          <div class="card-header">
            <h3>主办单位 TOP10</h3>
          </div>
          <div class="top10-list">
            <div v-for="(item, index) in organizerTop10" :key="index" class="top10-item">
              <span class="rank">{{ index + 1 }}</span>
              <span class="name">{{ item.name }}</span>
              <span class="count">{{ item.count }}场</span>
            </div>
          </div>
        </div>
        
        <!-- 承办单位 Top10 -->
        <div class="top10-card">
          <div class="card-header">
            <h3>承办单位 TOP10</h3>
          </div>
          <div class="top10-list">
            <div v-for="(item, index) in contractorTop10" :key="index" class="top10-item">
              <span class="rank">{{ index + 1 }}</span>
              <span class="name">{{ item.name }}</span>
              <span class="count">{{ item.count }}场</span>
            </div>
          </div>
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
const periodChartRef = ref(null)
const monthlyChartRef = ref(null)

let trendChart = null
let industryChart = null
let regionChart = null
let scaleChart = null
let periodChart = null
let monthlyChart = null

// Top10 数据
const venueTop10 = ref([
  { name: '上海新国际博览中心', count: 496 },
  { name: '国家会展中心(上海)', count: 414 },
  { name: '广交会展馆', count: 288 },
  { name: '深圳会展中心(福田)', count: 289 },
  { name: '深圳国际会展中心(宝安新馆)', count: 262 },
  { name: '上海世博展览馆', count: 247 },
  { name: '成都世纪城新国际会展中心', count: 234 },
  { name: '郑州国际会展中心', count: 207 },
  { name: '广州保利世贸博览馆', count: 205 },
  { name: '西安国际会展中心(浐灞)', count: 160 }
])

const organizerTop10 = ref([
  { name: '上海华展展览服务有限公司', count: 945 },
  { name: '海名国际会展集团', count: 773 },
  { name: '山东新丞华国际会展有限公司', count: 73 },
  { name: '深圳市华巨臣国际会展集团有限公司', count: 70 },
  { name: '山东美博国际文化传播有限公司', count: 515 },
  { name: '中国机械工业联合会', count: 50 },
  { name: '深圳市康强展览有限公司', count: 49 },
  { name: '湖南省股权交易所', count: 47 },
  { name: '广东鸿威国际会展集团有限公司', count: 46 },
  { name: '上海华展科技服务有限公司', count: 46 }
])

const contractorTop10 = ref([
  { name: '上海华展展览服务有限公司', count: 10115 },
  { name: '深圳市华巨臣国际会展集团有限公司', count: 89 },
  { name: '广州华瑞国际会展服务有限公司', count: 73 },
  { name: '上海博华国际展览有限公司', count: 72 },
  { name: '青岛海名国际会展有限公司', count: 61 },
  { name: '山东美博国际文化传播有限公司', count: 44 },
  { name: '尚格会展股份有限公司', count: 41 },
  { name: '海名会展集团有限公司', count: 38 },
  { name: '广州光亚法兰克福展览有限公司', count: 35 },
  { name: '国药励展展览有限责任公司', count: 34 }
])



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

  // 5. 举办周期（饼图）
  if (periodChartRef.value) {
    periodChart = echarts.init(periodChartRef.value)
    periodChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}场 ({d}%)'
      },
      legend: {
        bottom: '0%',
        left: 'center',
        icon: 'circle'
      },
      series: [
        {
          name: '举办周期',
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
            { value: 6382 + 5, name: '一年一届', itemStyle: { color: '#3B82F6' } },
            { value: 903, name: '一年两届', itemStyle: { color: '#10B981' } },
            { value: 157, name: '一年三届', itemStyle: { color: '#F59E0B' } },
            { value: 142, name: '两年一届', itemStyle: { color: '#8B5CF6' } },
            { value: 2, name: '四年一届', itemStyle: { color: '#EC4899' } },
            { value: 2 + 1, name: '三年一届', itemStyle: { color: '#6B7280' } }
          ]
        }
      ]
    })
  }

  // 6. 月度展会数量变化
  if (monthlyChartRef.value) {
    monthlyChart = echarts.init(monthlyChartRef.value)
    monthlyChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['华东', '华南', '西南', '华北', '西北', '华中', '东北'],
        top: 0,
        left: 'center'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: { lineStyle: { color: '#E5E7EB' } },
        axisLabel: { color: '#6B7280' }
      },
      yAxis: {
        type: 'value',
        name: '数量 (场)',
        splitLine: { lineStyle: { type: 'dashed', color: '#E5E7EB' } }
      },
      series: [
        {
          name: '华东',
          type: 'bar',
          stack: 'total',
          data: [30, 50, 200, 180, 170, 120, 90, 180, 150, 130, 100, 50],
          itemStyle: { color: '#3B82F6' }
        },
        {
          name: '华南',
          type: 'bar',
          stack: 'total',
          data: [20, 40, 50, 60, 50, 30, 30, 40, 50, 50, 40, 30],
          itemStyle: { color: '#10B981' }
        },
        {
          name: '西南',
          type: 'bar',
          stack: 'total',
          data: [10, 20, 30, 40, 30, 20, 20, 30, 20, 30, 20, 10],
          itemStyle: { color: '#F59E0B' }
        },
        {
          name: '华北',
          type: 'bar',
          stack: 'total',
          data: [20, 30, 40, 50, 40, 30, 30, 40, 30, 40, 30, 20],
          itemStyle: { color: '#EF4444' }
        },
        {
          name: '西北',
          type: 'bar',
          stack: 'total',
          data: [10, 10, 20, 30, 20, 10, 10, 20, 20, 20, 10, 10],
          itemStyle: { color: '#8B5CF6' }
        },
        {
          name: '华中',
          type: 'bar',
          stack: 'total',
          data: [10, 20, 30, 40, 30, 20, 20, 30, 30, 30, 20, 10],
          itemStyle: { color: '#EC4899' }
        },
        {
          name: '东北',
          type: 'bar',
          stack: 'total',
          data: [10, 10, 20, 30, 20, 10, 10, 20, 20, 20, 10, 10],
          itemStyle: { color: '#6B7280' }
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
  periodChart?.resize()
  monthlyChart?.resize()
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
  periodChart?.dispose()
  monthlyChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.exhibition-overview {
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
      
      .unit {
        font-size: 16px;
        font-weight: 500;
        color: #6B7280;
        margin-left: 4px;
      }
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

/* Top10 展示区域样式 */
.top10-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;
}

.top10-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  height: auto;
}

.top10-list {
  margin-top: 16px;
}

.top10-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
}

.rank {
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
  margin-right: 12px;
  
  &:nth-child(-n+3) {
    background: #3B82F6;
    color: white;
  }
}

.name {
  flex: 1;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.count {
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .top10-section {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>