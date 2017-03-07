var page = require('webpage').create();
var system = require('system');

var keyarg = [];
var keyword = '';
var len = system.args.length;

var dataList = [];
var result = {};
var startTime = Date.now();

if (len === 1) {
    console.log('请输入关键词');
} else {
    keyarg = system.args.splice(1, len - 1);
    keyword = keyarg.join(' ');
    console.log(keyword);
} //检测关键词 命令行第一个词是phantomjs 所以把它去掉

page.open('https:www.baidu.com/s?wd=' + keyword, function(state) {
    if (status == 'fail') {
        console.log('Unable to access network');
        result.code = 0;
        result.msg = '抓取失败';
        result.word = keyword;
        result.time = 'timeout';
        console.log(JSON.stringify(result));
        phantom.exit()
    } else {
        console.log('success');
        page.includeJs('jquery-3.1.1.min.js', function() {

            dataList = page.evaluate(function() {
                var data = [];
                var $content = $('.c-container');
                $content.each(function(index) {
                    data[index] = {
                        title: $(this).find('.t').text() || '',
                        info: $(this).find('.c-abstract').text() || '',
                        link: $(this).find('.c-showurl').text() || '',
                        pic: $(this).find('.general_image_pic img').attr('src') || ''
                    };

                })
                return data;
            })
            result.code = 1;
            result.msg = '抓取成功';
            result.word = keyword;
            result.time = Date.now() - startTime + 'msec';
            result.dataList = dataList;
            console.log(JSON.stringify(result));
            console.log('3');
            phantom.exit();



        })



    }
})