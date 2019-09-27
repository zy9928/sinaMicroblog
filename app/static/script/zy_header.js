define([
    'jquery',
    'scrollEvt'
], function($, scrollEvt) {
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
        });
    }

    return {
        zy_search,
        zy_headerScroll,
    }
});