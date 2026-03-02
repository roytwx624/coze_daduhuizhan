<template>
  <div class="reservation-page">
    <div class="page-header">
      <h2>预约记录</h2>
      <p class="subtitle">管理您的直播和活动预约</p>
    </div>

    <div class="reservation-list" v-if="reservations.length > 0">
      <div
        v-for="item in reservations"
        :key="item.id"
        class="reservation-card"
        :class="{ 'upcoming': item.status === 'upcoming', 'past': item.status === 'past' }"
      >
        <div class="card-cover">
          <img :src="item.cover" :alt="item.title" />
          <div class="status-badge" :class="item.status">
            {{ item.statusText }}
          </div>
        </div>
        <div class="card-body">
          <h3 class="live-title">{{ item.title }}</h3>
          <p class="live-exhibition">所属展会：{{ item.exhibition }}</p>
          <div class="live-meta">
            <span class="meta-item">
              <i class="icon"><el-icon><Calendar /></el-icon></i>
              {{ item.startTime }}
            </span>
            <span class="meta-item" v-if="item.duration">
              <i class="icon"><el-icon><Timer /></el-icon></i>
              时长：{{ item.duration }}
            </span>
          </div>
          <div class="card-footer">
            <span class="reservation-time">预约时间：{{ item.reserveTime }}</span>
            <div class="card-actions">
              <el-button
                v-if="item.status === 'upcoming'"
                type="danger"
                size="small"
                @click="handleCancel(item.id)"
              >
                取消预约
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="handleViewDetail(item)"
              >
                查看详情
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon"><el-icon><Calendar /></el-icon></div>
      <h3>暂无预约记录</h3>
      <p>去视频中心预约感兴趣的直播和活动</p>
      <el-button type="primary" @click="goToVideoCenter">去预约</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Calendar, Timer } from '@element-plus/icons-vue'
import exhibition1 from '@/assets/images/exhibition/20260122-111812.430-1.jpg'
import exhibition2 from '@/assets/images/exhibition/20260122-111812.430-2.jpg'
import exhibition3 from '@/assets/images/exhibition/20260122-111812.430-3.jpg'
import exhibition4 from '@/assets/images/exhibition/插画展.png'

const router = useRouter()

const reservations = ref([])

onMounted(() => {
  loadReservations()
})

const loadReservations = () => {
  reservations.value = [
    {
      id: 1,
      title: '第三十七届制冷展开幕式直播',
      exhibition: '第三十七届制冷展',
      startTime: '2024-01-25 10:00',
      duration: '2小时',
      status: 'upcoming',
      statusText: '即将开始',
      cover: exhibition2,
      reserveTime: '2024-01-20 15:30'
    },
    {
      id: 2,
      title: '第66届中国特许加盟展论坛',
      exhibition: '第66届中国特许加盟展',
      startTime: '2024-01-28 14:00',
      duration: '1.5小时',
      status: 'upcoming',
      statusText: '即将开始',
      cover: exhibition3,
      reserveTime: '2024-01-19 09:15'
    },
    {
      id: 3,
      title: '2024北京国际科技产业博览会开幕式',
      exhibition: '2024北京国际科技产业博览会',
      startTime: '2024-01-15 09:30',
      duration: '2.5小时',
      status: 'past',
      statusText: '已结束',
      cover: exhibition1,
      reserveTime: '2024-01-10 16:45'
    },
    {
      id: 4,
      title: '家居建材行业发展趋势讲座',
      exhibition: '第三十七届制冷展',
      startTime: '2024-01-12 10:00',
      duration: '1小时',
      status: 'past',
      statusText: '已结束',
      cover: exhibition4,
      reserveTime: '2024-01-08 11:20'
    }
  ]
}

const handleCancel = (id) => {
  ElMessageBox.confirm('确定要取消该预约吗？', '取消预约', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('预约已取消')
    loadReservations()
  }).catch(() => {})
}

const handleViewDetail = (item) => {
  ElMessage.info(`查看${item.title}详情`)
}

const goToVideoCenter = () => {
  router.push('/video/center')
}
</script>

<style lang="scss" scoped>
.reservation-page {
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

.reservation-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.reservation-card {
  display: flex;
  gap: 25px;
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

  &.upcoming {
    border-left: 4px solid #2563eb;
  }

  &.past {
    opacity: 0.8;
  }

  .card-cover {
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

    .status-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;

      &.upcoming {
        background: #dbeafe;
        color: #2563eb;
      }

      &.past {
        background: #f3f4f6;
        color: #9ca3af;
      }
    }
  }

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .live-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .live-exhibition {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 15px 0;
    }

    .live-meta {
      display: flex;
      gap: 25px;
      margin-bottom: 15px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #4b5563;

        .icon {
          font-size: 16px;
        }
      }
    }

    .card-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #f3f4f6;

      .reservation-time {
        font-size: 13px;
        color: #9ca3af;
      }

      .card-actions {
        display: flex;
        gap: 10px;
      }
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
  .reservation-card {
    flex-direction: column;

    .card-cover {
      width: 100%;
      height: 150px;
    }

    .card-footer {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;

      .card-actions {
        width: 100%;

        .el-button {
          flex: 1;
        }
      }
    }
  }
}
</style>
