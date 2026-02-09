<template>
  <div class="business-hall-page">
    <div class="container">
      <!-- 操作按钮区域 -->
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" size="large" @click="handlePublish">
            <el-icon><Edit /></el-icon>
            我要发布
          </el-button>
          <el-button size="large" @click="handlePublishRecord">
            <el-icon><DocumentCopy /></el-icon>
            发布记录
          </el-button>
          <el-button size="large" @click="handleQuoteRecord">
            <el-icon><Notebook /></el-icon>
            报价记录
          </el-button>
        </div>
      </div>

      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入商机标题、关键词、服务商名称等"
            size="large"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <!-- 热门搜索 -->
        <div v-if="hotSearches.length > 0" class="history-search">
          <span class="history-label">热门搜索：</span>
          <el-tag
            v-for="(item, index) in hotSearches"
            :key="index"
            class="history-tag"
            @click="handleHotSearchClick(item)"
          >
            {{ item }}
          </el-tag>
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
              <label>商机类型：</label>
              <el-select v-model="searchForm.category" placeholder="请选择" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="展会服务" value="exhibition" />
                <el-option label="酒店服务" value="hotel" />
                <el-option label="场馆租赁" value="venue" />
                <el-option label="设备租赁" value="equipment" />
                <el-option label="其他服务" value="other" />
              </el-select>
            </div>
            <div class="filter-row">
              <label>所在城市：</label>
              <el-select v-model="searchForm.city" placeholder="请选择" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="北京" value="北京市" />
                <el-option label="上海" value="上海市" />
                <el-option label="广州" value="广州市" />
                <el-option label="深圳" value="深圳市" />
                <el-option label="杭州" value="杭州市" />
              </el-select>
            </div>
            <div class="filter-row">
              <label>预算范围：</label>
              <el-select v-model="searchForm.budgetRange" placeholder="请选择" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="5万以下" value="low" />
                <el-option label="5-20万" value="medium" />
                <el-option label="20-50万" value="high" />
                <el-option label="50万以上" value="very-high" />
              </el-select>
            </div>
            <div class="filter-actions">
              <el-button @click="resetFilter">重置筛选</el-button>
              <el-button type="primary" @click="handleSearch">应用筛选</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>



      <!-- 搜索结果 -->
      <div class="results-section">
        <div class="results-header">
          <div class="results-count">
            共找到 <span class="count-number">{{ filteredBusinesses.length }}</span> 个商机
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-select v-model="sortBy" size="small" @change="handleSort" placeholder="请选择排序方式">
              <el-option label="最新发布" value="newest" />
              <el-option label="预算从高到低" value="budget-desc" />
              <el-option label="预算从低到高" value="budget-asc" />
            </el-select>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="filteredBusinesses.length > 0" class="business-grid">
          <div v-for="item in filteredBusinesses" :key="item.id" class="business-card">
            <div class="business-header">
              <h3 class="business-title">{{ item.title }}</h3>
              <el-tag :type="getTagType(item.category)">{{ getItemCategory(item.category) }}</el-tag>
            </div>
            <div class="business-meta">
              <div class="meta-item">
                <el-icon><Location /></el-icon>
                <span>{{ item.city }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Calendar /></el-icon>
                <span>{{ item.period }}</span>
              </div>
              <div class="meta-item">
                <el-icon><UserFilled /></el-icon>
                <span>{{ item.provider }}</span>
              </div>
            </div>
            <div class="business-description">{{ item.description }}</div>
            <div class="business-footer">
              <div class="business-price">
                <span class="price-label">预算：</span>
                <span class="price-value">{{ item.budget }}</span>
              </div>
              <div class="business-actions">
                <el-button type="primary" size="small" @click="contactBusiness(item)">
                  <el-icon><ChatLineSquare /></el-icon>
                  联系
                </el-button>
                <el-button type="success" size="small" @click="quoteBusiness(item)">
                  <el-icon><Notebook /></el-icon>
                  发起报价
                </el-button>
                <el-button size="small" @click="saveBusiness(item)">
                  <el-icon><Star /></el-icon>
                  收藏
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="暂无相关商机">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Shop /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门商机推荐</h4>
              <div class="hot-businesses">
                <el-tag
                  v-for="item in hotBusinesses"
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
        <div v-if="filteredBusinesses.length > 0" class="pagination-section">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[12, 24, 36]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredBusinesses.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Shop, Timer, Connection, Check, Location, Calendar, UserFilled, ChatLineSquare, Star, ArrowUp, ArrowDown, Edit, DocumentCopy, Notebook } from '@element-plus/icons-vue'

