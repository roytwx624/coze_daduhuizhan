// 模拟数据 - 会展服务平台
import exhibition1 from '@/assets/images/exhibition/20260122-111812.430-1.jpg'
import exhibition2 from '@/assets/images/exhibition/20260122-111812.430-2.jpg'
import exhibition3 from '@/assets/images/exhibition/20260122-111812.430-3.jpg'
import exhibition4 from '@/assets/images/exhibition/插画展.png'

import venue1 from '@/assets/images/venues/527424142127173.jpg'
import venue2 from '@/assets/images/venues/527424271376453.jpg'
import venue3 from '@/assets/images/venues/541684553453637.jpg'
import venue4 from '@/assets/images/venues/529284468772933.png'
import venue5 from '@/assets/images/venues/541976601251909.jpg'

// 展会数据
export const exhibitions = [
  {
    id: 1,
    name: '第三十七届制冷展',
    time: '2026-04-08至2026-04-10',
    venue: '中国国际展览中心（顺义馆）',
    industry: '电子科技',
    tags: ['热门推荐', '即将开展'],
    poster: exhibition2,
    description: '中国制冷、空调、热泵、通风及冷冻冷藏设备展览会',
    exhibitors: 800,
    area: 100000,
    level: '国际展',
    status: '即将开展'
  },
  {
    id: 2,
    name: '第66届中国特许加盟展',
    time: '2026-05-15至2026-05-17',
    venue: '国家会议中心',
    industry: '商贸零售',
    tags: ['热门推荐', '即将开展'],
    poster: exhibition3,
    description: '中国规模最大的特许加盟展览会',
    exhibitors: 1200,
    area: 80000,
    level: '国际展',
    status: '即将开展'
  },
  {
    id: 3,
    name: '第二十七届中国北京国际科技产业博览会',
    time: '2026-06-10至2026-06-13',
    venue: '北京展览馆',
    industry: '智能制造',
    tags: ['品牌展会', '即将开展'],
    poster: exhibition1,
    description: '国家级科技产业博览会，展示最新科技成果',
    exhibitors: 1500,
    area: 120000,
    level: '国际展',
    status: '即将开展'
  },
  {
    id: 4,
    name: '2026北京国际插画艺术展览会',
    time: '2026-07-05至2026-07-08',
    venue: '国家会议中心',
    industry: '文化艺术',
    tags: ['特色展会', '即将开展'],
    poster: exhibition4,
    description: '亚洲规模最大的插画艺术专业展会',
    exhibitors: 300,
    area: 30000,
    level: '国际展',
    status: '即将开展'
  }
]

// 展会日历数据
export const calendarData = {
  currentDate: '2026-01',
  stats: {
    totalExhibitions: 156,
    totalVenues: 23
  },
  events: {
    '2026-01-15': [
      { id: 101, name: '北京家居建材展', time: '2026-01-15 09:00' }
    ],
    '2026-01-20': [
      { id: 102, name: '医疗器械博览会', time: '2026-01-20 09:00' },
      { id: 103, name: '人工智能峰会', time: '2026-01-20 14:00' }
    ],
    '2026-01-25': [
      { id: 104, name: '新能源汽车展', time: '2026-01-25 09:00' }
    ],
    '2026-01-28': [
      { id: 105, name: '国际教育展', time: '2026-01-28 09:00' }
    ]
  }
}

// 政策数据
export const policies = [
  {
    id: 1,
    title: '关于促进会展业高质量发展的若干措施',
    publisher: '商务部',
    publishTime: '2026-01-15',
    category: '重点扶持',
    summary: '为促进会展业高质量发展，推动国际经贸交流合作，商务部出台相关扶持措施...',
    status: '有效'
  },
  {
    id: 2,
    title: '会展场馆建设补贴政策实施细则',
    publisher: '北京市发改委',
    publishTime: '2026-01-10',
    category: '优惠政策',
    summary: '为完善会展基础设施，提升会展服务能力，北京市出台场馆建设补贴政策...',
    status: '有效'
  },
  {
    id: 3,
    title: '国际展会参展费用补助办法',
    publisher: '北京市财政局',
    publishTime: '2026-01-05',
    category: '资金支持',
    summary: '为鼓励企业参与国际展会，拓展海外市场，北京市制定参展费用补助办法...',
    status: '有效'
  },
  {
    id: 4,
    title: '会展企业税收优惠政策通知',
    publisher: '国家税务总局',
    publishTime: '2025-12-28',
    category: '税收优惠',
    summary: '为支持会展业发展，减轻企业负担，国家税务总局出台税收优惠政策...',
    status: '有效'
  }
]

