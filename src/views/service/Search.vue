<template>
  <div class="service-search-page">
    <div class="search-section">
      <div class="search-bar">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="输入服务名称、服务商名称或关键词..."
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="icon">🔍</i> 搜索
        </button>
      </div>

      <div class="filter-section">
        <div class="filter-column">
          <h3 class="filter-title">基础筛选</h3>
          <div class="filter-group">
            <label>服务类型</label>
            <el-select v-model="filters.serviceType" placeholder="选择服务类型" clearable>
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
          <div class="filter-group">
            <label>服务区域</label>
            <el-cascader
              v-model="filters.region"
              :options="regionOptions"
              placeholder="选择地区"
              clearable
            />
          </div>
          <div class="filter-group">
            <label>价格区间</label>
            <div class="price-range">
              <el-input v-model="filters.minPrice" placeholder="最低价" type="number" />
              <span>-</span>
              <el-input v-model="filters.maxPrice" placeholder="最高价" type="number" />
            </div>
          </div>
        </div>

        <div class="filter-column">
          <h3 class="filter-title">进阶筛选</h3>
          <div class="filter-group">
            <label>服务商资质</label>
            <el-select v-model="filters.qualification" placeholder="选择资质" clearable>
              <el-option label="全部" value="" />
              <el-option label="平台认证" value="平台认证" />
              <el-option label="未认证" value="未认证" />
            </el-select>
          </div>
          <div class="filter-group">
            <label>用户评分</label>
            <el-select v-model="filters.rating" placeholder="选择评分" clearable>
              <el-option label="全部" value="" />
              <el-option label="≥3星" value="3" />
              <el-option label="≥4星" value="4" />
              <el-option label="5星" value="5" />
            </el-select>
          </div>
          <div class="filter-group">
            <label>成交数量</label>
            <el-select v-model="filters.orderCount" placeholder="选择成交数" clearable>
              <el-option label="全部" value="" />
              <el-option label="≥10单" value="10" />
              <el-option label="≥50单" value="50" />
              <el-option label="≥100单" value="100" />
            </el-select>
          </div>
          <div class="filter-group">
            <label>服务周期</label>
            <el-select v-model="filters.serviceCycle" placeholder="选择周期" clearable>
              <el-option label="全部" value="" />
              <el-option label="≤3天" value="3" />
              <el-option label="3-7天" value="7" />
              <el-option label="≥7天" value="30" />
            </el-select>
          </div>
        </div>

        <button class="reset-btn" @click="resetFilters">重置筛选</button>
      </div>
    </div>

    <div class="results-section">
      <div class="results-header">
        <span class="total-count">共找到 <strong>{{ filteredResults.length }}</strong> 个服务</span>
        <div class="sort-options">
          <el-select v-model="sortBy" @change="sortResults" class="sort-select">
            <el-option label="综合排序" value="default" />
            <el-option label="价格从低到高" value="price_asc" />
            <el-option label="价格从高到低" value="price_desc" />
            <el-option label="评分从高到低" value="rating" />
            <el-option label="成交数量" value="orders" />
          </el-select>
        </div>
      </div>

      <div class="results-grid" v-if="filteredResults.length > 0">
        <div
          v-for="item in filteredResults"
          :key="item.id"
          class="service-card"
          @mouseenter="showCollectBtn = item.id"
          @mouseleave="showCollectBtn = null"
        >
          <div class="card-header">
            <div class="service-icon">{{ item.icon }}</div>
            <div class="qualification-badge" v-if="item.qualification === '平台认证'">
              {{ item.qualification }}
            </div>
          </div>

          <h3 class="service-name" v-html="highlightKeyword(item.name)"></h3>

          <div class="service-info">
            <div class="info-item">
              <i class="icon">🏢</i>
              <span class="provider-name">{{ item.provider }}</span>
            </div>
            <div class="info-item">
              <i class="icon">📋</i>
              <span class="service-type">{{ item.type }}</span>
            </div>
          </div>

          <div class="service-tags">
            <el-tag v-for="tag in item.tags" :key="tag" size="small" type="info">
              {{ tag }}
            </el-tag>
          </div>

          <div class="card-stats">
            <div class="stat-item">
              <div class="stat-label">评分</div>
              <div class="stat-value rating">
                <span>{{ item.rating }}</span>
                <i class="star">⭐</i>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-label">成交</div>
              <div class="stat-value">{{ item.orderCount }}单</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">周期</div>
              <div class="stat-value">{{ item.cycle }}</div>
            </div>
          </div>

          <div class="card-footer">
            <div class="price-section">
              <span class="price-label">参考价</span>
              <span class="price-value">¥{{ item.price }}</span>
            </div>
            <div class="action-buttons">
              <button class="collect-btn" @click.stop="collectService(item)">
                <i :class="isCollected(item.id) ? 'icon-filled' : 'icon'">❤️</i>
              </button>
              <button class="chat-btn" @click.stop="startChat(item)">
                <i class="icon">💬</i> 洽谈
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-result" v-else>
        <div class="empty-icon">🔧</div>
        <h3>暂无相关服务</h3>
        <p>调整筛选条件或尝试其他关键词</p>
        <div class="recommendations">
          <h4>为您推荐</h4>
          <div class="recommendation-list">
            <div
              v-for="item in recommendedServices"
              :key="item.id"
              class="recommendation-item"
            >
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">¥{{ item.price }}</span>
            </div>
          </div>
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
          <button class="send-btn" @click="sendMessage">发送</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mockData } from '@/data/mockData'

