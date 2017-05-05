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
var qdDDBang = require('qd-data').DangDang.Bang
var qdDDCommon = require('../index').DangDang.Common
//获取热销榜数据
qdDDBang.getBestSellers(function(data){
    console.log(data) //数组
},1)

//获取热销榜中页数
qdDDBang.getBestSellersPageCount(function(pageCount){
    console.log(pageCount)//热销榜总页数
})

//获取分类数据
qdDDCommon.getBookTypes(function(types){
    console.log(types) //获取所有的分类数据
})
```