// 视频数据
export const videos = {
  live: [
    {
      id: 1,
      title: '2026北京国际汽车展览会开幕式',
      exhibitionName: '第十八届北京国际汽车展览会',
      cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600',
      isLive: true,
      memberOnly: false,
      startTime: '2026-01-21 10:00',
      viewerCount: 12580
    },
    {
      id: 2,
      title: '国际医疗设备创新论坛',
      exhibitionName: '国际医疗器械展览会',
      cover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600',
      isLive: true,
      memberOnly: true,
      startTime: '2026-01-21 14:00',
      viewerCount: 8932
    }
  ],
  upcoming: [
    {
      id: 3,
      title: '智能制造技术峰会主论坛',
      exhibitionName: '北京智能制造博览会',
      cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      startTime: '2026-01-25 09:30',
      booked: false
    },
    {
      id: 4,
      title: '新能源产业发展论坛',
      exhibitionName: '中国国际新能源展',
      cover: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600',
      startTime: '2026-01-26 14:00',
      booked: false
    }
  ],
  replay: [
    {
      id: 5,
      title: '2025年度国际旅游交易会',
      exhibitionName: '中国国际旅游交易会',
      cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
      duration: '02:15:30',
      memberOnly: false,
      views: 45230
    },
    {
      id: 6,
      title: '数字经济发展高峰论坛',
      exhibitionName: '数字中国建设成果展',
      cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
      duration: '01:45:20',
      memberOnly: true,
      views: 28765
    }
  ]
}

// 文集数据
export const collections = [
  {
    id: 1,
    title: '2025中国会展业发展报告',
    type: '展会报告',
    industry: '综合',
    author: '中国会展经济研究会',
    publishTime: '2026-01-10',
    downloads: 15230,
    isFree: false
  },
  {
    id: 2,
    title: '数字会展转型实践案例集',
    type: '核心课件',
    industry: '电子科技',
    author: '张明远',
    publishTime: '2026-01-08',
    downloads: 8942,
    isFree: true
  },
  {
    id: 3,
    title: '国际展会参展策略指南',
    type: '大咖分享',
    industry: '商贸零售',
    author: '李晓红',
    publishTime: '2026-01-05',
    downloads: 12056,
    isFree: true
  },
  {
    id: 4,
    title: '会展场馆运营管理白皮书',
    type: '展会报告',
    industry: '基础设施',
    author: '北京北辰会展集团',
    publishTime: '2025-12-28',
    downloads: 6780,
    isFree: false
  }
]

