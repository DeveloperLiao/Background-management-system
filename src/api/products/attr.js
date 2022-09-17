import request from '@/utils/request'
// 获取一级分类列表
export const getCategory1List = () => request({ url: '/product/getCategory1', method: 'get' })
// 获取二级分类列表
export const getCategory2List = category1Id => request({ url: `/product/getCategory2/${category1Id}`, method: 'get' })
// 获取三级分类列表
export const getCategory3List = category2Id => request({ url: `/product/getCategory3/${category2Id}`, method: 'get' })
// 获取商品基础
export const getattrInfoList = ({ category1Id, category2Id, category3Id }) => request({ url: `/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 添加商品的属性
export const saveOrUpdateAttrInfoList = data => request({ url: '/product/saveAttrInfo', method: 'post', data })
