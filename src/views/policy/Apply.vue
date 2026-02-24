<template>
  <div class="approval-page">
    <!-- 顶部Banner -->
    <section class="banner-section">
      <div class="banner-content">
        <h1>大型活动报批</h1>
        <p class="banner-desc">举办以营利为目的，单场次参加人数1000人以上，租用、借用或者以其他形式临时占用场所、场地的展览展销活动</p>
      </div>
    </section>

    <!-- 基础信息填写 -->
    <section class="region-selection" v-if="!formSubmitted">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>活动报批流程查询</h2>
          <p class="section-desc">为您匹配对应的活动报批流程</p>
        </div>
        <div class="region-selector">
          <div class="region-select-level">
            <h3>活动名称</h3>
            <el-input v-model="eventName" placeholder="请输入活动名称" />
          </div>
          <div class="region-select-level">
            <h3>活动时间</h3>
            <el-date-picker
              v-model="eventTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
              @change="handleTimeChange"
            />
          </div>
          <div class="region-select-level">
            <h3>活动人数</h3>
            <el-radio-group v-model="eventAttendance" @change="handleAttendanceChange">
              <el-radio-button label="above">1000人以上</el-radio-button>
              <el-radio-button label="below">1000人以下</el-radio-button>
            </el-radio-group>
          </div>
          <div class="region-select-level">
            <h3>场馆预订状态</h3>
            <el-radio-group v-model="venueBooked" @change="handleVenueBookedChange">
              <el-radio-button label="yes">已完成预订</el-radio-button>
              <el-radio-button label="no">未预订</el-radio-button>
            </el-radio-group>
          </div>
          <div class="region-select-level" v-if="venueBooked === 'yes'">
            <h3>选择城市</h3>
            <el-radio-group v-model="selectedCity" @change="handleCityChange">
              <el-radio-button label="北京市">北京市</el-radio-button>
            </el-radio-group>
          </div>
          <div class="region-select-level" v-if="venueBooked === 'yes' && selectedCity">
            <h3>选择场馆</h3>
            <el-select v-model="selectedVenue" placeholder="请选择场馆">
              <el-option v-for="venue in venues" :key="venue" :label="venue" :value="venue" />
            </el-select>
          </div>
          <div class="region-select-level" v-if="venueBooked === 'no'">
            <h3>选择城市</h3>
            <el-radio-group v-model="selectedCity" @change="handleCityChange">
              <el-radio-button label="北京市">北京市</el-radio-button>
            </el-radio-group>
          </div>
          <div class="region-select-level" v-if="venueBooked === 'no' && selectedCity">
            <h3>选择区域</h3>
            <el-radio-group v-model="selectedDistrict" @change="handleDistrictChange">
              <el-radio-button v-for="district in districts" :key="district" :label="district">{{ district }}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="region-select-level submit-section">
            <div class="button-group">
              <el-button type="primary" size="large" @click="handleSubmit" :disabled="!isFormValid">
                立即查询
              </el-button>
              <el-button size="large" @click="handleReset">
                重置
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- 申报流程 -->
    <section class="process-section" v-if="formSubmitted">
      <div class="content-wrapper">
        <div class="process-header">
          <h2>{{ processTitle }}</h2>
          <p class="process-desc">根据您提供的信息，为您匹配的活动审批流程</p>
        </div>
        <div class="process-container">
          <!-- 左侧流程步骤 -->
          <div class="process-steps">
            <div class="process-steps-header">
              <h2>申报流程步骤</h2>
            </div>
            <div 
              v-for="(step, index) in processSteps" 
              :key="step.id"
              class="process-step"
              :class="[step.status, { 'active': activeStep === step.id }]"
              @click="selectStep(step.id)"
            >
              <div class="step-number">{{ step.id }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p v-if="step.description">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <!-- 右侧内容区域 -->
          <div class="process-content">
            <div v-if="activeStepContent" class="step-content-detail">
              <div class="step-title-with-deadline">
                <h2>{{ activeStepContent.title }}</h2>
                <div class="deadline-info" v-if="eventTime && eventTime.length > 0 && activeStepContent.id !== '1'">
                  <span class="deadline-text">建议于 {{ calculateDeadline(activeStepContent.id, eventTime[0]) }} 前完成</span>
                </div>
              </div>
              <div class="requirements-list">
                <!-- 显示子步骤作为二级标题 -->
                <template v-if="activeStepContent.substeps">
                  <div v-for="(substep, substepIndex) in activeStepContent.substeps" :key="substep.id" class="substep-section">
                    <!-- 二级标题 -->
                    <div class="substep-title">
                      {{ substep.id }} {{ substep.title }}
                    </div>
                    <!-- 子步骤的要求 -->
                    <div v-for="(req, reqIndex) in substep.requirements" :key="reqIndex" class="requirement-item">
                      <div class="requirement-header">
                        <div class="requirement-title">
                      {{ req.title }}
                    </div>
                        <div v-if="req.downloadable" class="download-buttons">
                          <el-button size="small" type="primary" @click="downloadTemplate(req)">
                            <el-icon><Download /></el-icon>
                            下载模板
                          </el-button>
                          <el-button size="small" @click="downloadSample(req)">
                            <el-icon><Document /></el-icon>
                            下载范文
                          </el-button>
                        </div>
                      </div>
                      <div v-if="req.items" class="requirement-items">
                        <div v-for="(item, itemIndex) in req.items" :key="itemIndex" class="requirement-item-detail">
                          {{ item }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- 显示普通要求 -->
                <template v-else>
                  <div v-for="(req, index) in activeStepContent.requirements" :key="index" class="requirement-item">
                    <div class="requirement-header">
                      <div class="requirement-title">
                      {{ req.title }}
                    </div>
                      <div v-if="req.downloadable" class="download-buttons">
                        <el-button size="small" type="primary" @click="downloadTemplate(req)">
                          <el-icon><Download /></el-icon>
                          下载模板
                        </el-button>
                        <el-button size="small" @click="downloadSample(req)">
                          <el-icon><Document /></el-icon>
                          下载范文
                        </el-button>
                      </div>
                    </div>
                    <div v-if="req.items" class="requirement-items">
                      <div v-for="(item, itemIndex) in req.items" :key="itemIndex" class="requirement-item-detail">
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              

            </div>
            <div v-else class="step-content-placeholder">
              <p>请选择左侧流程步骤查看详细信息</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务中心 -->
    <section class="one-stop-service-section" v-if="formSubmitted">
      <div class="content-wrapper">
        <div class="service-content">
          <h2>服务中心</h2>
          <div class="service-row">
            <!-- 左侧材料预审服务 -->
            <div class="service-column">
              <h3>材料预审服务</h3>
              <p class="service-column-desc">专业团队人工审核材料有效性，提高通过率</p>
              <div class="service-features">
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><DocumentCopy /></el-icon>
                  </div>
                  <div class="feature-text">材料完整性检查</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><Check /></el-icon>
                  </div>
                  <div class="feature-text">格式规范性审核</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><Star /></el-icon>
                  </div>
                  <div class="feature-text">专业意见反馈</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><Timer /></el-icon>
                  </div>
                  <div class="feature-text">快速审核</div>
                </div>
              </div>
              <div class="service-cta">
                <el-button type="primary" size="large" @click="handleMaterialPrecheck">
                  体验材料预审服务
                </el-button>
              </div>
            </div>
            <!-- 右侧一站式代办服务 -->
            <div class="service-column">
              <h3>一站式代办服务</h3>
              <p class="service-column-desc">让专业团队为您处理繁琐的报批流程，节省时间和精力</p>
              <div class="service-features">
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><DocumentCopy /></el-icon>
                  </div>
                  <div class="feature-text">材料准备指导</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><Timer /></el-icon>
                  </div>
                  <div class="feature-text">全流程代办</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><Star /></el-icon>
                  </div>
                  <div class="feature-text">省心省时</div>
                </div>
                <div class="service-feature-item">
                  <div class="feature-icon">
                    <el-icon><ChatDotRound /></el-icon>
                  </div>
                  <div class="feature-text">专业顾问支持</div>
                </div>
              </div>
              <div class="service-cta">
                <el-button type="primary" size="large" @click="handleOneStopService">
                  立即咨询代办服务
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq-section" v-if="formSubmitted">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>{{ faqTitle }}</h2>
          <p class="section-desc">解答您在大型活动报批过程中的常见疑问</p>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <div class="faq-icon">
                <el-icon><QuestionFilled /></el-icon>
              </div>
              <div class="faq-question-text">构成大型展览展销活动的标准是什么？</div>
            </div>
            <div class="faq-answer">
              <div class="faq-icon">
                <el-icon><Check /></el-icon>
              </div>
              <div class="faq-answer-text">
                答：法人或其他组织，租用、借用或者以其他形式临时占用场所、场地，向社会公众举办的，单场次参加人数一千人以上的展览展销活动。
              </div>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <div class="faq-icon">
                <el-icon><QuestionFilled /></el-icon>
              </div>
              <div class="faq-question-text">食品展销会的举办者应当履行哪些食品安全管理义务？</div>
            </div>
            <div class="faq-answer">
              <div class="faq-icon">
                <el-icon><Check /></el-icon>
              </div>
              <div class="faq-answer-text">
                答：依法审查入场食品经营者的许可证等主体资质，明确其食品安全管理责任，定期对其经营环境和条件进行检查，发现其有违反食品安全法律法规规定行为的，应当及时制止，并立即报告属地市场监督管理部门。
              </div>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <div class="faq-icon">
                <el-icon><QuestionFilled /></el-icon>
              </div>
              <div class="faq-question-text">什么情况可申请设置临时性商业户外广告设施？</div>
            </div>
            <div class="faq-answer">
              <div class="faq-icon">
                <el-icon><Check /></el-icon>
              </div>
              <div class="faq-answer-text">
                答：主要是政府机关批准举办的，具有一定影响力和社会关注度的重大文化、体育、商业活动可按照需要申请设置临时性商业户外广告设施。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 悬浮窗 -->
    <div class="floating-window">
      <div class="floating-item" @click="handleMaterialPrecheck">
        <div class="floating-icon">
          <el-icon><Check /></el-icon>
        </div>
        <div class="floating-text">材料预审</div>
      </div>
      <div class="floating-item" @click="handleMyPrecheckRecords">
        <div class="floating-icon">
          <el-icon><View /></el-icon>
        </div>
        <div class="floating-text">我的预审记录</div>
      </div>
      <div class="floating-item" @click="handleOneStopService">
        <div class="floating-icon">
          <el-icon><Tools /></el-icon>
        </div>
        <div class="floating-text">一站式服务</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Document, Download, Check, View, Tools, ArrowDown, QuestionFilled, Timer, Star, ChatDotRound, DocumentCopy } from '@element-plus/icons-vue'

const router = useRouter()

// 基础信息
const eventName = ref('')
const eventTime = ref([])
const eventAttendance = ref('')
const venueBooked = ref('')
const selectedVenue = ref('')
const selectedCity = ref('')
const selectedDistrict = ref('')
const formSubmitted = ref(false)

// 计算表单是否有效
const isFormValid = computed(() => {
  if (!eventName.value) return false
  if (!eventTime.value || eventTime.value.length !== 2) return false
  if (!eventAttendance.value) return false
  if (!venueBooked.value) return false
  if (venueBooked.value === 'yes' && !selectedVenue.value) return false
  if (venueBooked.value === 'no' && (!selectedCity.value || !selectedDistrict.value)) return false
  return true
})

// 计算选中的区域
const selectedRegion = computed(() => {
  if (venueBooked.value === 'yes' && selectedVenue.value) {
    return selectedVenue.value
  } else if (venueBooked.value === 'no' && selectedCity.value && selectedDistrict.value) {
    return `${selectedCity.value}-${selectedDistrict.value}`
  }
  return ''
})

// 计算流程标题
const processTitle = computed(() => {
  if (selectedCity.value && selectedDistrict.value) {
    return `${selectedCity.value}-${selectedDistrict.value}大型活动报批流程说明`
  }
  return '大型活动报批流程说明'
})

// 计算常见问题标题
const faqTitle = computed(() => {
  return '常见问题'
})

// 北京市各区
const districts = ref([
  '东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区',
  '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区',
  '怀柔区', '平谷区', '密云区', '延庆区'
])

// 场馆列表
const venues = ref([
  '国家会议中心', '中国国际展览中心', '北京展览馆', '北京会议中心',
  '中国国际展览中心新馆', '北京国家会议中心', '北京国际会议中心', '北京亦创国际会展中心',
  '北京雁栖湖国际会展中心', '北京大兴国际机场会展中心'
])

// 常见问题直接展示，不需要展开/收起功能

// 活动步骤数据
const processSteps = ref([
  {
    id: '1',
    title: '展览会备案',
    status: 'completed',
    description: '完成备案后获得“备案回执”',
    requirements: [
      {
        title: '完成备案后获得“备案回执”',
        required: true,
        items: [
          '境内举办涉外经济技术展览会备案网址：https://ecomp.mofcom.gov.cn/',
          '注：部委、贸促会、国家级商协会等均具备展览会批复条件，主办单位可自行申报'
        ]
      }
    ]
  },
  {
    id: '2',
    title: '按材料清单准备纸质材料并提交至场馆安保部',
    status: 'completed',
    description: '按材料清单准备材料并提交至场馆安保部',
    requirements: [
      {
        title: '搭建单位资质证明',
        required: false
      },
      {
        title: '搭建公司营业执照',
        required: false
      },
      {
        title: '搭建安全保证书',
        required: true,
        downloadable: true
      },
      {
        title: '安保服务合同(搭建期间)',
        required: false
      },
      {
        title: '安保服务合同(活动期间)',
        required: false
      }
    ]
  },
  {
    id: '3',
    title: '公安报批（需至少展前20个工作日提交）',
    status: 'pending',
    description: '展前20个工作日提交',
    substeps: [
      {
        id: '3.1',
        title: '大型群众性活动安全许可申请表',
        status: 'pending',
        requirements: [
          {
            title: '大型群众性活动安全许可申请表',
            required: true,
            downloadable: true
          }
        ]
      },
      {
        id: '3.2',
        title: '主、承办单位之间的安全协议',
        status: 'pending',
        requirements: [
          {
            title: '承办资质',
            required: false,
            items: [
              '营业执照',
              '法人委托书',
              '法人及委托人（安全责任人）身份证复印件'
            ]
          },
          {
            title: '主承办安全协议书/联合承办安全协议书',
            required: true,
            downloadable: true
          }
        ]
      },
      {
        id: '3.3',
        title: '主承办单位与参与活动第三方之间的安全协议',
        status: 'pending',
        requirements: [
          {
            title: '搭建合同/委托书',
            required: false
          },
          {
            title: '搭建单位资质证明（盖公章）',
            required: false
          },
          {
            title: '搭建安全协议',
            required: true,
            downloadable: true
          },
          {
            title: '消防安全协议',
            required: true,
            downloadable: true
          },
          {
            title: '现场平面图、效果图、尺寸图',
            required: false
          },
          {
            title: '安保人员聘用合同',
            required: false
          }
        ]
      },
      {
        id: '3.4',
        title: '场所租赁借用协议',
        status: 'pending',
        requirements: [
          {
            title: '场地合同或场地确认函',
            required: false
          },
          {
            title: '活动场所消防安全措施',
            required: true,
            downloadable: true
          },
          {
            title: '大型社会活动安检登记表',
            required: true,
            downloadable: true
          }
        ]
      },
      {
        id: '3.5',
        title: '承办单位安全工作方案撰写',
        status: 'pending',
        requirements: [
          {
            title: '安全工作人员的数量、任务分配和识别标志',
            required: true,
            downloadable: true
          },
          {
            title: '活动场所可容纳的人员数量以及活动预计参加人数',
            required: false
          },
          {
            title: '票证管理方案和样本、入场人员的票证查验和安全检查措施',
            required: true,
            downloadable: true
          },
          {
            title: '车辆停放、疏导措施',
            required: true,
            downloadable: true
          },
          {
            title: '现场秩序维护、人员疏导措施',
            required: true,
            downloadable: true
          },
          {
            title: '应急救援预案',
            required: true,
            downloadable: true
          },
          {
            title: '附件：安保方案&安检方案',
            required: true,
            downloadable: true
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: '现场安全监管报备',
    status: 'pending',
    description: '开展前递交资料，资料被接收即视为备案成功，无需等待审批',
    requirements: [
      {
        title: '企业营业执照',
        required: false
      },
      {
        title: '企业法人身份证',
        required: false
      },
      {
        title: '展会基本情况',
        required: true,
        downloadable: true
      },
      {
        title: '主办单位承揽合同及安全协议',
        required: false,
        downloadable: true
      },
      {
        title: '主办单位搭建合同及安全协议',
        required: false,
        downloadable: true
      },
      {
        title: '展区平面图',
        required: false
      },
      {
        title: '搭建展位情况表',
        required: false,
        downloadable: true
      },
      {
        title: '应急预案',
        required: true,
        downloadable: true
      },
      {
        title: '特种作业人员证件复印件及证明材料',
        required: false
      },
      {
        title: '主场、主办单位联系人电话表（主要负责人、具体联系人电话）',
        required: false
      }
    ]
  },
  {
    id: '5',
    title: '市场监管报备（选择节点，二选一）',
    status: 'pending',
    description: '根据展会类型选择相应的报备方式',
    substeps: [
      {
        id: '5.1',
        title: '大型食品展销会',
        status: 'pending',
        requirements: [
          {
            title: '完成食品展销会展前报告',
            required: true
          }
        ]
      },
      {
        id: '5.2',
        title: '非大型食品展销会',
        status: 'pending',
        requirements: [
          {
            title: '完成举办大型展览展销活动“一件事”集成服务”申报',
            required: true
          }
        ]
      }
    ]
  },
  {
    id: '6',
    title: '反恐怖和特巡警支队报备',
    status: 'pending',
    description: '开展前提交',
    requirements: [
      {
        title: '主办方营业执照复印件',
        required: false
      },
      {
        title: '主办方安检工作方案、防爆安检突发事件处置预案',
        required: false,
        downloadable: true
      },
      {
        title: '安检仪器设备租赁合同',
        required: false
      },
      {
        title: '安检服务合同，安检公司的资质证明复印件',
        required: false
      },
      {
        title: '大型社会活动防爆安检安全责任书',
        required: false,
        downloadable: true
      },
      {
        title: '主办方现场安全责任人姓名，联系电话，各安检口',
        required: false
      },
      {
        title: '每时段定岗负责人姓名、联系电话',
        required: false
      }
    ]
  }
])

// 当前激活的步骤
const activeStep = ref('')

// 计算截止日期
const calculateDeadline = (stepId, eventStartDate) => {
  if (!eventStartDate) return ''
  
  const startDate = new Date(eventStartDate)
  let deadlineDate = new Date(startDate)
  let workdays = 0
  
  switch (stepId) {
    case '3': // 公安报批
      // 提前20个工作日
      workdays = 20
      while (workdays > 0) {
        deadlineDate.setDate(deadlineDate.getDate() - 1)
        const dayOfWeek = deadlineDate.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 排除周末
          workdays--
        }
      }
      break
    case '6': // 反恐怖和特巡警支队报备
      // 提前5个工作日
      workdays = 5
      while (workdays > 0) {
        deadlineDate.setDate(deadlineDate.getDate() - 1)
        const dayOfWeek = deadlineDate.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          workdays--
        }
      }
      break
    default:
      // 其他步骤提前10个工作日
      workdays = 10
      while (workdays > 0) {
        deadlineDate.setDate(deadlineDate.getDate() - 1)
        const dayOfWeek = deadlineDate.getDay()
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          workdays--
        }
      }
  }
  
  // 格式化日期
  const year = deadlineDate.getFullYear()
  const month = String(deadlineDate.getMonth() + 1).padStart(2, '0')
  const day = String(deadlineDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 计算当前激活步骤的内容
const activeStepContent = computed(() => {
  // 查找主步骤
  for (const step of processSteps.value) {
    if (step.id === activeStep.value) {
      // 如果是公安报批步骤，返回包含所有子步骤的对象
      if (step.id === '3') {
        // 直接返回原始步骤对象，不合并子步骤
        return step
      }
      return step
    }
    // 查找子步骤
    if (step.substeps) {
      for (const substep of step.substeps) {
        if (substep.id === activeStep.value) {
          return substep
        }
      }
    }
  }
  return null
})

// 人数选择处理
const handleAttendanceChange = () => {
  console.log('选择人数:', eventAttendance.value)
  // 不再重置其他选择，保持已填写的内容
}

// 活动时间处理
const handleTimeChange = () => {
  console.log('选择活动时间:', eventTime.value)
}

// 场馆预订状态处理
const handleVenueBookedChange = () => {
  console.log('选择场馆预订状态:', venueBooked.value)
  // 只重置相关的选择，不重置活动时间和活动名称
  if (venueBooked.value === 'yes') {
    // 选择已预订时，清空场馆选择
    selectedVenue.value = ''
  } else {
    // 选择未预订时，清空场馆选择
    selectedVenue.value = ''
  }
  // 重置步骤选择
  activeStep.value = ''
}

// 城市选择处理
const handleCityChange = () => {
  console.log('选择城市:', selectedCity.value)
  // 重置区域选择
  selectedDistrict.value = ''
  // 重置步骤选择
  activeStep.value = ''
}

// 区域选择处理
const handleDistrictChange = () => {
  console.log('选择区域:', selectedDistrict.value)
  // 选择区域后默认选中步骤1
  activeStep.value = '1'
}

// 重置选择
const resetSelections = () => {
  eventTime.value = []
  venueBooked.value = ''
  selectedVenue.value = ''
  selectedCity.value = ''
  selectedDistrict.value = ''
  activeStep.value = ''
}

// 处理重置按钮点击
const handleReset = () => {
  eventName.value = ''
  eventTime.value = []
  eventAttendance.value = ''
  venueBooked.value = ''
  selectedVenue.value = ''
  selectedCity.value = ''
  selectedDistrict.value = ''
  formSubmitted.value = false
  activeStep.value = ''
}

// 提交表单处理
const handleSubmit = () => {
  if (isFormValid.value) {
    formSubmitted.value = true
    console.log('提交基础信息:', {
      eventName: eventName.value,
      eventTime: eventTime.value,
      eventAttendance: eventAttendance.value,
      venueBooked: venueBooked.value,
      selectedVenue: selectedVenue.value,
      selectedCity: selectedCity.value,
      selectedDistrict: selectedDistrict.value,
      selectedRegion: selectedRegion.value
    })
    // 提交后默认选中步骤1
    activeStep.value = '1'
  }
}

// 选择步骤
const selectStep = (stepId) => {
  activeStep.value = stepId
  console.log('选择步骤:', stepId)
}

// 下载模板
const downloadTemplate = (requirement) => {
  console.log('下载模板:', requirement.title)
  // 这里可以实现下载逻辑
}

// 下载范文
const downloadSample = (requirement) => {
  console.log('下载范文:', requirement.title)
  // 这里可以实现下载逻辑
}

// 悬浮窗点击处理函数
const handleMaterialPrecheck = () => {
  console.log('材料预审')
  // 这里可以实现材料预审逻辑
  // 例如：router.push('/policy/precheck')
}

const handleMyPrecheckRecords = () => {
  console.log('我的预审记录')
  // 这里可以实现查看预审记录逻辑
  // 例如：router.push('/policy/precheck-records')
}

const handleOneStopService = () => {
  console.log('一站式服务')
  // 这里可以实现一站式服务逻辑
  // 例如：router.push('/policy/one-stop-service')
}

</script>

<style lang="scss" scoped>
.approval-page {
  /* 添加顶部内边距，确保banner从header底部开始显示，不被遮挡 */
  padding-top: 80px;
}

// 顶部Banner
.banner-section {
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  color: white;
  padding: 60px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxNSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==');
    opacity: 0.1;
  }

  .banner-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 24px;

    h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .banner-desc {
      font-size: 18px;
      opacity: 0.9;
      line-height: 1.5;
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

// 内容包装器
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// 章节标题
.section-header {
  text-align: center;
  margin-bottom: 40px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 8px;
    display: inline-block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 4px;
      background: #2563EB;
      border-radius: 2px;
    }
  }

  .section-desc {
    font-size: 16px;
    color: #6B7280;
    margin-top: 12px;
  }
}

// 区域选择
.region-selection {
  background: #F9FAFB;
  padding: 40px 0;
  margin-bottom: 24px;

  .region-selector {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
    padding: 32px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .region-select-level {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;

      &::before {
        content: '';
        width: 4px;
        height: 16px;
        background: #2563EB;
        border-radius: 2px;
      }
    }

    :deep(.el-radio-group) {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    :deep(.el-radio-button) {
      margin-right: 0;
    }

    :deep(.el-radio-button__inner) {
      padding: 10px 20px;
      font-size: 15px;
      border-radius: 8px;
      border: 2px solid #E5E7EB;
      transition: all 0.2s ease;

      &:hover {
        border-color: #2563EB;
        color: #2563EB;
      }
    }

    :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
      background-color: #2563EB;
      border-color: #2563EB;
      color: white;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
    }
  }
}

// 一站式服务模块样式
.one-stop-service-section {
  padding: 40px 0;
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  color: white;
  margin-bottom: 40px;

  .service-content {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

    h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
      color: white;
    }

    .service-row {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 32px;
      margin-bottom: 24px;

      @media (max-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 24px;
      }

      .service-column {
        flex: 1;
        min-width: 400px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 24px;
        text-align: center;

        h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: white;
        }

        .service-column-desc {
          font-size: 14px;
          margin-bottom: 24px;
          opacity: 0.9;
        }

        .service-features {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;

          .service-feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            min-width: 90px;
            max-width: 100px;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-4px);
              background: rgba(255, 255, 255, 0.15);
            }

            .feature-icon {
              font-size: 18px;
              color: #93C5FD;
            }

            .feature-text {
              font-size: 11px;
              font-weight: 500;
              color: white;
              text-align: center;
              line-height: 1.3;
            }
          }
        }

        .service-cta {
          margin-top: 16px;

          :deep(.el-button--primary) {
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 600;
            background: white;
            color: #2563EB;
            border-color: white;

            &:hover {
              background: #F3F4F6;
              border-color: #F3F4F6;
            }
          }
        }
      }
    }
  }
}

