/**
 * 入口文件
 */

require.config({
    baseUrl: './../static/script',
    paths: {
        "jquery": "jquery-1.8.3",
        "header": "zy_header",
        "scrollEvt": "zy_scroll",
        "main": "zy_bodyMain",
        "hold": "zy_hold",
        "aside": "zy_aside",
        "mock": "./../../../node_modules/mockjs/dist/mock"
    }
});

// 导入header头部js文件
require(['header'], function(header){
    header.zy_search();
    header.zy_headerScroll();
});

// 导入main主体js文件
require(['main'], function(main){
    main.mainNav();
    main.mainCont();
    main.mainAside();
    main.mainContAjax();
    // main.mainBannerAjax();
});

// 请求数据
require(['aside', 'jquery'],function(aside, $){
    aside.hotHt();
    aside.newCont();
});