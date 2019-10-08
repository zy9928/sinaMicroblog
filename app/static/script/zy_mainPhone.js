/**
 * 入口文件
 */

require.config({
    baseUrl: './../static/script',
    paths: {
        "mock": "./../../../node_modules/mockjs/dist/mock",
        "zepto": "zepto",
        "iscroll": "iscroll-probe",
        "pNav": "zy_pNav",
        "pHold": "zy_pHold",
        "pIndexWb": "zy_pIndexWb",
    }
});

// 调整根元素字体大小
require(['zepto'], function($){
    // 调整根元素字体大小
    function resetFont(){
        let width = $(document).width();
        document.documentElement.style.fontSize = (100*width/375) + 'px';
    }
    resetFont();
});

// 拼接导航栏
require(['pNav'], function(pNav){
    pNav.indexNavScroll();
});

// 拼接主页微博
require(['pIndexWb'], function(pIndexWb){
    pIndexWb.indexWebScroll();
    pIndexWb.pIndexWbCont();
});