const showFilter = ref(false)
const sortBy = ref('newest')

const searchForm = ref({
  keyword: '',
  category: '',
  city: '',
  budgetRange: ''
})

const pagination = ref({
  currentPage: 1,
  pageSize: 12,
  total: 6
})

const savedBusinesses = ref([])

const businessStats = ref({
  total: 156,
  recent: 28,
  partners: 89,
  successful: 45
})

const businessData = ref([
  {
    id: 1,
    title: '2026北京国际汽车展览会特装展位搭建服务',
    category: 'exhibition',
    city: '北京市',
    period: '2026-04-20至2026-04-28',
    provider: '北京创意展览服务有限公司',
    budget: '5-8万元',
    description: '寻找专业的特装展位搭建服务商，要求有大型车展经验，能够提供创意设计和高质量施工服务。',
    status: 'active'
  },
  {
    id: 2,
    title: '2026上海国际电子展翻译服务',
    category: 'exhibition',
    city: '上海市',
    period: '2026-05-10至2026-05-14',
    provider: '上海同声传译公司',
    budget: '0.8-1.2万元',
    description: '需要英语、日语、德语专业翻译人员，为国际电子展提供现场翻译服务。',
    status: 'active'
  },
  {
    id: 3,
    title: '2026广州国际家具展酒店预订服务',
    category: 'hotel',
    city: '广州市',
    period: '2026-03-18至2026-03-22',
    provider: '广州会展旅游服务公司',
    budget: '1.5-2万元',
    description: '为参展商和观众提供酒店预订服务，需要与多家酒店达成合作协议，确保房源充足和优惠价格。',
    status: 'active'
  },
  {
    id: 4,
    title: '2026深圳国际科技展场馆租赁',
    category: 'venue',
    city: '深圳市',
    period: '2026-06-01至2026-06-05',
    provider: '深圳国际会展中心',
    budget: '10-15万元',
    description: '租赁深圳国际会展中心的主要展厅，用于举办2026深圳国际科技展。',
    status: 'active'
  },
  {
    id: 5,
    title: '2026成都国际食品展设备租赁',
    category: 'equipment',
    city: '成都市',
    period: '2026-07-15至2026-07-19',
    provider: '成都展览设备租赁公司',
    budget: '2-3万元',
    description: '租赁展览所需的桌椅、展架、音响设备等，确保展会顺利进行。',
    status: 'active'
  },
  {
    id: 6,
    title: '2026西安国际旅游展宣传推广服务',
    category: 'other',
    city: '西安市',
    period: '2026-08-10至2026-08-14',
    provider: '西安文化传媒公司',
    budget: '3-4万元',
    description: '为2026西安国际旅游展提供全面的宣传推广服务，包括线上线下宣传、媒体合作等。',
    status: 'active'
  }
])

// 热门商机
const hotBusinesses = ref([...businessData.value].slice(0, 4))

// 热门搜索
const hotSearches = ref([
  '展位搭建',
  '翻译服务',
  '物流运输',
  '宣传推广',
  '礼仪接待',
  '设备租赁'
])

const handleHotSearchClick = (keyword) => {
  searchForm.value.keyword = keyword
  handleSearch()
}

