/**
 * 入口文件
 */

require.config({
    baseUrl: './../static/script',
    paths: {
        "jquery": "jquery-1.8.3",
        "header": "zy_header",
        "scrollEvt": "zy_scroll",
        "main": "zy_bodyMain"
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
});
