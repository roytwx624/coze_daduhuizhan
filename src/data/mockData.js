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
    // 1月份数据
    '2026-01-01': [
      { id: 101, name: '2026北京国际插画艺术展览会', time: '2026-01-01 09:00', city: '北京市', venue: '国家会议中心' }
    ],
    '2026-01-06': [
      { id: 102, name: '2026哈尔滨国际冰雪经济博览会', time: '2026-01-06 09:00', city: '哈尔滨市', venue: '哈尔滨国际会展中心' }
    ],
    '2026-01-08': [
      { id: 103, name: '2026第38届北京图书订货会', time: '2026-01-08 09:00', city: '北京市', venue: '中国国际展览中心' }
    ],
    '2026-01-09': [
      { id: 104, name: 'ISPO BEIJING 2026亚洲运动用品与时尚展', time: '2026-01-09 09:00', city: '北京市', venue: '国家会议中心' }
    ],
    '2026-01-19': [
      { id: 105, name: '第二届国际会展活动产业链大会', time: '2026-01-19 09:00', city: '深圳市', venue: '深圳国际会展中心' }
    ],
    '2026-01-21': [
      { id: 106, name: '2026年中国会展经济国际合作论坛', time: '2026-01-21 09:00', city: '武汉市', venue: '武汉国际会展中心' }
    ],
    '2026-01-30': [
      { id: 107, name: '2029第29届中国（四川）新春年货购物节', time: '2026-01-30 09:00', city: '成都市', venue: '成都世纪城新国际会展中心' },
      { id: 108, name: '2026第二十一届西安年货节', time: '2026-01-30 09:00', city: '西安市', venue: '西安国际会展中心' }
    ],
    '2026-01-31': [
      { id: 109, name: '2026第十八届昆明新春购物博览会（昆明年货节）', time: '2026-01-31 09:00', city: '昆明市', venue: '昆明滇池国际会展中心' },
      { id: 110, name: '2026第十八届中国新疆新春年货博览会', time: '2026-01-31 09:00', city: '乌鲁木齐市', venue: '新疆国际会展中心' }
    ],
    // 2月份数据
    '2026-02-01': [
      { id: 201, name: '2026第19届中国（重庆）新春年货购物节', time: '2026-02-01 09:00', city: '重庆市', venue: '重庆国际会议展览中心' }
    ],
    '2026-02-06': [
      { id: 202, name: '2026年第23届山东新春年货会', time: '2026-02-06 09:00', city: '济南市', venue: '山东国际会展中心' }
    ],
    '2026-02-07': [
      { id: 203, name: '第27届IJOY北京国潮动漫游戏狂欢节', time: '2026-02-07 09:00', city: '北京市', venue: '国家会议中心' }
    ],
    '2026-02-17': [
      { id: 204, name: '2026大都新春庙会', time: '2026-02-17 09:00', city: '北京市', venue: '国家会议中心' }
    ],
    '2026-02-24': [
      { id: 205, name: '第八届中国阀门城·龙湾国际阀门展览会', time: '2026-02-24 09:00', city: '温州市', venue: '温州奥体会展中心' },
      { id: 206, name: '第16届中国（台州）电机与泵展览会', time: '2026-02-24 09:00', city: '台州市', venue: '台州国际博览中心' }
    ],
    '2026-02-05': [
      { id: 209, name: '第十六届中国（合肥）国际年货采购展览会', time: '2026-02-05 09:00', city: '合肥市', venue: '合肥滨湖国际会展中心' }
    ],
    '2026-02-06': [
      { id: 210, name: '第二十四届西安梦乡动漫展', time: '2026-02-06 09:00', city: '西安市', venue: '西安国际会展中心' }
    ],
    '2026-02-19': [
      { id: 211, name: '第22届南安国际水暖泵阀暨消防器材交易会', time: '2026-02-19 09:00', city: '南安市', venue: '福建成功国际会展中心' }
    ],
    '2026-02-22': [
      { id: 212, name: '中国才都（临川）酒店用品展览会', time: '2026-02-22 09:00', city: '抚州市', venue: '金山旅游风景区接待服务中心' }
    ],
    '2026-02-28': [
      { id: 207, name: '2026第二十二届中部农业机械及配件展览会', time: '2026-02-28 09:00', city: '武汉市', venue: '中国文化博览中心' },
      { id: 208, name: '2026第三十二届中国国际钓鱼用品贸易展览会', time: '2026-02-28 09:00', city: '北京市', venue: '中国国际展览中心' },
      { id: 209, name: '2026北京华夏家博会（春季展）', time: '2026-02-28 09:00', city: '北京市', venue: '北京国家会议中心' }
    ],
    // 3月份数据
    '2026-03-01': [
      { id: 356, name: '第32届中国华东进出口商品交易会 (华交会)', time: '2026-03-01 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 357, name: '第32届中国华东进出口商品交易会 (华交会)', time: '2026-03-01 09:00', city: '上海市', venue: '上海新国际博览中心' }
    ],
    '2026-03-02': [
      { id: 301, name: '2026中国(上海)国际眼镜业展览会', time: '2026-03-02 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 358, name: 'SIA上海国际工业自动化及机器人展览会', time: '2026-03-02 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 359, name: '上海国际切削工具及附件展览会 (CCTE)', time: '2026-03-02 09:00', city: '上海市', venue: '上海世博展览馆' }
    ],
    '2026-03-03': [
      { id: 302, name: '2026第三十一届华南国际口腔展', time: '2026-03-03 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 360, name: '第31届华南国际口腔展', time: '2026-03-03 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' }
    ],
    '2026-03-04': [
      { id: 303, name: '2026第11届广州国际地产投资移民留学展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 304, name: '2026第三十二届中国国际包装工业展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 305, name: '2026第三十三届上海国际广告技术设备展览会', time: '2026-03-04 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 306, name: '2026广州国际智能制造技术与装备展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 307, name: '2026华南国际印刷工业展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 308, name: '2026亚洲（广州）国际模具展览会 (Asiamold)', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 309, name: '2026郑州建博会-郑州建材展', time: '2026-03-04 09:00', city: '郑州市', venue: '中原国际博览中心' },
      { id: 361, name: 'SIAF广州国际工业自动化技术及装备展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 362, name: '第50届广州国际特许连锁加盟展览会 (GFE)', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 363, name: '广州国际标签印刷技术展览会 (Sino-Label)', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 364, name: '广州国际模具成型展览会', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 365, name: '亚洲（广州）国际模具展览会 (Asiamold)', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 366, name: '中国国际包装工业展览会 (Sino-Pack)', time: '2026-03-04 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 367, name: '上海国际广告技术设备展览会 (APPPEXPO)', time: '2026-03-04 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 368, name: '上海国际快递物流产业博览会 (ESYE)', time: '2026-03-04 09:00', city: '上海市', venue: '上海新国际博览中心' }
    ],
    '2026-03-05': [
      { id: 310, name: '2026第十届广东国际水处理技术与设备展览会', time: '2026-03-05 09:00', city: '广州市', venue: '广州保利世贸博览馆' },
      { id: 311, name: '2026上海国际功能性纺织品(春夏)展览会', time: '2026-03-05 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 312, name: '2026上海国际食材展', time: '2026-03-05 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 369, name: '广东国际水处理技术与设备展览会 (WATER EXPO)', time: '2026-03-05 09:00', city: '广州市', venue: '广州保利世贸博览馆' },
      { id: 370, name: '上海国际功能性纺织品展览会', time: '2026-03-05 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 371, name: '上海国际食材展', time: '2026-03-05 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 372, name: '上海国际瓦楞智能制造展览会', time: '2026-03-05 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 373, name: '中国国际衡器展览会 (Interweighing)', time: '2026-03-05 09:00', city: '上海市', venue: '上海新国际博览中心' }
    ],
    '2026-03-06': [
      { id: 313, name: '2026上海国际潜水、滑雪暨度假观光展', time: '2026-03-06 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 314, name: '2026上海国际珠宝玉石展览会(春季展)', time: '2026-03-06 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 374, name: '华夏家博会（南京站）', time: '2026-03-06 09:00', city: '南京市', venue: '南京国际博览中心' },
      { id: 375, name: '上海国际珠宝玉石展览会', time: '2026-03-06 09:00', city: '上海市', venue: '上海世博展览馆' }
    ],
    '2026-03-10': [
      { id: 315, name: '2026第69届中国（广州）国际美博会', time: '2026-03-10 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 316, name: '2026第十六届中国（广州）国际家用医疗康复护理展', time: '2026-03-10 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 376, name: '第69届中国（广州）国际美博会', time: '2026-03-10 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 377, name: '中国（广州）国际家用医疗康复护理展', time: '2026-03-10 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 378, name: '中国国际涂料、油墨及粘合剂展览会', time: '2026-03-10 09:00', city: '深圳市', venue: '深圳国际会展中心' }
    ],
    '2026-03-11': [
      { id: 317, name: '2026成都国际工业博览会 (CDIIF)', time: '2026-03-11 09:00', city: '成都市', venue: '中国西部国际博览城' },
      { id: 318, name: '2026迪培思广州国际广告标识及LED展 (DPES)', time: '2026-03-11 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 319, name: '2026中国国际纺织面料及辅料(春夏)博览会 (Intertextile)', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 320, name: '2026中国国际纺织纱线(春夏)展览会', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 321, name: '2026中国国际服装服饰博览会(春季) (CHIC)', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 322, name: '2026中国国际家用纺织品及辅料(春夏)博览会', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 323, name: 'Intertextile中国国际纺织面料及辅料博览会', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 379, name: '成都国际工业博览会 (CDIIF)', time: '2026-03-11 09:00', city: '成都市', venue: '中国成都西部国际博览城' },
      { id: 380, name: '成都国际环保博览会 (CDE)', time: '2026-03-11 09:00', city: '成都市', venue: '中国西部国际博览城' },
      { id: 381, name: '第32届门窗幕墙新产品博览会', time: '2026-03-11 09:00', city: '广州市', venue: '广州保利世贸博览馆' },
      { id: 382, name: '迪培思广州国际广告展 (DPES SIGN EXPO)', time: '2026-03-11 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' },
      { id: 383, name: '上海国际流行纱线展 (Spinning Expo)', time: '2026-03-11 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 384, name: '新疆国际汽车工业博览会-新疆国际车展', time: '2026-03-11 09:00', city: '乌鲁木齐市', venue: '新疆国际会展中心' }
    ],
    '2026-03-12': [
      { id: 324, name: '2026北京国际家居产业博览会', time: '2026-03-12 09:00', city: '北京市', venue: '中国国际展览中心(顺义馆)' },
      { id: 325, name: '2026国际IP授权产业(上海)博览会', time: '2026-03-12 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 326, name: '2026上海商业航天大会暨展览会', time: '2026-03-12 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 327, name: '2026中国家电及消费电子博览会 (AWE)', time: '2026-03-12 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 385, name: '北京国际房车露营展览会', time: '2026-03-12 09:00', city: '北京市', venue: '北京房车世界博览中心' },
      { id: 386, name: '北京国际家居产业博览会', time: '2026-03-12 09:00', city: '北京市', venue: '中国国际展览中心(顺义馆)' },
      { id: 387, name: '上海国际电子生产设备展 (Productronica China)', time: '2026-03-12 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 388, name: '上海国际热处理及工业炉展览会', time: '2026-03-12 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 389, name: '中国家电及消费电子博览会 (AWE)', time: '2026-03-12 09:00', city: '上海市', venue: '上海新国际博览中心' }
    ],
    '2026-03-13': [
      { id: 328, name: '2026第十三届上海健身康体休闲暨泳池SPA展览会', time: '2026-03-13 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 390, name: '上海健身康体休闲暨泳池SPA展览会', time: '2026-03-13 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 391, name: '中国（成都）国际茶工业博览会', time: '2026-03-13 09:00', city: '成都市', venue: '世纪城新国际会展中心' },
      { id: 392, name: '中国(南京)国际糖酒食品交易会', time: '2026-03-13 09:00', city: '南京市', venue: '南京国际展览中心' }
    ],
    '2026-03-17': [
      { id: 329, name: '2026亚洲3D打印、增材制造展览会', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 330, name: '2026中国国际农用化学品及植保展览会 (CAC)', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 331, name: '2026中国国际食品添加剂和配料展览会 (FIC)', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 393, name: '亚洲3D打印、增材制造展览会 (TCT Asia)', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 394, name: '中国国际农用化学品及植保展览会 (CAC)', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 395, name: '中国国际食品添加剂和配料展览会 (FIC)', time: '2026-03-17 09:00', city: '上海市', venue: '上海国家会展中心' }
    ],
    '2026-03-18': [
      { id: 332, name: '2026常州工博会', time: '2026-03-18 09:00', city: '常州市', venue: '常州西太湖国际博览中心' },
      { id: 333, name: '2026春季古镇灯博会-中山灯饰展', time: '2026-03-18 09:00', city: '中山市', venue: '灯都古镇会议展览中心' },
      { id: 334, name: '2026慕尼黑上海光博会', time: '2026-03-18 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 396, name: '常州工博会', time: '2026-03-18 09:00', city: '常州市', venue: '常州西太湖国际博览中心' },
      { id: 397, name: '春季古镇灯博会-中山灯饰展 (GILF)', time: '2026-03-18 09:00', city: '中山市', venue: '灯都古镇会议展览中心' },
      { id: 398, name: '第57届中国(广州)国际家具博览会 (民用家具)', time: '2026-03-18 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 399, name: '慕尼黑上海电子展 (Electronica China)', time: '2026-03-18 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 400, name: '慕尼黑上海光博会 (LASER World of PHOTONICS)', time: '2026-03-18 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 401, name: '上海国际半导体封装测试展览会', time: '2026-03-18 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 402, name: '上海国际精密陶瓷展览会', time: '2026-03-18 09:00', city: '上海市', venue: '上海世博展览馆' }
    ],
    '2026-03-20': [
      { id: 335, name: '2026深圳汽配展-全国汽配会 (APCEX)', time: '2026-03-20 09:00', city: '深圳市', venue: '深圳国际会展中心(宝安)' },
      { id: 403, name: '深圳汽配展-全国汽配会 (APCEX)', time: '2026-03-20 09:00', city: '深圳市', venue: '深圳国际会展中心（宝安新馆）' }
    ],
    '2026-03-23': [
      { id: 336, name: '2026第20届上海国际袜业采购交易会', time: '2026-03-23 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 337, name: '2026上海CME国际机床展览会', time: '2026-03-23 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 338, name: '2026上海国际工业自动化及机器人展 (CSIE)', time: '2026-03-23 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 339, name: '2026上海国际时尚配饰及内衣展览会', time: '2026-03-23 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 340, name: '2026中原（郑州）医疗器械展览会', time: '2026-03-23 09:00', city: '郑州市', venue: '郑州国际会展中心' },
      { id: 404, name: '上海CME国际机床展览会', time: '2026-03-23 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 405, name: '上海国际工业自动化及机器人展 (CSIE)', time: '2026-03-23 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 406, name: '上海国际袜业采购交易会 (CHPE)', time: '2026-03-23 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 407, name: '上海国际物业管理产业展览会', time: '2026-03-23 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 408, name: '中原（郑州）医疗器械展览会 (CWMEE)', time: '2026-03-23 09:00', city: '郑州市', venue: '郑州国际会展中心' }
    ],
    '2026-03-24': [
      { id: 341, name: '2026国际电子电路(上海)展览会', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 342, name: '2026上海国际粉末冶金、硬质合金与先进陶瓷展', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 343, name: '2026上海国际水处理和洁净技术及设备展览会', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 409, name: '国际电子电路(上海)展览会 (CPCA SHOW)', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 410, name: '上海国际粉末冶金展览会 (PM CHINA)', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 411, name: '上海国际酒店工程设计与用品博览会', time: '2026-03-24 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 412, name: '上海国际清洁技术与设备博览会 (CCE)', time: '2026-03-24 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 413, name: '中国国际五金博览会-上海五金展 (CIHF)', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 414, name: '中国国际先进陶瓷展览会 (IACE CHINA)', time: '2026-03-24 09:00', city: '上海市', venue: '上海国家会展中心' }
    ],
    '2026-03-25': [
      { id: 344, name: '2026慕尼黑上海电子生产设备博览会 (Productronica)', time: '2026-03-25 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 345, name: '2026中国国际半导体设备、材料、制造和服务展', time: '2026-03-25 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 346, name: 'SEMICON China 中国国际半导体展', time: '2026-03-25 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 415, name: '慕尼黑上海电子生产设备博览会', time: '2026-03-25 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 416, name: '中国国际非织造材料展览会 (CINE)', time: '2026-03-25 09:00', city: '上海市', venue: '上海世博展览馆' }
    ],
    '2026-03-27': [
      { id: 347, name: '2026第15届广州定制家居展', time: '2026-03-27 09:00', city: '广州市', venue: '广州保利世贸博览馆' },
      { id: 348, name: '2026东莞华夏家博会', time: '2026-03-27 09:00', city: '东莞市', venue: '广东现代国际展览中心' },
      { id: 417, name: '第15届广州定制家居展', time: '2026-03-27 09:00', city: '广州市', venue: '广州保利世贸博览馆' },
      { id: 418, name: '中国(广州)国际衣柜展览会', time: '2026-03-27 09:00', city: '广州市', venue: '广州保利世贸博览馆' }
    ],
    '2026-03-28': [
      { id: 349, name: '2026第31届东北(沈阳)建筑装饰博览会', time: '2026-03-28 09:00', city: '沈阳市', venue: '沈阳新世界博览馆' },
      { id: 350, name: '2026中国广州国际家具生产设备及配料展览会', time: '2026-03-28 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 419, name: '东北(沈阳)建筑装饰博览会', time: '2026-03-28 09:00', city: '沈阳市', venue: '沈阳新世界博览馆' },
      { id: 420, name: '第57届中国(广州)国际家具博览会 (办公商用)', time: '2026-03-28 09:00', city: '广州市', venue: '广交会展馆' },
      { id: 421, name: '广州国际办公家具及商业空间展览会 (CIFF)', time: '2026-03-28 09:00', city: '广州市', venue: '广交会展馆-广州琶洲馆' }
    ],
    '2026-03-29': [
      { id: 351, name: '2026上海旅游产业博览会', time: '2026-03-29 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 352, name: '2026中国(上海)第二十九届国际船艇及其技术设备展', time: '2026-03-29 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 422, name: '上海国际船艇展及生活方式上海秀', time: '2026-03-29 09:00', city: '上海市', venue: '上海世博展览馆' },
      { id: 423, name: '上海旅游产业博览会 (Tourism Plus Shanghai)', time: '2026-03-29 09:00', city: '上海市', venue: '上海世博展览馆' }
    ],
    '2026-03-30': [
      { id: 353, name: '2026广州国际高端医疗器械展览会', time: '2026-03-30 09:00', city: '广州市', venue: '广州空港博览中心' },
      { id: 354, name: '2026广州国际康复医疗、护理用品及养老福祉展', time: '2026-03-30 09:00', city: '广州市', venue: '广州空港博览中心' },
      { id: 424, name: '广州国际康复医疗、护理用品及养老福祉展', time: '2026-03-30 09:00', city: '广州市', venue: '广州空港博览中心' },
      { id: 425, name: '上海国际健康器械及用品展览会', time: '2026-03-30 09:00', city: '上海市', venue: '上海国家会展中心' },
      { id: 426, name: '上海国际加工包装展览会 (ProPak China)', time: '2026-03-30 09:00', city: '上海市', venue: '上海国家会展中心' }
    ],
    '2026-03-31': [
      { id: 355, name: '2026上海国际酒店及商业空间博览会', time: '2026-03-31 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 427, name: '上海国际酒店及商业空间博览会 (Hotel & Shop Plus)', time: '2026-03-31 09:00', city: '上海市', venue: '上海新国际博览中心' },
      { id: 428, name: '上海国际零售业设计与设备展 (ER-China)', time: '2026-03-31 09:00', city: '上海市', venue: '上海新国际博览中心' }
    ]
  }
}

// 政策数据
export const policies = [
  {
    id: 1,
    title: '关于对《北京市会展业高质量发展三年行动方案》公开征求意见的公告',
    publisher: '北京市商务局',
    publishTime: '2025-12-17',
    category: '重点扶持',
    summary: '北京市商务局就《北京市会展业高质量发展三年行动方案》公开征求意见，旨在推动会展业高质量发展。',
    status: '有效',
    documentNumber: '京商服贸字〔2025〕12号',
    subjectCategory: '会展规划',
    url: 'https://sw.beijing.gov.cn/zmhd/dczjj/202512/t20251217_4347628.html'
  },
  {
    id: 2,
    title: '北京市人民政府关于印发《北京市推动总部企业高质量发展的若干措施》的通知',
    publisher: '北京市人民政府',
    publishTime: '2025-06-18',
    category: '优惠政策',
    summary: '北京市人民政府印发《北京市推动总部企业高质量发展的若干措施》，旨在促进总部企业高质量发展。',
    status: '有效',
    documentNumber: '京政发〔2025〕6号',
    subjectCategory: '企业发展',
    url: 'https://sw.beijing.gov.cn/zwxx/2024zcwj/202506/t20250618_4116556.html'
  },
  {
    id: 3,
    title: '北京市商务局关于申报2025年促进我市会展业发展奖励项目的通知',
    publisher: '北京市商务局',
    publishTime: '2025-05-06',
    category: '资金支持',
    summary: '北京市商务局发布2025年促进会展业发展奖励项目申报通知，支持会展业发展。',
    status: '有效',
    documentNumber: '京商服贸字〔2025〕5号',
    subjectCategory: '资金补贴',
    url: 'https://sw.beijing.gov.cn/zwxx/2024zcwj/202505/t20250506_4082609.html'
  },
  {
    id: 4,
    title: '北京市人民政府关于印发《北京市深化改革提振消费专项行动方案》的通知',
    publisher: '北京市人民政府',
    publishTime: '2025-07-09',
    category: '优惠政策',
    summary: '北京市人民政府印发《北京市深化改革提振消费专项行动方案》，旨在深化改革提振消费。',
    status: '有效',
    documentNumber: '京政发〔2025〕7号',
    subjectCategory: '消费促进',
    url: 'https://sw.beijing.gov.cn/zwxx/2024zcwj/202507/t20250709_4145247.html'
  },
  {
    id: 5,
    title: '北京市商务局关于2025年度支持外贸企业提升国际化经营能力项目申报指南的通知',
    publisher: '北京市商务局',
    publishTime: '2025-01-16',
    category: '资金支持',
    summary: '北京市商务局发布2025年度支持外贸企业提升国际化经营能力项目申报指南。',
    status: '有效',
    documentNumber: '京商外贸字〔2025〕1号',
    subjectCategory: '外贸支持',
    url: 'https://sw.beijing.gov.cn/zwxx/2024zcwj/202501/t20250116_3990814.html'
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
    title: '《京津冀庙会文化展》展览设计与制作项目',
    organization: '首都博物馆',
    publishTime: '2025-11-12',
    deadline: '2025-12-03',
    budget: '146.02901万元',
    budgetAmount: 146.02901,
    scope: '展览设计与制作',
    type: '设计与制作',
    orgType: '政府机构',
    region: '北京',
    status: '已结束',
    url: 'http://www.ccgp-beijing.gov.cn/xxgg/sjxxgg/zbgg/2025/11/478ca14754644d90b2b319a3c54971d4.htm'
  },
  {
    id: 2,
    title: '服贸会体育专题展（第一包：展会服务）',
    organization: '北京市商务局',
    publishTime: '2026-01-12',
    deadline: '2026-02-02',
    budget: '617万元',
    budgetAmount: 617.0,
    scope: '展会服务',
    type: '展会服务',
    orgType: '政府机构',
    region: '北京',
    status: '招标中',
    url: 'http://www.ccgp-beijing.gov.cn/xxgg/sjxxgg/zbgg/2026/1/11bdde292dca4509a4c80b7dc6c72a7e.htm'
  },
  {
    id: 3,
    title: '“共享大市场 出口中国”北京国际精品荟项目',
    organization: '北京市商务局',
    publishTime: '2026-01-06',
    deadline: '2026-01-19',
    budget: '95.125078万元',
    budgetAmount: 95.125078,
    scope: '展会策划与执行',
    type: '展会服务',
    orgType: '政府机构',
    region: '北京',
    status: '已结束',
    url: 'http://www.ccgp-beijing.gov.cn/xxgg/sjxxgg/zbgg/2026/1/bed6a4cbb3984dd593f9f60490e3cfcb.htm'
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
  avatar: '',
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
