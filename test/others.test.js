/**
 * Created by yuluo on 2017/5/8.
 * 测试其他other
 */
const qdOthersLife = require('../lib').Others.Life
const expect = require('chai').expect
const Table = require('easy-table')//用于打印输出结果
describe("测试其他常用模块",()=>{
    it('测试调用天气预报接口,获取城市天气预报',done=>{
        qdOthersLife.getWeatherbyCity(data=>{
            console.log(data)
            done()
        },'北京')
    })
})