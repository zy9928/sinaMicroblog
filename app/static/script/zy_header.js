define([
    'jquery',
    'scrollEvt',
    'hold'
], function($, scrollEvt, hold) {
    // 头部固定定位 + 定位后1秒出现阴影
    function zy_headerScroll(){
        // 异步等待
        (async function(){
            var step1 = await new Promise(function(resolve, reject){
                // 当滚动条发生了滚动，page滑动到的位置大于或等于0时，让header固定定位，且top值为0；
                scrollEvt.zy_docScroll('header', 0, 0);
                // console.log($('header').css('position'));
                resolve();
            });
            var step2 = await new Promise(function(resolve, reject){
                // console.log($('header').css('position'));
                // 判断，若header为固定定位时，1秒后让header出现阴影
                /* if($('header').css('position') == 'fixed'){
                    var timer;
                    clearInterval(timer);
                    timer = setTimeout(function(){
                        $('header').css('box-shadow', '0 2px 1px #000')
                    },1000);
                } */
                // 设置一个计时器，让他每秒检查一次header的position值，并执行上述操作
                var timer;
                $(document).on('scroll',function(){
                    clearInterval(timer);
                    timer = setInterval(function(){
                        if($('header').css('position') == 'fixed'){
                            $('header').css('box-shadow', '0 1px 2px rgba(0,0,0,0.5');
                        }else if($('header').css('position') == 'static'){
                            $('header').css('box-shadow', 'none');
                        }
                    },1000);
                });
            });
            step1();
            step2();
        })();
    };
    // 搜索框事件
    function zy_search(){
        // input获得焦点
        $('.zy_headerSearch').on('focus', function(){
            // 改变input标签的背景和边框颜色
            $('.zy_headerSearch').css({'background': '#FFF', 'border-color': '#FA7D3C'});
            // 给input加上placeholder
            $('.zy_headerSearch').attr('placeholder', '我和中国的一瞬间');
            // 提示词消失
            $('.zy_headerSearchTs').css('display', 'none');
            // 显示热搜框
            $('.zy_headerHotSearch').css('display', 'block');
            // 获取热搜内容
            hold.mockHotSearch();
            $.ajax({
                url: "10.20.152.6/hotSearch",
                success: function(date){
                    date = JSON.parse(date);
                    var hotSear = `<a href="" class="zy_headerHotSearchLi zy_headerHotSearchLiMore">查看完整热搜榜»</a>`;
                    for(var i = 0; i < 10 ; i++){
                        if(i == 0){
                            var value = `<a href="" class="zy_headerHotSearchLi"><i class="zy_headerSearchTop zy_headerSearchTop1">${date.hotSearch[i].top}</i>${date.hotSearch[i].title}${date.hotSearch[i].bj}</a>`
                        }else if(i == 1){
                            var value = `<a href="" class="zy_headerHotSearchLi"><i class="zy_headerSearchTop zy_headerSearchTop2">${date.hotSearch[i].top}</i>${date.hotSearch[i].title}${date.hotSearch[i].bj}</a>`
                        }else{
                            var value = `<a href="" class="zy_headerHotSearchLi"><i class="zy_headerSearchTop">${date.hotSearch[i].top}</i>${date.hotSearch[i].title}${date.hotSearch[i].bj}</a>`
                        }
                        hotSear = hotSear.concat(value);
                    }
                    $('.zy_headerHotSearchUl').empty();
                    $('.zy_headerHotSearchUl').append(hotSear);
                },
                fail: function(error){
                    console.log(error);
                }
            });
        });
        // input失去焦点
        $('.zy_headerSearch').on('blur', function(){
            // 还原input标签的背景和边框颜色
            $('.zy_headerSearch').css({'background': '#F2F2F5', 'border-color': '#CCCCCC'});
            // 让input的placeholder为空
            $('.zy_headerSearch').attr('placeholder', '');
            // 提示词显示
            $('.zy_headerSearchTs').css('display', 'block');
            // 热搜框消失
            $('.zy_headerHotSearch').css('display', 'none');
            // 联想输入推荐框消失
            $('.zy_headerSearchTj').css('display', 'none');
            // 让输入框用户输入的内容消失
            $('.zy_headerSearch').val('');
        });
        // input输入
        $('.zy_headerSearch').on('input', function(){
            // 判断输入框内是否有用户输入内容，若有，则热搜框消失,推荐框显示。无内容则显示，推荐框消失
            if($('.zy_headerSearch').val()){
                $('.zy_headerHotSearch').css('display', 'none');
                $('.zy_headerSearchTj').css('display', 'block');
                // 时时更新联想输入关键字
                $('.zy_headerSearchValue').text($('.zy_headerSearch').val());
            }else{
                $('.zy_headerHotSearch').css('display', 'block');
                $('.zy_headerSearchTj').css('display', 'none');
            }
            // 获取联想词库
            // 获取热搜内容
            hold.mockTjSear();
            $.ajax({
                url: "10.20.152.6/TjSear",
                success: function(date){
                    date = JSON.parse(date);
                    // console.log($('.zy_headerSearch').val());
                    var ppWb = [];
                    var ppUser = [];
                    for(var i = 0 ; i < date.tjSearWb.length ; i++){
                        if(date.tjSearWb[i].indexOf($('.zy_headerSearch').val()) != -1){
                            ppWb.push(date.tjSearWb[i]);
                        }
                        if(date.tjSearUser[i].userId.indexOf($('.zy_headerSearch').val()) != -1){
                            ppUser.push(date.tjSearUser[i])
                        }
                    }
                    var ppWbL, ppUserL;
                    if(ppWb.length >= 5){
                        ppWbL = 5;
                    }else{
                        ppWbL = ppWb.length;
                    }
                    if(ppUser.length >= 5){
                        ppUserL = 5;
                    }else{
                        ppUserL = ppUser.length;
                    }
                    var tjWb = `<a href="" class="zy_headerSearchWb zy_headerSearchWbMore">搜索“<span class="zy_headerSearchValue">${$('.zy_headerSearch').val()}</span>”相关微博</a>`;
                    for(var m = 0 ; m < ppWbL ; m++){
                        var valueWb = `<a href="" class="zy_headerSearchWb">${ppWb[m]}</a>`
                        tjWb = tjWb.concat(valueWb);
                    }
                    var tjUser = `<a href="" class="zy_headerSearchUser zy_headerSearchUserMore">搜索“<span class="zy_headerSearchValue">${$('.zy_headerSearch').val()}</span>”相关用户»</a>`;
                    for(var n = 0 ; n < ppUserL ; n++){
                        var valueUser = `
                            <a href="" class="zy_headerSearchUser">
                                <!-- 头像 -->
                                <img src="${ppUser[n].userImg}" alt="" class="zy_headerSearchUserHeadImg">
                                <!-- 用户名 + V字认证 -->
                                <h5 class="zy_headerSearchUserID"><span class="zy_headerSearchUserName">${ppUser[n].userId}</span>${ppUser[n].userRz}</h5>
                                <!-- 性别 + 粉丝数量 -->
                                <p class="zy_headerSearchUserBc">${ppUser[n].sex}<span class="zy_headerSearchUserFs">粉丝：${ppUser[n].num}</span></p>
                            </a>
                        `;
                        tjUser = tjUser.concat(valueUser);
                    }
                    $('.zy_headerSearchWbLi').empty();
                    $('.zy_headerSearchWbLi').append(tjWb);
                    $('.zy_headerSearchUserLi').empty();
                    $('.zy_headerSearchUserLi').append(tjUser);
                },
                fail: function(error){
                    console.log(error);
                }
            });
        });
    }

    return {
        zy_search,
        zy_headerScroll,
    }
});