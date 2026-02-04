<template>
  <div class="service-search-page">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="输入服务名称、服务商名称或关键词..."
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
        <el-collapse v-model="activeFilter" class="filter-collapse">
          <el-collapse-item title="高级筛选" name="1">
            <div class="filter-content">
              <!-- 服务类型 -->
              <div class="filter-item">
                <label>服务类型：</label>
                <div class="filter-options">
                  <el-select v-model="filters.serviceType" placeholder="选择服务类型" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="展位搭建" value="展位搭建" />
                    <el-option label="物流运输" value="物流运输" />
                    <el-option label="宣传推广" value="宣传推广" />
                    <el-option label="礼仪接待" value="礼仪接待" />
                    <el-option label="翻译服务" value="翻译服务" />
                    <el-option label="设备租赁" value="设备租赁" />
                    <el-option label="餐饮服务" value="餐饮服务" />
                  </el-select>
                </div>
              </div>

              <!-- 服务区域 -->
              <div class="filter-item">
                <label>服务区域：</label>
                <div class="filter-options">
                  <el-cascader
                    v-model="filters.region"
                    :options="regionOptions"
                    placeholder="选择地区"
                    clearable
                    style="width: 200px"
                  />
                </div>
              </div>

              <!-- 价格区间 -->
              <div class="filter-item">
                <label>价格区间：</label>
                <div class="filter-options">
                  <div class="price-range">
                    <el-input v-model="filters.minPrice" placeholder="最低价" type="number" style="width: 100px" />
                    <span>-</span>
                    <el-input v-model="filters.maxPrice" placeholder="最高价" type="number" style="width: 100px" />
                  </div>
                </div>
              </div>

              <!-- 服务商资质 -->
              <div class="filter-item">
                <label>服务商资质：</label>
                <div class="filter-options">
                  <el-select v-model="filters.qualification" placeholder="选择资质" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="平台认证" value="平台认证" />
                    <el-option label="未认证" value="未认证" />
                  </el-select>
                </div>
              </div>

              <!-- 用户评分 -->
              <div class="filter-item">
                <label>用户评分：</label>
                <div class="filter-options">
                  <el-select v-model="filters.rating" placeholder="选择评分" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="≥3星" value="3" />
                    <el-option label="≥4星" value="4" />
                    <el-option label="5星" value="5" />
                  </el-select>
                </div>
              </div>

              <!-- 成交数量 -->
              <div class="filter-item">
                <label>成交数量：</label>
                <div class="filter-options">
                  <el-select v-model="filters.orderCount" placeholder="选择成交数" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="≥10单" value="10" />
                    <el-option label="≥50单" value="50" />
                    <el-option label="≥100单" value="100" />
                  </el-select>
                </div>
              </div>

              <!-- 服务周期 -->
              <div class="filter-item">
                <label>服务周期：</label>
                <div class="filter-options">
                  <el-select v-model="filters.serviceCycle" placeholder="选择周期" clearable style="width: 200px">
                    <el-option label="全部" value="" />
                    <el-option label="≤3天" value="3" />
                    <el-option label="3-7天" value="7" />
                    <el-option label="≥7天" value="30" />
                  </el-select>
                </div>
              </div>

              <div class="filter-actions">
                <el-button @click="resetFilters">重置筛选</el-button>
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
            共找到 <span class="count-number">{{ filteredResults.length }}</span> 个服务
          </div>
          <div class="results-sort">
            <span>排序方式：</span>
            <el-select v-model="sortBy" size="small" @change="sortResults" placeholder="请选择排序方式">
              <el-option label="综合排序" value="default" />
              <el-option label="价格从低到高" value="price_asc" />
              <el-option label="价格从高到低" value="price_desc" />
              <el-option label="评分从高到低" value="rating" />
              <el-option label="成交数量" value="orders" />
            </el-select>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-if="filteredResults.length > 0" class="service-grid">
          <div
            v-for="item in paginatedResults"
            :key="item.id"
            class="service-card"
          >
            <div class="card-image">
              <img :src="item.poster || defaultServiceImage" :alt="item.name" />
            </div>
            <div class="card-content">
              <div class="card-header">
                <h3 class="service-name">{{ item.name }}</h3>
              </div>
              <div class="service-meta">
                <div class="service-tags">
                  <el-tag 
                    v-for="tag in item.tags" 
                    :key="tag" 
                    size="small" 
                    type="info"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-tag size="small" type="info" v-if="item.type">{{ item.type }}</el-tag>
                </div>
                <div class="meta-item">
                  <el-icon><OfficeBuilding /></el-icon>
                  {{ item.provider }}
                  <span class="provider-rating">
                    <el-icon><Star /></el-icon>
                    {{ item.rating }}
                  </span>
                </div>
              </div>
              <div class="service-stats">
                <div class="stat-item" style="display: none;">
                  <el-icon><Star /></el-icon>
                  {{ item.rating }}
                </div>
                <div class="stat-item">
                  <el-icon><ShoppingCart /></el-icon>
                  <span>成交量：{{ item.orders }}</span>
                </div>
                <div class="stat-item">
                  <el-icon><Clock /></el-icon>
                  <span>交付时间：{{ item.period }}</span>
                </div>
              </div>
              <div class="card-footer">
                <div class="price-section">
                  <span class="price-value">{{ item.price === '咨询报价' ? '' : '¥' }}{{ item.price }}</span>
                  <span class="price-unit">{{ item.unit }}</span>
                </div>
                <div class="action-buttons">
                  <el-button
                    :type="isCollected(item.id) ? '' : 'primary'"
                    :icon="isCollected(item.id) ? 'StarFilled' : 'Star'"
                    size="small"
                    @click.stop="collectService(item)"
                  >
                    {{ isCollected(item.id) ? '已收藏' : '收藏' }}
                  </el-button>
                  <el-button type="primary" @click.stop="startChat(item)" size="small">
                    <el-icon><ChatLineSquare /></el-icon>
                    洽谈
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果 -->
        <div v-else class="empty-results">
          <el-empty description="未找到相关服务">
            <template #image>
              <el-icon :size="100" color="#9CA3AF"><Search /></el-icon>
            </template>
            <div class="empty-suggestions">
              <h4>热门服务推荐</h4>
              <div class="hot-services">
                <el-tag
                  v-for="item in recommendedServices"
                  :key="item.id"
                  class="hot-tag"
                  @click="selectRecommendedService(item)"
                >
                  {{ item.name }}
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
            :page-sizes="[10, 20, 50, 100]"
            :total="filteredResults.length"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <el-dialog v-model="chatVisible" title="在线洽谈" width="600px">
      <div class="chat-container">
        <div class="chat-header">
          <div class="provider-info">
            <div class="avatar">{{ selectedService?.provider?.charAt(0) }}</div>
            <div class="info">
              <div class="name">{{ selectedService?.provider }}</div>
              <div class="service">服务：{{ selectedService?.name }}</div>
            </div>
          </div>
        </div>
        <div class="chat-messages">
          <div v-for="(msg, index) in chatMessages" :key="index" class="message" :class="msg.type">
            <div class="message-content">{{ msg.content }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
            v-model="chatMessage"
            type="textarea"
            :rows="3"
            placeholder="输入消息内容..."
          />
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, OfficeBuilding, Document, Star, ShoppingCart, Clock, ChatLineSquare } from '@element-plus/icons-vue'
import { services } from '@/data/mockData'

