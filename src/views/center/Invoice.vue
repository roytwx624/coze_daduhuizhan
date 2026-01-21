<template>
  <div class="invoice-page">
    <div class="page-header">
      <h2>我的发票</h2>
      <p class="subtitle">集中管理您的所有发票信息</p>
    </div>

    <div class="invoice-tabs">
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
      <el-select v-model="filters.type" placeholder="发票类型" clearable style="width: 150px">
        <el-option label="全部" value="" />
        <el-option label="增值税专用发票" value="special" />
        <el-option label="普通发票" value="ordinary" />
      </el-select>
      <el-select v-model="filters.status" placeholder="发票状态" clearable style="width: 150px">
        <el-option label="全部" value="" />
        <el-option label="待开具" value="pending" />
        <el-option label="已开具" value="issued" />
        <el-option label="已作废" value="voided" />
      </el-select>
      <el-input
        v-model="filters.keyword"
        placeholder="发票抬头/订单编号"
        clearable
        style="width: 250px"
      />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>

    <div class="invoices-list" v-if="filteredInvoices.length > 0">
      <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice-card">
        <div class="invoice-header">
          <div class="invoice-info">
            <span class="invoice-no">发票编号：{{ invoice.invoiceNo }}</span>
            <span class="invoice-time">申请时间：{{ invoice.applyTime }}</span>
          </div>
          <el-tag :type="getStatusType(invoice.status)" size="small">
            {{ getStatusText(invoice.status) }}
          </el-tag>
        </div>

        <div class="invoice-content">
          <div class="invoice-detail">
            <div class="detail-item">
              <span class="label">发票抬头</span>
              <span class="value">{{ invoice.header }}</span>
            </div>
            <div class="detail-item">
              <span class="label">发票类型</span>
              <el-tag size="small" type="info">{{ getTypeText(invoice.type) }}</el-tag>
            </div>
            <div class="detail-item">
              <span class="label">发票金额</span>
              <span class="price">¥{{ invoice.amount }}</span>
            </div>
            <div class="detail-item">
              <span class="label">关联订单</span>
              <span class="value">{{ invoice.orderNo }}</span>
            </div>
            <div class="detail-item">
              <span class="label">开票时间</span>
              <span class="value">{{ invoice.issueTime || '-' }}</span>
            </div>
          </div>
        </div>

        <div class="invoice-footer">
          <div class="invoice-actions">
            <el-button size="small" @click="handleViewDetail(invoice)">查看详情</el-button>
            <el-button
              v-if="invoice.status === 'issued' && invoice.type === 'ordinary'"
              type="primary"
              size="small"
              @click="handleDownload(invoice)"
            >
              下载电子发票
            </el-button>
            <el-button
              v-if="invoice.status === 'issued' && invoice.type === 'special'"
              size="small"
              @click="handleViewLogistics(invoice)"
            >
              查看物流信息
            </el-button>
            <el-button
              v-if="invoice.status === 'issued'"
              type="danger"
              size="small"
              @click="handleVoid(invoice)"
            >
              作废发票
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else>
      <div class="empty-icon">📄</div>
      <h3>暂无发票记录</h3>
      <p>完成订单后可以申请发票</p>
      <el-button type="primary" @click="goToOrders">去订单页</el-button>
    </div>

    <el-dialog v-model="applyVisible" title="申请发票" width="600px">
      <el-form :model="applyForm" :rules="applyRules" ref="applyFormRef" label-width="120px">
        <el-form-item label="发票类型" prop="type">
          <el-radio-group v-model="applyForm.type">
            <el-radio label="ordinary">普通发票</el-radio>
            <el-radio label="special">增值税专用发票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头" prop="header">
          <el-input v-model="applyForm.header" placeholder="请输入发票抬头" />
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="taxNo">
          <el-input v-model="applyForm.taxNo" placeholder="请输入纳税人识别号" />
        </el-form-item>
        <el-form-item label="开户银行" prop="bank" v-if="applyForm.type === 'special'">
          <el-input v-model="applyForm.bank" placeholder="请输入开户银行" />
        </el-form-item>
        <el-form-item label="银行账号" prop="account" v-if="applyForm.type === 'special'">
          <el-input v-model="applyForm.account" placeholder="请输入银行账号" />
        </el-form-item>
        <el-form-item label="接收邮箱" prop="email">
          <el-input v-model="applyForm.email" placeholder="请输入接收发票的邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="applyVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitApply">提交申请</el-button>
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
  status: '',
  keyword: ''
})
const applyVisible = ref(false)
const applyFormRef = ref(null)

const tabs = [
  { label: '全部发票', value: 'all', count: 8 },
  { label: '待开具', value: 'pending', count: 2 },
  { label: '已开具', value: 'issued', count: 5 },
  { label: '已作废', value: 'voided', count: 1 }
]

