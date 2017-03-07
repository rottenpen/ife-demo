var page = require('webpage').create();
var system = require('system');
var config = require('./device');

var keyword = '';
var device = '';
var len = system.args.length;

var dataList = [];
var result = {};
var startTime = Date.now();
// console.log(JSON.stringify(config));
if (len === 1) {
    console.log('请输入关键词（phantomjs --output-encoding=gbk task2 <keyword> <device>）');
    phantom.exit();
} else {
    if (system.args[2] !== "iPhone5" && system.args[2] !== "iPhone6" && system.args[2] !== "iPad") {
        console.log("请输入正确设备名");
        phantom.exit();
    }
    keyword = system.args[1];
    device = system.args[2];
    console.log(keyword);
} //检测关键词 命令行第一个词是phantomjs 所以把它去掉

page.settings.userAgent = config[device].ua;

page.paperSize = config[device].size;

page.open('https:www.baidu.com/s?wd=' + keyword, function(state) {
    if (status == 'fail') {
        console.log('Unable to access network');
        result.code = 0;
        result.msg = '抓取失败';
        result.word = keyword;
        result.time = 'timeout';
        result.device = device;
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
            result.device = device;
            result.time = Date.now() - startTime + 'msec';
            result.dataList = dataList;
            console.log(JSON.stringify(result));
            phantom.exit();



        })



    }
})