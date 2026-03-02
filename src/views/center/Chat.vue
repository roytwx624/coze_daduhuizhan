<template>
  <div class="chat-page">
    <div class="page-header">
      <h2>在线洽谈</h2>
      <p class="subtitle">与服务商实时沟通</p>
    </div>

    <div class="chat-container">
      <div class="chat-sidebar">
        <div class="sidebar-header">
          <h3>会话列表</h3>
          <span class="chat-count">{{ conversations.length }}</span>
        </div>
        
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索服务商"
            prefix-icon="Search"
            clearable
          />
        </div>

        <div class="conversation-list">
          <div
            v-for="conv in filteredConversations"
            :key="conv.id"
            class="conversation-item"
            :class="{ active: selectedConversation?.id === conv.id }"
            @click="selectConversation(conv)"
          >
            <div class="conv-avatar">
              <span>{{ conv.providerName.charAt(0) }}</span>
              <div class="unread-badge" v-if="conv.unreadCount > 0">
                {{ conv.unreadCount }}
              </div>
            </div>
            <div class="conv-info">
              <div class="conv-header">
                <h4 class="conv-name">{{ conv.providerName }}</h4>
                <span class="conv-time">{{ formatTime(conv.lastMessageTime) }}</span>
              </div>
              <div class="conv-last-message">
                <span class="message-preview">{{ conv.lastMessage }}</span>
              </div>
            </div>
            <div class="conv-actions">
              <el-dropdown @command="handleConvAction">
                <span class="action-btn">⋮</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{ type: 'top', id: conv.id }">
                      {{ conv.isTop ? '取消置顶' : '置顶会话' }}
                    </el-dropdown-item>
                    <el-dropdown-item :command="{ type: 'delete', id: conv.id }" style="color: #f56c6c">
                      删除会话
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-main" v-if="selectedConversation">
        <div class="chat-header">
          <div class="provider-info">
            <div class="provider-avatar">{{ selectedConversation.providerName.charAt(0) }}</div>
            <div class="provider-details">
              <h4 class="provider-name">{{ selectedConversation.providerName }}</h4>
              <span class="provider-status" :class="{ online: selectedConversation.isOnline }">
                {{ selectedConversation.isOnline ? '在线' : '离线' }}
              </span>
            </div>
          </div>
          <div class="chat-actions">
            <el-button size="small" @click="handleHistory">历史记录</el-button>
            <el-button size="small" @click="handleClearMessages">清空消息</el-button>
          </div>
        </div>

        <div class="chat-messages" ref="messagesContainer">
          <div class="date-divider">
            <span>{{ formatDate(selectedConversation.createTime) }}</span>
          </div>
          
          <div
            v-for="(msg, index) in selectedConversation.messages"
            :key="index"
            class="message"
            :class="msg.type"
          >
            <div class="message-avatar" v-if="msg.type === 'provider'">
              <span>{{ selectedConversation.providerName.charAt(0) }}</span>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <p v-if="msg.content">{{ msg.content }}</p>
                <div class="message-image" v-if="msg.image">
                  <img :src="msg.image" alt="消息图片" />
                </div>
                <div class="message-file" v-if="msg.file">
                  <i class="icon"><el-icon><Paperclip /></el-icon></i>
                  <span>{{ msg.fileName }}</span>
                  <el-button size="small" type="text" @click="downloadFile(msg.file)">下载</el-button>
                </div>
              </div>
              <div class="message-time">{{ formatMessageTime(msg.time) }}</div>
              <div class="message-status" v-if="msg.type === 'user'">
                <i class="icon" :class="msg.status === 'read' ? 'read' : 'unread'">
                  {{ msg.status === 'read' ? '✓✓' : '✓' }}
                </i>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input-area">
          <div class="input-tools">
            <el-upload
              :auto-upload="false"
              :show-file-list="false"
              @change="handleImageUpload"
            >
              <el-button circle icon="Picture" />
            </el-upload>
            <el-upload
              :auto-upload="false"
              :show-file-list="false"
              @change="handleFileUpload"
            >
              <el-button circle icon="Paperclip" />
            </el-upload>
            <el-button circle icon="VideoCamera" @click="handleVideoCall" />
          </div>
          <div class="input-wrapper">
            <el-input
              v-model="messageContent"
              type="textarea"
              :rows="3"
              placeholder="输入消息..."
              @keydown.enter.prevent="sendMessage"
            />
            <el-button
              type="primary"
              :icon="Promotion"
              @click="sendMessage"
              :disabled="!messageContent.trim()"
            >
              发送
            </el-button>
          </div>
        </div>
      </div>

      <div class="chat-placeholder" v-else>
        <div class="placeholder-icon"><el-icon><ChatLineSquare /></el-icon></div>
        <h3>选择一个会话开始聊天</h3>
        <p>与服务商实时沟通，快速解决问题</p>
      </div>
    </div>

    <el-dialog v-model="historyVisible" title="历史记录" width="800px">
      <div class="history-content">
        <div class="history-filter">
          <el-date-picker
            v-model="historyDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-button type="primary" @click="searchHistory">搜索</el-button>
        </div>
        <div class="history-list">
          <div
            v-for="(msg, index) in historyMessages"
            :key="index"
            class="history-message"
          >
            <span class="history-time">{{ formatMessageTime(msg.time) }}</span>
            <span class="history-content">{{ msg.content }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Promotion, ChatLineSquare, Paperclip } from '@element-plus/icons-vue'

