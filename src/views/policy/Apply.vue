<template>
  <div class="policy-apply-page">
    <div class="container">
      <div class="page-header">
        <h1>一站式申报</h1>
        <p>便捷高效的政策申报通道</p>
      </div>
      <div class="content-placeholder">
        <el-empty description="申报功能即将上线，敬请期待" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.policy-apply-page {
  padding: 40px 0;
  min-height: 60vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    color: #1F2937;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: #6B7280;
  }
}

.content-placeholder {
  background: white;
  padding: 60px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>