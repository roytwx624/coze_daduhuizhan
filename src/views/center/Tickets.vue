<template>
  <div class="tickets-page">
    <div class="page-header">
      <h2>我的门票</h2>
      <p class="subtitle">数字化管理您的展会入场信息</p>
    </div>

    <!-- 筛选和搜索区域 -->
    <div class="filter-section">
      <div class="filter-content">
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索展会名称"
            prefix-icon="Search"
            clearable
            @input="handleSearch"
          />
        </div>
        <div class="filter-controls">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleDateFilter"
            style="width: 240px"
          />
          <el-select
            v-model="selectedVenue"
            placeholder="选择场馆"
            clearable
            @change="handleVenueFilter"
            style="width: 180px"
          >
            <el-option
              v-for="venue in venues"
              :key="venue"
              :label="venue"
              :value="venue"
            />
          </el-select>
          <el-button @click="resetFilters">重置筛选</el-button>
        </div>
      </div>
    </div>

    <div class="tickets-list" v-if="filteredTickets.length > 0">
      <div v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-card">
        <div class="ticket-header">
          <div class="ticket-info">
            <h3 class="exhibition-name">{{ ticket.exhibitionName }}</h3>
            <div class="ticket-meta">
              <span class="meta-item">
                <i class="icon"><el-icon><Calendar /></el-icon></i>
                {{ ticket.time }}
              </span>
              <span class="meta-item">
                <i class="icon"><el-icon><Location /></el-icon></i>
                {{ ticket.venue }}
              </span>
            </div>
          </div>
          <div class="ticket-status">
            <el-tag type="success" size="large">注册完成</el-tag>
          </div>
        </div>

        <div class="ticket-divider"></div>

        <div class="ticket-body">
          <div class="registration-info">
            <h4>注册信息</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">姓名</span>
                <span class="value">{{ ticket.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">手机号</span>
                <span class="value">{{ ticket.phone }}</span>
              </div>
              <div class="info-item">
                <span class="label">身份证号</span>
                <span class="value">{{ ticket.idCard }}</span>
              </div>
              <div class="info-item">
                <span class="label">注册时间</span>
                <span class="value">{{ ticket.registerTime }}</span>
              </div>
            </div>
          </div>

          <div class="ticket-notice">
            <div class="notice-header">
              <i class="notice-icon"><el-icon><InfoFilled /></el-icon></i>
              <h4>温馨提示</h4>
            </div>
            <p class="notice-content">
              您已成功提交信息！成功预约后，您将收到邮件及短信形式的确认邀请函，请注意查收。
            </p>
          </div>
        </div>

        <div class="ticket-footer">
          <el-button @click="handleViewTicket(ticket)">查看详情</el-button>
          <el-button @click="handleDownloadTicket(ticket)">下载电子票</el-button>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon"><el-icon><Ticket /></el-icon></div>
      <h3>暂无符合条件的门票</h3>
      <p v-if="searchKeyword || dateRange || selectedVenue">尝试调整筛选条件</p>
      <p v-else>去展会搜索页面注册心仪的展会</p>
      <el-button type="primary" @click="goToExhibitionSearch">去找展会</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Calendar, Location, InfoFilled, Ticket, Search } from '@element-plus/icons-vue'

const router = useRouter()

const tickets = ref([])
const searchKeyword = ref('')
const dateRange = ref([])
const selectedVenue = ref('')

onMounted(() => {
  loadTickets()
})

const loadTickets = () => {
  tickets.value = [
    {
      id: 1,
      exhibitionName: '第三十七届制冷展',
      time: '2024-03-15 - 03-18',
      venue: '国家会议中心',
      name: '张三',
      phone: '138****8888',
      idCard: '110***********1234',
      registerTime: '2024-01-15 14:30'
    },
    {
      id: 2,
      exhibitionName: '第66届中国特许加盟展',
      time: '2024-04-20 - 04-22',
      venue: '北京展览馆',
      name: '张三',
      phone: '138****8888',
      idCard: '110***********1234',
      registerTime: '2024-01-10 09:15'
    },
    {
      id: 3,
      exhibitionName: '2024北京国际科技产业博览会',
      time: '2024-05-25 - 05-28',
      venue: '中国国际展览中心',
      name: '张三',
      phone: '138****8888',
      idCard: '110***********1234',
      registerTime: '2024-01-08 16:45'
    }
  ]
}

// 场馆列表
const venues = computed(() => {
  const venueSet = new Set()
  tickets.value.forEach(ticket => {
    venueSet.add(ticket.venue)
  })
  return Array.from(venueSet)
})

// 筛选后的门票列表
const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    // 搜索关键词筛选
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      if (!ticket.exhibitionName.toLowerCase().includes(keyword)) {
        return false
      }
    }
    
    // 日期范围筛选
    if (dateRange.value && dateRange.value.length === 2) {
      const startDate = new Date(dateRange.value[0])
      const endDate = new Date(dateRange.value[1])
      const ticketStartDate = new Date(ticket.time.split(' - ')[0])
      if (ticketStartDate < startDate || ticketStartDate > endDate) {
        return false
      }
    }
    
    // 场馆筛选
    if (selectedVenue.value) {
      if (ticket.venue !== selectedVenue.value) {
        return false
      }
    }
    
    return true
  })
})

