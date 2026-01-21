<template>
  <div class="venue-search-page">
    <div class="container">
      <div class="page-layout">
        <!-- 左侧搜索面板 -->
        <div class="search-panel">
          <div class="panel-header">
            <h3>场馆搜索</h3>
            <el-button type="primary" link @click="resetSearch">重置</el-button>
          </div>

          <!-- 关键词搜索 -->
          <div class="panel-section">
            <label>关键词</label>
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

          <!-- 筛选条件 -->
          <div class="panel-section">
            <label>场馆面积</label>
            <el-select v-model="searchForm.area" placeholder="请选择" clearable @change="handleSearch" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="5万㎡以上" value="large" />
              <el-option label="2-5万㎡" value="medium" />
              <el-option label="2万㎡以下" value="small" />
            </el-select>
          </div>

          <div class="panel-section">
            <label>最大展厅面积</label>
            <el-select v-model="searchForm.maxHallArea" placeholder="请选择" clearable @change="handleSearch" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="5万㎡以上" value="5" />
              <el-option label="3-5万㎡" value="3" />
              <el-option label="1-3万㎡" value="1" />
              <el-option label="1万㎡以下" value="0" />
            </el-select>
          </div>

          <div class="panel-section">
            <label>可容纳人数</label>
            <el-select v-model="searchForm.capacity" placeholder="请选择" clearable @change="handleSearch" style="width: 100%">
              <el-option label="全部" value="" />
              <el-option label="5万人以上" value="50000" />
              <el-option label="2-5万人" value="20000" />
              <el-option label="1-2万人" value="10000" />
              <el-option label="1万人以下" value="0" />
            </el-select>
          </div>

          <div class="panel-section">
            <label>配套设施</label>
            <el-checkbox-group v-model="searchForm.facilities" @change="handleSearch">
              <el-checkbox label="会议室" />
              <el-checkbox label="餐厅" />
              <el-checkbox label="停车场" />
              <el-checkbox label="贵宾厅" />
              <el-checkbox label="展览馆" />
            </el-checkbox-group>
          </div>

          <div class="panel-section">
            <label>用户评分</label>
            <el-rate
              v-model="searchForm.rating"
              allow-half
              show-text
              :texts="['全部', '4分以上', '4.5分以上', '5分']"
              @change="handleSearch"
            />
          </div>
        </div>

        <!-- 右侧地图与结果 -->
        <div class="map-result-section">
          <!-- 结果统计 -->
          <div class="results-header">
            <div class="results-count">
              共找到 <span class="count-number">{{ filteredVenues.length }}</span> 个场馆
            </div>
            <div class="results-sort">
              <span>排序：</span>
              <el-radio-group v-model="sortBy" size="small" @change="handleSort">
                <el-radio-button label="distance">距离</el-radio-button>
                <el-radio-button label="area">面积</el-radio-button>
                <el-radio-button label="popularity">人气</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="map-container">
            <!-- 模拟地图 -->
            <div class="mock-map">
              <div class="map-placeholder">
                <el-icon :size="80"><MapLocation /></el-icon>
                <p>高德地图集成区域</p>
                <p class="hint">实际项目中将集成高德地图API</p>
              </div>
              
              <!-- 场馆标记点 -->
              <div
                v-for="venue in filteredVenues"
                :key="venue.id"
                class="map-marker"
                :style="getMarkerPosition(venue)"
                @click="selectVenue(venue)"
                :class="{ active: selectedVenueId === venue.id }"
              >
                <el-icon><LocationFilled /></el-icon>
              </div>
            </div>
          </div>

          <!-- 场馆列表 -->
          <div class="venue-list">
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
                <h3 class="venue-name">{{ venue.name }}</h3>
                <div class="venue-meta">
                  <div class="meta-item">
                    <el-icon><Location /></el-icon>
                    {{ venue.address }}
                  </div>
                  <div class="meta-item">
                    <el-icon><Grid /></el-icon>
                    面积：{{ formatArea(venue.area) }}㎡
                  </div>
                  <div class="meta-item">
                    <el-icon><User /></el-icon>
                    可容纳：{{ venue.capacity }}人
                  </div>
                </div>
                <div class="venue-footer">
                  <div class="venue-rating">
                    <el-rate v-model="venue.rating" disabled show-score text-color="#F59E0B" />
                    <span class="popularity">人气 {{ venue.popularity }}</span>
                  </div>
                  <el-button type="primary" @click.stop="viewDetail(venue)">查看详情</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, MapLocation, LocationFilled, Location, Grid, User } from '@element-plus/icons-vue'
