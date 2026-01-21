<template>
  <div class="tender-page">
    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="输入招投标信息标题、招标单位、关联展会名称..."
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="icon">🔍</i> 搜索
        </button>
      </div>

      <div class="filter-section">
        <div class="filter-group">
          <label>项目类型</label>
          <el-select v-model="filters.projectType" placeholder="选择项目类型" clearable>
            <el-option label="全部" value="" />
            <el-option label="展会策划" value="展会策划" />
            <el-option label="搭建" value="搭建" />
            <el-option label="宣传推广" value="宣传推广" />
            <el-option label="物流运输" value="物流运输" />
            <el-option label="其他" value="其他" />
          </el-select>
        </div>

        <div class="filter-group">
          <label>招标单位类型</label>
          <el-select v-model="filters.tendererType" placeholder="选择单位类型" clearable>
            <el-option label="全部" value="" />
            <el-option label="政府机构" value="政府机构" />
            <el-option label="企业" value="企业" />
            <el-option label="其他" value="其他" />
          </el-select>
        </div>

        <div class="filter-group">
          <label>所在地区</label>
          <el-cascader
            v-model="filters.region"
            :options="regionOptions"
            placeholder="选择地区"
            clearable
          />
        </div>

        <div class="filter-group">
          <label>报名截止时间</label>
          <el-select v-model="filters.deadline" placeholder="选择时间" clearable>
            <el-option label="全部" value="" />
            <el-option label="≤3天" value="3" />
            <el-option label="3-7天" value="7" />
            <el-option label="≥7天" value="30" />
          </el-select>
        </div>

        <div class="filter-group">
          <label>项目预算</label>
          <el-select v-model="filters.budget" placeholder="选择预算" clearable>
            <el-option label="全部" value="" />
            <el-option label="10万以下" value="1" />
            <el-option label="10-50万" value="2" />
            <el-option label="50-100万" value="3" />
            <el-option label="100万以上" value="4" />
          </el-select>
        </div>

        <div class="filter-group">
          <label>招标状态</label>
          <el-select v-model="filters.status" placeholder="选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="招标中" value="招标中" />
            <el-option label="已结束" value="已结束" />
          </el-select>
        </div>

        <button class="reset-btn" @click="resetFilters">重置筛选</button>
      </div>
    </div>

    <div class="results-section">
      <div class="results-header">
        <span class="total-count">共找到 <strong>{{ filteredResults.length }}</strong> 条招投标信息</span>
        <el-select v-model="sortBy" @change="sortResults" class="sort-select">
          <el-option label="按发布时间倒序" value="desc" />
          <el-option label="按发布时间正序" value="asc" />
        </el-select>
      </div>

      <div class="results-list" v-if="filteredResults.length > 0">
        <div
          v-for="(item, index) in filteredResults"
          :key="item.id"
          class="tender-item"
          @click="goToDetail(item.id)"
        >
          <div class="tender-header">
            <h3 class="tender-title" v-html="highlightKeyword(item.title)"></h3>
            <span class="status-badge" :class="item.status === '招标中' ? 'active' : 'inactive'">
              {{ item.status }}
            </span>
          </div>

          <div class="tender-info">
            <div class="info-item">
              <i class="icon">🏢</i>
              <span>招标单位：<strong>{{ item.tenderer }}</strong></span>
            </div>
            <div class="info-item">
              <i class="icon">📅</i>
              <span>报名截止：<strong>{{ formatDate(item.deadline) }}</strong></span>
            </div>
            <div class="info-item">
              <i class="icon">💰</i>
              <span>项目预算：<strong>{{ item.budget }}</strong></span>
            </div>
          </div>

          <div class="tender-content">
            <div class="content-item">
              <span class="label">核心招标范围：</span>
              <span>{{ item.scope }}</span>
            </div>
            <div class="tags">
              <el-tag v-for="tag in item.tags" :key="tag" size="small" type="info">
                {{ tag }}
              </el-tag>
            </div>
          </div>

          <div class="tender-footer">
            <span class="publish-time">发布时间：{{ item.publishTime }}</span>
            <el-button type="primary" size="small">查看详情</el-button>
          </div>
        </div>
      </div>

      <div class="empty-result" v-else>
        <div class="empty-icon">📋</div>
        <h3>暂无相关招投标信息</h3>
        <p>为您推荐热门招投标信息</p>
        <div class="hot-tenders">
          <div
            v-for="item in hotTenders.slice(0, 10)"
            :key="item.id"
            class="hot-tender-item"
            @click="goToDetail(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { biddingInfo } from '@/data/mockData'

