<template>
  <div class="reviews-page">
    <div class="page-header">
      <h2>我的评价</h2>
      <p class="subtitle">管理您的评价记录</p>
    </div>

    <div class="review-tabs">
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
      <el-select v-model="filters.type" placeholder="评价对象" clearable style="width: 150px">
        <el-option label="全部" value="" />
        <el-option label="展会服务" value="service" />
        <el-option label="酒店服务" value="hotel" />
      </el-select>
      <el-select v-model="filters.rating" placeholder="评分" clearable style="width: 120px">
        <el-option label="全部" value="" />
        <el-option label="5星" value="5" />
        <el-option label="4星" value="4" />
        <el-option label="3星" value="3" />
        <el-option label="2星" value="2" />
        <el-option label="1星" value="1" />
      </el-select>
      <el-select v-model="filters.hasImage" placeholder="是否有图" clearable style="width: 120px">
        <el-option label="全部" value="" />
        <el-option label="有图" value="true" />
        <el-option label="无图" value="false" />
      </el-select>
    </div>

    <div class="reviews-list" v-if="filteredReviews.length > 0">
      <div v-for="review in filteredReviews" :key="review.id" class="review-card">
        <div class="review-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">{{ review.reviewerName.charAt(0) }}</div>
            <div class="reviewer-details">
              <h4 class="reviewer-name">{{ review.reviewerName }}</h4>
              <span class="review-time">{{ review.reviewTime }}</span>
            </div>
          </div>
          <div class="review-rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">
              ⭐
            </span>
          </div>
        </div>

        <div class="review-content">
          <h3 class="review-title">{{ review.title }}</h3>
          <p class="review-text">{{ review.content }}</p>
          <div v-if="review.images && review.images.length > 0" class="review-images">
            <img v-for="(img, index) in review.images" :key="index" :src="img" :alt="review.title" />
          </div>
        </div>

        <div class="review-target">
          <div class="target-info">
            <span class="target-label">评价对象：</span>
            <span class="target-name">{{ review.targetName }}</span>
            <el-tag size="small" type="info">{{ review.targetType }}</el-tag>
          </div>
        </div>

        <div class="review-reply" v-if="review.merchantReply">
          <div class="reply-header">
            <span class="reply-label">商家回复：</span>
            <span class="reply-time">{{ review.replyTime }}</span>
          </div>
          <p class="reply-content">{{ review.merchantReply }}</p>
        </div>

        <div class="review-footer">
          <span class="order-no">关联订单：{{ review.orderNo }}</span>
          <div class="review-actions">
            <el-button size="small" @click="handleEdit(review)" v-if="!review.followUp">
              编辑评价
            </el-button>
            <el-button size="small" @click="handleFollowUp(review)" v-if="!review.followUp">
              追评
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(review.id)">
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon">💬</div>
      <h3>暂无评价记录</h3>
      <p>去订单页面对已完成的订单进行评价</p>
      <el-button type="primary" @click="goToOrders">去评价</el-button>
    </div>

    <el-dialog v-model="editVisible" title="编辑评价" width="600px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="评分">
          <el-rate v-model="editForm.rating" />
        </el-form-item>
        <el-form-item label="评价标题">
          <el-input v-model="editForm.title" placeholder="请输入评价标题" />
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input v-model="editForm.content" type="textarea" :rows="4" placeholder="请输入评价内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitEdit">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="followUpVisible" title="追评" width="600px">
      <el-form :model="followUpForm" label-width="100px">
        <el-form-item label="追评内容">
          <el-input v-model="followUpForm.content" type="textarea" :rows="4" placeholder="请输入追评内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="followUpVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitFollowUp">提交追评</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const activeTab = ref('all')
const filters = ref({
  type: '',
  rating: '',
  hasImage: ''
})

const editVisible = ref(false)
const followUpVisible = ref(false)
const editForm = ref({
  id: null,
  rating: 5,
  title: '',
  content: ''
})
const followUpForm = ref({
  id: null,
  content: ''
})

const tabs = [
  { label: '全部评价', value: 'all', count: 8 },
  { label: '展会服务', value: 'service', count: 5 },
  { label: '酒店服务', value: 'hotel', count: 3 }
]

const reviews = ref([])

onMounted(() => {
  loadReviews()
})

