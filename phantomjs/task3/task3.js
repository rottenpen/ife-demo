var page = require('webpage').create();
var system = require('system');
var config = require('./device');
var fs = require('fs');

var keyword = '';
var device = '';
var len = system.args.length;

var dataList = [];
var result = {};
var startTime = Date.now();

phantom.outputEncoding = "utf8";

if (len === 1) {
    console.log('请输入关键词（phantomjs task3 <keyword> <device>）');
    phantom.exit();
} else {
    if (system.args[2] !== "iphone5" && system.args[2] !== "iphone6" && system.args[2] !== "ipad") {
        console.log("请输入正确设备名");
        phantom.exit();
    }
    keyword = system.args[1];
    device = system.args[2];
    // console.log(keyword);
} //检测关键词

page.settings.userAgent = config[device].ua; //模拟设备ua

page.paperSize = config[device].size; //模拟设备屏幕尺寸

page.open('https:www.baidu.com/s?wd=' + keyword, function(state) { //打开网页
    if (status == 'fail') {
        console.log('无法连接网络');
        result.code = 0;
        result.msg = '抓取失败';
        result.word = keyword;
        result.time = 'timeout';
        result.device = device;
        console.log(JSON.stringify(result));
        phantom.exit()
    } else {
        // console.log('成功连接网络');
        page.includeJs('jquery-3.1.1.min.js', function() { //使用jquery

            dataList = page.evaluate(function() {
                var data = [];
                var $content = $('.c-container');
                $content.each(function(index) { //遍历搜索结果 
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
            // return result;
            // var file = fs.open('result.json', 'w'); //结果写入result.json
            // file.write(JSON.stringify(result));
            // file.close();
            phantom.exit();



        })



    }
})