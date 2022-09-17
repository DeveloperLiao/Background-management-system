import request from '@/utils/request'
// 获取spu列表
export const getSpuList = (page, limit, category3Id) => request({ url: `/product/${page}/${limit}`, method: 'get', params: { category3Id } })