const loadReviews = () => {
  reviews.value = [
    {
      id: 1,
      reviewerName: '张三',
      rating: 5,
      title: '非常专业的服务',
      content: '服务非常专业，搭建质量很好，按时完成交付，值得推荐！',
      reviewTime: '2024-01-20 14:30',
      images: [
        'https://via.placeholder.com/120x120/2563EB/ffffff?text=图片1',
        'https://via.placeholder.com/120x120/204E9C/ffffff?text=图片2'
      ],
      targetName: '北京某某展览展示有限公司',
      targetType: '展会服务',
      orderNo: 'ORD202401200001',
      merchantReply: '感谢您的评价，我们会继续提供优质服务！',
      replyTime: '2024-01-21 10:15',
      followUp: false
    },
    {
      id: 2,
      reviewerName: '张三',
      rating: 4,
      title: '酒店位置不错',
      content: '酒店位置很好，离展会现场很近，服务也不错，推荐。',
      reviewTime: '2024-01-19 09:15',
      images: [],
      targetName: '北京某某酒店',
      targetType: '酒店服务',
      orderNo: 'ORD202401200002',
      merchantReply: '',
      replyTime: '',
      followUp: true
    },
    {
      id: 3,
      reviewerName: '张三',
      rating: 5,
      title: '会员权益很好',
      content: '开通会员后享受了很多优惠，值得购买！',
      reviewTime: '2024-01-18 16:45',
      images: [],
      targetName: '年度会员',
      targetType: '会员服务',
      orderNo: 'ORD202401200003',
      merchantReply: '感谢您的支持！',
      replyTime: '2024-01-19 08:30',
      followUp: false
    }
  ]
}

const filteredReviews = computed(() => {
  let result = [...reviews.value]

  if (activeTab.value !== 'all') {
    result = result.filter(review => review.targetType === (activeTab.value === 'service' ? '展会服务' : '酒店服务'))
  }

  if (filters.value.rating) {
    result = result.filter(review => review.rating === parseInt(filters.value.rating))
  }

  if (filters.value.hasImage === 'true') {
    result = result.filter(review => review.images && review.images.length > 0)
  } else if (filters.value.hasImage === 'false') {
    result = result.filter(review => !review.images || review.images.length === 0)
  }

  return result
})

const handleEdit = (review) => {
  editForm.value = {
    id: review.id,
    rating: review.rating,
    title: review.title,
    content: review.content
  }
  editVisible.value = true
}

const handleSubmitEdit = () => {
  ElMessage.success('评价已更新')
  editVisible.value = false
  loadReviews()
}

const handleFollowUp = (review) => {
  followUpForm.value = {
    id: review.id,
    content: ''
  }
  followUpVisible.value = true
}

const handleSubmitFollowUp = () => {
  ElMessage.success('追评已提交')
  followUpVisible.value = false
  loadReviews()
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这条评价吗？', '删除评价', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('评价已删除')
    loadReviews()
  }).catch(() => {})
}

const goToOrders = () => {
  router.push('/center/orders')
}
</script>

<style lang="scss" scoped>
.reviews-page {
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

.review-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;

  .tab-item {
    flex: 1;
    padding: 12px 20px;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.review-card {
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

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .reviewer-info {
      display: flex;
      gap: 15px;
      align-items: center;

      .reviewer-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #204e9c 0%, #2563eb 100%);
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 700;
      }

      .reviewer-details {
        .reviewer-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 5px 0;
        }

        .review-time {
          font-size: 13px;
          color: #9ca3af;
        }
      }
    }

    .review-rating {
      .star {
        font-size: 20px;
        opacity: 0.3;

        &.filled {
          opacity: 1;
        }
      }
    }
  }

  .review-content {
    margin-bottom: 20px;

    .review-title {
      font-size: 18px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 10px 0;
    }

    .review-text {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.8;
      margin: 0 0 15px 0;
    }

    .review-images {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      img {
        width: 120px;
        height: 120px;
        border-radius: 6px;
        cursor: pointer;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  .review-target {
    padding: 15px;
    background: #f9fafb;
    border-radius: 6px;
    margin-bottom: 20px;

    .target-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;

      .target-label {
        color: #6b7280;
      }

      .target-name {
        font-weight: 600;
        color: #111827;
      }
    }
  }

  .review-reply {
    padding: 15px;
    background: #eff6ff;
    border-radius: 6px;
    border-left: 4px solid #2563eb;
    margin-bottom: 20px;

    .reply-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .reply-label {
        font-size: 14px;
        font-weight: 600;
        color: #1e40af;
      }

      .reply-time {
        font-size: 13px;
        color: #3b82f6;
      }
    }

    .reply-content {
      font-size: 14px;
      color: #1e3a8a;
      line-height: 1.6;
      margin: 0;
    }
  }

  .review-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;

    .order-no {
      font-size: 13px;
      color: #9ca3af;
    }

    .review-actions {
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
  .review-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
  }

  .filter-bar {
    flex-direction: column;

    .el-select {
      width: 100%;
    }
  }

  .review-card {
    .review-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .review-footer {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;

      .review-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
}
</style>
