<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <!-- 联系方式 -->
        <div class="footer-section contact-section">
          <h3 class="section-title">联系我们</h3>
          <div class="contact-info">
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <span>400-123-1234</span>
            </div>
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <span>business@exhibition.com</span>
            </div>
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <span>北京市朝阳区北辰东路8号</span>
            </div>
          </div>
        </div>

        <!-- 快速导航 -->
        <div class="footer-section nav-section">
          <h3 class="section-title">快速导航</h3>
          <ul class="nav-links">
            <li><a href="#">北辰实业</a></li>
            <li><a href="#">首都会展集团</a></li>
            <li><a href="#">国家会议中心</a></li>
            <li><a href="#">中国国际展览中心</a></li>
            <li><a href="#">北京展览馆</a></li>
          </ul>
        </div>

        <!-- 服务支持 -->
        <div class="footer-section service-section">
          <h3 class="section-title">服务支持</h3>
          <ul class="service-links">
            <li><router-link to="/help">帮助中心</router-link></li>
            <li><router-link to="/privacy">隐私政策</router-link></li>
            <li><router-link to="/terms">服务条款</router-link></li>
            <li><router-link to="/contact">联系客服</router-link></li>
            <li><router-link to="/feedback">意见反馈</router-link></li>
          </ul>
        </div>

        <!-- 微信公众号 -->
        <div class="footer-section wechat-section">
          <h3 class="section-title">关注我们</h3>
          <div class="qrcode-box">
            <div class="qrcode">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://exhibition.com" alt="微信公众号二维码" />
            </div>
            <p class="qrcode-text">扫码关注官方公众号</p>
          </div>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="footer-bottom">
        <div class="copyright">
          <span>© 2026 大都会展数智平台 版权所有</span>
          <span class="divider">|</span>
          <span>京ICP备12345678号-1</span>
          <span class="divider">|</span>
          <span>增值电信业务经营许可证：京B2-20261234</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Message, Location } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.site-footer {
  background: #204E9C;
  color: #F3F4F6;
  padding: 64px 0 32px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  margin-bottom: 48px;
}

.footer-section {
  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
    color: white;
  }
}

.contact-section {
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      opacity: 0.8;
    }

    .el-icon {
      color: white;
      opacity: 0.9;
    }
  }
}

.nav-section,
.service-section {
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  a {
    color: white;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.8;
      padding-left: 8px;
    }
  }
}

.wechat-section {
  .qrcode-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .qrcode {
    width: 150px;
    height: 150px;
    background: white;
    padding: 12px;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .qrcode-text {
    font-size: 13px;
    color: white;
    text-align: left;
    margin-left: 4px;
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: white;
  font-size: 13px;

  .divider {
    color: rgba(255, 255, 255, 0.3);
  }
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #9CA3AF;

  a {
    color: #9CA3AF;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }

    span {
      color: #6B7280;
    }
  }
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
