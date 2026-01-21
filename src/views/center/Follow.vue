<template>
  <div class="follow-page">
    <div class="page-header">
      <h2>我的关注</h2>
      <p class="subtitle">及时获取您关注对象的最新动态</p>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="展会与活动" name="exhibition">
        <div class="follow-list" v-if="exhibitionFollows.length > 0">
          <div
            v-for="item in exhibitionFollows"
            :key="item.id"
            class="follow-item exhibition-item"
          >
            <div class="item-cover">
              <img :src="item.cover" :alt="item.name" />
            </div>
            <div class="item-info">
              <div class="item-header">
                <h3 class="item-name">{{ item.name }}</h3>
                <el-button type="danger" size="small" @click="handleUnfollow(item.id, 'exhibition')">
                  取消关注
                </el-button>
              </div>
              <div class="item-meta">
                <span class="meta-item">
                  <i class="icon">📅</i>
                  {{ item.time }}
                </span>
                <span class="meta-item">
                  <i class="icon">📍</i>
                  {{ item.venue }}
                </span>
              </div>
              <div class="item-updates">
                <h4>最新动态</h4>
                <div class="update-list">
                  <div v-for="(update, index) in item.updates" :key="index" class="update-item">
                    <span class="update-time">{{ update.time }}</span>
                    <span class="update-content">{{ update.content }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">🎪</div>
          <h3>暂无关注的展会</h3>
          <p>去展会搜索页面发现更多精彩展会</p>
          <el-button type="primary" @click="goToExhibitionSearch">去看看</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="场馆" name="venue">
        <div class="follow-list" v-if="venueFollows.length > 0">
          <div
            v-for="item in venueFollows"
            :key="item.id"
            class="follow-item venue-item"
          >
            <div class="item-cover">
              <img :src="item.cover" :alt="item.name" />
            </div>
            <div class="item-info">
              <div class="item-header">
                <h3 class="item-name">{{ item.name }}</h3>
                <el-button type="danger" size="small" @click="handleUnfollow(item.id, 'venue')">
                  取消关注
                </el-button>
              </div>
              <div class="item-meta">
                <span class="meta-item">
                  <i class="icon">📍</i>
                  {{ item.address }}
                </span>
                <span class="meta-item">
                  <i class="icon">📏</i>
                  {{ item.area }}
                </span>
              </div>
              <div class="item-updates">
                <h4>最新动态</h4>
                <div class="update-list">
                  <div v-for="(update, index) in item.updates" :key="index" class="update-item">
                    <span class="update-time">{{ update.time }}</span>
                    <span class="update-content">{{ update.content }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">🏟️</div>
          <h3>暂无关注的场馆</h3>
          <p>去场馆搜索页面寻找心仪场馆</p>
          <el-button type="primary" @click="goToVenueSearch">去看看</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="服务商" name="provider">
        <div class="follow-list" v-if="providerFollows.length > 0">
          <div
            v-for="item in providerFollows"
            :key="item.id"
            class="follow-item provider-item"
          >
            <div class="item-icon">
              <span>{{ item.name.charAt(0) }}</span>
            </div>
            <div class="item-info">
              <div class="item-header">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-rating">⭐ {{ item.rating }}</div>
              </div>
              <div class="item-meta">
                <span class="meta-item">
                  <i class="icon">🏢</i>
                  {{ item.type }}
                </span>
                <span class="meta-item">
                  <i class="icon">📦</i>
                  成交 {{ item.orders }} 单
                </span>
              </div>
              <div class="item-updates">
                <h4>最新动态</h4>
                <div class="update-list">
                  <div v-for="(update, index) in item.updates" :key="index" class="update-item">
                    <span class="update-time">{{ update.time }}</span>
                    <span class="update-content">{{ update.content }}</span>
                  </div>
                </div>
              </div>
              <div class="item-actions">
                <el-button type="primary" size="small" @click="handleUnfollow(item.id, 'provider')">
                  取消关注
                </el-button>
                <el-button size="small" @click="handleChat(item)">洽谈</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">👥</div>
          <h3>暂无关注的服务商</h3>
          <p>去展会服务页面找到优质服务商</p>
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

const activeTab = ref('exhibition')

const exhibitionFollows = ref([])
const venueFollows = ref([])
const providerFollows = ref([])

onMounted(() => {
  loadFollows()
})

const loadFollows = () => {
  exhibitionFollows.value = [
    {
      id: 1,
      name: '第三十七届制冷展',
      cover: 'https://via.placeholder.com/120x120/2563EB/ffffff?text=制冷展',
      time: '2024-03-15 - 03-18',
      venue: '国家会议中心',
      updates: [
        { time: '01-20', content: '展商名录已更新' },
        { time: '01-18', content: '新增同期活动：行业论坛' }
      ]
    },
    {
      id: 2,
      name: '第66届中国特许加盟展',
      cover: 'https://via.placeholder.com/120x120/204E9C/ffffff?text=加盟展',
      time: '2024-04-20 - 04-22',
      venue: '北京展览馆',
      updates: [
        { time: '01-19', content: '观众预登记已开启' },
        { time: '01-15', content: '展会日程已公布' }
      ]
    }
  ]

  venueFollows.value = [
    {
      id: 1,
      name: '国家会议中心',
      cover: 'https://via.placeholder.com/120x120/22c55e/ffffff?text=国家会议中心',
      address: '北京市朝阳区天辰东路7号',
      area: '27万㎡',
      updates: [
        { time: '01-18', content: '3月展会排期已更新' },
        { time: '01-10', content: '新增VIP会议室预约功能' }
      ]
    }
  ]

  providerFollows.value = [
    {
      id: 1,
      name: '北京某某展览展示有限公司',
      rating: 4.8,
      type: '展位搭建',
      orders: 156,
      updates: [
        { time: '01-20', content: '新推出模块化展位方案' },
        { time: '01-15', content: '特装搭建优惠活动进行中' }
      ]
    }
  ]
}

const handleTabChange = (tab) => {
  console.log('切换到标签页:', tab)
}

const handleUnfollow = (id, type) => {
  ElMessage.success('已取消关注')
  loadFollows()
}

const handleChat = (item) => {
  ElMessage.info(`与${item.name}洽谈`)
}

const goToExhibitionSearch = () => {
  router.push('/exhibition/search')
}

const goToVenueSearch = () => {
  router.push('/venue/search')
}

const goToServiceSearch = () => {
  router.push('/service/search')
}
</script>

<style lang="scss" scoped>
.follow-page {
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

.follow-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.follow-item {
  display: flex;
  gap: 20px;
  padding: 25px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    transform: translateX(5px);
  }

  .item-cover {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .item-name {
        font-size: 20px;
        font-weight: 700;
        color: #111827;
        margin: 0;
      }

      .item-rating {
        font-size: 16px;
        font-weight: 700;
        color: #f59e0b;
      }
    }

    .item-meta {
      display: flex;
      gap: 25px;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #6b7280;

        .icon {
          font-size: 16px;
        }
      }
    }

    .item-updates {
      h4 {
        font-size: 15px;
        font-weight: 600;
        color: #111827;
        margin: 0 0 10px 0;
      }

      .update-list {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .update-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;

          .update-time {
            color: #9ca3af;
            font-size: 13px;
            min-width: 50px;
          }

          .update-content {
            color: #4b5563;
            flex: 1;
          }
        }
      }
    }

    .item-actions {
      display: flex;
      gap: 10px;
    }
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
  .follow-item {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .item-cover {
      width: 100%;
      height: 150px;
    }

    .item-header {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .item-meta {
      justify-content: center;
    }

    .item-actions {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