const searchKeyword = ref('')
const selectedConversation = ref(null)
const messageContent = ref('')
const historyVisible = ref(false)
const historyDateRange = ref([])
const messagesContainer = ref(null)
const historyMessages = ref([])

const conversations = ref([])

onMounted(() => {
  loadConversations()
})

const loadConversations = () => {
  conversations.value = [
    {
      id: 1,
      providerName: '北京某某展览展示有限公司',
      isOnline: true,
      isTop: true,
      unreadCount: 2,
      lastMessage: '好的，我们尽快安排。',
      lastMessageTime: '2024-01-21 10:30',
      createTime: '2024-01-15',
      messages: [
        {
          type: 'system',
          content: '已连接到北京某某展览展示有限公司',
          time: '2024-01-15 09:00'
        },
        {
          type: 'user',
          content: '您好，我想咨询一下展位搭建服务',
          time: '2024-01-15 09:05',
          status: 'read'
        },
        {
          type: 'provider',
          content: '您好！很高兴为您服务。请问您有什么具体需求？',
          time: '2024-01-15 09:10'
        },
        {
          type: 'user',
          content: '我需要一个36平方米的特装展位',
          time: '2024-01-15 09:15',
          status: 'read'
        },
        {
          type: 'provider',
          content: '好的，36平特装展位，我们可以为您设计，请问有什么风格要求吗？',
          time: '2024-01-15 09:20'
        },
        {
          type: 'user',
          content: '我想要科技感强一些的风格',
          time: '2024-01-21 10:00',
          status: 'unread'
        },
        {
          type: 'provider',
          content: '好的，我们尽快安排。',
          time: '2024-01-21 10:30'
        }
      ]
    },
    {
      id: 2,
      providerName: '顺通物流有限公司',
      isOnline: false,
      isTop: false,
      unreadCount: 0,
      lastMessage: '收到，会尽快安排配送。',
      lastMessageTime: '2024-01-20 15:20',
      createTime: '2024-01-10',
      messages: [
        {
          type: 'system',
          content: '已连接到顺通物流有限公司',
          time: '2024-01-10 14:00'
        },
        {
          type: 'user',
          content: '您好，我想咨询展会物流服务',
          time: '2024-01-10 14:05',
          status: 'read'
        },
        {
          type: 'provider',
          content: '您好！请问您的货物要从哪里运到哪个展会？',
          time: '2024-01-10 14:10'
        }
      ]
    }
  ]
}