const applyForm = ref({
  type: 'ordinary',
  header: '',
  taxNo: '',
  bank: '',
  account: '',
  email: ''
})

const applyRules = {
  type: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
  header: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
  taxNo: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
  bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
  account: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入接收邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const invoices = ref([])

onMounted(() => {
  loadInvoices()
})

const loadInvoices = () => {
  invoices.value = [
    {
      id: 1,
      invoiceNo: 'INV202401200001',
      type: 'ordinary',
      header: '某某科技有限公司',
      amount: '15000.00',
      orderNo: 'ORD202401200001',
      status: 'issued',
      applyTime: '2024-01-20 14:30',
      issueTime: '2024-01-21 10:15'
    },
    {
      id: 2,
      invoiceNo: 'INV202401200002',
      type: 'special',
      header: '某某科技有限公司',
      amount: '5000.00',
      orderNo: 'ORD202401200005',
      status: 'pending',
      applyTime: '2024-01-19 09:20',
      issueTime: null
    },
    {
      id: 3,
      invoiceNo: 'INV202401200003',
      type: 'ordinary',
      header: '某某科技有限公司',
      amount: '1200.00',
      orderNo: 'ORD202401200002',
      status: 'issued',
      applyTime: '2024-01-18 16:45',
      issueTime: '2024-01-19 11:30'
    },
    {
      id: 4,
      invoiceNo: 'INV202401200004',
      type: 'ordinary',
      header: '某某科技有限公司',
      amount: '365.00',
      orderNo: 'ORD202401200003',
      status: 'voided',
      applyTime: '2024-01-15 10:15',
      issueTime: '2024-01-16 09:30'
    }
  ]
}

const filteredInvoices = computed(() => {
  let result = [...invoices.value]

  if (activeTab.value !== 'all') {
    result = result.filter(invoice => invoice.status === activeTab.value)
  }

  if (filters.value.type) {
    result = result.filter(invoice => invoice.type === filters.value.type)
  }

  if (filters.value.status) {
    result = result.filter(invoice => invoice.status === filters.value.status)
  }

  if (filters.value.keyword) {
    const keyword = filters.value.keyword.toLowerCase()
    result = result.filter(invoice =>
      invoice.header.toLowerCase().includes(keyword) ||
      invoice.invoiceNo.toLowerCase().includes(keyword) ||
      invoice.orderNo.toLowerCase().includes(keyword)
    )
  }

  return result
})

const getStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    issued: 'success',
    voided: 'info'
  }
  return typeMap[status] || ''
}

const getStatusText = (status) => {
  const textMap = {
    pending: '待开具',
    issued: '已开具',
    voided: '已作废'
  }
  return textMap[status] || ''
}

const getTypeText = (type) => {
  const textMap = {
    special: '增值税专用发票',
    ordinary: '普通发票'
  }
  return textMap[type] || ''
}

const handleSearch = () => {
  console.log('搜索发票')
}

const handleViewDetail = (invoice) => {
  ElMessage.info(`查看发票详情：${invoice.invoiceNo}`)
}

const handleDownload = (invoice) => {
  ElMessage.success(`正在下载发票：${invoice.invoiceNo}`)
}

const handleViewLogistics = (invoice) => {
  ElMessage.info(`查看物流信息：${invoice.invoiceNo}`)
}

const handleVoid = (invoice) => {
  ElMessageBox.confirm('确定要作废该发票吗？', '作废发票', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('发票已作废')
    loadInvoices()
  }).catch(() => {})
}

const handleSubmitApply = () => {
  applyFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('发票申请已提交')
      applyVisible.value = false
    }
  })
}

const goToOrders = () => {
  router.push('/center/orders')
}
</script>

<style lang="scss" scoped>
.invoice-page {
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

.invoice-tabs {
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

.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.invoices-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.invoice-card {
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

  .invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f3f4f6;

    .invoice-info {
      display: flex;
      gap: 20px;
      font-size: 14px;
      color: #6b7280;

      .invoice-no {
        font-weight: 600;
      }
    }
  }

  .invoice-content {
    margin-bottom: 20px;

    .invoice-detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;

        .label {
          font-size: 14px;
          color: #6b7280;
          min-width: 80px;
        }

        .value {
          font-size: 15px;
          color: #111827;
          font-weight: 500;
        }

        .price {
          font-size: 20px;
          color: #2563eb;
          font-weight: 700;
        }
      }
    }
  }

  .invoice-footer {
    padding-top: 15px;
    border-top: 1px solid #f3f4f6;

    .invoice-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
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
  .invoice-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .filter-bar {
    flex-direction: column;

    .el-select,
    .el-input,
    .el-button {
      width: 100%;
    }
  }

  .invoice-card {
    .invoice-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }

    .invoice-content {
      .invoice-detail {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