// 响应式设计 - 一站式服务
@media (max-width: 768px) {
  .one-stop-service-section {
    padding: 32px 0;

    .service-banner {
      padding: 32px 24px;

      .service-content {
        h2 {
          font-size: 28px;
        }

        .service-desc {
          font-size: 16px;
        }

        .service-features {
          .service-feature-item {
            min-width: 120px;
            padding: 12px;

            .feature-text {
              font-size: 12px;
            }
          }
        }

        .service-cta {
          :deep(.el-button--primary) {
            padding: 10px 24px;
            font-size: 14px;
          }
        }
      }
    }
  }
}

// 提交按钮样式
.submit-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 24px;
  margin-top: 16px;
  border-radius: 12px;
  width: 100%;
}

.button-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}

.button-group :deep(.el-button) {
  flex: 1;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  min-width: 140px;
  max-width: 180px;
  white-space: nowrap;
}

.button-group :deep(.el-button--primary) {
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  border-color: transparent;
  color: white;
}

.button-group :deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #1E40AF, #3B82F6);
  border-color: transparent;
}

.button-group :deep(.el-button--primary:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  border-color: transparent;
}

.button-group :deep(.el-button:not(.el-button--primary)) {
  background: white;
  border-color: #D1D5DB;
  color: #4B5563;

  &:hover {
    background: #F3F4F6;
    border-color: #9CA3AF;
  }
}