import { venues } from '@/data/mockData'

const router = useRouter()

const searchForm = reactive({
  keyword: '',
  area: '',
  maxHallArea: '',
  capacity: '',
  facilities: [],
  rating: 0
})

const sortBy = ref('distance')
const selectedVenueId = ref(null)

// 筛选后的场馆列表
const filteredVenues = computed(() => {
  let result = [...venues]
  
  // 关键词筛选
  if (searchForm.keyword) {
    result = result.filter(v => 
      v.name.includes(searchForm.keyword) || v.address.includes(searchForm.keyword)
    )
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
  // 实际项目中会触发地图定位
}

// 查看详情
const viewDetail = (venue) => {
  router.push(`/venue/detail/${venue.id}`)
}

// 格式化面积
const formatArea = (area) => {
  return area.toLocaleString()
}

// 获取标记点位置（模拟）
const getMarkerPosition = (venue, index) => {
  const positions = [
    { top: '30%', left: '20%' },
    { top: '50%', left: '40%' },
    { top: '35%', left: '60%' },
    { top: '60%', left: '75%' }
  ]
  return positions[venue.id % positions.length] || positions[0]
}
</script>

<style lang="scss" scoped>
.venue-search-page {
  padding: 100px 0 60px;
  min-height: calc(100vh - 80px);
  background: #F9FAFB;
}

.container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}

// 左侧搜索面板
.search-panel {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F3F4F6;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin: 0;
  }
}

.panel-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }

  :deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :deep(.el-rate) {
    .el-rate__text {
      font-size: 12px;
    }
  }
}

// 右侧地图与结果
.map-result-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.results-count {
  font-size: 16px;
  color: #6B7280;

  .count-number {
    font-size: 24px;
    font-weight: 700;
    color: #204E9C;
    margin: 0 4px;
  }
}

.results-sort {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
}

.map-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.mock-map {
  width: 100%;
  height: 500px;
  position: relative;
  background: linear-gradient(135deg, #E8F4F8 0%, #D1E8E2 100%);
}

.map-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #6B7280;

  .el-icon {
    color: #204E9C;
    margin-bottom: 16px;
  }

  p {
    margin: 8px 0;
    font-size: 16px;

    &.hint {
      font-size: 14px;
      color: #9CA3AF;
    }
  }
}

.map-marker {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #204E9C;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(32, 78, 156, 0.4);

  &:hover {
    transform: scale(1.2);
    z-index: 10;
  }

  &.active {
    background: #DC2626;
    transform: scale(1.3);
    z-index: 10;
  }
}

// 场馆列表
.venue-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.venue-card {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
  }

  &.active {
    border-color: #204E9C;
  }
}

.venue-image {
  width: 200px;
  height: 150px;
  border-radius: 8px;
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
  display: flex;
  flex-direction: column;
}

.venue-name {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
}

.venue-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;

  .el-icon {
    color: #204E9C;
    font-size: 16px;
  }
}

.venue-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.venue-rating {
  display: flex;
  align-items: center;
  gap: 16px;

  :deep(.el-rate) {
    .el-rate__item {
      margin-right: 4px;
    }
  }

  .popularity {
    font-size: 13px;
    color: #6B7280;
  }
}

@media (max-width: 1024px) {
  .page-layout {
    grid-template-columns: 1fr;
  }

  .search-panel {
    position: static;
  }
}

@media (max-width: 768px) {
  .venue-search-page {
    padding: 100px 16px 40px;
  }

  .venue-card {
    flex-direction: column;
  }

  .venue-image {
    width: 100%;
    height: 200px;
  }
}
</style>
