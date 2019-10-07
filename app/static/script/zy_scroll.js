define([
    'jquery'
], function($) {
    // 滚动到某一位置元素固定定位
    /* 
        dom     需要固定定位的元素
        domTop  元素固定定位时距离顶部的top
        docTop  页面滑动到该值时，触发元素固定定位
    */
    function zy_docScroll(dom, domTop, docTop){
        $(document).on('scroll', function(){
            // console.log($(document).scrollTop());
            // 判断页面是否滚动到了阈值
            if($(document).scrollTop() > docTop){
                // 让元素固定定位，并加上top值
                $(dom).css({'position': 'fixed', 'top': `${domTop}px`, 'z-index': '100'})
            }else{   // 如果页面滚动小于该阈值
                $(dom).css({'position': 'static', 'top': `${domTop}px`})
            }
        });
        // 当页面加载完成时也做一次判断
        $(document).ready(function(){
            // console.log($(document).scrollTop());
            // 判断页面是否滚动到了阈值
            if($(document).scrollTop() > docTop){
                // 让元素固定定位，并加上top值
                $(dom).css({'position': 'fixed', 'top': `${domTop}px`, 'z-index': '100'})
            }else{   // 如果页面滚动小于该阈值
                $(dom).css({'position': 'static', 'top': `${domTop}px`})
            }
        });
    };

    return {
        zy_docScroll,
    }
});