// 响应式设计 - 提交按钮
@media (max-width: 768px) {
  .button-group {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 12px;
    padding: 20px 0 0;
    max-width: 350px;

    :deep(.el-button) {
      flex: 1;
      min-width: 120px;
      max-width: 150px;
      padding: 10px 16px;
      font-size: 14px;
    }
  }
}

// 申报流程
.process-section {
  padding: 40px 0;
  background: #F9FAFB;
}

// 流程标题区域
.process-header {
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 8px;
    display: inline-block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 4px;
      background: #2563EB;
      border-radius: 2px;
    }
  }

  .process-desc {
    font-size: 16px;
    color: #6B7280;
    margin-top: 12px;
  }
}

// 响应式设计 - 流程标题
@media (max-width: 768px) {
  .process-header {
    h2 {
      font-size: 28px;
    }

    .process-desc {
      font-size: 14px;
    }
  }
}

.process-container {
  display: flex;
  gap: 32px;
  min-height: 800px;
  padding: 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
  }
}

// 流程步骤标题
.process-steps-header {
  margin-bottom: 20px;

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #1F2937;
    margin: 0;
  }
}

// 左侧流程步骤
.process-steps {
  flex: 0 0 320px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow-y: auto;

  @media (max-width: 1024px) {
    flex: 1;
    max-height: 400px;
    padding: 20px;
  }
}

