// // ============================配置变量================================
// var rootPath = window.location.href.replace(/\/\w+\.\w+/, "/");
// var Settings = {
//     playmode: 0, //0列表循环，1随机，2为单曲循环
//     volume: 0.5, //音量
//     initNum: 10, //列表初始化歌曲数
//     reqNum: 10 //后续请求歌曲数
// };

// // ============================工具函数================================
// var Util = (function() {
//         return {

//         }
//     })()
//     // ============================Dom选择器================================
// var Dom = {

// }

// // ============================全局变量================================
// var winH = $(window).height();

// var songNum = 0; //当前列表歌曲数目
// var lrcHighIndex = 0; // 歌词高亮索引
// var lrcMoveIndex = 0; // 歌词移动单位索引
// var moveDis = 0; // 单句歌词每次移动距离

// var duration = 0; // 当前歌曲的时间
// var index = 0; //当前播放歌曲的索引
// var songInfo = null; // 当前歌曲信息
// var songModelUI = null; // 当前歌曲UI模型
// var timeArr = []; //当前歌曲时间数组
// var formatTimeArr = []; //当前歌曲时间数组(格式化为秒数)

// // ============================入口函数================================
// function main() {
//     initUIFrame();
//     var initModel = PlayerModel();

//     var songListUI = ModelUIFrame(Dom.songListContainer);
//     var lsongListUI = ModelUIFrame(Dom.lSongListContainer);
//     initModel.getSongList("data/data.json", function(data) {
//         // 生成所有歌曲列表
//         songListUI.renderList(data, 0, null, function() {
//             songListUI.updateList();
//         });
//         // 生成喜爱歌曲列表
//         initModel.getLoveSongArr(function(lSongArr) {
//             lsongListUI.renderList(data, 1, lSongArr);
//         });
//         // 添加动画
//         Util.addAnimationDelay(Dom.song);
//         // 保存歌词数据
//         initModel.saveLyric(data);

//     });
//     EventHandler();
// }
// // ============================初始化UI函数================================
// function initUIFrame() {

// }
// // ============================实现数据交互方法================================
// function PlayerModel() {

// }
// // ============================模型动态UI模块================================
// function ModelUIFrame(container) {

// }
// // ============================事件绑定模块================================
// function EventHandler() {

// }
// // 调用入口函数
// main();

var audio;
var song_list = [{
    name: "你快乐所以我快乐",
    artist: "颜素susu",
    src: "song/颜素susu - 你快乐所以我快乐  Cover：王菲.mp3",
    cover: "img/susu.jpg"
}, {
    name: "zzzz",
    artist: "",
    src: "song/zzzz.mp3",
    cover: "img/susu.jpg"
}, {
    name: "1965",
    artist: "Zella Day",
    src: "song/Zella Day - 1965.mp3",
    cover: "img/susu.jpg"
}, {
    name: "不该",
    artist: "颜素susu/Ng",
    src: "song/颜素susu,Ng - 不该 （cover：周杰伦／张惠妹）.mp3",
    cover: "img/susu.jpg"
}, {
    name: "原点",
    artist: "颜素susu/大哥L",
    src: "song/颜素susu,大哥L- - 原点（Cover：孙燕姿／蔡健雅）.mp3",
    cover: "img/susu.jpg"
}, {
    name: "口水",
    artist: "颜素susu",
    src: "song/素素喷口水练习.mp3",
    cover: "img/susu1.jpg"
}]

window.onload = function() {
    audio = document.getElementsByTagName("audio")[0];
    var btn_toggle = document.getElementById("btn_toggle");
    // var btn_pause = document.getElementById("btn_pause");
    var btn_sound = document.getElementById("btn_sound");
    var btn_volume = document.getElementById('volume');
    var btn_time = document.getElementById('time');
    var btn_next = document.getElementById('btn_next');
    var song_title = document.getElementById('song_title');
    var song_cover = document.getElementById('song_cover');
    var song_artist = document.getElementById('song_artist');
    var t_ranges = document.getElementById('time_ranges');
    var song_index = -1;
    var time_range = audio.currentTime / audio.duration;
    nextSong();
    // audio.play();

    btn_toggle.addEventListener('click', doToggle, false);
    // btn_pause.addEventListener('click', doPause, false);
    btn_next.addEventListener('click', nextSong, false);
    btn_sound.addEventListener('click', doMute, false);
    btn_volume.value = audio.volume;


    audio.addEventListener('timeupdate', function(e) {
        myTime = e.target.currentTime;
        btn_time.value = myTime / audio.duration;
        time_range = myTime / audio.duration;
        test = (time_range - 1) * 100 + '%';
        t_ranges.style.cssText = "left:" + test + "";
        console.log(test);

    }, false);
    btn_time.addEventListener('change', function(e) {
        thisTime = e.target.value;
        audio.currentTime = thisTime * audio.duration;
        if (thisTime == 1 || audio.ended) {
            audio.currentTime = 0;
            audio.play();
        }
    }, true);
    btn_volume.addEventListener('change', function(e) {
        myVol = e.target.value;
        audio.volume = myVol;
        if (myVol == 0) {
            audio.muted = true;
            btn_sound.className = "btn_mute";
        } else {
            btn_sound.className = "btn_sound";
            audio.muted = false;
        }
        return false;
    }, true);
    // ID3.loadTags("")
    function nextSong() {
        console.log("click");
        song_index = song_index + 1;
        if (song_index == song_list.length) {
            song_index = 0;
        }
        console.log(song_list.length)
        console.log(song_index);
        song_title.innerHTML = song_list[song_index].name;
        song_artist.innerHTML = song_list[song_index].artist;
        song_cover.style.cssText = "background-image:url(" + song_list[song_index].cover + ")";
        audio.load();

        audio.setAttribute("src", song_list[song_index].src);
        document.getElementById("btn_toggle").className = "btn_play";

        // a.load().play();
        // if (a.play() != null) {
        //     a.play().catch(function() { a.play(); })
        // }
        // a.load();


    }

};

function doToggle() {
    if (audio.paused) {
        audio.play();
        document.getElementById("btn_toggle").className = "btn_play";
    } else if (audio.ended) {
        audio.currentTime = 0;
        audio.play();
        document.getElementById("btn_toggle").className = "btn_play";
    } else {
        audio.pause();
        document.getElementById("btn_toggle").className = "btn_pause";
    }
};

function doPause() {
    if (audio.play) {



    };

};

function doMute() {
    if (audio.muted == true || document.getElementById('volume').value == 0) {
        document.getElementById("btn_sound").className = "btn_sound";
        audio.muted = false;
        document.getElementById('volume').value = audio.volume;
    } else {
        document.getElementById('volume').value = 0;
        audio.muted = true;
        document.getElementById("btn_sound").className = "btn_mute";
    }

};


// function getDefaultStyle(obj,attribute){}
// function getstyle(sname) {
//     for (var i = 0; i < document.styleSheets.length; i++) {
//         var rules = [];
//         if (document.styleSheets[i].cssRules) {
//             rules = document.styleSheets[i].cssRules;
//         } else {
//             rules = document.styleSheets[i].rules;
//         }
//         for (var j = 0; j < rules.length; j++) {
//             if (rules[j].selectorText == sname) {
//                 return rules[j].style;
//             }
//         }
//     }
// }