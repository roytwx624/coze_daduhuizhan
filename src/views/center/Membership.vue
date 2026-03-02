<template>
  <div class="membership-page">
    <div class="page-header">
      <h2>会员管理</h2>
      <p class="subtitle">享受专属权益与服务</p>
    </div>

    <div class="membership-content">
      <div class="current-membership">
        <div class="membership-card" :class="membershipInfo.level.toLowerCase()">
          <div class="card-header">
            <div class="membership-logo">
              <span class="logo-icon"><el-icon><Trophy /></el-icon></span>
              <div class="membership-title">
                <h3>{{ membershipInfo.level }}</h3>
                <p>{{ membershipInfo.levelName }}</p>
              </div>
            </div>
            <div class="expire-date">
              <span class="label">有效期至</span>
              <span class="value">{{ membershipInfo.expireDate }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="discount-badge">
              <span class="discount">{{ membershipInfo.discount }}折</span>
              <span class="label">会员专享折扣</span>
            </div>
            <div class="benefit-summary">
              <span>{{ membershipInfo.benefitCount }}项</span>
              <span>专属权益</span>
            </div>
          </div>
        </div>
      </div>

      <div class="membership-benefits">
        <h3 class="section-title">
          <span>我的权益</span>
          <el-badge :value="membershipInfo.availableBenefits" class="benefit-badge" />
        </h3>
        
        <div class="benefits-grid">
          <div
            v-for="benefit in benefitsList"
            :key="benefit.id"
            class="benefit-item"
            :class="{ disabled: !benefit.available }"
          >
            <div class="benefit-icon">
              <el-icon><component :is="benefit.icon" /></el-icon>
              <div class="available-badge" v-if="benefit.available">已开通</div>
            </div>
            <div class="benefit-info">
              <h4 class="benefit-name">{{ benefit.name }}</h4>
              <p class="benefit-desc">{{ benefit.description }}</p>
            </div>
            <div class="benefit-action" v-if="!benefit.available">
              <el-button type="primary" size="small" @click="handleUpgradeBenefit(benefit)">
                升级解锁
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="membership-upgrade">
        <h3 class="section-title">
          <span>升级会员</span>
          <span class="upgrade-tip">升级享受更多专属权益</span>
        </h3>

        <div class="upgrade-options">
          <div
            v-for="option in upgradeOptions"
            :key="option.id"
            class="upgrade-option"
            :class="{ 
              'current': option.id === membershipInfo.levelId,
              'recommended': option.recommended
            }"
          >
            <div class="option-badge" v-if="option.recommended">
              <span>推荐</span>
            </div>
            <div class="option-badge current-badge" v-if="option.id === membershipInfo.levelId">
              <span>当前</span>
            </div>
            
            <div class="option-header">
              <h3 class="option-name">{{ option.name }}</h3>
              <p class="option-price">
                <span class="price">¥{{ option.price }}</span>
                <span class="unit">/{{ option.duration }}</span>
              </p>
            </div>

            <div class="option-features">
              <div
                v-for="feature in option.features"
                :key="feature"
                class="feature-item"
              >
                <i class="check-icon"><el-icon><Check /></el-icon></i>
                <span>{{ feature }}</span>
              </div>
            </div>

            <div class="option-footer">
              <el-button
                :type="option.id === membershipInfo.levelId ? 'default' : 'primary'"
                :disabled="option.id === membershipInfo.levelId"
                @click="handleUpgrade(option)"
                block
              >
                {{ option.id === membershipInfo.levelId ? '当前会员' : '立即升级' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="membership-history">
        <h3 class="section-title">
          <span>开通记录</span>
          <el-link type="primary" @click="handleViewAllHistory">查看全部</el-link>
        </h3>

        <el-table :data="historyList" stripe style="width: 100%">
          <el-table-column prop="orderNo" label="订单号" width="180" />
          <el-table-column prop="level" label="会员等级" width="120" />
          <el-table-column prop="price" label="支付金额" width="120">
            <template #default="{ row }">
              <span class="price">¥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="时长" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                {{ row.status === 'active' ? '生效中' : '已过期' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="开通时间" />
          <el-table-column prop="expireTime" label="到期时间" />
        </el-table>
      </div>
    </div>

    <el-dialog v-model="upgradeVisible" title="确认升级" width="500px">
      <div class="upgrade-confirm">
        <div class="current-level">
          <span class="label">当前等级：</span>
          <span class="value">{{ membershipInfo.level }}</span>
        </div>
        <div class="arrow-down">↓</div>
        <div class="new-level">
          <span class="label">升级至：</span>
          <span class="value">{{ selectedOption?.name }}</span>
        </div>
        <div class="upgrade-details">
          <div class="detail-item">
            <span class="label">会员时长：</span>
            <span class="value">{{ selectedOption?.duration }}</span>
          </div>
          <div class="detail-item">
            <span class="label">升级费用：</span>
            <span class="value price">¥{{ selectedOption?.price }}</span>
          </div>
          <div class="detail-item">
            <span class="label">权益增加：</span>
            <span class="value highlight">{{ selectedOption?.features?.length }}项</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="upgradeVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpgrade">确认升级</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Trophy, Money, Ticket, Phone, Lightning, ChatDotRound, DataAnalysis, Present, Star, Medal, Check } from '@element-plus/icons-vue'

const membershipInfo = ref({
  level: '铂金会员',
  levelName: 'PLATINUM',
  levelId: 3,
  expireDate: '2025-01-21',
  discount: 8.5,
  benefitCount: 8,
  availableBenefits: 8
})

const benefitsList = ref([
  {
    id: 1,
    name: '专属折扣',
    icon: Money,
    description: '展会服务、门票等消费享受专属折扣优惠',
    available: true
  },
  {
    id: 2,
    name: '免费门票',
    icon: Ticket,
    description: '每月可获得2张免费展会门票',
    available: true
  },
  {
    id: 3,
    name: '专属客服',
    icon: Phone,
    description: '7x24小时专属客服服务',
    available: true
  },
  {
    id: 4,
    name: '优先报名',
    icon: Lightning,
    description: '热门展会优先报名通道',
    available: true
  },
  {
    id: 5,
    name: '免费咨询',
    icon: ChatDotRound,
    description: '每月免费咨询5次专业顾问',
    available: true
  },
  {
    id: 6,
    name: '数据报告',
    icon: DataAnalysis,
    description: '每月免费获取行业数据报告',
    available: true
  },
  {
    id: 7,
    name: '专属活动',
    icon: Present,
    description: '受邀参加会员专属线下活动',
    available: true
  },
  {
    id: 8,
    name: '积分加倍',
    icon: Star,
    description: '消费积分双倍累积',
    available: true
  },
  {
    id: 9,
    name: 'VIP通道',
    icon: Medal,
    description: '展会现场VIP快速通道',
    available: false
  },
  {
    id: 10,
    name: '专属礼遇',
    icon: Present,
    description: '节日专属礼品赠送',
    available: false
  }
])

const upgradeOptions = ref([
  {
    id: 1,
    name: '青铜会员',
    price: '99',
    duration: '年',
    recommended: false,
    features: [
      '5%消费折扣',
      '每月1张免费门票',
      '专属客服',
      '积分1.2倍累积'
    ]
  },
  {
    id: 2,
    name: '白银会员',
    price: '299',
    duration: '年',
    recommended: false,
    features: [
      '8%消费折扣',
      '每月2张免费门票',
      '专属客服',
      '优先报名',
      '每月2次免费咨询',
      '积分1.5倍累积'
    ]
  },
  {
    id: 3,
    name: '铂金会员',
    price: '599',
    duration: '年',
    recommended: true,
    features: [
      '15%消费折扣',
      '每月4张免费门票',
      '7x24专属客服',
      '优先报名',
      '每月5次免费咨询',
      '每月行业报告',
      '专属活动邀请',
      '积分2倍累积'
    ]
  },
  {
    id: 4,
    name: '钻石会员',
    price: '1299',
    duration: '年',
    recommended: false,
    features: [
      '20%消费折扣',
      '无限免费门票',
      '7x24专属客服',
      '优先报名',
      '无限免费咨询',
      '行业报告无限获取',
      '专属活动邀请',
      'VIP快速通道',
      '专属礼遇',
      '积分3倍累积'
    ]
  }
])

const historyList = ref([
  {
    orderNo: 'ORD20240121001',
    level: '铂金会员',
    price: '599',
    duration: '1年',
    status: 'active',
    createTime: '2024-01-21 10:30:00',
    expireTime: '2025-01-21 10:30:00'
  },
  {
    orderNo: 'ORD20230121001',
    level: '白银会员',
    price: '299',
    duration: '1年',
    status: 'expired',
    createTime: '2023-01-21 15:20:00',
    expireTime: '2024-01-21 15:20:00'
  },
  {
    orderNo: 'ORD20220121001',
    level: '青铜会员',
    price: '99',
    duration: '1年',
    status: 'expired',
    createTime: '2022-01-21 09:10:00',
    expireTime: '2023-01-21 09:10:00'
  }
])

const upgradeVisible = ref(false)
const selectedOption = ref(null)

const handleUpgrade = (option) => {
  selectedOption.value = option
  upgradeVisible.value = true
}

const handleUpgradeBenefit = (benefit) => {
  ElMessage.info('升级会员即可解锁该权益')
  upgradeVisible.value = true
}

const confirmUpgrade = () => {
  ElMessage.success('升级成功！感谢您的支持')
  upgradeVisible.value = false
  // 更新会员信息
  membershipInfo.value = {
    level: selectedOption.value.name,
    levelName: selectedOption.value.name.toUpperCase(),
    levelId: selectedOption.value.id,
    expireDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    discount: parseFloat(selectedOption.value.price) > 500 ? 8.5 : parseFloat(selectedOption.value.price) > 200 ? 9.2 : 9.5,
    benefitCount: selectedOption.value.features.length,
    availableBenefits: selectedOption.value.features.length
  }
}

const handleViewAllHistory = () => {
  ElMessage.info('查看全部开通记录功能待开发')
}
</script>

<style lang="scss" scoped>
.membership-page {
  padding: 30px 40px;
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

.membership-content {
  max-width: 1200px;
  margin: 0 auto;
}

.current-membership {
  margin-bottom: 40px;
}

.membership-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  &.platinum {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    .membership-logo {
      display: flex;
      align-items: center;
      gap: 20px;

      .logo-icon {
        font-size: 60px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
      }

      .membership-title {
        h3 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 5px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        p {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
          letter-spacing: 2px;
        }
      }
    }

    .expire-date {
      text-align: right;

      .label {
        display: block;
        font-size: 13px;
        opacity: 0.8;
        margin-bottom: 5px;
      }

      .value {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }

  .card-body {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;

    .discount-badge {
      text-align: center;

      .discount {
        display: block;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .label {
        font-size: 14px;
        opacity: 0.9;
      }
    }

    .benefit-summary {
      text-align: center;

      span:first-child {
        display: block;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      span:last-child {
        font-size: 14px;
        opacity: 0.9;
      }
    }
  }
}

.membership-benefits {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  .benefit-badge {
    :deep(.el-badge__content) {
      background: #2563eb;
      font-weight: 700;
    }
  }

  .upgrade-tip {
    font-size: 14px;
    font-weight: 400;
    color: #6b7280;
    margin-left: auto;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.benefit-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  gap: 15px;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    transform: translateY(-2px);
  }

  &.disabled {
    opacity: 0.6;

    &:hover {
      border-color: #e5e7eb;
      transform: none;
    }
  }

  .benefit-icon {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;

    .available-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #22c55e;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 10px;
      white-space: nowrap;
    }
  }

  .benefit-info {
    flex: 1;

    .benefit-name {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .benefit-desc {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
      line-height: 1.6;
    }
  }

  .benefit-action {
    display: flex;
    align-items: flex-start;
  }
}

.membership-upgrade {
  margin-bottom: 40px;
}

.upgrade-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.upgrade-option {
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 30px 25px;
  position: relative;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
  }

  &.recommended {
    border-color: #2563eb;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  }

  &.current {
    border-color: #22c55e;
    border-style: dashed;
  }

  .option-badge {
    position: absolute;
    top: -12px;
    right: 20px;

    span {
      background: #2563eb;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 16px;
      border-radius: 20px;
      white-space: nowrap;
    }

    &.current-badge {
      span {
        background: #22c55e;
      }
    }
  }

  .option-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;

    .option-name {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .option-price {
      .price {
        font-size: 32px;
        font-weight: 700;
        color: #2563eb;
      }

      .unit {
        font-size: 14px;
        color: #6b7280;
      }
    }
  }

  .option-features {
    margin-bottom: 25px;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #4b5563;

      .check-icon {
        color: #22c55e;
        font-weight: 700;
      }
    }
  }

  .option-footer {
    .el-button {
      height: 44px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}

.membership-history {
  .price {
    font-weight: 700;
    color: #2563eb;
  }
}

.upgrade-confirm {
  .current-level,
  .new-level {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: #f9fafb;
    border-radius: 8px;
    margin-bottom: 15px;

    .label {
      font-size: 14px;
      color: #6b7280;
    }

    .value {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
    }
  }

  .arrow-down {
    text-align: center;
    font-size: 24px;
    color: #9ca3af;
    margin-bottom: 15px;
  }

  .upgrade-details {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;

      .label {
        color: #6b7280;
      }

      .value {
        font-weight: 600;
        color: #111827;

        &.price {
          color: #2563eb;
          font-size: 18px;
        }

        &.highlight {
          color: #2563eb;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .membership-page {
    padding: 20px;
  }

  .membership-card {
    .card-header {
      flex-direction: column;
      text-align: center;
      gap: 20px;
    }

    .expire-date {
      text-align: center;
    }
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .upgrade-options {
    grid-template-columns: 1fr;
  }
}
</style>
