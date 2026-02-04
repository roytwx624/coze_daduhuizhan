<template>
  <div class="business-hall-page">
    <div class="page-header">
      <h1>商机大厅</h1>
      <p>发现最新展会相关商机，把握商业合作机会</p>
    </div>
    
    <div class="business-filters">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="filters.category" placeholder="选择商机类型" clearable style="width: 100%">
            <el-option label="全部类型" value=""></el-option>
            <el-option label="展会服务" value="exhibition"></el-option>
            <el-option label="酒店服务" value="hotel"></el-option>
            <el-option label="场馆租赁" value="venue"></el-option>
            <el-option label="设备租赁" value="equipment"></el-option>
            <el-option label="其他服务" value="other"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="filters.city" placeholder="选择城市" clearable style="width: 100%">
            <el-option label="全部城市" value=""></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="广州" value="guangzhou"></el-option>
            <el-option label="深圳" value="shenzhen"></el-option>
            <el-option label="杭州" value="hangzhou"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="filters.keyword"
            placeholder="搜索商机关键词"
            clearable
            style="width: 100%"
          >
            <template #append>
              <el-button @click="searchBusiness"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="resetFilters" style="width: 100%">重置</el-button>
        </el-col>
      </el-row>
    </div>
    
    <div class="business-stats">
      <div class="stat-card">
        <div class="stat-icon"><el-icon><Shop /></el-icon></div>
        <div class="stat-info">
          <div class="stat-number">{{ businessStats.total }}</div>
          <div class="stat-label">总商机数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><el-icon><Timer /></el-icon></div>
        <div class="stat-info">
          <div class="stat-number">{{ businessStats.recent }}</div>
          <div class="stat-label">近期商机</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><el-icon><Connection /></el-icon></div>
        <div class="stat-info">
          <div class="stat-number">{{ businessStats.partners }}</div>
          <div class="stat-label">合作商家</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon"><el-icon><Check /></el-icon></div>
        <div class="stat-info">
          <div class="stat-number">{{ businessStats.successful }}</div>
          <div class="stat-label">成功案例</div>
        </div>
      </div>
    </div>
    
    <div class="business-grid">
      <div v-for="item in filteredBusinesses" :key="item.id" class="business-card">
        <div class="business-header">
          <h3 class="business-title">{{ item.title }}</h3>
          <el-tag :type="getTagType(item.category)">{{ getItemCategory(item.category) }}</el-tag>
        </div>
        <div class="business-meta">
          <div class="meta-item">
            <el-icon><Location /></el-icon>
            <span>{{ item.city }}</span>
          </div>
          <div class="meta-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ item.period }}</span>
          </div>
          <div class="meta-item">
            <el-icon><UserFilled /></el-icon>
            <span>{{ item.provider }}</span>
          </div>
        </div>
        <div class="business-description">{{ item.description }}</div>
        <div class="business-footer">
          <div class="business-price">
            <span class="price-label">预算：</span>
            <span class="price-value">{{ item.budget }}</span>
          </div>
          <div class="business-actions">
            <el-button type="primary" size="small" @click="contactBusiness(item)">
              <el-icon><ChatLineSquare /></el-icon>
              联系
            </el-button>
            <el-button size="small" @click="saveBusiness(item)">
              <el-icon><Star /></el-icon>
              收藏
            </el-button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredBusinesses.length === 0" class="empty-state">
      <el-empty description="暂无相关商机" />
    </div>
    
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.size"
        :page-sizes="[12, 24, 36]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filteredBusinesses.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Shop, Timer, Connection, Check, Location, Calendar, UserFilled, ChatLineSquare, Star } from '@element-plus/icons-vue'

const filters = ref({
  category: '',
  city: '',
  keyword: ''
})

const pagination = ref({
  current: 1,
  size: 12
})

const savedBusinesses = ref([])

const businessStats = ref({
  total: 156,
  recent: 28,
  partners: 89,
  successful: 45
})