const filteredConversations = computed(() => {
  if (!searchKeyword.value) {
    const topConversations = conversations.value.filter(c => c.isTop)
    const normalConversations = conversations.value.filter(c => !c.isTop)
    return [...topConversations, ...normalConversations]
  }
  return conversations.value.filter(c =>
    c.providerName.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

const selectConversation = (conv) => {
  selectedConversation.value = conv
  conv.unreadCount = 0
  scrollToBottom()
}

const sendMessage = () => {
  if (!messageContent.value.trim()) return

  const newMessage = {
    type: 'user',
    content: messageContent.value,
    time: new Date(),
    status: 'unread'
  }

  selectedConversation.value.messages.push(newMessage)
  selectedConversation.value.lastMessage = messageContent.value
  selectedConversation.value.lastMessageTime = new Date()
  messageContent.value = ''
  scrollToBottom()

  setTimeout(() => {
    const replyMessage = {
      type: 'provider',
      content: '收到您的消息，我们会尽快回复。',
      time: new Date()
    }
    selectedConversation.value.messages.push(replyMessage)
    selectedConversation.value.lastMessage = replyMessage.content
    scrollToBottom()
  }, 1000)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleConvAction = ({ type, id }) => {
  if (type === 'top') {
    const conv = conversations.value.find(c => c.id === id)
    if (conv) {
      conv.isTop = !conv.isTop
      ElMessage.success(conv.isTop ? '会话已置顶' : '已取消置顶')
    }
  } else if (type === 'delete') {
    ElMessageBox.confirm('确定要删除该会话吗？', '删除会话', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      conversations.value = conversations.value.filter(c => c.id !== id)
      if (selectedConversation.value?.id === id) {
        selectedConversation.value = null
      }
      ElMessage.success('会话已删除')
    }).catch(() => {})
  }
}

const handleHistory = () => {
  historyVisible.value = true
  if (selectedConversation.value) {
    historyMessages.value = [...selectedConversation.value.messages].reverse()
  }
}

const handleClearMessages = () => {
  ElMessageBox.confirm('确定要清空当前会话的消息吗？', '清空消息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    selectedConversation.value.messages = [
      {
        type: 'system',
        content: '消息已清空',
        time: new Date()
      }
    ]
    ElMessage.success('消息已清空')
  }).catch(() => {})
}

const handleImageUpload = (file) => {
  ElMessage.info('上传图片功能待开发')
}

const handleFileUpload = (file) => {
  ElMessage.info('上传文件功能待开发')
}

const handleVideoCall = () => {
  ElMessage.info('视频通话功能待开发')
}

const downloadFile = (file) => {
  ElMessage.info('下载文件功能待开发')
}

const searchHistory = () => {
  ElMessage.info('搜索历史记录功能待开发')
}

const formatTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  } else if (diff < 604800000) {
    return `${Math.floor(diff / 86400000)}天前`
  } else {
    return date.toLocaleDateString()
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatMessageTime = (time) => {
  return new Date(time).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style lang="scss" scoped>
.chat-page {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
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

.chat-container {
  flex: 1;
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: calc(100% - 150px);
}

.chat-sidebar {
  width: 350px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .chat-count {
    background: #2563eb;
    color: #fff;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
  }
}

.search-box {
  padding: 15px 20px;
  border-bottom: 1px solid #f3f4f6;
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #f3f4f6;

  &:hover {
    background: #f9fafb;
  }

  &.active {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-left: 4px solid #2563eb;
  }

  .conv-avatar {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    flex-shrink: 0;

    .unread-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ef4444;
      color: #fff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
    }
  }

  .conv-info {
    flex: 1;
    min-width: 0;

    .conv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .conv-name {
        font-size: 15px;
        font-weight: 600;
        color: #111827;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conv-time {
        font-size: 12px;
        color: #9ca3af;
        flex-shrink: 0;
      }
    }

    .conv-last-message {
      .message-preview {
        font-size: 14px;
        color: #6b7280;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .conv-actions {
    .action-btn {
      cursor: pointer;
      font-size: 18px;
      color: #9ca3af;
      padding: 5px;

      &:hover {
        color: #2563eb;
      }
    }
  }
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 20px 30px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .provider-info {
    display: flex;
    gap: 15px;
    align-items: center;

    .provider-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
    }

    .provider-details {
      .provider-name {
        font-size: 16px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 5px 0;
      }

      .provider-status {
        font-size: 13px;
        color: #9ca3af;

        &.online {
          color: #22c55e;
        }
      }
    }
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  background: #f9fafb;
}

.date-divider {
  text-align: center;
  margin-bottom: 30px;

  span {
    background: #e5e7eb;
    color: #6b7280;
    padding: 8px 20px;
    border-radius: 12px;
    font-size: 13px;
  }
}

.message {
  display: flex;
  margin-bottom: 25px;
  align-items: flex-start;

  &.system {
    justify-content: center;

    .message-content {
      .message-bubble {
        background: #e5e7eb;
        color: #6b7280;
        font-size: 13px;
      }
    }
  }

  &.user {
    justify-content: flex-end;

    .message-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .message-bubble {
        background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
        color: #fff;
      }
    }
  }

  &.provider {
    flex-direction: row;

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .message-bubble {
      background: #fff;
      color: #111827;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .message-bubble {
    max-width: 70%;
    padding: 15px 20px;
    border-radius: 12px;
    font-size: 15px;
    line-height: 1.6;

    p {
      margin: 0;
      word-wrap: break-word;
    }

    .message-image {
      margin-top: 10px;

      img {
        max-width: 100%;
        border-radius: 8px;
        cursor: pointer;
      }
    }

    .message-file {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;

      .icon {
        font-size: 20px;
      }
    }
  }

  .message-time {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 5px;
  }

  .message-status {
    font-size: 12px;
    margin-top: 5px;

    .icon {
      &.read {
        color: #22c55e;
      }

      &.unread {
        color: #9ca3af;
      }
    }
  }
}

.chat-input-area {
  padding: 20px 30px;
  border-top: 1px solid #e5e7eb;
  background: #fff;

  .input-tools {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .input-wrapper {
    display: flex;
    gap: 15px;

    .el-textarea {
      flex: 1;
    }
  }
}

.chat-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9fafb;

  .placeholder-icon {
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
    margin: 0;
  }
}

.history-content {
  .history-filter {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  .history-list {
    max-height: 400px;
    overflow-y: auto;

    .history-message {
      display: flex;
      gap: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #f3f4f6;

      .history-time {
        font-size: 13px;
        color: #9ca3af;
        min-width: 80px;
      }

      .history-content {
        flex: 1;
        font-size: 14px;
        color: #4b5563;
      }
    }
  }
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .chat-sidebar {
    width: 100%;
    max-height: 200px;
  }

  .chat-main {
    flex: 1;
  }
}
</style>