// 场馆数据
export const venues = [
  {
    id: 1,
    name: '国家会议中心',
    address: '北京市朝阳区天辰东路7号',
    area: 270000,
    maxHallArea: 50000,
    capacity: 50000,
    facilities: ['会议室', '餐厅', '停车场', '贵宾厅'],
    rating: 4.8,
    image: venue1,
    coordinates: [116.389432, 40.002901],
    distance: 5.2,
    popularity: 98,
    description: '国家会议中心外形优美，它的立面设计取自中国古代建筑屋檐的曲线概念，对传统的建筑形式赋予现代的演绎，同时又象征一座桥梁，与奥运公园的其他建筑遥相呼应，体现人文、信息的沟通和交流、跨向未来。'
  },
  {
    id: 2,
    name: '北京国际会议中心',
    address: '北京市朝阳区北辰东路8号',
    area: 60000,
    maxHallArea: 10000,
    capacity: 5000,
    facilities: ['会议室', '餐厅', '住宿', '商务中心'],
    rating: 4.5,
    image: venue2,
    coordinates: [116.402561, 39.989285],
    distance: 6.8,
    popularity: 90,
    description: '北京国际会议中心与北京五洲大酒店楼宇相连，是一家可提供会议、展览、住宿、餐饮、写字楼等大型综合服务企业。'
  },
  {
    id: 3,
    name: '首都国际会展中心',
    address: '北京市顺义区天竺空港工业区',
    area: 200000,
    maxHallArea: 40000,
    capacity: 40000,
    facilities: ['会议室', '餐厅', '停车场', '展览馆'],
    rating: 4.6,
    image: venue3,
    coordinates: [116.550173, 40.077],
    distance: 32.5,
    popularity: 95,
    description: '首都国际会展中心位于北京市顺义区新城第23街区、新国展一期北侧，项目总体布局延续一期的中轴模式，在中轴线上设置了南、北登录厅、展览序厅以及连接会议酒店和新国展一期的景观连廊。'
  },
  {
    id: 4,
    name: '首钢国际会展中心',
    address: '北京市石景山区石景山路68号',
    area: 150000,
    maxHallArea: 35000,
    capacity: 30000,
    facilities: ['会议室', '餐厅', '停车场', '户外展区'],
    rating: 4.7,
    image: venue4,
    coordinates: [116.15867, 39.916463],
    distance: 18.3,
    popularity: 89,
    description: '首钢国际会展中心是2021、2022和2023年中国国际服务贸易交易会专题展主会场，其工业遗存丰富，占地面积20万平方米，是京西独具烟火气息的群落式会展空间。'
  },
  {
    id: 5,
    name: '中关村国际创新中心',
    address: '北京市海淀区中关村大街',
    area: 65000,
    maxHallArea: 15000,
    capacity: 8000,
    facilities: ['多功能厅', '会议室', '展示区', '科技展厅'],
    rating: 4.7,
    image: venue5,
    coordinates: [116.296976, 39.990778],
    distance: 12.4,
    popularity: 93,
    description: '中关村国际创新中心选址海淀区“三山五园”历史文化景区与中关村科学城核心区的交汇处，秉承“科技、绿色、文化”的设计理念，建筑面积6.5万平方米，外形宛若“三叶草”。'
  }
]

// 招投标数据
export const biddingInfo = [
  {
    id: 1,
    title: '2026北京国际汽车展览会搭建工程招标',
    organization: '北京国际汽车展览会组委会',
    deadline: '2026-01-28',
    budget: '500-800万元',
    scope: '展会搭建',
    type: '搭建',
    orgType: '其他',
    region: '北京',
    status: '招标中'
  },
  {
    id: 2,
    title: '2026国际医疗器械展宣传推广服务采购',
    organization: '中国医疗器械行业协会',
    deadline: '2026-02-05',
    budget: '200-300万元',
    scope: '宣传推广服务',
    type: '宣传推广',
    orgType: '企业',
    region: '北京',
    status: '招标中'
  },
  {
    id: 3,
    title: '2026智能制造博览会物流运输服务',
    organization: '北京智能制造促进中心',
    deadline: '2026-01-30',
    budget: '100-150万元',
    scope: '物流运输',
    type: '物流运输',
    orgType: '政府机构',
    region: '北京',
    status: '招标中'
  },
  {
    id: 4,
    title: '2026国际旅游交易会展位搭建项目',
    organization: '国家文化和旅游部',
    deadline: '2025-12-31',
    budget: '300-500万元',
    scope: '展会搭建',
    type: '搭建',
    orgType: '政府机构',
    region: '北京',
    status: '已结束'
  }
]

