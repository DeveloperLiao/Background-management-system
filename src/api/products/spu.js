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
//更改或者添加spu信息
export const updateOrsaveSpuInfo = spuInfo => {
  if (spuInfo.id) {
    return request({ url: '/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    return request({ url: '/product/saveSpuInfo', method: 'post', data: spuInfo })
  }
}
// 删除SPU
export const delSpu = spuId => request({ url: `/product/deleteSpu/${spuId}`, method: 'delete' })
//查看当前spu下的所有sku
export const watchAllSku = spuId => request({ url: `/product/findBySpuId/${spuId}`, method: 'get' })
// 获取销售属性列表的数据
export const getSpuSaleAttrList = spuId => request({ url: `/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取属性信息列表
export const getattrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
//添加SkuInfo
export const updateAttrInfoList = SkuInfo => request({ url: '/product/updateSkuInfo', data: SkuInfo, method: 'post' })
