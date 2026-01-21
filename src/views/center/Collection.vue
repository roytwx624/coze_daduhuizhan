<template>
  <div class="collection-page">
    <div class="page-header">
      <h2>我的收藏</h2>
      <p class="subtitle">您收藏的有价值资源和内容</p>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="内容资料" name="content">
        <div class="collection-list" v-if="contentCollection.length > 0">
          <div
            v-for="item in contentCollection"
            :key="item.id"
            class="collection-item"
            @click="goToDetail(item)"
          >
            <div class="item-icon">{{ item.icon }}</div>
            <div class="item-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-desc">{{ item.description }}</p>
              <div class="item-meta">
                <span class="meta-tag" :class="item.type === 'report' ? 'report' : 'policy'">
                  {{ item.type === 'report' ? '展会报告' : '政策文件' }}
                </span>
                <span class="meta-time">收藏于：{{ item.collectTime }}</span>
              </div>
            </div>
            <div class="item-actions">
              <el-button size="small" @click.stop="handleUncollect(item.id)">
                取消收藏
              </el-button>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">📚</div>
          <h3>暂无收藏的内容资料</h3>
          <p>去展会文集页面探索更多内容</p>
          <el-button type="primary" @click="goToCollection">去看看</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="媒体资源" name="media">
        <div class="collection-list" v-if="mediaCollection.length > 0">
          <div
            v-for="item in mediaCollection"
            :key="item.id"
            class="collection-item media-item"
            @click="goToDetail(item)"
          >
            <div class="item-cover">
              <img :src="item.cover" :alt="item.title" />
              <div class="item-status" :class="item.status">
                {{ item.statusText }}
              </div>
            </div>
            <div class="item-info">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-desc">{{ item.description }}</p>
              <div class="item-meta">
                <span class="meta-tag">{{ item.type === 'live' ? '直播' : '回放' }}</span>
                <span class="meta-time">收藏于：{{ item.collectTime }}</span>
              </div>
            </div>
            <div class="item-actions">
              <el-button size="small" @click.stop="handleUncollect(item.id)">
                取消收藏
              </el-button>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">🎬</div>
          <h3>暂无收藏的媒体资源</h3>
          <p>去视频中心发现更多精彩内容</p>
          <el-button type="primary" @click="goToVideoCenter">去看看</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="服务资源" name="service">
        <div class="collection-list" v-if="serviceCollection.length > 0">
          <div
            v-for="item in serviceCollection"
            :key="item.id"
            class="collection-item service-item"
            @click="goToDetail(item)"
          >
            <div class="item-icon">{{ item.icon }}</div>
            <div class="item-info">
              <h3 class="item-title">{{ item.name }}</h3>
              <p class="item-desc">{{ item.provider }}</p>
              <div class="item-meta">
                <span class="meta-price">¥{{ item.price }}</span>
                <span class="meta-rating">⭐ {{ item.rating }}</span>
                <span class="meta-time">收藏于：{{ item.collectTime }}</span>
              </div>
            </div>
            <div class="item-actions">
              <el-button type="primary" size="small" @click.stop="handleChat(item)">
                洽谈
              </el-button>
              <el-button size="small" @click.stop="handleUncollect(item.id)">
                取消收藏
              </el-button>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">🔧</div>
          <h3>暂无收藏的服务资源</h3>
          <p>去展会服务页面寻找优质服务商</p>
          <el-button type="primary" @click="goToServiceSearch">去看看</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const activeTab = ref('content')

const contentCollection = ref([])
const mediaCollection = ref([])
const serviceCollection = ref([])

onMounted(() => {
  loadCollections()
})