// 服务数据
export const services = [
  {
    id: 1,
    name: '特装展位设计与搭建',
    type: '展位搭建',
    provider: '北京创意展览服务有限公司',
    price: 800,
    unit: '元/㎡',
    rating: 4.8,
    orders: 256,
    period: '3-7天',
    region: '北京',
    certified: true
  },
  {
    id: 2,
    name: '国际展会翻译服务',
    type: '翻译服务',
    provider: '北京同声传译公司',
    price: 3000,
    unit: '元/天/人',
    rating: 4.9,
    orders: 189,
    period: '≤3天',
    region: '北京',
    certified: true
  },
  {
    id: 3,
    name: '展会物流仓储服务',
    type: '物流运输',
    provider: '顺丰速运（会展专享）',
    price: 50,
    unit: '元/立方米',
    rating: 4.7,
    orders: 342,
    period: '3-7天',
    region: '全国',
    certified: true
  },
  {
    id: 4,
    name: '展会礼仪接待服务',
    type: '礼仪接待',
    provider: '北京雅致礼仪服务公司',
    price: 800,
    unit: '元/天/人',
    rating: 4.6,
    orders: 156,
    period: '≤3天',
    region: '北京',
    certified: false
  }
]

// 用户数据
export const userInfo = {
  id: 1,
  name: '张三',
  phone: '138****8888',
  email: 'zhangsan@example.com',
  industry: '展览服务',
  position: '项目经理',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  memberLevel: '尊享会员',
  memberExpire: '2026-12-31',
  points: 12580
}

// 订单数据
export const orders = [
  {
    id: 'ORD20260121001',
    type: 'service',
    businessName: '特装展位设计与搭建',
    amount: 80000,
    createTime: '2026-01-21 10:30',
    status: '已支付',
    paymentStatus: '已支付'
  },
  {
    id: 'ORD20260115002',
    type: 'hotel',
    businessName: '北京国贸大酒店（会展专享价）',
    amount: 2400,
    createTime: '2026-01-15 14:20',
    status: '已完成',
    paymentStatus: '已支付'
  },
  {
    id: 'ORD20260110003',
    type: 'membership',
    businessName: '尊享会员年费',
    amount: 2980,
    createTime: '2026-01-10 09:00',
    status: '已支付',
    paymentStatus: '已支付'
  }
]

// 核心数据统计
export const platformStats = {
  exhibitions: 1526,
  exhibitors: 89560,
  venues: 236,
  services: 15680,
  cities: 86,
  users: 523000
}

// 收藏数据
export const favorites = {
  exhibitions: [
    { id: 1, name: '第三十七届制冷展', time: '2026-04-08', venue: '中国国际展览中心（顺义馆）' },
    { id: 2, name: '第66届中国特许加盟展', time: '2026-05-15', venue: '国家会议中心' }
  ],
  venues: [
    { id: 1, name: '国家会议中心', address: '北京市朝阳区天辰东路7号' }
  ],
  providers: [
    { id: 1, name: '北京创意展览服务有限公司', type: '展位搭建', rating: 4.8 }
  ],
  collections: [
    { id: 1, title: '2025中国会展业发展报告', type: '展会报告' },
    { id: 2, title: '数字会展转型实践案例集', type: '核心课件' }
  ],
  videos: [
    { id: 5, title: '2025年度国际旅游交易会', duration: '02:15:30' }
  ]
}

// 关注数据
export const follows = {
  exhibitions: [
    { id: 1, name: '第三十七届制冷展', status: '即将开展' },
    { id: 3, name: '第二十七届中国北京国际科技产业博览会', status: '筹备中' }
  ],
  venues: [
    { id: 1, name: '国家会议中心', upcomingEvents: 5 }
  ],
  providers: [
    { id: 1, name: '北京创意展览服务有限公司', newServices: 2 }
  ]
}

// 消息数据
export const messages = [
  {
    id: 1,
    type: 'business',
    content: '您的订单ORD20260121001已确认，请按时参展',
    time: '2026-01-21 11:30',
    unread: true,
    relatedId: 'ORD20260121001'
  },
  {
    id: 2,
    type: 'audit',
    content: '您的企业认证已通过',
    time: '2026-01-20 15:00',
    unread: true,
    relatedId: null
  },
  {
    id: 3,
    type: 'system',
    content: '平台将于2026-01-25 02:00-04:00进行系统维护',
    time: '2026-01-19 10:00',
    unread: false,
    relatedId: null
  }
]