const filteredBusinesses = computed(() => {
  let results = [...businessData.value]
  
  if (searchForm.value.keyword) {
    const keyword = searchForm.value.keyword.toLowerCase()
    results = results.filter(item => 
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.provider.toLowerCase().includes(keyword)
    )
  }
  
  if (searchForm.value.category) {
    results = results.filter(item => item.category === searchForm.value.category)
  }
  
  if (searchForm.value.city) {
    results = results.filter(item => item.city === searchForm.value.city)
  }
  
  if (searchForm.value.budgetRange) {
    // 根据预算范围过滤
    results = results.filter(item => {
      const budget = item.budget
      if (searchForm.value.budgetRange === 'low') {
        return budget.includes('5万以下')
      } else if (searchForm.value.budgetRange === 'medium') {
        return budget.includes('5-20万')
      } else if (searchForm.value.budgetRange === 'high') {
        return budget.includes('20-50万')
      } else if (searchForm.value.budgetRange === 'very-high') {
        return budget.includes('50万以上')
      }
      return true
    })
  }
  
  // 排序
  if (sortBy.value === 'newest') {
    // 按ID降序排列（模拟最新发布）
    results.sort((a, b) => b.id - a.id)
  } else if (sortBy.value === 'budget-desc') {
    // 按预算从高到低排序
    results.sort((a, b) => {
      const budgetA = parseFloat(a.budget)
      const budgetB = parseFloat(b.budget)
      return budgetB - budgetA
    })
  } else if (sortBy.value === 'budget-asc') {
    // 按预算从低到高排序
    results.sort((a, b) => {
      const budgetA = parseFloat(a.budget)
      const budgetB = parseFloat(b.budget)
      return budgetA - budgetB
    })
  }
  
  return results
})

const getTagType = (category) => {
  const typeMap = {
    exhibition: 'primary',
    hotel: 'success',
    venue: 'warning',
    equipment: 'info',
    other: 'default'
  }
  return typeMap[category] || 'default'
}

const getItemCategory = (category) => {
  const categoryMap = {
    exhibition: '展会服务',
    hotel: '酒店服务',
    venue: '场馆租赁',
    equipment: '设备租赁',
    other: '其他服务'
  }
  return categoryMap[category] || '其他服务'
}

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const handleSearch = () => {
  console.log('搜索商机：', searchForm.value)
  pagination.value.currentPage = 1
  pagination.value.total = filteredBusinesses.value.length
}

const resetFilter = () => {
  searchForm.value = {
    keyword: '',
    category: '',
    city: '',
    budgetRange: ''
  }
  pagination.value.currentPage = 1
}

const handleSort = () => {
  console.log('排序方式：', sortBy.value)
  pagination.value.currentPage = 1
}

const handleHotClick = (business) => {
  searchForm.value.keyword = business.title
  handleSearch()
}

const contactBusiness = (business) => {
  // 联系商机逻辑
  console.log('联系商机:', business)
}

const saveBusiness = (business) => {
  // 收藏商机逻辑
  if (!savedBusinesses.value.some(item => item.id === business.id)) {
    savedBusinesses.value.push(business)
  }
  console.log('收藏商机:', business)
}

const quoteBusiness = (business) => {
  // 发起报价逻辑
  console.log('发起报价:', business)
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
}

const handleCurrentChange = (current) => {
  pagination.value.currentPage = current
}

const handlePublish = () => {
  // 我要发布逻辑
  console.log('我要发布')
}

const handlePublishRecord = () => {
  // 发布记录逻辑
  console.log('发布记录')
}

const handleQuoteRecord = () => {
  // 报价记录逻辑
  console.log('报价记录')
}

onMounted(() => {
  // 初始化逻辑
  pagination.value.total = businessData.value.length
})
</script>

<style scoped lang="scss">
.business-hall-page {
  padding: 100px 0 60px;
  min-height: calc(100vh - 80px);
  background: #F9FAFB;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

// 操作按钮区域
.action-section {
  margin-bottom: 24px;

  .action-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    
    .el-button {
      &.el-button--primary {
        background-color: #2563EB;
        border-color: #2563EB;
        
        &:hover {
          background-color: #1D4ED8;
          border-color: #1D4ED8;
        }
      }
      
      &:not(.el-button--primary) {
        background-color: white;
        border-color: #E5E7EB;
        color: #374151;
        
        &:hover {
          border-color: #2563EB;
          color: #2563EB;
        }
      }
    }
  }
}

