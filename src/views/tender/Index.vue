<template>
  <div class="tender-page">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="输入招投标信息标题、招标单位、关联展会名称..."
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
              <label>项目类型：</label>
              <el-select v-model="filters.projectType" placeholder="选择项目类型" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="展会策划" value="展会策划" />
                <el-option label="搭建" value="搭建" />
                <el-option label="宣传推广" value="宣传推广" />
                <el-option label="物流运输" value="物流运输" />
                <el-option label="其他" value="其他" />
              </el-select>
            </div>
            
            <div class="filter-row">
              <label>招标单位类型：</label>
              <el-select v-model="filters.tendererType" placeholder="选择单位类型" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="政府机构" value="政府机构" />
                <el-option label="企业" value="企业" />
                <el-option label="其他" value="其他" />
              </el-select>
            </div>
            
            <div class="filter-row">
              <label>所在地区：</label>
              <el-cascader
                v-model="filters.region"
                :options="regionOptions"
                placeholder="选择地区"
                clearable
                style="width: 200px"
              />
            </div>
            
            <div class="filter-row">
              <label>报名截止时间：</label>
              <el-select v-model="filters.deadline" placeholder="选择时间" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="≤3天" value="3" />
                <el-option label="3-7天" value="7" />
                <el-option label="≥7天" value="30" />
              </el-select>
            </div>
            
            <div class="filter-row">
              <label>项目预算：</label>
              <el-select v-model="filters.budget" placeholder="选择预算" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="10万以下" value="1" />
                <el-option label="10-50万" value="2" />
                <el-option label="50-100万" value="3" />
                <el-option label="100万以上" value="4" />
              </el-select>
            </div>
            
            <div class="filter-row">
              <label>招标状态：</label>
              <el-select v-model="filters.status" placeholder="选择状态" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="招标中" value="招标中" />
                <el-option label="已结束" value="已结束" />
              </el-select>
            </div>
            
            <div class="filter-actions">
              <el-button @click="resetFilters">重置</el-button>
              <el-button type="primary" @click="handleSearch">应用筛选</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>

      <!-- 搜索结果 -->
      <div class="results-section">
        <div class="results-header">
          <div class="results-count">
            共找到 <span class="count-number">{{ filteredResults.length }}</span> 条招投标信息
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-select v-model="sortBy" size="small" @change="sortResults" placeholder="请选择排序方式">
              <el-option label="发布时间 ↓" value="desc" />
              <el-option label="发布时间 ↑" value="asc" />
            </el-select>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="filteredResults.length > 0" class="tender-list">
          <div
            v-for="(item, index) in filteredResults"
            :key="item.id"
            class="tender-item"
            @click="goToDetail(item.id)"
          >
            <div class="tender-icon">
              <el-icon :size="28"><Document /></el-icon>
            </div>
            <div class="tender-content">
              <div class="tender-header">
                <h3 class="tender-title" v-html="highlightKeyword(item.title)"></h3>
                <el-tag size="small" type="info" class="scope-tag">
                  {{ item.scope }}
                </el-tag>
                <el-tag :type="item.status === '招标中' ? 'danger' : 'info'" size="small">
                  {{ item.status }}
                </el-tag>
              </div>
              
              <div class="tender-meta">
                <div class="meta-left">
                  <span class="meta-item">
                    <el-icon><OfficeBuilding /></el-icon>
                    {{ item.organization }}
                  </span>
                  <span class="meta-item">
                    <el-icon><Location /></el-icon>
                    {{ item.region }}
                  </span>
                  <span class="meta-item">
                    <el-icon><Calendar /></el-icon>
                    {{ item.publishTime }}
                  </span>
                  <span v-if="item.status !== '已结束'" class="meta-item">
                    <el-icon><Clock /></el-icon>
                    剩余 {{ getRemainingDays(item.deadline) }} 天
                  </span>
                </div>
              </div>
              
              <div class="tender-footer">
                <div class="budget-info">
                  <span class="budget-label">预算金额：</span>
                  <span class="budget-amount">{{ item.budgetAmount }} 万元（人民币）</span>
                </div>
                <el-button type="primary" size="small">查看公告</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="未找到相关招投标信息">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Document /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门招投标推荐</h4>
              <div class="hot-tenders">
                <el-tag
                  v-for="item in hotTenders.slice(0, 10)"
                  :key="item.id"
                  class="hot-tag"
                  @click="goToDetail(item.id)"
                >
                  {{ item.title }}
                </el-tag>
              </div>
            </div>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div v-if="filteredResults.length > 0" class="pagination-section">
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowUp, ArrowDown, Document, OfficeBuilding, Calendar, Clock, Money, Location } from '@element-plus/icons-vue'
import { biddingInfo } from '@/data/mockData'

const router = useRouter()

