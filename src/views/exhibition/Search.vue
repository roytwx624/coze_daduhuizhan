<template>
  <div class="exhibition-search-page">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入展会名称、主题、展品类别等关键词"
            size="large"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
            <template #append>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </div>
        
        <!-- 历史搜索 -->
        <div v-if="historySearch.length > 0" class="history-search">
          <span class="history-label">历史搜索：</span>
          <el-tag
            v-for="(item, index) in historySearch"
            :key="index"
            class="history-tag"
            @click="handleHistoryClick(item)"
          >
            {{ item }}
          </el-tag>
          <el-icon class="clear-history" @click="clearHistory"><Delete /></el-icon>
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <el-collapse v-model="activeFilter" class="filter-collapse">
          <el-collapse-item title="高级筛选" name="1">
            <div class="filter-content">
              <!-- 行业分类 -->
              <div class="filter-item">
                <label>行业分类：</label>
                <div class="filter-options">
                  <el-radio-group v-model="searchForm.industry">
                    <el-radio label="">全部</el-radio>
                    <el-radio v-for="item in industries" :key="item" :label="item">{{ item }}</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <!-- 举办时间 -->
              <div class="filter-item">
                <label>举办时间：</label>
                <div class="filter-options">
                  <el-radio-group v-model="searchForm.timeRange">
                    <el-radio label="">全部</el-radio>
                    <el-radio label="week">近一周</el-radio>
                    <el-radio label="month">近一月</el-radio>
                    <el-radio label="year">近一年</el-radio>
                  </el-radio-group>
                  <el-date-picker
                    v-model="customDateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="handleDateRangeChange"
                    style="margin-left: 16px"
                  />
                </div>
              </div>

              <!-- 举办城市 -->
              <div class="filter-item">
                <label>举办城市：</label>
                <div class="filter-options">
                  <el-select v-model="searchForm.city" placeholder="请选择城市" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option v-for="city in cities" :key="city" :label="city" :value="city" />
                  </el-select>
                </div>
              </div>

              <!-- 展会规模 -->
              <div class="filter-item">
                <label>展会规模：</label>
                <div class="filter-options">
                  <el-select v-model="searchForm.scale" placeholder="请选择" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="大型（5万㎡以上）" value="large" />
                    <el-option label="中型（1-5万㎡）" value="medium" />
                    <el-option label="小型（1万㎡以下）" value="small" />
                  </el-select>
                </div>
              </div>

              <!-- 展会级别 -->
              <div class="filter-item">
                <label>展会级别：</label>
                <div class="filter-options">
                  <el-select v-model="searchForm.level" placeholder="请选择" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="国际展" value="international" />
                    <el-option label="国家级" value="national" />
                    <el-option label="省级" value="provincial" />
                  </el-select>
                </div>
              </div>

              <div class="filter-actions">
                <el-button @click="resetFilter">重置筛选</el-button>
                <el-button type="primary" @click="handleSearch">应用筛选</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- 搜索结果 -->
      <div class="results-section">
        <div class="results-header">
          <div class="results-count">
            共找到 <span class="count-number">{{ searchResults.length }}</span> 个展会
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-radio-group v-model="sortBy" size="small" @change="handleSort">
              <el-radio-button label="综合">综合</el-radio-button>
              <el-radio-button label="time">开展时间</el-radio-button>
              <el-radio-button label="hot">热度</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="searchResults.length > 0" class="exhibition-list">
          <div
            v-for="item in searchResults"
            :key="item.id"
            class="exhibition-item"
          >
            <div class="item-logo">
              <img :src="item.poster" :alt="item.name" />
            </div>
            <div class="item-content">
              <div class="item-title">
                <h3>{{ item.name }}</h3>
                <el-button
                  :type="item.followed ? '' : 'primary'"
                  :icon="item.followed ? 'StarFilled' : 'Star'"
                  size="small"
                  @click="toggleFollow(item)"
                >
                  {{ item.followed ? '已关注' : '关注' }}
                </el-button>
              </div>
              <p class="item-desc">{{ item.description }}</p>
              <div class="item-meta">
                <div class="meta-row">
                  <span class="meta-item">
                    <el-icon><Calendar /></el-icon>
                    举办时间：{{ item.time }}
                  </span>
                  <span class="meta-item">
                    <el-icon><Location /></el-icon>
                    举办场馆：{{ item.venue }}
                  </span>
                </div>
                <div class="meta-tags">
                  <el-tag v-for="tag in item.tags" :key="tag" size="small" type="info">{{ tag }}</el-tag>
                  <el-tag size="small">{{ item.industry }}</el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="未找到相关展会">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Search /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门展会推荐</h4>
              <div class="hot-exhibitions">
                <el-tag
                  v-for="item in hotExhibitions"
                  :key="item.id"
                  class="hot-tag"
                  @click="handleHotClick(item)"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </div>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div v-if="searchResults.length > 0" class="pagination-section">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Delete, Calendar, Location, Star, StarFilled } from '@element-plus/icons-vue'