const businessData = ref([
  {
    id: 1,
    title: '2026北京国际汽车展览会特装展位搭建服务',
    category: 'exhibition',
    city: '北京市',
    period: '2026-04-20至2026-04-28',
    provider: '北京创意展览服务有限公司',
    budget: '50-80万元',
    description: '寻找专业的特装展位搭建服务商，要求有大型车展经验，能够提供创意设计和高质量施工服务。',
    status: 'active'
  },
  {
    id: 2,
    title: '2026上海国际电子展翻译服务',
    category: 'exhibition',
    city: '上海市',
    period: '2026-05-10至2026-05-14',
    provider: '上海同声传译公司',
    budget: '8-12万元',
    description: '需要英语、日语、德语专业翻译人员，为国际电子展提供现场翻译服务。',
    status: 'active'
  },
  {
    id: 3,
    title: '2026广州国际家具展酒店预订服务',
    category: 'hotel',
    city: '广州市',
    period: '2026-03-18至2026-03-22',
    provider: '广州会展旅游服务公司',
    budget: '15-20万元',
    description: '为参展商和观众提供酒店预订服务，需要与多家酒店达成合作协议，确保房源充足和优惠价格。',
    status: 'active'
  },
  {
    id: 4,
    title: '2026深圳国际科技展场馆租赁',
    category: 'venue',
    city: '深圳市',
    period: '2026-06-01至2026-06-05',
    provider: '深圳国际会展中心',
    budget: '100-150万元',
    description: '租赁深圳国际会展中心的主要展厅，用于举办2026深圳国际科技展。',
    status: 'active'
  },
  {
    id: 5,
    title: '2026成都国际食品展设备租赁',
    category: 'equipment',
    city: '成都市',
    period: '2026-07-15至2026-07-19',
    provider: '成都展览设备租赁公司',
    budget: '20-30万元',
    description: '租赁展览所需的桌椅、展架、音响设备等，确保展会顺利进行。',
    status: 'active'
  },
  {
    id: 6,
    title: '2026西安国际旅游展宣传推广服务',
    category: 'other',
    city: '西安市',
    period: '2026-08-10至2026-08-14',
    provider: '西安文化传媒公司',
    budget: '30-40万元',
    description: '为2026西安国际旅游展提供全面的宣传推广服务，包括线上线下宣传、媒体合作等。',
    status: 'active'
  }
])

const filteredBusinesses = computed(() => {
  let results = [...businessData.value]
  
  if (filters.value.category) {
    results = results.filter(item => item.category === filters.value.category)
  }
  
  if (filters.value.city) {
    results = results.filter(item => item.city.includes(filters.value.city))
  }
  
  if (filters.value.keyword) {
    const keyword = filters.value.keyword.toLowerCase()
    results = results.filter(item => 
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.provider.toLowerCase().includes(keyword)
    )
  }
  
  return results
})

const getTagType = (category) => {
  const typeMap = {
    exhibition: 'primary',
    hotel: 'success',
    venue: 'warning',
    equipment: 'info',
    other: 'default'
  }
  return typeMap[category] || 'default'
}

const getItemCategory = (category) => {
  const categoryMap = {
    exhibition: '展会服务',
    hotel: '酒店服务',
    venue: '场馆租赁',
    equipment: '设备租赁',
    other: '其他服务'
  }
  return categoryMap[category] || '其他服务'
}

const searchBusiness = () => {
  // 搜索逻辑
}

const resetFilters = () => {
  filters.value = {
    category: '',
    city: '',
    keyword: ''
  }
}

const contactBusiness = (business) => {
  // 联系商机逻辑
  console.log('联系商机:', business)
}

const saveBusiness = (business) => {
  // 收藏商机逻辑
  if (!savedBusinesses.value.some(item => item.id === business.id)) {
    savedBusinesses.value.push(business)
  }
  console.log('收藏商机:', business)
}

const handleSizeChange = (size) => {
  pagination.value.size = size
}

const handleCurrentChange = (current) => {
  pagination.value.current = current
}

onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped lang="scss">
.business-hall-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  .page-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 16px;
      color: #666;
    }
  }
  
  .business-filters {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .business-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    
    .stat-card {
      display: flex;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
      .stat-icon {
        font-size: 32px;
        color: #409eff;
        margin-right: 20px;
      }
      
      .stat-info {
        flex: 1;
        
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  
  .business-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    
    .business-card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .business-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
        
        .business-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0;
          flex: 1;
          margin-right: 10px;
        }
      }
      
      .business-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 15px;
        
        .meta-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
          
          .el-icon {
            margin-right: 5px;
          }
        }
      }
      
      .business-description {
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      
      .business-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .business-price {
          .price-label {
            font-size: 14px;
            color: #666;
          }
          
          .price-value {
            font-size: 16px;
            font-weight: bold;
            color: #f56c6c;
          }
        }
        
        .business-actions {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 0;
  }
  
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}

@media (max-width: 768px) {
  .business-hall-page {
    padding: 10px;
    
    .business-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .business-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>