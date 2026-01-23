<template>
  <div class="policy-search-page">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入政策标题、核心条款、发布单位或关联行业"
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
              <label>政策类型：</label>
              <el-select v-model="searchForm.policyType" placeholder="请选择" clearable style="width: 200px">
                <el-option label="全部" value="" />
                <el-option label="优惠政策" value="优惠" />
                <el-option label="资金支持" value="资金" />
                <el-option label="税收优惠" value="税收" />
                <el-option label="重点扶持" value="扶持" />
              </el-select>
            </div>
            <div class="filter-row">
              <label>发布层级：</label>
              <el-radio-group v-model="searchForm.level">
                <el-radio label="">全部</el-radio>
                <el-radio label="国家">国家级</el-radio>
                <el-radio label="province">省级</el-radio>
                <el-radio label="city">市级</el-radio>
                <el-radio label="district">区县级</el-radio>
              </el-radio-group>
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
              <label>适用主体：</label>
              <el-checkbox-group v-model="searchForm.applicableTo">
                <el-checkbox label="exhibitor">参展商</el-checkbox>
                <el-checkbox label="organizer">主办方</el-checkbox>
                <el-checkbox label="venue">场馆方</el-checkbox>
                <el-checkbox label="provider">服务商</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="filter-row">
              <label>政策状态：</label>
              <el-radio-group v-model="searchForm.status">
                <el-radio label="">全部</el-radio>
                <el-radio label="valid">有效</el-radio>
                <el-radio label="expired">失效</el-radio>
                <el-radio label="upcoming">即将生效</el-radio>
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
            共找到 <span class="count-number">{{ policies.length }}</span> 条政策
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-select v-model="sortBy" size="small" @change="handleSort" placeholder="请选择排序方式">
              <el-option label="发布时间 ↓" value="time-desc" />
              <el-option label="发布时间 ↑" value="time-asc" />
            </el-select>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="filteredResults.length > 0" class="policy-list">
          <div
            v-for="item in filteredResults"
            :key="item.id"
            class="policy-item"
            @click="viewDetail(item)"
          >
            <div class="policy-icon">
              <el-icon :size="28"><Document /></el-icon>
            </div>
            <div class="policy-content">
              <div class="policy-header">
                <h3 class="policy-title">{{ item.title }}</h3>
                <div class="policy-tags">
                  <el-tag :type="getStatusType(item.category)" size="small">
                    {{ item.category }}
                  </el-tag>
                  <el-tag size="small" type="primary">
                    {{ item.subjectCategory }}
                  </el-tag>
                </div>
              </div>
              
              <div class="policy-meta">
                <div class="meta-left">
                  <span class="meta-item">
                    <el-icon><OfficeBuilding /></el-icon>
                    {{ item.publisher }}
                  </span>
                  <span class="meta-item">
                    <el-icon><Calendar /></el-icon>
                    {{ item.publishTime }}
                  </span>
                </div>
              </div>
              
              <p class="policy-summary">{{ item.summary }}</p>
              
              <div class="policy-footer">
                <span class="document-number">发文序号：{{ item.documentNumber }}</span>
                <el-button type="primary" size="small" @click.stop="viewDetail(item)">查看原文</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="未找到相关政策">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Document /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门政策推荐</h4>
              <div class="hot-policies">
                <el-tag
                  v-for="item in hotPolicies"
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
        <div v-if="filteredResults.length > 0" class="pagination-section">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50]"
            :total="filteredResults.length"
            layout="total, sizes, prev, pager, next, jumper"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowUp, ArrowDown, Document, OfficeBuilding, Calendar, User } from '@element-plus/icons-vue'
import { policies as policyData } from '@/data/mockData'

const router = useRouter()

const showFilter = ref(false)
const dateRange = ref([])
const sortBy = ref('time-desc')

const searchForm = reactive({
  keyword: '',
  policyType: '',
  level: '',
  applicableTo: [],
  status: ''
})

const policies = ref([...policyData])
const hotPolicies = ref([...policyData].slice(0, 3))

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 4
})

const filteredResults = computed(() => {
  let results = [...policies.value]

  if (searchForm.keyword) {
    const keyword = searchForm.keyword.toLowerCase()
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.publisher.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.subjectCategory.toLowerCase().includes(keyword)
    )
  }

  if (searchForm.policyType) {
    results = results.filter((item) => item.category === searchForm.policyType)
  }

  if (searchForm.level) {
    // 根据发布层级过滤，这里简化处理
    results = results.filter((item) => item.publisher.includes(searchForm.level === '国家' ? '国家' : searchForm.level === 'province' ? '省' : searchForm.level === 'city' ? '市' : '县'))
  }

  if (searchForm.status) {
    results = results.filter((item) => item.status === (searchForm.status === 'valid' ? '有效' : searchForm.status === 'expired' ? '失效' : '即将生效'))
  }

  // 排序
  if (sortBy.value === 'time-desc') {
    results.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
  } else {
    results.sort((a, b) => new Date(a.publishTime) - new Date(b.publishTime))
  }

  return results
})

const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const handleSearch = () => {
  console.log('搜索政策：', searchForm)
  pagination.currentPage = 1
}

const resetFilter = () => {
  Object.assign(searchForm, {
    keyword: '',
    policyType: '',
    level: '',
    applicableTo: [],
    status: ''
  })
  dateRange.value = []
  pagination.currentPage = 1
}

const handleSort = () => {
  console.log('排序方式：', sortBy.value)
  pagination.currentPage = 1
}

const viewDetail = (item) => {
  if (item.url) {
    window.open(item.url, '_blank')
  } else {
    router.push(`/policy/detail/${item.id}`)
  }
}

const handleHotClick = (item) => {
  searchForm.keyword = item.title
  handleSearch()
}

const getStatusType = (category) => {
  const typeMap = {
    '重点扶持': 'danger',
    '优惠政策': 'danger',
    '资金支持': 'danger',
    '税收优惠': 'danger'
  }
  return typeMap[category] || 'danger'
}
</script>

<style lang="scss" scoped>
.policy-search-page {
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

  :deep(.el-checkbox-group) {
    display: flex;
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

.policy-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.policy-item {
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

.policy-icon {
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

.policy-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 8px;
}

.policy-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.policy-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  line-height: 1.4;
}

.policy-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.policy-summary {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.policy-meta {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.meta-left {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.policy-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  margin-top: 8px;
}

.document-number {
  font-size: 14px;
  color: #6B7280;
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

.meta-right {
  display: flex;
  gap: 8px;
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

.hot-policies {
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
  .policy-search-page {
    padding: 100px 16px 40px;
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .policy-item {
    flex-direction: column;
  }

  .policy-icon {
    width: 100%;
  }

  .meta-left {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