// 积分数据
export const points = {
  current: 12580,
  records: [
    {
      id: 1,
      time: '2026-01-21',
      source: '采买展会服务',
      points: 800,
      remark: '订单ORD20260121001，特装展位设计与搭建',
      status: '有效'
    },
    {
      id: 2,
      time: '2026-01-15',
      source: '完成评价',
      points: 50,
      remark: '评价订单ORD20260115002',
      status: '有效'
    },
    {
      id: 3,
      time: '2026-01-10',
      source: '企业认证',
      points: 500,
      remark: '完成企业认证',
      status: '有效'
    }
  ],
  used: [
    {
      id: 1,
      time: '2026-01-20',
      scenario: '抵扣服务订单',
      points: 200,
      related: '特装展位设计与搭建',
      status: '已完成'
    },
    {
      id: 2,
      time: '2026-01-12',
      scenario: '兑换权益',
      points: 500,
      related: '地铁乘车码',
      status: '已完成'
    }
  ]
}

// 门票数据
export const tickets = [
  {
    id: 1,
    exhibitionName: '第三十七届制冷展',
    time: '2026-04-08至2026-04-10',
    venue: '中国国际展览中心（顺义馆）',
    name: '张三',
    idCard: '110101********1234',
    status: '注册完成',
    remark: '您已成功提交信息！成功预约后，您将收到邮件及短信形式的确认邀请函，请注意查收。'
  },
  {
    id: 2,
    exhibitionName: '第66届中国特许加盟展',
    time: '2026-05-15至2026-05-17',
    venue: '国家会议中心',
    name: '张三',
    idCard: '110101********1234',
    status: '注册完成',
    remark: '您已成功提交信息！成功预约后，您将收到邮件及短信形式的确认邀请函，请注意查收。'
  }
]

// 预约数据
export const appointments = [
  {
    id: 1,
    type: 'live',
    title: '智能制造技术峰会主论坛',
    exhibitionName: '北京智能制造博览会',
    time: '2026-01-25 09:30',
    status: '未开始'
  },
  {
    id: 2,
    type: 'live',
    title: '新能源产业发展论坛',
    exhibitionName: '中国国际新能源展',
    time: '2026-01-26 14:00',
    status: '未开始'
  }
]

// 评价数据
export const reviews = [
  {
    id: 1,
    targetName: '特装展位设计与搭建',
    targetType: '服务',
    rating: 5,
    content: '服务非常专业，设计理念新颖，施工质量超出预期！',
    time: '2026-01-20',
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300'],
    reply: '感谢您的认可，我们将继续提供优质服务！'
  }
]

// 发票数据
export const invoices = [
  {
    id: 1,
    title: '张三（个人）',
    type: '增值税普通发票',
    amount: 80000,
    orderId: 'ORD20260121001',
    time: '2026-01-22',
    status: '已开具',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: '张三（个人）',
    type: '增值税普通发票',
    amount: 2980,
    orderId: 'ORD20260110003',
    time: '2026-01-11',
    status: '已开具',
    downloadUrl: '#'
  }
]

// 聊天数据
export const chats = [
  {
    id: 1,
    targetName: '北京创意展览服务有限公司',
    lastMessage: '好的，我们明天派人上门测量',
    time: '2026-01-21 14:30',
    unread: 2
  },
  {
    id: 2,
    targetName: '北京同声传译公司',
    lastMessage: '翻译人员已安排到位',
    time: '2026-01-20 10:15',
    unread: 0
  }
]

export const mockData = {
  exhibitions,
  calendarData,
  policies,
  videos,
  collections,
  venues,
  biddingInfo,
  tenders: biddingInfo,
  hotTenders: biddingInfo,
  services,
  recommendedServices: services.slice(0, 2),
  userInfo,
  userProfile: userInfo,
  orders,
  platformStats,
  favorites,
  follows,
  messages,
  unreadCount: messages.filter(m => m.unread).length,
  points,
  tickets,
  appointments,
  reviews,
  invoices,
  chats
}
