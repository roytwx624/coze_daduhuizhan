<template>
  <div class="approval-page">
    <!-- 顶部Banner -->
    <section class="banner-section">
      <div class="banner-content">
        <h1>大型活动报批</h1>
        <p class="banner-desc">举办以营利为目的，单场次参加人数1000人以上，租用、借用或者以其他形式临时占用场所、场地的展览展销活动</p>
      </div>
    </section>

    <!-- 核心功能 -->
    <section class="core-functions">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>核心功能</h2>
          <p class="section-desc">为您提供全方位的活动报批服务</p>
        </div>
        <div class="functions-grid">
          <div class="function-card" @click="navigateTo('/policy/apply/guide')">
            <div class="function-icon">
              <el-icon :size="40"><Document /></el-icon>
            </div>
            <h3>办事指南</h3>
            <p>详细的申请流程和所需材料说明</p>
          </div>
          <div class="function-card" @click="navigateTo('/policy/apply/process')">
            <div class="function-icon">
              <el-icon :size="40"><DataAnalysis /></el-icon>
            </div>
            <h3>查看流程</h3>
            <p>选择举办地查看对应申请流程</p>
          </div>
          <div class="function-card" @click="navigateTo('/policy/apply/precheck')">
            <div class="function-icon">
              <el-icon :size="40"><Check /></el-icon>
            </div>
            <h3>材料预审</h3>
            <p>提前审核材料，提高申请通过率</p>
          </div>
          <div class="function-card" @click="navigateTo('/policy/apply/service')">
            <div class="function-icon">
              <el-icon :size="40"><Service /></el-icon>
            </div>
            <h3>一站式服务</h3>
            <p>全程代办，省心省力</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>常见问题</h2>
          <p class="section-desc">解答您关心的问题</p>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <el-icon class="faq-question-icon"><QuestionFilled /></el-icon>
              <span>各地申请流程是否一致？</span>
            </div>
            <div class="faq-content">
              <el-icon class="faq-answer-icon"><SuccessFilled /></el-icon>
              <div class="faq-answer-text">
                <p>流程各有差异，可以在查看流程功能中选择您的举办地查看对应申请流程。</p>
              </div>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <el-icon class="faq-question-icon"><QuestionFilled /></el-icon>
              <span>构成大型展览展销活动的标准是什么？</span>
            </div>
            <div class="faq-content">
              <el-icon class="faq-answer-icon"><SuccessFilled /></el-icon>
              <div class="faq-answer-text">
                <p>法人或其他组织，租用、借用或者以其他形式临时占用场所、场地，向社会公众举办的，单场次参加人数一千人以上的展览展销活动。</p>
              </div>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <el-icon class="faq-question-icon"><QuestionFilled /></el-icon>
              <span>食品展销会的举办者应当履行哪些食品安全管理义务？</span>
            </div>
            <div class="faq-content">
              <el-icon class="faq-answer-icon"><SuccessFilled /></el-icon>
              <div class="faq-answer-text">
                <p>依法审查入场食品经营者的许可证等主体资质，明确其食品安全管理责任，定期对其经营环境和条件进行检查，发现其有违反食品安全法律法规规定行为的，应当及时制止，并立即报告属地市场监督管理部门。</p>
              </div>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <el-icon class="faq-question-icon"><QuestionFilled /></el-icon>
              <span>什么情况可申请设置临时性商业户外广告设施？</span>
            </div>
            <div class="faq-content">
              <el-icon class="faq-answer-icon"><SuccessFilled /></el-icon>
              <div class="faq-answer-text">
                <p>主要是政府机关批准举办的，具有一定影响力和社会关注度的重大文化、体育、商业活动可按照需要申请设置临时性商业户外广告设施。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 相关政策 -->
    <section class="policies-section">
      <div class="content-wrapper">
        <div class="section-header">
          <h2>相关政策</h2>
          <p class="section-desc">了解相关法律法规</p>
        </div>
        <div class="policies-list">
          <div class="policy-item" v-for="(policy, index) in policies" :key="index">
            <div class="policy-icon">
              <el-icon :size="24"><DocumentCopy /></el-icon>
            </div>
            <div class="policy-content">
              <h3>{{ policy }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Document, DataAnalysis, Check, Service, DocumentCopy, QuestionFilled, SuccessFilled } from '@element-plus/icons-vue'

const router = useRouter()

const policies = [
  '《艺术品经营管理办法》',
  '《国务院对确需保留的行政审批项目设定行政许可的决定》',
  '《国务院关于取消和下放一批行政审批项目的决定》',
  '《中华人民共和国海关暂时进出境货物管理办法》',
  '《大型群众性活动安全管理条例》'
]

const navigateTo = (path) => {
  router.push(path)
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

// 核心功能
.core-functions {
  background: #F9FAFB;
  padding: 60px 0;
}

.functions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.function-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.1);
    border-color: #3B82F6;
  }

  .function-icon {
    width: 80px;
    height: 80px;
    background: #EFF6FF;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: #2563EB;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
    line-height: 1.5;
  }
}

// 常见问题
.faq-section {
  padding: 60px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-item {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .faq-question {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 16px;
    line-height: 1.4;

    .faq-question-icon {
      color: #3B82F6;
      font-size: 20px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    span {
      flex: 1;
    }
  }

  .faq-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .faq-answer-icon {
      color: #10B981;
      font-size: 18px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .faq-answer-text {
      flex: 1;

      p {
        font-size: 14px;
        color: #6B7280;
        line-height: 1.6;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

// 相关政策
.policies-section {
  background: #F9FAFB;
  padding: 60px 0;
}

.policies-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.policy-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .policy-icon {
    width: 48px;
    height: 48px;
    background: #EFF6FF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563EB;
    flex-shrink: 0;
  }

  .policy-content {
    flex: 1;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1F2937;
      margin: 0;
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

  .core-functions,
  .faq-section,
  .policies-section {
    padding: 40px 0;
  }

  .section-header {
    h2 {
      font-size: 28px;
    }
  }

  .function-card {
    padding: 24px;

    .function-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;

      :deep(.el-icon) {
        font-size: 32px;
      }
    }

    h3 {
      font-size: 18px;
    }
  }

  .faq-item {
    padding: 24px;

    .faq-question {
      font-size: 16px;
      margin-bottom: 12px;
      gap: 8px;

      .faq-question-icon {
        font-size: 18px;
      }
    }

    .faq-content {
      gap: 8px;

      .faq-answer-icon {
        font-size: 16px;
      }

      .faq-answer-text {
        p {
          font-size: 13px;
        }
      }
    }
  }

  .policy-item {
    padding: 16px 20px;

    .policy-icon {
      width: 40px;
      height: 40px;

      :deep(.el-icon) {
        font-size: 20px;
      }
    }

    .policy-content {
      h3 {
        font-size: 14px;
      }
    }
  }
}
</style>