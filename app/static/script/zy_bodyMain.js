define([
    'jquery',
    'scrollEvt'
], function($, scrollEvt) {
    // 导航
    function mainNav(){
        // 页面滑到指定位置导航固定
        scrollEvt.zy_docScroll('.zy_mainNav', 51, 15);
    };

    return {
        mainNav,
    }
});