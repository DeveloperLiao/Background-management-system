import request from '@/utils/request'
// sku列表的接口
export const getSkuList = (page, limit) => request({ url: `/product/list/${page}/${limit}`, method: 'get' })
// 上架
export const getOnSale = skuId => request({ url: `/product/onSale/${skuId}`, method: 'get' })
// 下架
export const getCancleSale = skuId => request({ url: `/product/cancelSale/${skuId}`, method: 'get' })
// 获取sku列表
export const getSkuInfoList = skuId => request({ url: `/product/getSkuById/${skuId}`, method: 'get' })
