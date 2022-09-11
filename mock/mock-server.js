// 新建一个模块 来保存我们模拟的接口。
import Mock from 'mockjs' // 导入mockjs
var Random = Mock.Random
// 返回数据的总条数
var total = 100
var textArr = []
for (var i = 0; i < total; i++) {
  // 随机生成10个1到3个字符的中文文本，并存入数组
  var csentence = Random.csentence(1, 3)
  textArr.push(csentence)
}
var totalArr = Mock.mock({
  // 生成十条数据
  'brandList|100': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      // 从属性值 array 中顺序选取 1 个元素，作为最终值。
      'brandName|+1': textArr,
      // 随机生成图片地址
      imgUrl: '@image'
    }
  ]
})

// 这是正则表达式用法，此处具体含义是全匹配，无论/inspection/work/order'后面携带的什么参数，携带了多少参数，此接口都能成功调用，这是mock模拟携带参数接口所需要使用的方法。
Mock.mock(RegExp('admin/mock/trademarkList/' + '.*'), 'get', option => {
  let url = option.url
  // 拿到当前页
  var page = url.split('?')[1].split('&')[0].split('=')[1]
  // 拿到每页显示多少条数据
  var limit = url.split('?')[1].split('&')[1].split('=')[1]
  // 总页数
  var pageAllNum = Math.ceil(total / limit) || 1
  // 储存分割好的数组
  var totalPage = []
  for (let i = 0; i < pageAllNum; i++) {
    // 将数组分割成每份limit条
    totalPage[i] = totalArr.brandList.slice(limit * i, limit * (i + 1))
  }
  // 选取当前页所在的数组
  var brandList = totalArr.brandList
  brandList = totalPage[page - 1]
  return {
    code: 200,
    total,
    pageAllNum,
    data: brandList
  }
})
