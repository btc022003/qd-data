/**
 * Created by yuluo on 2017/5/5.
 */
const axios = require('axios')
const iconv = require('iconv-lite')//解码获取到的数据(针对中文编码问题[gb2312,gbk])
const cheerio = require('cheerio')
const common = {
    //获取分类数据 左侧导航中的分类数据
    getBookTypes(cb){
        axios.get('http://bang.dangdang.com/books/bestsellers', {responseType: 'arraybuffer'})
            .then(res => {
                if (res.headers['content-type'].toLowerCase().includes('gb')) {
                    res.data = iconv.decode(res.data, 'gb2312')
                }
                var $ = cheerio.load(res.data)
                var result = []
                $('.side_nav').each(function(){
                    var obj = {}
                    var $tag = $(this).find('a')
                    obj.name = $tag.text()
                    obj.link = $tag.attr('href')
                    obj.children = []
                    $(this).next().find('li').each(function(){
                        var objChild = {}
                        var $tagChild = $(this).find('a')
                        objChild.name = $tagChild.text()
                        objChild.link = $tagChild.attr('href')
                        obj.children.push(objChild)
                    })
                    result.push(obj)
                })
                cb(result)
            })
            .catch(err => {
                cb([])
            })
    }
}
module.exports = common