<template>
  <div class="messages-page">
    <div class="page-header">
      <h2>消息通知</h2>
      <p class="subtitle">及时获取平台重要通知</p>
    </div>

    <div class="message-tabs">
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

    <div class="message-actions">
      <el-button @click="handleMarkAllRead" :disabled="allRead">全部标为已读</el-button>
      <el-button type="danger" @click="handleDeleteAll">清空全部消息</el-button>
    </div>

    <div class="messages-list" v-if="filteredMessages.length > 0">
      <div
        v-for="message in filteredMessages"
        :key="message.id"
        class="message-item"
        :class="{ unread: !message.read }"
        @click="handleViewDetail(message)"
      >
        <div class="message-header">
          <div class="message-type">
            <el-tag :type="getTypeColor(message.type)" size="small">
              {{ getTypeText(message.type) }}
            </el-tag>
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>

        <div class="message-content">
          <h4 class="message-title">{{ message.title }}</h4>
          <p class="message-desc">{{ message.content }}</p>
        </div>

        <div class="message-footer">
          <span class="business-link" v-if="message.businessName">
            关联业务：{{ message.businessName }}
          </span>
          <div class="message-actions">
            <el-button size="small" @click.stop="handleDelete(message.id)">
              删除
            </el-button>
            <el-button
              v-if="!message.read"
              type="primary"
              size="small"
              @click.stop="handleMarkRead(message.id)"
            >
              标为已读
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon">🔔</div>
      <h3>暂无消息通知</h3>
      <p>开启消息通知，及时获取重要信息</p>
    </div>

    <el-dialog v-model="detailVisible" title="消息详情" width="600px">
      <div v-if="selectedMessage" class="message-detail">
        <div class="detail-header">
          <el-tag :type="getTypeColor(selectedMessage.type)" size="small">
            {{ getTypeText(selectedMessage.type) }}
          </el-tag>
          <span class="detail-time">{{ selectedMessage.time }}</span>
        </div>
        <h3 class="detail-title">{{ selectedMessage.title }}</h3>
        <p class="detail-content">{{ selectedMessage.content }}</p>
        <div class="detail-footer" v-if="selectedMessage.businessName">
          <p>关联业务：{{ selectedMessage.businessName }}</p>
          <el-button type="primary" size="small">查看详情</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const activeTab = ref('all')
const detailVisible = ref(false)
const selectedMessage = ref(null)

const tabs = [
  { label: '全部消息', value: 'all', count: 15 },
  { label: '业务通知', value: 'business', count: 6 },
  { label: '审核通知', value: 'audit', count: 3 },
  { label: '系统通知', value: 'system', count: 4 },
  { label: '互动通知', value: 'interaction', count: 2 }
]

const messages = ref([])

onMounted(() => {
  loadMessages()
})

const loadMessages = () => {
  messages.value = [
    {
      id: 1,
      type: 'business',
      title: '订单支付成功通知',
      content: '您的订单 ORD202401200001 已支付成功，商家将尽快为您服务。',
      time: '2024-01-21 10:30',
      read: false,
      businessName: '展位搭建服务 - 第三十七届制冷展'
    },
    {
      id: 2,
      type: 'audit',
      title: '实名认证审核通过',
      content: '您的实名认证已通过审核，现在可以享受更多平台权益。',
      time: '2024-01-20 15:20',
      read: false,
      businessName: ''
    },
    {
      id: 3,
      type: 'system',
      title: '系统功能更新通知',
      content: '平台新增在线洽谈功能，现在可以直接与服务商在线沟通了。',
      time: '2024-01-19 09:00',
      read: false,
      businessName: ''
    },
    {
      id: 4,
      type: 'interaction',
      title: '收到新回复',
      content: '商家回复了您的评价，快去看看吧！',
      time: '2024-01-18 14:15',
      read: true,
      businessName: '北京某某展览展示有限公司'
    },
    {
      id: 5,
      type: 'business',
      title: '会员续费提醒',
      content: '您的会员将于2024-02-15到期，请及时续费以免影响权益使用。',
      time: '2024-01-17 11:30',
      read: true,
      businessName: '年度会员'
    },
    {
      id: 6,
      type: 'audit',
      title: '企业认证审核中',
      content: '您的企业认证申请已提交，预计1-3个工作日完成审核。',
      time: '2024-01-16 16:45',
      read: true,
      businessName: ''
    },
    {
      id: 7,
      type: 'system',
      title: '安全登录提醒',
      content: '检测到您的账号在新的设备登录，如非本人操作请及时修改密码。',
      time: '2024-01-15 10:20',
      read: true,
      businessName: ''
    },
    {
      id: 8,
      type: 'business',
      title: '订单退款到账',
      content: '您的退款已到账，金额：¥5000.00',
      time: '2024-01-14 09:30',
      read: true,
      businessName: '展会物流运输服务'
    }
  ]
}

const filteredMessages = computed(() => {
  if (activeTab.value === 'all') {
    return messages.value
  }
  return messages.value.filter(msg => msg.type === activeTab.value)
})

const allRead = computed(() => {
  return messages.value.every(msg => msg.read)
})

const getTypeColor = (type) => {
  const colorMap = {
    business: 'primary',
    audit: 'success',
    system: 'warning',
    interaction: 'info'
  }
  return colorMap[type] || 'info'
}

const getTypeText = (type) => {
  const textMap = {
    business: '业务通知',
    audit: '审核通知',
    system: '系统通知',
    interaction: '互动通知'
  }
  return textMap[type] || '通知'
}

const handleMarkAllRead = () => {
  messages.value.forEach(msg => msg.read = true)
  ElMessage.success('全部消息已标记为已读')
  loadMessages()
}

const handleDeleteAll = () => {
  ElMessageBox.confirm('确定要清空全部消息吗？', '清空消息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    messages.value = []
    ElMessage.success('全部消息已清空')
  }).catch(() => {})
}

const handleViewDetail = (message) => {
  selectedMessage.value = message
  detailVisible.value = true
  if (!message.read) {
    handleMarkRead(message.id)
  }
}

const handleMarkRead = (id) => {
  const message = messages.value.find(msg => msg.id === id)
  if (message) {
    message.read = true
    ElMessage.success('已标记为已读')
    loadMessages()
  }
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这条消息吗？', '删除消息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    messages.value = messages.value.filter(msg => msg.id !== id)
    ElMessage.success('消息已删除')
  }).catch(() => {})
}
</script>

<style lang="scss" scoped>
.messages-page {
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

.message-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
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

.message-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  justify-content: flex-end;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateX(5px);
  }

  &.unread {
    background: linear-gradient(135deg, #eff6ff 0%, #fff 100%);
    border-left: 4px solid #2563eb;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .message-content {
    margin-bottom: 15px;

    .message-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .message-desc {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.8;
      margin: 0;
    }
  }

  .message-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;

    .business-link {
      font-size: 14px;
      color: #2563eb;
    }

    .message-actions {
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
    margin: 0;
  }
}

.message-detail {
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f3f4f6;

    .detail-time {
      font-size: 14px;
      color: #9ca3af;
    }
  }

  .detail-title {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 20px 0;
  }

  .detail-content {
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    margin-bottom: 25px;
  }

  .detail-footer {
    padding: 20px;
    background: #f9fafb;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
    }
  }
}

@media (max-width: 768px) {
  .message-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .message-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .message-item {
    .message-header {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }

    .message-footer {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }
  }
}
</style>