const router = useRouter()

const searchKeyword = ref('')
const sortBy = ref('default')
const activeFilter = ref('1')
const chatVisible = ref(false)
const selectedService = ref(null)
const chatMessage = ref('')
const chatMessages = ref([])
const collectedServices = ref([])

// 热门搜索
const hotSearches = ref(['展位搭建', '翻译服务', '物流运输', '宣传推广', '礼仪接待', '设备租赁'])

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 12,
  total: 0
})

const filters = ref({
  serviceType: '',
  region: [],
  minPrice: '',
  maxPrice: '',
  qualification: '',
  rating: '',
  orderCount: '',
  serviceCycle: ''
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

const serviceData = ref([])
const recommendedServices = ref([])
const defaultServiceImage = 'https://via.placeholder.com/200x150?text=服务图片'

onMounted(() => {
  serviceData.value = services || []
  recommendedServices.value = services.slice(0, 4) || []
  pagination.total = services.length
})

const filteredResults = computed(() => {
  let results = [...serviceData.value]

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.provider.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)
    )
  }

  if (filters.value.serviceType) {
    results = results.filter((item) => item.type === filters.value.serviceType)
  }

  if (filters.value.region.length > 0) {
    results = results.filter((item) => item.region === filters.value.region[1])
  }

  if (filters.value.minPrice) {
    results = results.filter((item) => item.price >= parseFloat(filters.value.minPrice))
  }

  if (filters.value.maxPrice) {
    results = results.filter((item) => item.price <= parseFloat(filters.value.maxPrice))
  }

  if (filters.value.qualification) {
    results = results.filter((item) => item.certified === (filters.value.qualification === '平台认证'))
  }

  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating)
    results = results.filter((item) => item.rating >= minRating)
  }

  if (filters.value.orderCount) {
    const minOrders = parseInt(filters.value.orderCount)
    results = results.filter((item) => item.orders >= minOrders)
  }

  if (filters.value.serviceCycle) {
    const maxCycle = parseInt(filters.value.serviceCycle)
    results = results.filter((item) => {
      const cycleDays = parseInt(item.period)
      return cycleDays <= maxCycle
    })
  }

  switch (sortBy.value) {
    case 'price_asc':
      results.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      results.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      results.sort((a, b) => b.rating - a.rating)
      break
    case 'orders':
      results.sort((a, b) => b.orders - a.orders)
      break
    default:
      results.sort((a, b) => b.rating * b.orders - a.rating * a.orders)
  }

  pagination.total = results.length
  return results
})