const loadCollections = () => {
  contentCollection.value = [
    {
      id: 1,
      title: '2024年会展行业深度分析报告',
      description: '全面分析2024年会展行业发展趋势、市场规模及未来预测',
      type: 'report',
      icon: '📊',
      collectTime: '2024-01-15'
    },
    {
      id: 2,
      title: '国家会展业发展扶持政策汇编',
      description: '收录最新国家及地方会展业扶持政策文件',
      type: 'policy',
      icon: '📋',
      collectTime: '2024-01-10'
    }
  ]

  mediaCollection.value = [
    {
      id: 1,
      title: '第三十七届制冷展开幕式直播',
      description: '全方位展示展会盛况，大咖云集',
      type: 'live',
      status: 'live',
      statusText: '正在直播',
      cover: 'https://via.placeholder.com/200x120/2563EB/ffffff?text=直播封面',
      collectTime: '2024-01-20'
    },
    {
      id: 2,
      title: '第66届中国特许加盟展论坛回放',
      description: '专家解读特许加盟最新趋势',
      type: 'replay',
      status: 'replay',
      statusText: '回放',
      cover: 'https://via.placeholder.com/200x120/204E9C/ffffff?text=回放封面',
      collectTime: '2024-01-18'
    }
  ]

  serviceCollection.value = [
    {
      id: 1,
      name: '专业展位搭建服务',
      provider: '北京某某展览展示有限公司',
      price: '5000起',
      rating: 4.8,
      icon: '🏗️',
      collectTime: '2024-01-12'
    },
    {
      id: 2,
      name: '展会物流运输服务',
      provider: '顺通物流有限公司',
      price: '按距离计费',
      rating: 4.5,
      icon: '🚚',
      collectTime: '2024-01-08'
    }
  ]
}

const handleTabChange = (tab) => {
  console.log('切换到标签页:', tab)
}

const goToDetail = (item) => {
  ElMessage.info(`查看${item.title}详情`)
}

const handleUncollect = (id) => {
  ElMessage.success('已取消收藏')
  loadCollections()
}

const handleChat = (item) => {
  ElMessage.info(`与${item.provider}洽谈`)
}

const goToCollection = () => {
  router.push('/collection')
}

const goToVideoCenter = () => {
  router.push('/video/center')
}

const goToServiceSearch = () => {
  router.push('/service/search')
}
</script>

<style lang="scss" scoped>
.collection-page {
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

:deep(.el-tabs) {
  .el-tabs__header {
    margin-bottom: 30px;
  }

  .el-tabs__item {
    font-size: 16px;
    font-weight: 600;
  }

  .el-tabs__active-bar {
    background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
  }
}

.collection-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.collection-item {
  display: flex;
  gap: 20px;
  padding: 25px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateX(5px);
  }

  .item-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex-shrink: 0;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .item-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .item-desc {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 15px 0;
      line-height: 1.6;
    }

    .item-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;

      .meta-tag {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;

        &.report {
          background: #dbeafe;
          color: #2563eb;
        }

        &.policy {
          background: #fef3c7;
          color: #d97706;
        }
      }

      .meta-price {
        font-size: 16px;
        font-weight: 700;
        color: #2563eb;
      }

      .meta-rating {
        font-size: 14px;
        font-weight: 600;
        color: #f59e0b;
      }

      .meta-time {
        font-size: 13px;
        color: #9ca3af;
      }
    }
  }

  .item-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
}

.media-item {
  .item-cover {
    width: 200px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-status {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;

      &.live {
        background: #fef2f2;
        color: #dc2626;
      }

      &.replay {
        background: #f9fafb;
        color: #6b7280;
      }
    }
  }
}

.service-item {
  .item-icon {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  }
}

.empty-state {
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
}

@media (max-width: 768px) {
  .collection-item {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .item-icon {
      width: 60px;
      height: 60px;
      font-size: 28px;
    }

    .item-info {
      width: 100%;
    }

    .item-actions {
      width: 100%;
      flex-direction: row;
      justify-content: center;
    }
  }

  .media-item {
    .item-cover {
      width: 100%;
      height: 150px;
    }
  }
}
</style>
