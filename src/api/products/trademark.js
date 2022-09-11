import request from '@/utils/request'
// 获取品牌列表的数据
export const getTradeMarkList = (page, limit) => request({ url: `/product/baseTrademark/${page}/${limit}`, method: 'get' })
// 模拟tradeMarkList的数据
// export const getTradeMarkList = (page,limit) => request({ url: `/mock/trademarkList/`, params:{page,limit} ,method: 'get' })
// 新增品牌列表的数据
export const addTradeMarkList = tmFrom => request({ url: '/product/baseTrademark/save', method: 'post', data: tmFrom })