.process-step {
  display: flex;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: #F9FAFB;
  border: 2px solid transparent;

  &:hover {
    background: #F3F4F6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateX(4px);
  }

  &.active {
    background: #EFF6FF;
    border: 2px solid #2563EB;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
    transform: translateX(8px);
  }

  .step-number {
    flex: 0 0 32px;
    height: 32px;
    background: #2563EB;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
    transition: all 0.3s ease;

    .process-step.active & {
      transform: scale(1.1);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
    }
  }

  .step-content {
    flex: 1;

    h3 {
      font-size: 15px;
      font-weight: 600;
      color: #4B5563;
      margin: 0 0 4px 0;
      transition: all 0.3s ease;

      .process-step.active & {
        color: #2563EB;
        font-weight: 700;
      }
    }

    p {
      font-size: 13px;
      color: #6B7280;
      margin: 0;
      line-height: 1.4;

      .process-step.active & {
        color: #4B5563;
      }
    }
  }
}



// 右侧内容区域
.process-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
}

.step-content-detail {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .step-title-with-deadline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E5E7EB;

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: #1F2937;
      margin: 0;
    }

    .deadline-info {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 16px;
      background: #EFF6FF;
      border: 1px solid #BFDBFE;

      .deadline-text {
        font-size: 12px;
        color: #1E40AF;
        font-weight: 500;
      }
    }
  }
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.requirement-item {
  padding: 16px;
  border-left: 4px solid #2563EB;
  background: #F9FAFB;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.requirement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.requirement-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  flex: 1;
}

