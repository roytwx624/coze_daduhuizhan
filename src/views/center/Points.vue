<template>
  <div class="points-page">
    <div class="page-header">
      <h2>我的积分</h2>
      <p class="subtitle">积分管理，畅享福利</p>
    </div>

    <div class="points-content">
      <div class="points-overview">
        <div class="points-card">
          <div class="points-header">
            <div class="points-info">
              <span class="label">当前积分</span>
              <div class="points-value">
                <span class="number">{{ pointsInfo.totalPoints }}</span>
                <span class="unit">积分</span>
              </div>
            </div>
            <div class="points-icon"><el-icon><Star /></el-icon></div>
          </div>
          <div class="points-details">
            <div class="detail-item">
              <span class="label">本月获得</span>
              <span class="value gain">+{{ pointsInfo.monthlyGain }}</span>
            </div>
            <div class="detail-item">
              <span class="label">本月消耗</span>
              <span class="value spent">-{{ pointsInfo.monthlySpent }}</span>
            </div>
          </div>
        </div>

        <div class="points-actions">
          <el-button type="primary" size="large" @click="handleEarnPoints">
            <span class="icon"><el-icon><Present /></el-icon></span>
            获取更多积分
          </el-button>
          <el-button size="large" @click="handleUsePoints">
            <span class="icon"><el-icon><ShoppingBag /></el-icon></span>
            积分兑换
          </el-button>
        </div>
      </div>

      <div class="points-progress">
        <h3 class="section-title">
          <span>升级进度</span>
          <span class="next-level">{{ pointsInfo.currentLevel }} → {{ pointsInfo.nextLevel }}</span>
        </h3>
        <div class="progress-container">
          <el-progress
            :percentage="pointsInfo.progress"
            :stroke-width="20"
            :format="formatProgress"
            :color="progressColor"
          />
          <div class="progress-info">
            <span>还需 {{ pointsInfo.pointsToNextLevel }} 积分升级</span>
          </div>
        </div>
      </div>

      <div class="points-tabs">
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane label="积分明细" name="details">
            <div class="tab-content">
              <div class="tab-filters">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleDateChange"
                />
                <el-select
                  v-model="pointType"
                  placeholder="全部类型"
                  clearable
                  @change="handleTypeChange"
                >
                  <el-option label="全部类型" value="" />
                  <el-option label="获取积分" value="gain" />
                  <el-option label="消耗积分" value="spend" />
                </el-select>
                <el-button type="primary" @click="handleSearch">查询</el-button>
              </div>

              <el-table :data="pointsDetails" stripe style="width: 100%">
                <el-table-column prop="orderNo" label="订单号" width="180" />
                <el-table-column prop="description" label="描述" />
                <el-table-column prop="type" label="类型" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.type === 'gain' ? 'success' : 'danger'">
                      {{ row.type === 'gain' ? '获得' : '消耗' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="points" label="积分变动" width="120">
                  <template #default="{ row }">
                    <span :class="row.type === 'gain' ? 'gain' : 'spent'">
                      {{ row.type === 'gain' ? '+' : '-' }}{{ row.points }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="balance" label="变动后余额" width="120">
                  <template #default="{ row }">
                    {{ row.balance }}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="时间" width="180" />
                <el-table-column prop="status" label="状态" width="100">
                  <template #default="{ row }">
                    <el-tag :type="row.status === 'active' ? 'success' : 'info'">
                      {{ row.status === 'active' ? '有效' : '已过期' }}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.page"
                  v-model:page-size="pagination.size"
                  :page-sizes="[10, 20, 50, 100]"
                  :total="pagination.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="积分规则" name="rules">
            <div class="tab-content">
              <div class="rules-section">
                <h3 class="rules-title">获取积分规则</h3>
                <div class="rules-list">
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Edit /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">完善个人资料</h4>
                      <p class="rule-desc">首次完善个人资料可获得100积分</p>
                      <span class="rule-points">+100 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Ticket /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">报名展会</h4>
                      <p class="rule-desc">每次成功报名展会可获得50-200积分，根据展会等级确定</p>
                      <span class="rule-points">+50-200 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><ChatDotRound /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">发表评价</h4>
                      <p class="rule-desc">对展会或服务发表评价可获得10-30积分</p>
                      <span class="rule-points">+10-30 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Money /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">消费获得积分</h4>
                      <p class="rule-desc">每消费1元可获得1积分，会员可获得双倍积分</p>
                      <span class="rule-points">+1-2 积分/元</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Crown /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">生日福利</h4>
                      <p class="rule-desc">生日当天可获得500积分奖励</p>
                      <span class="rule-points">+500 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Calendar /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">签到奖励</h4>
                      <p class="rule-desc">每日签到可获得5-20积分，连续签到有额外奖励</p>
                      <span class="rule-points">+5-20 积分/天</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rules-section">
                <h3 class="rules-title">积分消耗规则</h3>
                <div class="rules-list">
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Ticket /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">兑换门票</h4>
                      <p class="rule-desc">使用积分兑换展会门票，100积分=1张普通门票</p>
                      <span class="rule-points spent">-100 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Gift /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">兑换礼品</h4>
                      <p class="rule-desc">使用积分兑换平台礼品，根据礼品价值扣除对应积分</p>
                      <span class="rule-points spent">-不定 积分</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><Banknote /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">积分抵现</h4>
                      <p class="rule-desc">消费时可使用积分抵扣现金，100积分=1元</p>
                      <span class="rule-points spent">-100 积分/元</span>
                    </div>
                  </div>
                  <div class="rule-item">
                    <div class="rule-icon"><el-icon :size="24"><PartyPopper /></el-icon></div>
                    <div class="rule-content">
                      <h4 class="rule-name">参与活动</h4>
                      <p class="rule-desc">参与特定活动需消耗一定积分</p>
                      <span class="rule-points spent">-不定 积分</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rules-section">
                <h3 class="rules-title">积分说明</h3>
                <div class="rules-notice">
                  <ul>
                    <li>积分有效期为获得之日起12个月，过期自动失效</li>
                    <li>会员等级越高，获取和消耗积分的倍率越大</li>
                    <li>积分不可转让，不可提现，仅限本人在平台使用</li>
                    <li>如有疑问请联系平台客服进行咨询</li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="积分兑换" name="exchange">
            <div class="tab-content">
              <div class="exchange-filters">
                <el-radio-group v-model="exchangeType">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="ticket">门票</el-radio-button>
                  <el-radio-button label="gift">礼品</el-radio-button>
                  <el-radio-button label="discount">优惠券</el-radio-button>
                </el-radio-group>
              </div>

              <div class="exchange-list">
                <div
                  v-for="item in exchangeList"
                  :key="item.id"
                  class="exchange-item"
                >
                  <div class="item-image">
                    <span class="item-type-icon"><el-icon :size="60"><component :is="item.icon" /></el-icon></span>
                  </div>
                  <div class="item-content">
                    <h4 class="item-name">{{ item.name }}</h4>
                    <p class="item-desc">{{ item.description }}</p>
                    <div class="item-stock">
                      <span class="stock-label">库存：</span>
                      <span class="stock-value">{{ item.stock }}</span>
                    </div>
                  </div>
                  <div class="item-footer">
                    <div class="item-points">
                      <span class="points-value">{{ item.points }}</span>
                      <span class="points-unit">积分</span>
                    </div>
                    <el-button
                      type="primary"
                      :disabled="pointsInfo.totalPoints < item.points || item.stock === 0"
                      @click="handleExchange(item)"
                    >
                      {{ item.stock === 0 ? '已售罄' : '立即兑换' }}
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="exchangePagination.page"
                  v-model:page-size="exchangePagination.size"
                  :page-sizes="[10, 20, 50]"
                  :total="exchangePagination.total"
                  layout="total, sizes, prev, pager, next, jumper"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog v-model="exchangeVisible" title="确认兑换" width="500px">
      <div class="exchange-confirm">
        <div class="item-preview">
          <span class="icon"><el-icon :size="48"><component :is="selectedItem?.icon" /></el-icon></span>
          <div class="item-info">
            <h3 class="item-name">{{ selectedItem?.name }}</h3>
            <p class="item-desc">{{ selectedItem?.description }}</p>
          </div>
        </div>
        <div class="exchange-details">
          <div class="detail-row">
            <span class="label">所需积分：</span>
            <span class="value points">{{ selectedItem?.points }}</span>
          </div>
          <div class="detail-row">
            <span class="label">当前积分：</span>
            <span class="value">{{ pointsInfo.totalPoints }}</span>
          </div>
          <div class="detail-row">
            <span class="label">兑换后剩余：</span>
            <span class="value highlight">{{ pointsInfo.totalPoints - (selectedItem?.points || 0) }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="exchangeVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExchange">确认兑换</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Star, Present, ShoppingBag, Document, ChatDotRound, Money, Calendar, Ticket, Gift, ShoppingCart, PartyPopper, Trophy, Edit, Crown, Banknote, Reading } from '@element-plus/icons-vue'

const activeTab = ref('details')
const dateRange = ref([])
const pointType = ref('')
const exchangeType = ref('')
const exchangeVisible = ref(false)
const selectedItem = ref(null)

const pointsInfo = ref({
  totalPoints: 12580,
  monthlyGain: 850,
  monthlySpent: 320,
  currentLevel: '白银会员',
  nextLevel: '铂金会员',
  progress: 65,
  pointsToNextLevel: 4420
})

const pointsDetails = ref([
  {
    id: 1,
    orderNo: 'ORD20240121001',
    description: '报名2024中国（北京）国际博览会',
    type: 'gain',
    points: 150,
    balance: 12580,
    createTime: '2024-01-21 10:30:00',
    status: 'active'
  },
  {
    id: 2,
    orderNo: 'ORD20240120001',
    description: '兑换展会门票1张',
    type: 'spend',
    points: 100,
    balance: 12430,
    createTime: '2024-01-20 15:20:00',
    status: 'active'
  },
  {
    id: 3,
    orderNo: 'ORD20240119001',
    description: '展会服务消费获得积分',
    type: 'gain',
    points: 200,
    balance: 12530,
    createTime: '2024-01-19 09:10:00',
    status: 'active'
  },
  {
    id: 4,
    orderNo: 'ORD20240118001',
    description: '发表展会评价',
    type: 'gain',
    points: 20,
    balance: 12330,
    createTime: '2024-01-18 14:25:00',
    status: 'active'
  },
  {
    id: 5,
    orderNo: 'ORD20240117001',
    description: '兑换礼品',
    type: 'spend',
    points: 220,
    balance: 12310,
    createTime: '2024-01-17 11:05:00',
    status: 'active'
  }
])

const exchangeList = ref([
  {
    id: 1,
    name: '普通展会门票',
    description: '可兑换任意普通展会门票1张',
    icon: Ticket,
    points: 100,
    stock: 999,
    type: 'ticket'
  },
  {
    id: 2,
    name: 'VIP展会门票',
    description: '可兑换VIP展会门票1张',
    icon: Crown,
    points: 300,
    stock: 50,
    type: 'ticket'
  },
  {
    id: 3,
    name: '定制礼品套装',
    description: '平台定制精美礼品套装一份',
    icon: Gift,
    points: 500,
    stock: 100,
    type: 'gift'
  },
  {
    id: 4,
    name: '50元优惠券',
    description: '可用于展会服务消费',
    icon: Document,
    points: 200,
    stock: 200,
    type: 'discount'
  },
  {
    id: 5,
    name: '100元优惠券',
    description: '可用于展会服务消费',
    icon: Document,
    points: 400,
    stock: 150,
    type: 'discount'
  },
  {
    id: 6,
    name: '纪念水杯',
    description: '平台定制纪念水杯一个',
    icon: Trophy,
    points: 250,
    stock: 300,
    type: 'gift'
  }
])

const pagination = ref({
  page: 1,
  size: 10,
  total: 50
})

const exchangePagination = ref({
  page: 1,
  size: 10,
  total: 30
})

const progressColor = computed(() => {
  return [
    { color: '#2563eb', percentage: 30 },
    { color: '#22c55e', percentage: 70 },
    { color: '#f59e0b', percentage: 100 }
  ]
})

const formatProgress = (percentage) => {
  return `${percentage}%`
}

const handleTabChange = (tab) => {
  ElMessage.info(`切换到${tab}标签`)
}

const handleDateChange = () => {
  ElMessage.info('日期范围已改变')
}

const handleTypeChange = () => {
  ElMessage.info('积分类型已改变')
}

const handleSearch = () => {
  ElMessage.success('查询成功')
}

const handleSizeChange = (size) => {
  pagination.value.size = size
  ElMessage.info(`每页显示 ${size} 条`)
}

const handleCurrentChange = (page) => {
  pagination.value.page = page
  ElMessage.info(`当前页 ${page}`)
}

const handleEarnPoints = () => {
  ElMessage.info('更多获取积分的途径请查看积分规则')
}

const handleUsePoints = () => {
  activeTab.value = 'exchange'
}

const handleExchange = (item) => {
  if (pointsInfo.value.totalPoints < item.points) {
    ElMessage.warning('积分不足，无法兑换')
    return
  }
  selectedItem.value = item
  exchangeVisible.value = true
}

const confirmExchange = () => {
  pointsInfo.value.totalPoints -= selectedItem.value.points
  selectedItem.value.stock--
  exchangeVisible.value = false
  ElMessage.success('兑换成功！')
}
</script>

<style lang="scss" scoped>
.points-page {
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

.points-content {
  max-width: 1200px;
  margin: 0 auto;
}

.points-overview {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.points-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);

  .points-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .points-info {
      .label {
        display: block;
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 8px;
      }

      .points-value {
        display: flex;
        align-items: baseline;
        gap: 8px;

        .number {
          font-size: 48px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .unit {
          font-size: 18px;
          opacity: 0.9;
        }
      }
    }

    .points-icon {
      font-size: 60px;
      opacity: 0.8;
    }
  }

  .points-details {
    display: flex;
    gap: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .label {
        font-size: 13px;
        opacity: 0.8;
      }

      .value {
        font-size: 20px;
        font-weight: 700;

        &.gain {
          color: #86efac;
        }

        &.spent {
          color: #fca5a5;
        }
      }
    }
  }
}

.points-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;

  .el-button {
    height: 50px;
    font-size: 16px;
    font-weight: 600;

    .icon {
      font-size: 20px;
      margin-right: 8px;
    }
  }
}

.points-progress {
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  .next-level {
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    margin-left: auto;
  }
}

.progress-container {
  :deep(.el-progress-bar__outer) {
    background: #f3f4f6;
  }

  :deep(.el-progress__text) {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
  }

  .progress-info {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #6b7280;
  }
}

.points-tabs {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  :deep(.el-tabs__header) {
    margin-bottom: 30px;
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 600;
  }
}

.tab-content {
  .tab-filters {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .gain {
    color: #22c55e;
    font-weight: 700;
  }

  .spent {
    color: #ef4444;
    font-weight: 700;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.exchange-filters {
  margin-bottom: 25px;
}

.exchange-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.exchange-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    transform: translateY(-2px);
  }

  .item-image {
    text-align: center;
    margin-bottom: 15px;

    .item-type-icon {
      font-size: 60px;
    }
  }

  .item-content {
    text-align: center;
    margin-bottom: 20px;

    .item-name {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .item-desc {
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 10px 0;
      line-height: 1.6;
    }

    .item-stock {
      font-size: 12px;
      color: #9ca3af;

      .stock-value {
        color: #22c55e;
        font-weight: 700;
      }
    }
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #e5e7eb;

    .item-points {
      display: flex;
      align-items: baseline;
      gap: 4px;

      .points-value {
        font-size: 24px;
        font-weight: 700;
        color: #2563eb;
      }

      .points-unit {
        font-size: 14px;
        color: #6b7280;
      }
    }
  }
}

.rules-section {
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
}

.rules-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #2563eb;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.rule-item {
  display: flex;
  gap: 15px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;

  &:hover {
    background: #f3f4f6;
    transform: translateX(5px);
  }

  .rule-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }

  .rule-content {
    flex: 1;

    .rule-name {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 8px 0;
    }

    .rule-desc {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 10px 0;
      line-height: 1.6;
    }

    .rule-points {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;

      &:not(.spent) {
        background: #dcfce7;
        color: #16a34a;
      }

      &.spent {
        background: #fee2e2;
        color: #dc2626;
      }
    }
  }
}

.rules-notice {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 20px;
  border-radius: 8px;

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      font-size: 14px;
      color: #92400e;
      line-height: 1.8;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.exchange-confirm {
  .item-preview {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px;
    background: #f9fafb;
    border-radius: 8px;

    .icon {
      font-size: 48px;
    }

    .item-info {
      .item-name {
        font-size: 16px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 5px 0;
      }

      .item-desc {
        font-size: 13px;
        color: #6b7280;
        margin: 0;
      }
    }
  }

  .exchange-details {
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-size: 14px;
        color: #6b7280;
      }

      .value {
        font-size: 16px;
        font-weight: 700;
        color: #111827;

        &.points {
          color: #2563eb;
        }

        &.highlight {
          color: #22c55e;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .points-page {
    padding: 20px;
  }

  .points-overview {
    grid-template-columns: 1fr;
  }

  .exchange-list {
    grid-template-columns: 1fr;
  }
}
</style>
