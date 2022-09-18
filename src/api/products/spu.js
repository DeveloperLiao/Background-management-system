import request from '@/utils/request'
// 获取spu列表
export const getSpuList = (page, limit, category3Id) => request({ url: `/product/${page}/${limit}`, method: 'get', params: { category3Id } })
// 获取spu基本信息
export const getSpuBaseInfo = spuId => request({ url: `/product/getSpuById/${spuId}`, method: 'get' })
// 获取品牌信息
export const getTrademarkList = () => request({ url: '/product/baseTrademark/getTrademarkList', method: 'get' })
// 获取spu图标的接口
export const getSpuImageList = spuId => request({ url: `/product/spuImageList/${spuId}`, method: 'get' })
// 获取平台全部的销售属性
export const getBaseSaleAttrList = () => request({ url: '/product/baseSaleAttrList', method: 'get' })