// 搜索区域
.search-section {
  background: white;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .search-box {
    margin-bottom: 20px;

    :deep(.el-input-group__append) {
      padding: 0;

      .el-button {
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 0 32px;
        font-size: 16px;
        background-color: #6B7280;
        
        &:hover {
          background-color: #4B5563;
        }
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

.filter-header .el-button {
  &.el-button--primary {
    &.is-plain {
      color: #2563EB;
      border-color: #2563EB;
      background-color: white;
      
      &:hover {
        color: white;
        background-color: #2563EB;
        border-color: #2563EB;
      }
    }
  }
}

.filter-content {
  padding-top: 16px;
  border-top: 2px solid #F3F4F6;
}

.filter-row {
  display: flex;
  align-items: flex-start;
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
    padding-top: 8px;
  }

  :deep(.el-checkbox-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  :deep(.el-select .el-input__wrapper:hover) {
    border-color: #2563EB;
  }
  
  :deep(.el-select .el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #2563EB inset;
  }
}

.filter-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  
  .el-button {
    &.el-button--primary {
      background-color: #2563EB;
      border-color: #2563EB;
      
      &:hover {
        background-color: #1D4ED8;
        border-color: #1D4ED8;
      }
    }
  }
}

// 数据统计
.business-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  .stat-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    .stat-icon {
      font-size: 32px;
      color: #2563EB;
      margin-right: 20px;
    }
    
    .stat-info {
      flex: 1;
      
      .stat-number {
        font-size: 24px;
        font-weight: bold;
        color: #2563EB;
        margin-bottom: 5px;
      }
      
      .stat-label {
        font-size: 14px;
        color: #6B7280;
      }
    }
  }
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
    color: #2563EB;
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
    
    &:hover {
      border-color: #2563EB;
    }
    
    &.is-focus {
      box-shadow: 0 0 0 1px #2563EB inset;
    }
  }
}

// 商机网格
.business-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
  
  .business-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 28px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(37, 99, 235, 0.1);
    }
    
    .business-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      
      .business-title {
        font-size: 20px;
        font-weight: bold;
        color: #1F2937;
        margin: 0;
        flex: 1;
        margin-right: 12px;
      }
      
      .el-tag {
        background-color: #EFF6FF;
        color: #2563EB;
        border: none;
        
        &.el-tag--primary,
        &.el-tag--success,
        &.el-tag--warning,
        &.el-tag--info,
        &.el-tag--default {
          background-color: #EFF6FF;
          color: #2563EB;
          border: none;
        }
      }
    }
    
    .business-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
      
      .meta-item {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #6B7280;
        
        .el-icon {
          margin-right: 6px;
          font-size: 16px;
          color: #2563EB;
        }
      }
    }
    
    .business-description {
      font-size: 15px;
      line-height: 1.6;
      color: #6B7280;
      margin-bottom: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    
    .business-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .business-price {
        .price-label {
          font-size: 15px;
          color: #6B7280;
        }
        
        .price-value {
          font-size: 18px;
          font-weight: bold;
          color: #2563EB;
        }
      }
      
      .business-actions {
        display: flex;
        gap: 12px;

        .el-button {
          font-size: 14px;
          
          &.el-button--primary {
            background-color: #2563EB;
            border-color: #2563EB;
            
            &:hover {
              background-color: #1D4ED8;
              border-color: #1D4ED8;
            }
          }
          
          &.el-button--success {
            background-color: #059669;
            border-color: #059669;
            
            &:hover {
              background-color: #047857;
              border-color: #047857;
            }
          }
        }
      }
    }
  }
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

.hot-businesses {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.hot-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  
  background-color: #EFF6FF;
  color: #2563EB;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    background-color: #DBEAFE;
  }
}

// 分页
.pagination-section {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  margin-top: 32px;
  border-top: 2px solid #F3F4F6;
  
  :deep(.el-pagination__item.is-current) {
    background-color: #2563EB;
    border-color: #2563EB;
  }
  
  :deep(.el-pagination__item:hover:not(.is-disabled)) {
    color: #2563EB;
    border-color: #2563EB;
  }
  
  :deep(.el-pagination__arrow:hover:not(.is-disabled)) {
    color: #2563EB;
  }
}

@media (max-width: 768px) {
  .business-hall-page {
    padding: 100px 16px 40px;
  }

  .container {
    padding: 0 16px;
  }

  .action-section {
    .action-buttons {
      flex-direction: column;
      gap: 12px;

      .el-button {
        width: 100%;
        justify-content: center;
        
        &.el-button--primary {
          background-color: #2563EB;
          border-color: #2563EB;
          
          &:hover {
            background-color: #1D4ED8;
            border-color: #1D4ED8;
          }
        }
      }
    }
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .business-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .business-grid {
    grid-template-columns: 1fr;
  }

  .filter-row {
    flex-direction: column;
    
    label {
      width: 100%;
      padding-top: 0;
      margin-bottom: 8px;
    }
  }
}
</style>