import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们' }
  },
  {
    path: '/exhibition/search',
    name: 'ExhibitionSearch',
    component: () => import('@/views/exhibition/Search.vue'),
    meta: { title: '展会搜索' }
  },
  {
    path: '/exhibition/overview',
    name: 'ExhibitionOverview',
    component: () => import('@/views/exhibition/Overview.vue'),
    meta: { title: '展会概览' }
  },
  {
    path: '/video',
    name: 'VideoCenter',
    component: () => import('@/views/video/Center.vue'),
    meta: { title: '视频中心' }
  },
  {
    path: '/collection',
    name: 'ExhibitionCollection',
    component: () => import('@/views/collection/Index.vue'),
    meta: { title: '展会文集' }
  },
  {
    path: '/venue/overview',
    name: 'VenueOverview',
    component: () => import('@/views/venue/Overview.vue'),
    meta: { title: '场馆概览' }
  },
  {
    path: '/venue/search',
    name: 'VenueSearch',
    component: () => import('@/views/venue/Search.vue'),
    meta: { title: '场馆搜索' }
  },
  {
    path: '/policy/search',
    name: 'PolicySearch',
    component: () => import('@/views/policy/Search.vue'),
    meta: { title: '政策搜索' }
  },
  {
    path: '/policy/apply',
    name: 'PolicyApply',
    component: () => import('@/views/policy/Apply.vue'),
    meta: { title: '一站式报批' }
  },
  {
    path: '/bidding',
    name: 'TenderInfo',
    component: () => import('@/views/tender/Index.vue'),
    meta: { title: '招投标信息' }
  },
  {
    path: '/hotel/search',
    name: 'HotelSearch',
    component: () => import('@/views/hotel/Search.vue'),
    meta: { title: '酒店搜索' }
  },
  {
    path: '/mall',
    name: 'MallIndex',
    component: () => import('@/views/mall/Index.vue'),
    meta: { title: '线上商城' }
  },
  {
    path: '/service/search',
    name: 'ServiceSearch',
    component: () => import('@/views/service/Search.vue'),
    meta: { title: '展会服务搜索' }
  },
  {
    path: '/center',
    name: 'PersonalCenter',
    component: () => import('@/views/center/Index.vue'),
    meta: { title: '个人中心', requiresAuth: true },
    redirect: '/center/profile',
    children: [
      {
        path: 'profile',
        name: 'PersonalProfile',
        component: () => import('@/views/center/Profile.vue'),
        meta: { title: '个人资料' }
      },
      {
        path: 'security',
        name: 'AccountSecurity',
        component: () => import('@/views/center/Security.vue'),
        meta: { title: '账号安全' }
      },
      {
        path: 'collection',
        name: 'MyCollection',
        component: () => import('@/views/center/Collection.vue'),
        meta: { title: '我的收藏' }
      },
      {
        path: 'follow',
        name: 'MyFollow',
        component: () => import('@/views/center/Follow.vue'),
        meta: { title: '我的关注' }
      },
      {
        path: 'benefits',
        name: 'MyBenefits',
        component: () => import('@/views/center/Benefits.vue'),
        meta: { title: '我的权益' }
      },
      {
        path: 'tickets',
        name: 'MyTickets',
        component: () => import('@/views/center/Tickets.vue'),
        meta: { title: '我的门票' }
      },
      {
        path: 'reservation',
        name: 'Reservation',
        component: () => import('@/views/center/Reservation.vue'),
        meta: { title: '预约记录' }
      },
      {
        path: 'orders',
        name: 'MyOrders',
        component: () => import('@/views/center/Orders.vue'),
        meta: { title: '我的订单' }
      },
      {
        path: 'reviews',
        name: 'MyReviews',
        component: () => import('@/views/center/Reviews.vue'),
        meta: { title: '我的评价' }
      },
      {
        path: 'invoice',
        name: 'MyInvoice',
        component: () => import('@/views/center/Invoice.vue'),
        meta: { title: '我的发票' }
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import('@/views/center/Messages.vue'),
        meta: { title: '消息通知' }
      },
      {
        path: 'chat',
        name: 'OnlineChat',
        component: () => import('@/views/center/Chat.vue'),
        meta: { title: '在线洽谈' }
      },
      {
        path: 'membership',
        name: 'Membership',
        component: () => import('@/views/center/Membership.vue'),
        meta: { title: '会员管理' }
      },
      {
        path: 'points',
        name: 'MyPoints',
        component: () => import('@/views/center/Points.vue'),
        meta: { title: '我的积分' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 大都会展数智平台` : '大都会展数智平台'
  
  // 权限验证
  if (to.meta.requiresAuth) {
    // 临时绕过登录检查以便预览
    const isLoggedIn = true // localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router