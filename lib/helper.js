/**
 * Created by yuluo on 2017/5/6.
 * 工具类
 */
const axios = require('axios')
const iconv = require('iconv-lite')//解码获取到的数据(针对中文编码问题[gb2312,gbk])
const cheerio = require('cheerio')
/**
 * 根据url获取数据
 * @param url
 * @param cb
 */
function getDataFromWeb(url, cb) {
    // console.log(url)
    axios.get(url, {responseType: 'arraybuffer'})
        .then(res => {
            if (res.headers['content-type'].toLowerCase().includes('gb') || url.includes('eastmoney.com') ||
            url.includes('finance.sina.com.cn')) {
                res.data = iconv.decode(res.data, 'gb2312')
            }
            var $ = cheerio.load(res.data)
            cb($)
        })
        .catch(err => {
            cb({})
        })
}

/**
 * 获取JSON数据
 * @param url   请求的url
 * @param cb    回调函数
 */
function getJSONFromWeb(url,cb){
    axios.get(url)
        .then(res=>{
            cb(res.data)
        })
        .catch(err=>{
            // console.log(err)
            cb({})
        })
}

module.exports = {
    getDataFromWeb:getDataFromWeb,
    getJSONFromWeb:getJSONFromWeb
}