.download-buttons {
  display: flex;
  gap: 8px;

  :deep(.el-button) {
    font-size: 12px;
    padding: 4px 10px;
  }

  :deep(.el-button--primary) {
    background-color: #2563EB;
    border-color: #2563EB;
    color: white;

    &:hover {
      background-color: #1D4ED8;
      border-color: #1D4ED8;
    }
  }

  :deep(.el-button:not(.el-button--primary)) {
    background-color: #EFF6FF;
    border-color: #DBEAFE;
    color: #2563EB;

    &:hover {
      background-color: #DBEAFE;
      border-color: #93C5FD;
    }
  }
}

.requirement-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 16px;
}

.requirement-item-detail {
  font-size: 13px;
  color: #4B5563;
  line-height: 1.5;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: -16px;
    color: #2563EB;
    font-weight: 600;
  }
}

// 子步骤区域
.substep-section {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 子步骤标题（二级标题）
.substep-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  padding-bottom: 8px;
  border-bottom: 2px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 8px;
}

.download-buttons {
  display: flex;
  gap: 8px;

  :deep(.el-button) {
    font-size: 12px;
    padding: 4px 10px;
  }

  :deep(.el-button--primary) {
    background-color: #2563EB;
    border-color: #2563EB;
    color: white;

    &:hover {
      background-color: #1D4ED8;
      border-color: #1D4ED8;
    }
  }

  :deep(.el-button:not(.el-button--primary)) {
    background-color: #EFF6FF;
    border-color: #DBEAFE;
    color: #2563EB;

    &:hover {
      background-color: #DBEAFE;
      border-color: #93C5FD;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .banner-section {
    padding: 40px 0;

    .banner-content {
      h1 {
        font-size: 36px;
      }

      .banner-desc {
        font-size: 16px;
      }
    }
  }

  .region-selection,
  .process-section {
    padding: 40px 0;
  }

  .section-header {
    h2 {
      font-size: 28px;
    }
  }

  .region-selector {
    flex-direction: column;
    align-items: center;

    :deep(.el-radio-button__inner) {
      padding: 10px 20px;
      font-size: 14px;
    }
  }

  .process-container {
    gap: 24px;
  }

  .process-steps {
    padding: 16px;
  }

  .process-step {
    padding: 12px;
    margin-bottom: 12px;

    h3 {
      font-size: 14px;
    }
  }

  .substeps {
    margin-left: 36px;
  }

  .substep {
    padding: 6px 10px;

    .substep-title {
      font-size: 13px;
    }
  }

  .process-content {
    padding: 20px;
  }

  .step-content-detail {
    h2 {
      font-size: 20px;
    }
  }

  .requirement-item {
    padding: 16px;
  }

  .requirement-title {
    font-size: 14px;
  }

  .requirement-item-detail {
    font-size: 13px;
  }

  .online-form {
    h3 {
      font-size: 18px;
    }

    :deep(.el-form-item) {
      margin-bottom: 16px;
    }

    :deep(.el-button--primary) {
      padding: 8px 20px;
      font-size: 14px;
    }
  }
}

// 悬浮窗样式
.floating-window {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .floating-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 12px;

    &:hover {
      transform: translateX(-8px);
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.2);
      background: #EFF6FF;
    }

    .floating-icon {
      font-size: 24px;
      color: #2563EB;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .floating-text {
      font-size: 12px;
      font-weight: 500;
      color: #1F2937;
      text-align: center;
      line-height: 1.2;
    }
  }
}

