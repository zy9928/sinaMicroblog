define([
    'zepto',
    'iscroll'
], function($, IScroll) {
    // 导航栏可滚动
    function indexNavScroll(){
        var myScroll = new IScroll('.zy_pNavUlBox', {
            bounce: false,
            click: true,
            tap: true,
            scrollY: false,
            scrollX: true,
        });
    }
    return {
        indexNavScroll,
    }
});