<template>
  <div class="benefits-page">
    <div class="page-header">
      <h2>我的权益</h2>
      <p class="subtitle">您专属的福利与虚拟资产</p>
    </div>

    <div class="benefits-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <span class="tab-icon"><el-icon><component :is="tab.icon" /></el-icon></span>
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="tab.count > 0" class="tab-count">{{ tab.count }}</span>
      </div>
    </div>

    <div class="benefits-content">
      <div v-if="activeTab === 'unused'" class="benefits-list">
        <div
          v-for="item in unusedBenefits"
          :key="item.id"
          class="benefit-card"
          :class="item.type"
        >
          <div class="card-header">
            <div class="benefit-icon"><el-icon><component :is="item.icon" /></el-icon></div>
            <el-tag :type="item.tagType" size="small">{{ item.category }}</el-tag>
          </div>
          <div class="card-body">
            <h3 class="benefit-name">{{ item.name }}</h3>
            <p class="benefit-desc">{{ item.description }}</p>
            <div class="benefit-meta">
              <span class="meta-item">
                <i class="icon"><el-icon><Calendar /></el-icon></i>
                有效期至：{{ item.expiryDate }}
              </span>
              <span class="meta-item" v-if="item.quantity">
                <i class="icon"><el-icon><TicketIcon /></el-icon></i>
                数量：{{ item.quantity }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <el-button type="primary" @click="handleUse(item)">立即使用</el-button>
            <el-button @click="handleViewDetail(item)">查看说明</el-button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'used'" class="benefits-list">
        <div
          v-for="item in usedBenefits"
          :key="item.id"
          class="benefit-card used"
        >
          <div class="card-header">
            <div class="benefit-icon"><el-icon><component :is="item.icon" /></el-icon></div>
            <el-tag type="info" size="small">{{ item.category }}</el-tag>
          </div>
          <div class="card-body">
            <h3 class="benefit-name">{{ item.name }}</h3>
            <p class="benefit-desc">{{ item.description }}</p>
            <div class="benefit-meta">
              <span class="meta-item">
                <i class="icon"><el-icon><Clock /></el-icon></i>
                使用时间：{{ item.useTime }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <el-tag type="success" size="small">已使用</el-tag>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'expired'" class="benefits-list">
        <div
          v-for="item in expiredBenefits"
          :key="item.id"
          class="benefit-card expired"
        >
          <div class="card-header">
            <div class="benefit-icon"><el-icon><component :is="item.icon" /></el-icon></div>
            <el-tag type="danger" size="small">{{ item.category }}</el-tag>
          </div>
          <div class="card-body">
            <h3 class="benefit-name">{{ item.name }}</h3>
            <p class="benefit-desc">{{ item.description }}</p>
            <div class="benefit-meta">
              <span class="meta-item">
                <i class="icon"><el-icon><Calendar /></el-icon></i>
                过期时间：{{ item.expiryDate }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <el-tag type="info" size="small">已过期</el-tag>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'all'" class="benefits-list">
        <div
          v-for="item in allBenefits"
          :key="item.id"
          class="benefit-card"
          :class="item.status"
        >
          <div class="card-header">
            <div class="benefit-icon"><el-icon><component :is="item.icon" /></el-icon></div>
            <el-tag :type="getTagType(item.status)" size="small">{{ item.category }}</el-tag>
          </div>
          <div class="card-body">
            <h3 class="benefit-name">{{ item.name }}</h3>
            <p class="benefit-desc">{{ item.description }}</p>
            <div class="benefit-meta">
              <span class="meta-item">
                <i class="icon"><el-icon><Calendar /></el-icon></i>
                有效期至：{{ item.expiryDate }}
              </span>
              <span v-if="item.status === 'used'" class="meta-item">
                <i class="icon"><el-icon><Clock /></el-icon></i>
                使用时间：{{ item.useTime }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <el-tag :type="getStatusType(item.status)" size="small">
              {{ getStatusText(item.status) }}
            </el-tag>
            <el-button
              v-if="item.status === 'unused'"
              type="primary"
              size="small"
              @click="handleUse(item)"
            >
              使用
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="detailVisible" title="权益说明" width="600px">
      <div v-if="selectedBenefit" class="benefit-detail">
        <div class="detail-header">
          <div class="detail-icon"><el-icon><component :is="selectedBenefit.icon" /></el-icon></div>
          <div class="detail-info">
            <h3>{{ selectedBenefit.name }}</h3>
            <el-tag :type="selectedBenefit.tagType">{{ selectedBenefit.category }}</el-tag>
          </div>
        </div>
        <div class="detail-body">
          <h4>权益描述</h4>
          <p>{{ selectedBenefit.description }}</p>
          <h4>使用说明</h4>
          <p>{{ selectedBenefit.usageInstructions }}</p>
          <h4>有效期</h4>
          <p>{{ selectedBenefit.expiryDate }} 至 {{ selectedBenefit.expiryDate }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Present, Check, Timer, Document, Van, Ticket, Ticket as TicketIcon, Clock, Calendar, ShoppingCart, OfficeBuilding } from '@element-plus/icons-vue'

const activeTab = ref('unused')
const detailVisible = ref(false)
const selectedBenefit = ref(null)

const tabs = [
  { label: '未使用', value: 'unused', icon: Present, count: 3 },
  { label: '已使用', value: 'used', icon: Check, count: 2 },
  { label: '已过期', value: 'expired', icon: Timer, count: 1 },
  { label: '全部', value: 'all', icon: Document, count: 6 }
]

const unusedBenefits = ref([])
const usedBenefits = ref([])
const expiredBenefits = ref([])

const allBenefits = computed(() => {
  return [...unusedBenefits.value, ...usedBenefits.value, ...expiredBenefits.value]
})

onMounted(() => {
  loadBenefits()
})

const loadBenefits = () => {
  unusedBenefits.value = [
    {
      id: 1,
      name: '免费地铁乘车码',
      description: '可免费乘坐地铁5次',
      icon: Van,
      category: '出行福利',
      tagType: 'success',
      quantity: 5,
      expiryDate: '2024-02-20',
      status: 'unused',
      usageInstructions: '在地铁站出示乘车码即可使用，每次限乘一次。'
    },
    {
      id: 2,
      name: '展会VIP入场券',
      description: '优先通道入场，专属休息区',
      icon: Ticket,
      category: '展会权益',
      tagType: 'primary',
      quantity: 2,
      expiryDate: '2024-03-15',
      status: 'unused',
      usageInstructions: '在展会入口出示二维码即可进入VIP通道。'
    },
    {
      id: 3,
      name: '服务商优惠券',
      description: '展会服务满1000减200',
      icon: ShoppingCart,
      category: '优惠劵',
      tagType: 'warning',
      quantity: 1,
      expiryDate: '2024-02-28',
      status: 'unused',
      usageInstructions: '在支付展会服务费用时自动抵扣，不可与其他优惠叠加使用。'
    }
  ]

  usedBenefits.value = [
    {
      id: 4,
      name: '免费停车券',
      description: '停车场2小时免费停车',
      icon: Van,
      category: '出行福利',
      quantity: 1,
      expiryDate: '2024-01-15',
      status: 'used',
      useTime: '2024-01-10 14:30',
      usageInstructions: '在停车场出口出示二维码自动抵扣。'
    },
    {
      id: 5,
      name: '会员专享折扣',
      description: '酒店预订85折优惠',
      icon: OfficeBuilding,
      category: '酒店优惠',
      quantity: 1,
      expiryDate: '2024-01-20',
      status: 'used',
      useTime: '2024-01-18 10:15',
      usageInstructions: '在酒店预订页面选择会员折扣即可享受优惠。'
    }
  ]

  expiredBenefits.value = [
    {
      id: 6,
      name: '新年礼包',
      description: '包含展会纪念品和优惠券',
      icon: Present,
      category: '节日福利',
      quantity: 1,
      expiryDate: '2024-01-01',
      status: 'expired',
      usageInstructions: '已过期，请关注后续活动获取新礼包。'
    }
  ]
}

const getTagType = (status) => {
  const typeMap = {
    unused: 'success',
    used: 'info',
    expired: 'warning'
  }
  return typeMap[status] || ''
}

const getStatusType = (status) => {
  const typeMap = {
    unused: 'success',
    used: 'info',
    expired: 'danger'
  }
  return typeMap[status] || ''
}

const getStatusText = (status) => {
  const textMap = {
    unused: '未使用',
    used: '已使用',
    expired: '已过期'
  }
  return textMap[status] || ''
}

const handleUse = (item) => {
  ElMessage.info(`使用${item.name}`)
}

const handleViewDetail = (item) => {
  selectedBenefit.value = item
  detailVisible.value = true
}
</script>

<style lang="scss" scoped>
.benefits-page {
  max-width: 1200px;
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

.benefits-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;

  .tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid transparent;

    &:hover {
      border-color: #2563eb;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      color: #fff;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .tab-icon {
      font-size: 20px;
    }

    .tab-label {
      font-size: 15px;
      font-weight: 600;
    }

    .tab-count {
      padding: 2px 8px;
      background: #ef4444;
      color: #fff;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
    }
  }
}

.benefits-content {
  min-height: 400px;
}

.benefits-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.benefit-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
    transform: translateY(-4px);
  }

  &.used {
    opacity: 0.7;
  }

  &.expired {
    opacity: 0.6;
    background: #f9fafb;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    .benefit-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }
  }

  .card-body {
    margin-bottom: 20px;

    .benefit-name {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .benefit-desc {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 15px 0;
      line-height: 1.6;
    }

    .benefit-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #9ca3af;

        .icon {
          font-size: 14px;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;
    gap: 10px;
    flex-wrap: wrap;
  }
}

.benefit-detail {
  .detail-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f3f4f6;

    .detail-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
    }

    .detail-info {
      flex: 1;

      h3 {
        font-size: 22px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 10px 0;
      }
    }
  }

  .detail-body {
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 20px 0 10px 0;
    }

    p {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.8;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .benefits-tabs {
    flex-direction: column;

    .tab-item {
      justify-content: space-between;
    }
  }

  .benefits-list {
    grid-template-columns: 1fr;
  }
}
</style>