// 响应式设计 - 悬浮窗
@media (max-width: 768px) {
  .floating-window {
    right: 16px;
    gap: 12px;

    .floating-item {
      width: 64px;
      height: 64px;
      padding: 8px;

      .floating-icon {
        font-size: 20px;
        margin-bottom: 6px;
      }

      .floating-text {
        font-size: 10px;
      }
    }
  }
}

// 常见问题样式
.faq-section {
  background: #F9FAFB;
  padding: 40px 0;
  margin-top: 40px;

  .faq-list {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .faq-item {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .faq-question {
      padding: 20px 24px;
      display: flex;
      align-items: flex-start;
      gap: 12px;

      .faq-icon {
        font-size: 18px;
        color: #2563EB;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .faq-question-text {
        font-size: 16px;
        font-weight: 600;
        color: #1F2937;
        flex: 1;
      }
    }

    .faq-answer {
      padding: 0 24px 20px;
      font-size: 14px;
      line-height: 1.6;
      color: #4B5563;
      background: white;
      border-top: none;
      display: flex;
      align-items: flex-start;
      gap: 12px;

      .faq-icon {
        font-size: 16px;
        color: #10B981;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .faq-answer-text {
        flex: 1;
      }
    }
  }
}

// 响应式设计 - 常见问题
@media (max-width: 768px) {
  .faq-section {
    padding: 32px 0;

    .faq-item {
      .faq-question {
        padding: 16px 20px;

        .faq-question-text {
          font-size: 14px;
        }
      }

      .faq-answer {
        padding: 0 20px 16px;
        font-size: 13px;
      }
    }
  }
}
</style>