// 搜索处理
const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value)
}

// 日期筛选处理
const handleDateFilter = () => {
  console.log('日期范围:', dateRange.value)
}

// 场馆筛选处理
const handleVenueFilter = () => {
  console.log('选择场馆:', selectedVenue.value)
}

// 重置筛选
const resetFilters = () => {
  searchKeyword.value = ''
  dateRange.value = []
  selectedVenue.value = ''
}

const handleViewTicket = (ticket) => {
  ElMessage.info(`查看${ticket.exhibitionName}的门票详情`)
}

const handleDownloadTicket = (ticket) => {
  ElMessage.success(`正在下载${ticket.exhibitionName}的电子票`)
}

const goToExhibitionSearch = () => {
  router.push('/exhibition/search')
}
</script>

<style lang="scss" scoped>
.tickets-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 10px 0;
  }

  .subtitle {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
}

// 筛选和搜索区域
.filter-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;

  .filter-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;

    .search-box {
      flex: 1;
      min-width: 300px;

      :deep(.el-input) {
        width: 100%;
      }
    }

    .filter-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;

      :deep(.el-date-picker),
      :deep(.el-select) {
        margin-right: 0;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .filter-section {
    .filter-content {
      flex-direction: column;
      align-items: stretch;

      .search-box {
        min-width: auto;
      }

      .filter-controls {
        flex-direction: column;
        align-items: stretch;

        :deep(.el-date-picker),
        :deep(.el-select) {
          width: 100%;
        }
      }
    }
  }
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.ticket-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30px;

    .ticket-info {
      flex: 1;

      .exhibition-name {
        font-size: 24px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 15px 0;
      }

      .ticket-meta {
        display: flex;
        gap: 30px;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #6b7280;

          .icon {
            font-size: 18px;
          }
        }
      }
    }

    .ticket-status {
      .el-tag {
        font-size: 16px;
        padding: 8px 20px;
        font-weight: 600;
      }
    }
  }

  .ticket-divider {
    height: 2px;
    background: linear-gradient(
      90deg,
      #e5e7eb 0%,
      #e5e7eb 10%,
      transparent 10%,
      transparent 20%,
      #e5e7eb 20%,
      #e5e7eb 30%,
      transparent 30%,
      transparent 40%,
      #e5e7eb 40%,
      #e5e7eb 50%,
      transparent 50%,
      transparent 60%,
      #e5e7eb 60%,
      #e5e7eb 70%,
      transparent 70%,
      transparent 80%,
      #e5e7eb 80%,
      #e5e7eb 90%,
      transparent 90%
    );
  }

  .ticket-body {
    padding: 30px;
    background: #f9fafb;

    .registration-info {
      margin-bottom: 25px;

      h4 {
        font-size: 16px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #e5e7eb;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        .info-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #fff;
          border-radius: 6px;

          .label {
            font-size: 14px;
            color: #6b7280;
            min-width: 80px;
            font-weight: 500;
          }

          .value {
            font-size: 14px;
            color: #111827;
            font-weight: 600;
            flex: 1;
          }
        }
      }
    }

    .ticket-notice {
      padding: 20px;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 6px;
      border-left: 4px solid #2563eb;

      .notice-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        .notice-icon {
          font-size: 20px;
        }

        h4 {
          font-size: 15px;
          font-weight: 700;
          color: #1e40af;
          margin: 0;
        }
      }

      .notice-content {
        font-size: 14px;
        color: #1e40af;
        line-height: 1.8;
        margin: 0;
      }
    }
  }

  .ticket-footer {
    padding: 20px 30px;
    background: #fff;
    border-top: 1px solid #f3f4f6;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }
}

.empty-state {
  text-align: center;
  padding: 100px 20px;

  .empty-icon {
    font-size: 100px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 28px;
    color: #111827;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .ticket-card {
    .ticket-header {
      flex-direction: column;
      gap: 20px;

      .ticket-meta {
        flex-direction: column;
        gap: 15px;
      }
    }

    .ticket-body {
      .registration-info {
        .info-grid {
          grid-template-columns: 1fr;
        }
      }
    }

    .ticket-footer {
      flex-direction: column;
    }
  }
}
</style>