const searchKeyword = ref('')
const sortBy = ref('desc')
const showFilter = ref(false)

const filters = ref({
  projectType: '',
  tendererType: '',
  region: [],
  deadline: '',
  budget: '',
  status: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 4
})

const regionOptions = [
  {
    value: '北京',
    label: '北京市',
    children: [
      { value: '朝阳', label: '朝阳区' },
      { value: '海淀', label: '海淀区' },
      { value: '东城', label: '东城区' },
      { value: '西城', label: '西城区' }
    ]
  },
  {
    value: '上海',
    label: '上海市',
    children: [
      { value: '浦东', label: '浦东新区' },
      { value: '黄浦', label: '黄浦区' },
      { value: '徐汇', label: '徐汇区' }
    ]
  },
  {
    value: '广州',
    label: '广州市',
    children: [
      { value: '天河', label: '天河区' },
      { value: '越秀', label: '越秀区' },
      { value: '海珠', label: '海珠区' }
    ]
  }
]

const tenderData = ref([])
const hotTenders = ref([])

onMounted(() => {
  tenderData.value = biddingInfo || []
  hotTenders.value = biddingInfo.slice(0, 5) || []
})

const filteredResults = computed(() => {
  let results = [...tenderData.value]

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.tenderer.toLowerCase().includes(keyword) ||
        item.relatedExhibition?.toLowerCase().includes(keyword) ||
        item.scope.toLowerCase().includes(keyword)
    )
  }

  if (filters.value.projectType) {
    results = results.filter((item) => item.projectType === filters.value.projectType)
  }

  if (filters.value.tendererType) {
    results = results.filter((item) => item.tendererType === filters.value.tendererType)
  }

  if (filters.value.region.length > 0) {
    results = results.filter((item) => item.region === filters.value.region[1])
  }

  if (filters.value.deadline) {
    const days = parseInt(filters.value.deadline)
    const now = new Date()
    results = results.filter((item) => {
      const deadline = new Date(item.deadline)
      const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
      if (days === 3) return diffDays <= 3
      if (days === 7) return diffDays > 3 && diffDays <= 7
      if (days === 30) return diffDays > 7
      return true
    })
  }

  if (filters.value.budget) {
    const budgetLevel = parseInt(filters.value.budget)
    results = results.filter((item) => {
      const budget = item.budgetValue || 0
      if (budgetLevel === 1) return budget < 10
      if (budgetLevel === 2) return budget >= 10 && budget < 50
      if (budgetLevel === 3) return budget >= 50 && budget < 100
      if (budgetLevel === 4) return budget >= 100
      return true
    })
  }

  if (filters.value.status) {
    results = results.filter((item) => item.status === filters.value.status)
  }

  if (sortBy.value === 'asc') {
    results.sort((a, b) => new Date(a.publishTime) - new Date(b.publishTime))
  } else {
    results.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
  }

  return results
})

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
}

const resetFilters = () => {
  Object.assign(filters.value, {
    projectType: '',
    tendererType: '',
    region: [],
    deadline: '',
    budget: '',
    status: ''
  })
  searchKeyword.value = ''
}

const sortResults = () => {
  console.log('排序方式:', sortBy.value)
}

const goToDetail = (id) => {
  router.push(`/tender/detail/${id}`)
}

const highlightKeyword = (text) => {
  if (!searchKeyword.value) return text
  const keyword = searchKeyword.value
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}

const getRemainingDays = (deadline) => {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}
</script>

<style lang="scss" scoped>
.tender-page {
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

.tender-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tender-item {
  display: flex;
  gap: 24px;
  padding: 24px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
    border-color: #204E9C;
  }
}

.tender-icon {
  width: 80px;
  height: 80px;
  background: rgba(32, 78, 156, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #204E9C;
  flex-shrink: 0;
  margin: auto 0;
}

.tender-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 8px;
}

.tender-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.tender-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  line-height: 1.4;
  
  :deep(.highlight) {
    background: #fef3c7;
    color: #d97706;
    padding: 2px 4px;
    border-radius: 3px;
  }
}

.scope-tag {
  margin-left: 6px;
  background: #EFF6FF;
  color: #2563EB;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
}

.tender-meta {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.meta-left {
  display: flex;
  gap: 24px;
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
  }
}

.tender-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  margin-top: 8px;
}

.budget-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.budget-label {
  color: #4B5563;
}

.budget-amount {
  color: #204E9C;
  font-weight: 700;
  font-size: 18px;
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

.hot-tenders {
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
  .tender-page {
    padding: 100px 16px 40px;
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .tender-item {
    flex-direction: column;
  }

  .tender-icon {
    width: 100%;
  }

  .tender-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-left {
    flex-direction: column;
    gap: 8px;
  }

  .tender-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