const router = useRouter()

const searchKeyword = ref('')
const sortBy = ref('desc')

const filters = ref({
  projectType: '',
  tendererType: '',
  region: [],
  deadline: '',
  budget: '',
  status: ''
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

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
}

const resetFilters = () => {
  filters.value = {
    projectType: '',
    tendererType: '',
    region: [],
    deadline: '',
    budget: '',
    status: ''
  }
  searchKeyword.value = ''
}

const sortResults = () => {
  console.log('排序方式:', sortBy.value)
}

const goToDetail = (id) => {
  router.push(`/tender/detail/${id}`)
}

const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`
}

const highlightKeyword = (text) => {
  if (!searchKeyword.value) return text
  const keyword = searchKeyword.value
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<style lang="scss" scoped>
.tender-page {
  min-height: 100vh;
  background: #f9fafb;
  padding: 40px 0;
}

.search-section {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }

  .search-btn {
    padding: 12px 30px;
    background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .icon {
      font-size: 18px;
    }
  }
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }

    .el-select,
    .el-cascader {
      width: 160px;
    }
  }

  .reset-btn {
    padding: 10px 25px;
    background: #fff;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: #2563eb;
      color: #2563eb;
    }
  }
}

.results-section {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;

  .total-count {
    font-size: 16px;
    color: #374151;

    strong {
      color: #2563eb;
      font-size: 20px;
      font-weight: 700;
    }
  }

  .sort-select {
    width: 180px;
  }
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tender-item {
  padding: 25px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateY(-2px);
  }
}

.tender-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  .tender-title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.5;

    :deep(.highlight) {
      background: #fef3c7;
      color: #d97706;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }

  .status-badge {
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-left: 20px;

    &.active {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fca5a5;
    }

    &.inactive {
      background: #f9fafb;
      color: #9ca3af;
      border: 1px solid #e5e7eb;
    }
  }
}

.tender-info {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;

  .info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #6b7280;

    .icon {
      font-size: 16px;
    }

    strong {
      color: #374151;
      font-weight: 600;
    }
  }
}

.tender-content {
  margin-bottom: 20px;

  .content-item {
    font-size: 15px;
    color: #374151;
    margin-bottom: 12px;

    .label {
      font-weight: 600;
      color: #111827;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}

.tender-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f3f4f6;

  .publish-time {
    font-size: 13px;
    color: #9ca3af;
  }
}

.empty-result {
  text-align: center;
  padding: 80px 20px;

  .empty-icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 24px;
    color: #111827;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 30px;
  }

  .hot-tenders {
    max-width: 800px;
    margin: 0 auto;
    background: #f9fafb;
    padding: 25px;
    border-radius: 8px;

    .hot-tender-item {
      padding: 12px 15px;
      margin-bottom: 8px;
      background: #fff;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
      color: #374151;
      transition: all 0.3s;

      &:hover {
        background: #eff6ff;
        color: #2563eb;
        transform: translateX(5px);
      }
    }
  }
}

@media (max-width: 768px) {
  .tender-page {
    padding: 20px 0;
  }

  .search-section {
    padding: 20px;
  }

  .search-bar {
    flex-direction: column;

    input {
      width: 100%;
    }

    .search-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .filter-section {
    .filter-group {
      width: 100%;

      .el-select,
      .el-cascader {
        width: 100%;
      }
    }
  }

  .tender-info {
    flex-direction: column;
    gap: 15px;
  }

  .tender-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>
