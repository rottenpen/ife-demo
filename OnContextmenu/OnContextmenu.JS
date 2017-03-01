window.onload = function() {
        var cont = document.getElementById('content'),
            menu = document.getElementById('menu');


        document.oncontextmenu = function(event) {
            event.preventDefault();
            var event = event || window.event,
                clientW = document.documentElement.clientWidth || document.body.clientWidth, //获取浏览器宽度    
                clientH = document.documentElement.clientHeight || document.body.clientHeight, //获取浏览器高度
                x = event.clientX,
                y = event.clientY, //确定鼠标位置
                menuW = menu.offsetWidth, //menu的宽度
                menuH = menu.offsetHeight; //menu的高度


            menu.style.display = 'block';
            menu.style.top = (clientH - y > menuH ? y : y - menuH) + 'px';
            menu.style.left = (clientW - x > menuW ? x : x - menuW) + 'px';



            return false;
        }
        document.onclick = function() {
            menu.style.display = 'none';
        }
    }
    // function contextMenu(opt){


// }

// contextMenu.prototype.init=function(){


// }

// contextMenu.prototype.show=function(){


// }

// contextMenu.prototype.hide=function(){