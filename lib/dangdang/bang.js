const axios = require('axios')
const iconv = require('iconv-lite')//解码获取到的数据(针对中文编码问题[gb2312,gbk])
const cheerio = require('cheerio')
const Bang = {
    /**
     * 获取图书畅销榜
     * @param cb    回调函数
     * @param page  页码
     */
    getBestSellers(cb, page = 1) {
        if (isNaN(page)) {
            page = 1
        }
        this.getBestSellersPageCount(function(maxPage){
            if(maxPage<page){
                page = maxPage
            }
            axios.get('http://bang.dangdang.com/books/bestsellers/1-' + page, {responseType: 'arraybuffer'})
                .then(res => {
                    if (res.headers['content-type'].toLowerCase().includes('gb')) {
                        res.data = iconv.decode(res.data, 'gb2312')
                    }
                    var $ = cheerio.load(res.data)
                    var result = []
                    $('.bang_list li').each(function () {
                        result.push(getBookData($(this)))
                    })
                    cb(result)
                })
                .catch(err => {
                    cb([])
                })
        })
    },

    getBestSellersPageCount(cb){
        axios.get('http://bang.dangdang.com/books/bestsellers', {responseType: 'arraybuffer'})
            .then(res => {
                if (res.headers['content-type'].toLowerCase().includes('gb')) {
                    res.data = iconv.decode(res.data, 'gb2312')
                }
                var $ = cheerio.load(res.data)
                cb(Number($('.paging li.next').prev().text()))
            })
            .catch(err => {
                cb(0)
            })
    }
}
function getBookData($tag) {
    var book = {}
    book.img = $tag.find('.pic img').attr('src')
    book.title = $tag.find('.name a').attr('title')
    book.link = $tag.find('.name a').attr('href')
    book.price = $tag.find('.price_n').first().text().replace("¥", "")
    book.author = $tag.find('.publisher_info').first().find('a').attr('title')
    book.publishDate = $tag.find('.publisher_info').last().find('span').text()
    book.publisher = $tag.find('.publisher_info').last().find('a').text()
    return book
}
module.exports = Bang