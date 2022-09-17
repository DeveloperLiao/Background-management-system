import request from '@/utils/request'
// 获取品牌列表某一页的数据
export const getTradeMarkList = (page, limit) => request({ url: `/product/baseTrademark/${page}/${limit}`, method: 'get' })
// 模拟tradeMarkList的数据
// export const getTradeMarkList = (page,limit) => request({ url: `/mock/trademarkList/`, params:{page,limit} ,method: 'get' })
// 新增品牌列表的数据
export const addTradeMarkList = tmFrom => request({ url: '/product/baseTrademark/save', method: 'post', data: tmFrom })
//获取品牌列表某一个品牌的数据
export const getTradeMark = id => request({ url: `/product/baseTrademark/get/${id}`, method: 'get' })
//修改某个id号的品牌数据
export const updateTradeMark = tmFrom => request({ url: '/product/baseTrademark/update', method: 'put', data: tmFrom })
// 删除某个id号的品牌数据
export const delTradeMark = id => request({ url: `/product/baseTrademark/remove/${id}`, method: 'delete' })