// 分页结果
const paginatedResults = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return filteredResults.value.slice(start, end)
})

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
  pagination.currentPage = 1
}

const resetFilters = () => {
  filters.value = {
    serviceType: '',
    region: [],
    minPrice: '',
    maxPrice: '',
    qualification: '',
    rating: '',
    orderCount: '',
    serviceCycle: ''
  }
  searchKeyword.value = ''
  pagination.currentPage = 1
}

const sortResults = () => {
  console.log('排序方式:', sortBy.value)
  pagination.currentPage = 1
}

const collectService = (service) => {
  const index = collectedServices.value.findIndex((s) => s.id === service.id)
  if (index === -1) {
    collectedServices.value.push(service)
    ElMessage.success('已收藏')
  } else {
    collectedServices.value.splice(index, 1)
    ElMessage.info('已取消收藏')
  }
}

const isCollected = (id) => {
  return collectedServices.value.some((s) => s.id === id)
}

const startChat = (service) => {
  selectedService.value = service
  chatMessages.value = [
    {
      type: 'system',
      content: `已连接到 ${service.provider}，开始洽谈吧`,
      time: formatTime(new Date())
    }
  ]
  chatVisible.value = true
}

const sendMessage = () => {
  if (!chatMessage.value.trim()) return

  chatMessages.value.push({
    type: 'user',
    content: chatMessage.value,
    time: formatTime(new Date())
  })

  setTimeout(() => {
    chatMessages.value.push({
      type: 'provider',
      content: '感谢您的咨询，我们会尽快回复您。',
      time: formatTime(new Date())
    })
  }, 1000)

  chatMessage.value = ''
}

const formatTime = (date) => {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

const selectRecommendedService = (service) => {
  searchKeyword.value = service.name
  handleSearch()
}

const handleHotSearchClick = (keyword) => {
  searchKeyword.value = keyword
  handleSearch()
}

// 分页处理
const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.currentPage = 1
}

const handleCurrentChange = (page) => {
  pagination.currentPage = page
}
</script>

<style lang="scss" scoped>
.service-search-page {
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
    width: 120px;
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

  .price-range {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
      color: #6B7280;
      font-weight: 500;
    }
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

// 结果列表
.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #204E9C;
  }
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-content {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.service-name {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
  margin-right: 8px;
}

.service-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.service-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
}

.service-meta .meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;

  .el-icon {
    color: #2563EB;
  }
  
  .provider-rating {
    margin-left: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #2563EB;
    
    .el-icon {
      color: #F59E0B;
    }
  }
}

.service-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.service-stats .stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6B7280;

  .el-icon {
    color: #2563EB;
  }
}

.service-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.action-buttons {
  display: flex;
  gap: 4px;
  align-items: center;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price-value {
  font-size: 20px;
  font-weight: 700;
  color: #2563EB;
}

.price-unit {
  font-size: 14px;
  color: #6B7280;
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

.hot-services {
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

// 聊天窗口
.chat-container {
  .chat-header {
    padding: 20px 0;
    border-bottom: 1px solid #E5E7EB;
    margin-bottom: 20px;

    .provider-info {
      display: flex;
      align-items: center;
      gap: 15px;

      .avatar {
        width: 50px;
        height: 50px;
        background: #204E9C;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
      }

      .info {
        .name {
          font-size: 16px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .service {
          font-size: 14px;
          color: #6B7280;
        }
      }
    }
  }

  .chat-messages {
    height: 300px;
    overflow-y: auto;
    padding: 20px;
    background: #F9FAFB;
    border-radius: 8px;
    margin-bottom: 20px;

    .message {
      margin-bottom: 16px;

      &.system {
        text-align: center;
        color: #9CA3AF;
        font-size: 14px;
      }

      &.user {
        text-align: right;

        .message-content {
          display: inline-block;
          background: #2563EB;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          max-width: 70%;
          text-align: left;
        }
      }

      &.provider {
        text-align: left;

        .message-content {
          display: inline-block;
          background: white;
          color: #1F2937;
          padding: 12px 16px;
          border-radius: 8px;
          max-width: 70%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        }
      }

      .message-time {
        font-size: 12px;
        color: #9CA3AF;
        margin-top: 4px;
      }
    }
  }

  .chat-input {
    display: flex;
    gap: 12px;

    .el-textarea {
      flex: 1;
    }

    .el-button {
      white-space: nowrap;
      padding: 0 24px;
    }
  }
}

@media (max-width: 768px) {
  .service-search-page {
    padding: 100px 16px 40px;
  }

  .search-section,
  .filter-section,
  .results-section {
    padding: 20px 16px;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }

  .card-image {
    height: 180px;
  }

  .service-stats {
    flex-wrap: wrap;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .chat-input {
    flex-direction: column;

    .el-button {
      width: 100%;
    }
  }
}
</style>
