define([
    'jquery',
    'scrollEvt',
    'hold'
], function($, scrollEvt, hold) {
    // 导航
    function mainNav(){
        // 页面滑到指定位置导航固定
        scrollEvt.zy_docScroll('.zy_mainNav', 51, 15);
    };
    // banner
    hold.mockBanner();
    function mainBannerAjax(){
        $.ajax({
            url: "10.20.152.6/banner",
            success: function(date){
                date = JSON.parse(date);
                var banner = ``;
                for(var i = 0 ; i < 8 ; i++){
                    var value = `
                        <div class="swiper-slide zy_mainBannerCont">
                            <!-- banner图1 -->
                            <a class="zy_bannerContImgKuan1" style="background-image: url(${date.banner[i].bigBanner});">
                                <!-- 大banner的标题 -->
                                <span class="zy_bannerContText2">
                                    <!-- 标题内容 -->
                                    <b class="zy_bannerContTextTitle">${date.banner[i].bigTitle}</b>
                                    <!-- 注释 -->
                                    <b class="zy_bannerContTextBz"><i class="zy_bannerContTextSpeek">${date.banner[i].bigTalk}讨论</i><i class="zy_bannerContTextRead">${date.banner[i].bigRead}亿阅读</i> </b>
                                </span>
                            </a>
                            <!-- banner图2 -->
                            <a class="zy_bannerContImgKuan2" style="background-image: url(${date.banner[i].smallBanner1});">
                            <span class="zy_bannerCOntText2">${date.banner[i].smallTitle1}</span>
                            </a>
                            <!-- banner图3 -->
                            <a class="zy_bannerContImgKuan3 zy_bannerContImgKuan2" style="background-image: url(${date.banner[i].smallBanner2});">
                                <span class="zy_bannerCOntText2">${date.banner[i].smallTitle2}</span>
                            </a>
                        </div>
                    `
                    banner = banner.concat(value);
                }
                $('.zy_mainBannerContLang').prepend(banner);
            }
        });
    }
    // 内容区
    function mainCont(){
        // 页面划到指定位置，“加载新内容”固定
        scrollEvt.zy_docScroll('.zy_mainNewCont', 53, 327);
    }
    // 登入窗口 + 回归顶部和刷新
    function mainAside(){
        // 滑到指定位置登入窗口固定
        scrollEvt.zy_docScroll('.zy_mainAsdlogin', 65, 2251);
        // 登入窗口的标题点击事件
        $('.zy_mainLoginTitle').on('click', function(e){
            if(e.target.className.indexOf("zy_idLogin") != -1){
                $('.zy_idLogin').addClass('zy_loginActive');
                $('.zy_safeLogin').removeClass('zy_loginActive');
                $('.zy_mainSafeLoginCont').css('display', 'none');
                $('.zy_mainIDLoginCont').css('display', 'block');
            }else if(e.target.className.indexOf('zy_safeLogin') != -1){
                $('.zy_idLogin').removeClass('zy_loginActive');
                $('.zy_safeLogin').addClass('zy_loginActive');
                $('.zy_mainSafeLoginCont').css('display', 'block');
                $('.zy_mainSafeLoginImg').css('display', 'block');
                var timerLoginImg = null;
                timerLoginImg = setTimeout(function(){
                    $('.zy_mainSafeLoginImg').css('display', 'none');
                }, 4000);
                $('.zy_mainIDLoginCont').css('display', 'none');
            }
        });
        // 回归顶部和刷新
        $('.zy_pageTopResetBtn').on('click', function(e){
            if(e.target.parentNode.className == "zy_pageTopBtn" || e.target.className == "zy_pageTopBtn"){
                $(document).scrollTop(0);
            }else if(e.target.parentNode.className == "zy_pageResetBtn" || e.target.className == "zy_pageResetBtn"){
                location.reload();
            }
        });
    }
    // 内容栏加载
    hold.mockMainCont();
    function mainContAjax(){
        // 加载17条微博
        function contAjax17(){
            $.ajax({
                url: "10.20.152.6/mainCont",
                success: function(date){
                    date = JSON.parse(date);
                    for(var i = 0; i < 17; i++){
                        if(date.mainCont[i].img.length > 1){
                            var imgs = ``;
                            for(var m = 0; m < 4; m++){
                                if(m == 3){
                                    var value = `<img class="zy_mMImgsLast" src="${date.mainCont[i].img[m]}" alt="内容图">`
                                }else{
                                    var value = `<img src="${date.mainCont[i].img[m]}" alt="内容图">`
                                }
                                imgs = imgs.concat(value);
                            }
                            $('.zy_mainNewCont').after(`
                                <!-- 多图微博 -->
                                <div class="zy_mMImgsWbBox">
                                    <h5 class="zy_mMImgsH5">${date.mainCont[i].title}</h5>
                                    <div class="zy_mMImgsBox">${imgs}</div>
                                    <p class="zy_mMImgsWbCont">
                                        <img src="${date.mainCont[i].userImg}" alt="用户头像" class="zy_mMImgsWbUserImg">
                                        <a class="zy_mMImgsWbUserId">${date.mainCont[i].userId}</a>
                                        <span class="zy_mMImgsWbTime">${date.mainCont[i].time}</span>
                                        <!-- 点赞 -->
                                        <span class="zy_mMImgsWbDz"><i class="iconfont icon-zan"></i>${date.mainCont[i].dz}</span>
                                        <span class="zy_mMImgsWbPl"><i class="iconfont icon-pinglun"></i>${date.mainCont[i].pl}</span>
                                        <span class="zy_mMImgsWbZf"><i class="iconfont icon-zhuanfa"></i>${date.mainCont[i].zf}</span>
                                    </p>
                                </div>
                            `);
                        }else{
                            $('.zy_mainNewCont').after(`
                                <div class="zy_mMImgWbBox">
                                    <div class="zy_mMImgImgBox" style="background-image: url(${date.mainCont[i].img[0]})"></div>
                                    <h5 class="zy_mMImgWbH5">${date.mainCont[i].title}</h5>
                                    <p class="zy_mMImgWbCont">
                                        <img src="${date.mainCont[i].userImg}" alt="用户头像" class="zy_mMImgWbUserImg">
                                        <a class="zy_mMImgWbUserId">${date.mainCont[i].userId}</a>
                                        <span class="zy_mMImgWbTime">${date.mainCont[i].time}</span>
                                        <!-- 点赞 -->
                                        <span class="zy_mMImgWbDz"><i class="iconfont icon-zan"></i>${date.mainCont[i].dz}</span>
                                        <span class="zy_mMImgWbPl"><i class="iconfont icon-pinglun"></i>${date.mainCont[i].pl}</span>
                                        <span class="zy_mMImgWbZf"><i class="iconfont icon-zhuanfa"></i>${date.mainCont[i].zf}</span>
                                    </p>
                                </div>
                            `);
                        }
                    }
                },
                fail: function(error){
                    console.log(error);
                }
            });
        }
        // 页面加载完成载入17条微博
        $(document).ready(contAjax17());
        
        // 点击刷新刷新数据
        var timeSX = null;
        clearInterval(timeSX);
        timeSX = setInterval(function(){
            $(".zy_mainNewCont").css('display', 'block');
        }, 5000);
        $(".zy_mainNewCont").on('click', function(){
            $('.zy_mainCont').empty();
            // console.log(contAjax17);
            $('.zy_mainCont').append(`<div class="zy_mainNewCont">您有未读内容，点击查看<span class="iconfont icon-cha zy_mainNewX"></span></div>`);
            contAjax17()
            $(".zy_mainNewCont").css('display', 'none');
        });
        // 当页面滚动过低再载入17条微博
        $(document).on('scroll', function(){
            // console.log($(document).height() - $(document).scrollTop());
            if($(document).height() - $(document).scrollTop() <= 670){
                var oldScroll = $(document).scrollTop();
                // contAjax17()
                // $(document).scrollTop(oldScroll)
                (async function(){
                    var res1 = await new Promise(function(resolve, reject){
                        $('.zy_mLoading').css("display", "block");
                        resolve(contAjax17());
                    });
                    var res2 = await new Promise(function(resolve, reject){
                        // console.log(oldScroll);
                        $('.zy_mLoading').css("display", "none");
                        $(document).scrollTop(oldScroll)
                        resolve();
                    });
                    // console.log(res1);
                })();
            }
        });
    }
    return {
        mainNav,
        mainCont,
        mainAside,
        mainContAjax,
        mainBannerAjax,
    }
});