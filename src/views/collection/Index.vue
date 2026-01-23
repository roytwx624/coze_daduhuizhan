<template>
  <div class="collection-page">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入文集标题、主题、作者或关联展会名称"
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
      </div>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <div class="filter-header">
          <span class="filter-title">高级筛选</span>
          <el-button type="primary" link @click="toggleFilter">
            {{ showFilter ? '收起' : '展开筛选' }}
            <el-icon><component :is="showFilter ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
          </el-button>
        </div>
        <el-collapse-transition>
          <div v-show="showFilter" class="filter-content">
            <div class="filter-row">
              <label>内容类型：</label>
              <el-radio-group v-model="searchForm.contentType">
                <el-radio label="">全部</el-radio>
                <el-radio label="report">展会报告</el-radio>
                <el-radio label="sharing">大咖分享</el-radio>
                <el-radio label="courseware">核心课件</el-radio>
              </el-radio-group>
            </div>
            <div class="filter-row">
              <label>行业分类：</label>
              <el-select v-model="searchForm.industry" placeholder="请选择行业" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="综合" value="综合" />
                <el-option label="电子科技" value="电子科技" />
                <el-option label="智能制造" value="智能制造" />
                <el-option label="商贸零售" value="商贸零售" />
                <el-option label="基础设施" value="基础设施" />
              </el-select>
            </div>
            <div class="filter-row">
              <label>发布时间：</label>
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
            <div class="filter-row">
              <label>是否免费：</label>
              <el-radio-group v-model="searchForm.isFree">
                <el-radio label="">全部</el-radio>
                <el-radio label="true">免费</el-radio>
                <el-radio label="false">付费</el-radio>
              </el-radio-group>
            </div>
            <div class="filter-actions">
              <el-button @click="resetFilter">重置</el-button>
              <el-button type="primary" @click="handleSearch">应用筛选</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>

      <!-- 搜索结果 -->
      <div class="results-section">
        <div class="results-header">
          <div class="results-count">
            共找到 <span class="count-number">{{ collections.length }}</span> 个文集
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-select v-model="sortBy" size="small" @change="handleSort" placeholder="请选择排序方式">
              <el-option label="发布时间 ↓" value="time-desc" />
              <el-option label="发布时间 ↑" value="time-asc" />
              <el-option label="下载量" value="downloads" />
            </el-select>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="collections.length > 0" class="collection-list">
          <div
            v-for="item in collections"
            :key="item.id"
            class="collection-item"
            @click="viewDetail(item)"
          >
            <div class="item-icon">
              <el-icon :size="32"><Document /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-header">
                <h3 class="item-title">{{ item.title }}</h3>
                <el-tag v-if="!item.isFree" type="warning" effect="dark" size="small" class="member-tag">
                  会员专享
                </el-tag>
                <el-tag v-else type="success" effect="dark" size="small" class="free-tag">
                  免费
                </el-tag>
              </div>
              
              <div class="item-meta">
                <span class="meta-item">
                  <el-icon><Tickets /></el-icon>
                  {{ item.type }}
                </span>
                <span class="meta-item">
                  <el-icon><User /></el-icon>
                  {{ item.author }}
                </span>
                <span class="meta-item">
                  <el-icon><Calendar /></el-icon>
                  {{ item.publishTime }}
                </span>
              </div>
              
              <div class="item-footer">
                <div class="download-info">
                  <el-icon><Download /></el-icon>
                  {{ formatNumber(item.downloads) }} 次下载
                </div>
                <el-button type="primary" size="small" @click.stop="downloadCollection(item)">
                  下载
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="未找到相关文集">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Document /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门文集推荐</h4>
              <div class="hot-collections">
                <el-tag
                  v-for="item in hotCollections"
                  :key="item.id"
                  class="hot-tag"
                  @click="handleHotClick(item)"
                >
                  {{ item.title }}
                </el-tag>
              </div>
            </div>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div v-if="collections.length > 0" class="pagination-section">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowUp, ArrowDown, Document, Tickets, User, FolderOpened, Calendar, Download } from '@element-plus/icons-vue'
import { collections as collectionData } from '@/data/mockData'

const router = useRouter()

const showFilter = ref(false)
const dateRange = ref([])
const sortBy = ref('time-desc')

const searchForm = reactive({
  keyword: '',
  contentType: '',
  industry: '',
  isFree: ''
})

const collections = ref([...collectionData])
const hotCollections = ref([...collectionData].slice(0, 3))

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 4
})

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const handleSearch = () => {
  console.log('搜索文集：', searchForm)
}

const resetFilter = () => {
  Object.assign(searchForm, {
    keyword: '',
    contentType: '',
    industry: '',
    isFree: ''
  })
  dateRange.value = []
}

const handleSort = () => {
  console.log('排序方式：', sortBy.value)
}

const viewDetail = (item) => {
  router.push(`/collection/detail/${item.id}`)
}

const handleHotClick = (item) => {
  searchForm.keyword = item.title
  handleSearch()
}

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toString()
}

const downloadCollection = (item) => {
  console.log('下载文集：', item.title)
  // 这里可以添加实际的下载逻辑
  alert(`开始下载：${item.title}`)
}
</script>

<style lang="scss" scoped>
.collection-page {
  padding: 100px 0 60px;
  min-height: calc(100vh - 80px);
  background: #F9FAFB;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.search-section {
  background: white;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .search-box {
    :deep(.el-input-group__append) {
      .el-button {
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 0 32px;
        font-size: 16px;
      }
    }
  }
}

.filter-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
}

.filter-content {
  padding-top: 16px;
  border-top: 2px solid #F3F4F6;
}

.filter-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    width: 100px;
    font-size: 14px;
    color: #374151;
    font-weight: 500;
    flex-shrink: 0;
  }
}

.filter-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
}

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
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
  
  span {
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
  }
  
  :deep(.el-select) {
    display: inline-flex;
    align-items: center;
    min-width: 120px;
  }
  
  :deep(.el-select__wrapper) {
    width: 100%;
  }
}

.collection-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.collection-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #204E9C;
    transform: translateY(-2px);
  }
}

.item-icon {
  width: 80px;
  height: 80px;
  background: rgba(32, 78, 156, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #204E9C;
  flex-shrink: 0;
  font-size: 40px;
  margin: auto 0;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
  margin-right: 16px;
}

.item-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.download-info {
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

:deep(.el-button) {
  border-radius: 6px;
  font-size: 14px;
  padding: 6px 16px;
  transition: all 0.3s ease;
}

/* 会员专享标签样式 - 与视频中心保持一致 */
:deep(.member-tag) {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  min-width: 80px;
  justify-content: center;
  background: linear-gradient(135deg, #FBBF24, #F59E0B);
  color: white;
  font-weight: 600;
  border-radius: 20px 0 20px 0;
  border: none;
  padding: 4px 12px;
  font-size: 13px;
}

/* 免费标签样式 - 与会员专享标签呼应设计 */
:deep(.free-tag) {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  min-width: 80px;
  justify-content: center;
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  font-weight: 600;
  border-radius: 20px 0 20px 0;
  border: none;
  padding: 4px 12px;
  font-size: 13px;
}

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

.hot-collections {
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

.pagination-section {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 2px solid #F3F4F6;
}

@media (max-width: 768px) {
  .collection-page {
    padding: 100px 16px 40px;
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .collection-item {
    flex-direction: column;
  }

  .item-icon {
    width: 100%;
  }

  .item-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
