import request from '@/utils/request'
// 获取spuImageList的数据
export const getSpuImageList = spuId => request({ url: `/product/spuImageList/${spuId}`, method: 'get' })
// 获取销售属性列表的数据
export const getSpuSaleAttrList = spuId => request({ url: `/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取属性信息列表
export const getattrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
//添加SkuInfo
export const updateAttrInfoList = SkuInfo => request({ url: '/product/updateSkuInfo', data: SkuInfo, method: 'post' })