import { exhibitions } from '@/data/mockData'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  keyword: '',
  industry: '',
  timeRange: '',
  city: '',
  scale: '',
  level: ''
})

const customDateRange = ref([])
const activeFilter = ref('1')
const sortBy = ref('综合')

// 历史搜索
const historySearch = ref(['制冷展', '汽车展', '智能制造'])

// 筛选选项
const industries = ['电子科技', '智能制造', '家居建材', '商贸零售', '文化艺术', '医疗健康', '交通运输']
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']

// 搜索结果
const searchResults = ref([...exhibitions])

// 热门展会
const hotExhibitions = ref([
  { id: 1, name: '第三十七届制冷展' },
  { id: 2, name: '第66届中国特许加盟展' },
  { id: 3, name: '北京国际汽车展览会' },
  { id: 4, name: '中国国际医疗器械展' }
])

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 156
})

// 处理搜索
const handleSearch = () => {
  console.log('搜索：', searchForm)
  // 实际项目中这里会调用API
  // 这里仅做演示
  if (searchForm.keyword) {
    // 添加到历史搜索
    if (!historySearch.value.includes(searchForm.keyword)) {
      historySearch.value.unshift(searchForm.keyword)
      if (historySearch.value.length > 10) {
        historySearch.value = historySearch.value.slice(0, 10)
      }
    }
  }
}

// 历史搜索点击
const handleHistoryClick = (keyword) => {
  searchForm.keyword = keyword
  handleSearch()
}

// 清除历史
const clearHistory = () => {
  historySearch.value = []
}

// 重置筛选
const resetFilter = () => {
  Object.assign(searchForm, {
    keyword: '',
    industry: '',
    timeRange: '',
    city: '',
    scale: '',
    level: ''
  })
  customDateRange.value = []
}

// 日期范围变化
const handleDateRangeChange = (dates) => {
  console.log('自定义日期范围：', dates)
}

// 排序
const handleSort = () => {
  console.log('排序方式：', sortBy.value)
}

// 关注/取消关注
const toggleFollow = (item) => {
  item.followed = !item.followed
  ElMessage({
    message: item.followed ? '已关注该展会' : '已取消关注',
    type: 'success'
  })
}

// 热门展会点击
const handleHotClick = (item) => {
  searchForm.keyword = item.name
  handleSearch()
}

// 分页处理
const handleSizeChange = (size) => {
  pagination.pageSize = size
  console.log('每页条数：', size)
}

const handleCurrentChange = (page) => {
  pagination.currentPage = page
  console.log('当前页：', page)
}

onMounted(() => {
  // 初始化搜索结果
  searchResults.value.forEach(item => {
    item.followed = false
  })
})
</script>

<style lang="scss" scoped>
.exhibition-search-page {
  padding: 100px 0 60px;
  min-height: calc(100vh - 80px);
  background: #F9FAFB;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

// 搜索区域
.search-section {
  background: white;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.search-box {
  margin-bottom: 20px;

  :deep(.el-input-group__append) {
    padding: 0;

    .el-button {
      border: none;
      border-radius: 0 8px 8px 0;
      padding: 0 32px;
      font-size: 16px;
    }
  }
}

.history-search {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.history-label {
  font-size: 14px;
  color: #6B7280;
}

.history-tag {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.clear-history {
  margin-left: auto;
  cursor: pointer;
  color: #9CA3AF;
  transition: color 0.3s ease;

  &:hover {
    color: #DC2626;
  }
}

// 筛选区域
.filter-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filter-collapse {
  border: none;

  :deep(.el-collapse-item__header) {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    border: none;
    padding: 0;
    margin-bottom: 20px;
  }

  :deep(.el-collapse-item__wrap) {
    border: none;
  }

  :deep(.el-collapse-item__content) {
    padding: 0;
  }
}

.filter-content {
  padding: 0 0 20px;
}

.filter-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }

  label {
    width: 100px;
    font-size: 14px;
    color: #374151;
    font-weight: 500;
    flex-shrink: 0;
  }

  .filter-options {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.filter-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
}

// 搜索结果
.results-section {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 2px solid #F3F4F6;
  margin-bottom: 24px;
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

// 结果列表
.exhibition-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exhibition-item {
  display: flex;
  gap: 24px;
  padding: 24px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #204E9C;
  }
}

.item-logo {
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

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1F2937;
    margin: 0;
    flex: 1;
  }
}

.item-desc {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-row {
  display: flex;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;

  .el-icon {
    color: #204E9C;
  }
}

.meta-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

// 无结果
.empty-results {
  padding: 60px 0;
  text-align: center;
}

.empty-suggestions {
  margin-top: 32px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 16px;
  }
}

.hot-exhibitions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.hot-tag {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

// 分页
.pagination-section {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 2px solid #F3F4F6;
}

@media (max-width: 768px) {
  .exhibition-search-page {
    padding: 100px 16px 40px;
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .exhibition-item {
    flex-direction: column;
  }

  .item-logo {
    width: 100%;
    height: 200px;
  }

  .meta-row {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
