# 会展服务平台前端项目

## 项目简介

这是一个基于 Vue 3 + Element Plus 的会展服务平台前端项目，提供展会信息查询、服务搜索、个人中心等核心功能。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **UI组件库**: Element Plus
- **路由**: Vue Router 4
- **构建工具**: Vite
- **样式**: SCSS
- **语言**: JavaScript

## 功能模块

### 1. 首页
- 展会信息展示
- 轮播图
- 热门展会推荐
- 快速入口导航

### 2. 关于我们
- 平台介绍
- 服务内容
- 联系方式

### 3. 展会搜索
- 关键词搜索
- 高级筛选（地区、时间、类型等）
- 搜索结果展示
- 详情查看

### 4. 视频中心
- 展会视频浏览
- 视频分类
- 直播功能

### 5. 展会文集
- 文章阅读
- 分类浏览
- 搜索功能

### 6. 场馆搜索
- 场馆信息查询
- 地图展示
- 场馆详情

### 7. 政策搜索
- 政策文件查询
- 分类筛选
- 政策详情

### 8. 招投标信息
- 招标信息搜索
- 报名截止时间
- 项目详情

### 9. 展会服务搜索
- 服务商搜索
- 服务类型筛选
- 评价查看

### 10. 个人中心
#### 主页面
- 用户信息概览
- 快速功能入口
- 15个子模块导航

#### 子功能模块
1. **个人资料** - 信息管理与修改
2. **账号安全** - 密码修改、安全设置
3. **我的收藏** - 收藏内容管理
4. **我的关注** - 关注对象管理
5. **我的权益** - 权益展示与管理
6. **我的门票** - 门票信息管理
7. **预约记录** - 预约信息管理
8. **我的订单** - 订单查询与跟踪
9. **我的评价** - 评价管理
10. **我的发票** - 发票申请与管理
11. **消息通知** - 消息查看
12. **在线洽谈** - 即时通讯
13. **会员管理** - 会员等级与权益
14. **我的积分** - 积分获取与兑换

## 项目结构

```
exhibition-platform/
├── index.html                 # 入口HTML
├── package.json               # 项目依赖
├── vite.config.js             # Vite配置
├── src/
│   ├── main.js               # 入口文件
│   ├── App.vue               # 根组件
│   ├── router/
│   │   └── index.js          # 路由配置
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue   # 头部组件
│   │   │   └── Footer.vue   # 底部组件
│   │   └── common/
│   │       └── FloatingWindow.vue # 浮窗组件
│   ├── styles/
│   │   ├── variables.scss   # 样式变量
│   │   └── index.scss       # 全局样式
│   ├── data/
│   │   └── mockData.js      # 模拟数据
│   └── views/
│       ├── Home.vue         # 首页
│       ├── About.vue        # 关于我们
│       ├── exhibition/
│       │   └── Search.vue   # 展会搜索
│       ├── video/
│       │   └── Center.vue  # 视频中心
│       ├── collection/
│       │   └── Index.vue   # 展会文集
│       ├── venue/
│       │   └── Search.vue   # 场馆搜索
│       ├── policy/
│       │   └── Search.vue   # 政策搜索
│       ├── tender/
│       │   └── Index.vue    # 招投标信息
│       ├── service/
│       │   └── Search.vue   # 展会服务搜索
│       └── center/          # 个人中心
│           ├── Index.vue    # 个人中心主页
│           ├── Profile.vue  # 个人资料
│           ├── Security.vue # 账号安全
│           ├── Collection.vue # 我的收藏
│           ├── Follow.vue   # 我的关注
│           ├── Benefits.vue # 我的权益
│           ├── Tickets.vue  # 我的门票
│           ├── Reservation.vue # 预约记录
│           ├── Orders.vue   # 我的订单
│           ├── Reviews.vue  # 我的评价
│           ├── Invoice.vue  # 我的发票
│           ├── Messages.vue # 消息通知
│           ├── Chat.vue     # 在线洽谈
│           ├── Membership.vue # 会员管理
│           └── Points.vue   # 我的积分
```

## 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发运行

```bash
npm run dev
# 或
yarn dev
```

项目将在 `http://localhost:5173` 启动

### 生产构建

```bash
npm run build
# 或
yarn build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

## 主要特性

1. **响应式设计** - 适配桌面端和移动端
2. **组件化开发** - 代码复用性高
3. **路由懒加载** - 优化页面加载性能
4. **模拟数据** - 完整的mock数据支持
5. **现代化UI** - 精美的界面设计
6. **完整功能** - 覆盖会展服务全流程

## 路由配置

### 基础路由
- `/` - 首页
- `/about` - 关于我们
- `/exhibition/search` - 展会搜索
- `/video` - 视频中心
- `/collection` - 展会文集
- `/venue/search` - 场馆搜索
- `/policy/search` - 政策搜索
- `/tender` - 招投标信息
- `/service/search` - 展会服务搜索

### 个人中心路由 (需要登录)
- `/center` - 个人中心主页 (重定向到 `/center/profile`)
- `/center/profile` - 个人资料
- `/center/security` - 账号安全
- `/center/collection` - 我的收藏
- `/center/follow` - 我的关注
- `/center/benefits` - 我的权益
- `/center/tickets` - 我的门票
- `/center/reservation` - 预约记录
- `/center/orders` - 我的订单
- `/center/reviews` - 我的评价
- `/center/invoice` - 我的发票
- `/center/messages` - 消息通知
- `/center/chat` - 在线洽谈
- `/center/membership` - 会员管理
- `/center/points` - 我的积分

## 后续开发建议

1. **接入真实API**
   - 替换mockData.js为真实API调用
   - 实现用户认证与授权
   - 添加请求拦截与错误处理

2. **功能完善**
   - 实现在线洽谈的WebSocket连接
   - 完善地图功能（集成高德/百度地图）
   - 添加文件上传功能
   - 实现视频播放器优化

3. **性能优化**
   - 添加路由预加载
   - 图片懒加载
   - 代码分割优化
   - CDN资源优化

4. **用户体验**
   - 添加页面加载动画
   - 优化错误提示
   - 完善表单验证
   - 添加引导提示

5. **测试**
   - 单元测试
   - E2E测试
   - 性能测试

## 注意事项

1. 本项目使用模拟数据，实际使用时需要替换为真实API
2. 部分功能（如文件上传、视频通话等）仅展示UI，需要后端配合实现
3. 建议使用现代浏览器访问以获得最佳体验

## 技术支持

如有问题或建议，请联系开发团队。

---

**项目版本**: v1.0.0  
**更新日期**: 2024年1月  
**开发团队**: 前端开发组