const router = useRouter()

const searchKeyword = ref('')
const sortBy = ref('default')
const showCollectBtn = ref(null)
const chatVisible = ref(false)
const selectedService = ref(null)
const chatMessage = ref('')
const chatMessages = ref([])
const collectedServices = ref([])

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

onMounted(() => {
  serviceData.value = mockData.services || []
  recommendedServices.value = mockData.recommendedServices || []
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
    results = results.filter((item) => item.priceValue >= parseFloat(filters.value.minPrice))
  }

  if (filters.value.maxPrice) {
    results = results.filter((item) => item.priceValue <= parseFloat(filters.value.maxPrice))
  }

  if (filters.value.qualification) {
    results = results.filter((item) => item.qualification === filters.value.qualification)
  }

  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating)
    results = results.filter((item) => item.rating >= minRating)
  }

  if (filters.value.orderCount) {
    const minOrders = parseInt(filters.value.orderCount)
    results = results.filter((item) => item.orderCount >= minOrders)
  }

  if (filters.value.serviceCycle) {
    results = results.filter((item) => item.cycleDays <= parseInt(filters.value.serviceCycle))
  }

  switch (sortBy.value) {
    case 'price_asc':
      results.sort((a, b) => a.priceValue - b.priceValue)
      break
    case 'price_desc':
      results.sort((a, b) => b.priceValue - a.priceValue)
      break
    case 'rating':
      results.sort((a, b) => b.rating - a.rating)
      break
    case 'orders':
      results.sort((a, b) => b.orderCount - a.orderCount)
      break
    default:
      results.sort((a, b) => b.rating * b.orderCount - a.rating * a.orderCount)
  }

  return results
})

const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
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
}

