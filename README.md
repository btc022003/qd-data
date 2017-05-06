# qd-data
crawling data from website by nodejs

#### Installation

```bash
yarn add qd-data
or
npm i qd-data --save
```

#### Example

##### 当当网数据提取
```js
const qdDDBang = require('qd-data').DangDang.Bang
const qdDDCommon = require('qd-data').DangDang.Common
/**
* 获取书热销榜籍数据
*   参数一 回调函数
*       返回书籍数组
*           title   书名
*           img     图片链接
*           price   价格
*           author  作者
*           publistDate 出版时间
*           publisher   出版社
*           link    链接
*   参数二 页码(如果大于中页数取最后一页)
*   参数三 分类名字
*/
qdDDBang.getBestSellers(function(data){
    console.log(data) //数组
},1,'益智游戏')

/**
* 获取热销榜中页数
*   参数一 回调函数
*       返回总页数  数字
*/
qdDDBang.getBestSellersPageCount(function(pageCount){
    console.log(pageCount)//热销榜总页数
})

/**
* 获取分类数据
*   参数一 回调函数
*       返回分类数组
*       name    分类名字
*       lev     分类等级(1大类,2小蕾)
*       link    分类的链接
*/
qdDDCommon.getBookTypes(function(types){
    console.log(types) //获取所有的分类数据
})
```

##### 东方财富网数据提取
```js
var qdEMF = require('qd-data').EastMoney.News

/**
* 获取要闻精华总页数
*   参数一 回调函数
*       返回总页数   数字
*/
qdEMF.getPageCount(function(pageCount){
    console.log(pageCount)//要闻精华总页数
})

/**
* 获取要闻精华数据
*   参数一 回调函数
*       返回数组
*       title   标题
*       img     图片
*       link    链接
*   参数二 页码(可选,默认为1)
*/
qdEMF.getFinanceNews(function(data){
    console.log(data)//要闻精华数据
},1)
```

Test
```bash
mocha #运行测试代码
```

