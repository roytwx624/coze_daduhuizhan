<template>
  <div class="venue-search-page">
    <!-- 全屏地图容器 -->
    <div class="map-container">
      <div id="amap-container" class="amap-container"></div>
    </div>

    <!-- 左侧可收起面板 -->
    <div class="left-panel" :class="{ collapsed: isPanelCollapsed }">
      <div class="panel-toggle" @click="togglePanel">
        <el-icon><component :is="isPanelCollapsed ? 'ArrowRight' : 'ArrowLeft'" /></el-icon>
      </div>

      <div class="panel-content">
        <!-- 搜索头部 -->
        <div class="panel-header">
          <h3>场馆搜索</h3>
          <el-button type="primary" link @click="resetSearch">重置</el-button>
        </div>

        <!-- 搜索表单 -->
        <div class="search-form">
          <div class="form-item">
            <el-input
              v-model="searchForm.keyword"
              placeholder="输入场馆名称或地址"
              clearable
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div class="filter-actions">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="showFilterDialog = true">筛选</el-button>
          </div>
        </div>

        <!-- 搜索结果列表 -->
        <div class="result-list">
          <div class="list-header">
            <span class="count">共 <span class="highlight">{{ filteredVenues.length }}</span> 个场馆</span>
            <el-select v-model="sortBy" size="small" style="width: 100px" @change="handleSort">
              <el-option label="距离排序" value="distance" />
              <el-option label="面积排序" value="area" />
            </el-select>
          </div>

          <div class="venue-items">
            <div
              v-for="venue in filteredVenues"
              :key="venue.id"
              class="venue-card"
              :class="{ active: selectedVenueId === venue.id }"
              @click="selectVenue(venue)"
            >
              <div class="venue-image">
                <img :src="venue.image" :alt="venue.name" />
              </div>
              <div class="venue-info">
                <h4 class="venue-name">{{ venue.name }}</h4>
                <div class="venue-meta">
                  <div class="meta-item">
                    <el-icon><Location /></el-icon>
                    {{ venue.address }}
                  </div>
                  <div class="meta-item">
                    <el-icon><Grid /></el-icon>
                    {{ formatArea(venue.area) }}㎡
                  </div>
                </div>
                <div class="venue-desc">
                  {{ venue.description || '暂无描述' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 筛选弹窗 -->
  <el-dialog
    v-model="showFilterDialog"
    title="筛选条件"
    width="500px"
    :close-on-click-modal="false"
  >
    <el-form :model="searchForm" label-position="top">
      <el-form-item label="地区">
        <el-select v-model="searchForm.region" placeholder="请选择地区" clearable style="width: 100%">
          <el-option label="朝阳区" value="chaoyang" />
          <el-option label="海淀区" value="haidian" />
          <el-option label="顺义区" value="shunyi" />
          <el-option label="大兴区" value="daxing" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="场馆面积范围">
        <el-select v-model="searchForm.area" placeholder="请选择场馆面积" clearable style="width: 100%">
          <el-option label="5万㎡以上" value="large" />
          <el-option label="2-5万㎡" value="medium" />
          <el-option label="2万㎡以下" value="small" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="最大会议厅面积要求">
        <el-select v-model="searchForm.maxHallArea" placeholder="请选择最大会议厅面积" clearable style="width: 100%">
          <el-option label="2000㎡以上" value="large" />
          <el-option label="1000-2000㎡" value="medium" />
          <el-option label="1000㎡以下" value="small" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showFilterDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmFilter">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useRouter } from 'vue-router'
import { 
  Search, 
  MapLocation, 
  LocationFilled, 
  Location, 
  Grid, 
  ArrowLeft, 
  ArrowRight 
} from '@element-plus/icons-vue'
import { venues } from '@/data/mockData'

const router = useRouter()
const isPanelCollapsed = ref(false)
const showFilterDialog = ref(false)
let map = null

const searchForm = reactive({
  keyword: '',
  region: '',
  area: '',
  maxHallArea: '',
  capacity: '',
  facilities: [],
  rating: 0
})

const sortBy = ref('distance')
const selectedVenueId = ref(null)

const initMap = () => {
  AMapLoader.load({
    key: '67e19f1900ee22e38a6717a1934931e7', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      // 注意：生产环境建议使用代理或服务端转发请求，避免Key暴露
      // 检查域名是否已在高德开放平台控制台绑定
      console.log('正在加载高德地图...')
      map = new AMap.Map('amap-container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
        mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式 
      })
      
      // 添加标记点
      filteredVenues.value.forEach(venue => {
        let position
        if (venue.coordinates && venue.coordinates.length === 2) {
          position = new AMap.LngLat(venue.coordinates[0], venue.coordinates[1])
        } else {
          // 如果没有坐标，使用默认位置或随机偏移
          position = new AMap.LngLat(116.397428 + (Math.random() - 0.5) * 0.1, 39.90923 + (Math.random() - 0.5) * 0.1)
        }
        
        const marker = new AMap.Marker({
          position: position,
          title: venue.name,
          icon: new AMap.Icon({
            size: new AMap.Size(25, 34),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            imageSize: new AMap.Size(25, 34),
            imageOffset: new AMap.Pixel(0, 0)
          })
        })
        
        marker.on('click', () => {
          selectVenue(venue)
        })
        
        map.add(marker)
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})

const togglePanel = () => {
  isPanelCollapsed.value = !isPanelCollapsed.value
}

const confirmFilter = () => {
  showFilterDialog.value = false
  handleSearch()
}

// 筛选后的场馆列表
const filteredVenues = computed(() => {
  let result = [...venues]
  
  // 关键词筛选
  if (searchForm.keyword) {
    result = result.filter(v => 
      v.name.includes(searchForm.keyword) || v.address.includes(searchForm.keyword)
    )
  }
  
  // 地区筛选
  if (searchForm.region) {
    // 模拟地区筛选逻辑
    // 实际项目中应该根据 venue.region 或 venue.address 进行判断
  }

  // 面积筛选
  if (searchForm.area) {
    if (searchForm.area === 'large') {
      result = result.filter(v => v.area >= 50000)
    } else if (searchForm.area === 'medium') {
      result = result.filter(v => v.area >= 20000 && v.area < 50000)
    } else if (searchForm.area === 'small') {
      result = result.filter(v => v.area < 20000)
    }
  }

  return result
})

// 重置搜索
const resetSearch = () => {
  Object.assign(searchForm, {
    keyword: '',
    area: '',
    maxHallArea: '',
    capacity: '',
    facilities: [],
    rating: 0
  })
}

// 处理搜索
const handleSearch = () => {
  console.log('搜索参数：', searchForm)
}

// 处理排序
const handleSort = () => {
  console.log('排序方式：', sortBy.value)
}

// 选择场馆
const selectVenue = (venue) => {
  selectedVenueId.value = venue.id
  // 如果面板收起，点击标记点时展开面板查看详情
  if (isPanelCollapsed.value) {
    isPanelCollapsed.value = false
  }
  
  // 地图定位到对应坐标
  if (map && venue.coordinates && venue.coordinates.length === 2) {
    map.setZoomAndCenter(15, [venue.coordinates[0], venue.coordinates[1]])
  }
}

// 查看详情
const viewDetail = (venue) => {
  router.push(`/venue/detail/${venue.id}`)
}

// 格式化面积
const formatArea = (area) => {
  if (area >= 10000) {
    return (area / 10000).toFixed(1) + '万'
  }
  return area.toLocaleString()
}

// 获取标记点位置（模拟）
const getMarkerPosition = (venue) => {
  const positions = [
    { top: '30%', left: '40%' },
    { top: '50%', left: '60%' },
    { top: '35%', left: '55%' },
    { top: '60%', left: '45%' }
  ]
  return positions[venue.id % positions.length] || positions[0]
}
</script>

<style lang="scss" scoped>
.venue-search-page {
  padding-top: 80px;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #F9FAFB;
}

.map-container {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.amap-container {
  width: 100%;
  height: 100%;
}

.left-panel {
  position: absolute;
  top: 80px;
  left: 20px; /* Added spacing from edge */
  bottom: 20px; /* Added spacing from edge */
  width: 400px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  border-radius: 8px; /* Added border radius */

  &.collapsed {
    transform: translateX(-420px); /* Adjusted for margin */
    
    .panel-toggle {
      right: -32px;
      border-radius: 0 8px 8px 0;
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.panel-toggle {
  position: absolute;
  top: 50%;
  right: -24px;
  width: 24px;
  height: 48px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  border-radius: 0 8px 8px 0;
  transform: translateY(-50%);
  z-index: 101;
  color: #6B7280;

  &:hover {
    color: #204E9C;
    background: #F3F4F6;
  }
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.panel-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F3F4F6;
  
  h3 {
    margin: 0;
    font-size: 18px;
    color: #1F2937;
  }
}

.search-form {
  padding: 20px;
  border-bottom: 1px solid #F3F4F6;
  
  .form-item {
    margin-bottom: 16px;
  }
}

.filter-actions {
  display: flex;
  gap: 12px;
  justify-content: space-between;

  .el-button {
    flex: 1;
  }
}

.result-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #F9FAFB;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .count {
      font-size: 13px;
      color: #6B7280;

      .highlight {
        color: #3B82F6;
        font-weight: 600;
        margin: 0 2px;
      }
    }
  }

.venue-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.venue-card {
  background: white;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  &.active {
    border-color: #204E9C;
    background: #eff6ff;
  }
}

.venue-image {
    width: 100px;
    height: 100px; /* Match venue-info height approx */
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .venue-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .venue-name {
      margin: 0 0 8px 0;
      font-size: 15px;
      font-weight: 600;
      color: #1F2937;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .venue-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #6B7280;
        
        .el-icon {
          font-size: 14px;
          color: #3B82F6;
        }
      }
    }
    
    .venue-desc {
      font-size: 12px;
      color: #9CA3AF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>