const sortResults = () => {
  console.log('排序方式:', sortBy.value)
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

const highlightKeyword = (text) => {
  if (!searchKeyword.value) return text
  const keyword = searchKeyword.value
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<style lang="scss" scoped>
.service-search-page {
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
  margin-bottom: 30px;

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
  gap: 30px;
  align-items: flex-end;

  .filter-column {
    flex: 1;
    min-width: 300px;

    .filter-title {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f3f4f6;
    }

    .filter-group {
      margin-bottom: 20px;

      label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
      }

      .el-select,
      .el-cascader {
        width: 100%;
      }

      .price-range {
        display: flex;
        align-items: center;
        gap: 10px;

        .el-input {
          flex: 1;
        }

        span {
          color: #6b7280;
          font-weight: 600;
        }
      }
    }
  }

  .reset-btn {
    padding: 12px 25px;
    background: #fff;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
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

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.service-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;

    .service-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }

    .qualification-badge {
      padding: 4px 12px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #d97706;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .service-name {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 15px 0;
    line-height: 1.4;

    :deep(.highlight) {
      background: #fef3c7;
      color: #d97706;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }

  .service-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;

    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #6b7280;

      .icon {
        font-size: 16px;
      }

      .provider-name {
        font-weight: 600;
        color: #374151;
      }

      .service-type {
        font-weight: 500;
        color: #4b5563;
      }
    }
  }

  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .card-stats {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    margin-bottom: 20px;
    border-top: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;

    .stat-item {
      text-align: center;

      .stat-label {
        font-size: 12px;
        color: #9ca3af;
        margin-bottom: 5px;
      }

      .stat-value {
        font-size: 16px;
        font-weight: 700;
        color: #111827;

        &.rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          .star {
            font-size: 14px;
          }
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price-section {
      .price-label {
        display: block;
        font-size: 12px;
        color: #9ca3af;
        margin-bottom: 5px;
      }

      .price-value {
        font-size: 24px;
        font-weight: 700;
        color: #2563eb;
      }
    }

    .action-buttons {
      display: flex;
      gap: 10px;

      .collect-btn {
        width: 40px;
        height: 40px;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        &:hover {
          border-color: #ef4444;
          background: #fef2f2;

          .icon {
            font-size: 20px;
          }

          .icon-filled {
            font-size: 20px;
          }
        }

        .icon,
        .icon-filled {
          font-size: 18px;
        }

        .icon-filled {
          color: #ef4444;
        }
      }

      .chat-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
        color: #fff;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
      }
    }
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
    margin-bottom: 40px;
  }

  .recommendations {
    max-width: 600px;
    margin: 0 auto;
    background: #f9fafb;
    padding: 25px;
    border-radius: 8px;
    text-align: left;

    h4 {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 15px;
    }

    .recommendation-list {
      .recommendation-item {
        display: flex;
        justify-content: space-between;
        padding: 12px 15px;
        background: #fff;
        border-radius: 6px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #eff6ff;
          transform: translateX(5px);
        }

        .item-name {
          font-size: 15px;
          color: #374151;
          font-weight: 500;
        }

        .item-price {
          font-size: 15px;
          color: #2563eb;
          font-weight: 700;
        }
      }
    }
  }
}

.chat-container {
  .chat-header {
    padding: 20px 0;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 20px;

    .provider-info {
      display: flex;
      align-items: center;
      gap: 15px;

      .avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
        color: #fff;
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
          font-weight: 700;
          color: #111827;
          margin-bottom: 5px;
        }

        .service {
          font-size: 14px;
          color: #6b7280;
        }
      }
    }
  }

  .chat-messages {
    height: 300px;
    overflow-y: auto;
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    margin-bottom: 20px;

    .message {
      margin-bottom: 15px;

      &.system {
        text-align: center;
        color: #9ca3af;
        font-size: 14px;
      }

      &.user {
        text-align: right;

        .message-content {
          display: inline-block;
          background: #2563eb;
          color: #fff;
          padding: 10px 15px;
          border-radius: 8px;
          max-width: 70%;
          text-align: left;
        }
      }

      &.provider {
        text-align: left;

        .message-content {
          display: inline-block;
          background: #fff;
          color: #111827;
          padding: 10px 15px;
          border-radius: 8px;
          max-width: 70%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }

      .message-time {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 5px;
      }
    }
  }

  .chat-input {
    display: flex;
    gap: 10px;

    .el-textarea {
      flex: 1;
    }

    .send-btn {
      padding: 0 30px;
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }
    }
  }
}

@media (max-width: 768px) {
  .service-search-page {
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
    .filter-column {
      width: 100%;
    }
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
