<template>
  <div class="orders-page">
    <div class="page-header">
      <h2>我的订单</h2>
      <p class="subtitle">一站式管理您的所有订单</p>
    </div>

    <div class="order-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="tab.count > 0" class="tab-count">{{ tab.count }}</span>
      </div>
    </div>

    <div class="filter-bar">
      <el-select v-model="filters.type" placeholder="订单类型" clearable style="width: 150px">
        <el-option label="全部" value="" />
        <el-option label="服务订单" value="service" />
        <el-option label="酒店订单" value="hotel" />
        <el-option label="会员订单" value="member" />
        <el-option label="场馆订单" value="venue" />
      </el-select>
      <el-select v-model="filters.status" placeholder="订单状态" clearable style="width: 150px">
        <el-option label="全部" value="" />
        <el-option label="待支付" value="unpaid" />
        <el-option label="已支付" value="paid" />
        <el-option label="交付中" value="delivering" />
        <el-option label="已完成" value="completed" />
        <el-option label="已取消" value="cancelled" />
      </el-select>
      <el-input
        v-model="filters.keyword"
        placeholder="订单编号/业务名称"
        clearable
        style="width: 250px"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <div class="orders-list" v-if="filteredOrders.length > 0">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <span class="order-no">订单编号：{{ order.orderNo }}</span>
            <span class="order-time">{{ order.createTime }}</span>
          </div>
          <el-tag :type="getStatusType(order.status)" size="small">
            {{ getStatusText(order.status) }}
          </el-tag>
        </div>

        <div class="order-content">
          <div class="order-detail">
            <div class="detail-item">
              <span class="label">业务名称</span>
              <span class="value">{{ order.businessName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">订单类型</span>
              <el-tag size="small" type="info">{{ getTypeText(order.type) }}</el-tag>
            </div>
            <div class="detail-item">
              <span class="label">订单金额</span>
              <span class="price">¥{{ order.amount }}</span>
            </div>
            <div class="detail-item" v-if="order.deliveryInfo">
              <span class="label">交付信息</span>
              <span class="value">{{ order.deliveryInfo }}</span>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <span class="order-total">实付：<strong>¥{{ order.paidAmount }}</strong></span>
          <div class="order-actions">
            <el-button size="small" @click="handleViewDetail(order)">查看详情</el-button>
            <el-button
              v-if="order.status === 'unpaid'"
              type="primary"
              size="small"
              @click="handlePay(order)"
            >
              立即支付
            </el-button>
            <el-button
              v-if="order.status === 'paid' || order.status === 'delivering'"
              type="danger"
              size="small"
              @click="handleCancel(order)"
            >
              申请退款
            </el-button>
            <el-button
              v-if="order.status === 'completed'"
              size="small"
              @click="handleReview(order)"
            >
              去评价
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon"><el-icon><ShoppingCart /></el-icon></div>
      <h3>暂无订单</h3>
      <p>去发现更多优质服务和产品</p>
      <el-button type="primary" @click="goToHome">回到首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ShoppingCart } from '@element-plus/icons-vue'

const router = useRouter()

const activeTab = ref('all')
const filters = ref({
  type: '',
  status: '',
  keyword: ''
})

const tabs = [
  { label: '全部订单', value: 'all', count: 12 },
  { label: '待支付', value: 'unpaid', count: 2 },
  { label: '已支付', value: 'paid', count: 3 },
  { label: '交付中', value: 'delivering', count: 2 },
  { label: '已完成', value: 'completed', count: 4 },
  { label: '已取消', value: 'cancelled', count: 1 }
]

const orders = ref([])

onMounted(() => {
  loadOrders()
})

const loadOrders = () => {
  orders.value = [
    {
      id: 1,
      orderNo: 'ORD202401200001',
      type: 'service',
      businessName: '展位搭建服务 - 第三十七届制冷展',
      amount: '15000.00',
      paidAmount: '15000.00',
      status: 'completed',
      createTime: '2024-01-20 14:30',
      deliveryInfo: '展位搭建已完成，客户验收合格'
    },
    {
      id: 2,
      orderNo: 'ORD202401200002',
      type: 'hotel',
      businessName: '北京某某酒店 - 标准间 2晚',
      amount: '1200.00',
      paidAmount: '1200.00',
      status: 'paid',
      createTime: '2024-01-19 10:15',
      deliveryInfo: '入住时间：2024-03-15 - 03-17'
    },
    {
      id: 3,
      orderNo: 'ORD202401200003',
      type: 'member',
      businessName: '年度会员 - 高阶会员',
      amount: '365.00',
      paidAmount: '365.00',
      status: 'completed',
      createTime: '2024-01-18 16:45'
    },
    {
      id: 4,
      orderNo: 'ORD202401200004',
      type: 'service',
      businessName: '展会物流运输服务',
      amount: '8000.00',
      paidAmount: '0.00',
      status: 'unpaid',
      createTime: '2024-01-17 09:20'
    },
    {
      id: 5,
      orderNo: 'ORD202401200005',
      type: 'venue',
      businessName: '国家会议中心 - 会议室预订',
      amount: '5000.00',
      paidAmount: '5000.00',
      status: 'delivering',
      createTime: '2024-01-16 11:30'
    }
  ]
}

const filteredOrders = computed(() => {
  let result = [...orders.value]

  if (activeTab.value !== 'all') {
    result = result.filter(order => order.status === activeTab.value)
  }

  if (filters.value.type) {
    result = result.filter(order => order.type === filters.value.type)
  }

  if (filters.value.status) {
    result = result.filter(order => order.status === filters.value.status)
  }

  if (filters.value.keyword) {
    const keyword = filters.value.keyword.toLowerCase()
    result = result.filter(order =>
      order.orderNo.toLowerCase().includes(keyword) ||
      order.businessName.toLowerCase().includes(keyword)
    )
  }

  return result
})

const getStatusType = (status) => {
  const typeMap = {
    unpaid: 'warning',
    paid: 'success',
    delivering: 'primary',
    completed: 'info',
    cancelled: 'danger'
  }
  return typeMap[status] || ''
}

const getStatusText = (status) => {
  const textMap = {
    unpaid: '待支付',
    paid: '已支付',
    delivering: '交付中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return textMap[status] || ''
}

const getTypeText = (type) => {
  const textMap = {
    service: '服务订单',
    hotel: '酒店订单',
    member: '会员订单',
    venue: '场馆订单'
  }
  return textMap[type] || ''
}

const handleSearch = () => {
  console.log('搜索订单')
}

const handleViewDetail = (order) => {
  ElMessage.info(`查看订单详情：${order.orderNo}`)
}

const handlePay = (order) => {
  ElMessage.info(`跳转支付页面：${order.orderNo}`)
}

const handleCancel = (order) => {
  ElMessageBox.confirm('确定要申请退款吗？', '申请退款', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('退款申请已提交')
  }).catch(() => {})
}

const handleReview = (order) => {
  ElMessage.info(`去评价订单：${order.businessName}`)
}

const goToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.orders-page {
  max-width: 1000px;
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

.order-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  overflow-x: auto;

  .tab-item {
    flex-shrink: 0;
    padding: 12px 20px;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      border-color: #2563eb;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      color: #fff;
      font-weight: 600;
    }

    .tab-label {
      font-size: 15px;
    }

    .tab-count {
      background: #ef4444;
      color: #fff;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
    }
  }
}

.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateX(5px);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f3f4f6;

    .order-info {
      display: flex;
      gap: 20px;
      font-size: 14px;
      color: #6b7280;

      .order-no {
        font-weight: 600;
      }
    }
  }

  .order-content {
    margin-bottom: 20px;

    .order-detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;

        .label {
          font-size: 14px;
          color: #6b7280;
          min-width: 80px;
        }

        .value {
          font-size: 15px;
          color: #111827;
          font-weight: 500;
        }

        .price {
          font-size: 20px;
          color: #2563eb;
          font-weight: 700;
        }
      }
    }
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;

    .order-total {
      font-size: 15px;
      color: #6b7280;

      strong {
        font-size: 22px;
        color: #2563eb;
        font-weight: 700;
      }
    }

    .order-actions {
      display: flex;
      gap: 10px;
    }
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
  .order-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .filter-bar {
    flex-direction: column;

    .el-select,
    .el-input,
    .el-button {
      width: 100%;
    }
  }

  .order-card {
    .order-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }

    .order-content {
      .order-detail {
        grid-template-columns: 1fr;
      }
    }

    .order-footer {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;

      .order-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
}
</style>
