define([
    'zepto',
    'pHold',
    'iscroll'
], function($, pHold, IScroll) {
    // 微博滚动
    function indexWebScroll(){
        var myScroll = new IScroll('.zy_indexBody', {
            click: true,
            tap: true,
            probeType: 3,
        });
        return myScroll;
    }
    // 微博数据请求
    function pIndexWbCont(){
        var myScroll = indexWebScroll();
        pHold.mockIndexWb();
        function pIndexWbQq17(){
            $.ajax({
                url: "10.20.152.6/pIndexWb",
                success: function(date){
                    date = JSON.parse(date);
                    for(var i = 0 ; i < 17 ; i++){
                        var imgs = ``;
                        for(var j = 0; j < date.pIndexWb[i].wbImg.length; j++){
                            var value = `<img src="${date.pIndexWb[i].wbImg[j]}" alt="微博内容图">`
                            imgs = imgs.concat(value);
                        }
                        $('.zy_indexGd').append(`
                            <section class="zy_pWbCont zy_tx">
                                <div class="zy_pWbContHead">
                                    <img src="${date.pIndexWb[i].userImg}" alt="用户头像" class="zy_pWbUserImg">
                                    <i class="zy_pWbUserRz ${date.pIndexWb[i].userRz}"></i>
                                    <div class="zy_pWbUserBox">
                                        <h6 class="zy_pWbUserId">${date.pIndexWb[i].userId}${date.pIndexWb[i].userVip}</h6>
                                        <p class="zy_pWbUserCont">${date.pIndexWb[i].wbTime}&nbsp;&nbsp;来自&nbsp;&nbsp;${date.pIndexWb[i].wbFrom}</p>
                                    </div>
                                    <div class="zy_pWbGz">+关注</div>
                                </div>
                                <p class="zy_pWbContBodyP">${date.pIndexWb[i].wbP}</p>
                                <div class="zy_pWbContBodyImgs zy_tx">${imgs}</div>
                                <div class="zy_pWbZtBox">
                                    <i class="iconfont icon-zhuanfa"></i>
                                    <span class="zy_pWbZtZf">${date.pIndexWb[i].zf}</span>
                                    <i class="iconfont icon-pinglun"></i>
                                    <span class="zy_pWbZtPl">${date.pIndexWb[i].pl}</span>
                                    <i class="iconfont icon-zan"></i>
                                    <span class="zy_pWbZtDz">${date.pIndexWb[i].dz}</span>
                                    <b class="zy_pWbZtMore">···</b>
                                </div>
                            </section>
                        `)
                    }
                    myScroll.refresh();
                    // console.log(myScroll.maxScrollY);
                },
                fail: function(error){
                    console.log(error);
                },
            })
        }
        pIndexWbQq17();
        myScroll.on('scroll', function(){
            console.log(myScroll.y);
            if((myScroll.y -  myScroll.maxScrollY) <= 1){
                // console.log(0);
                pIndexWbQq17();
            }
            if(myScroll.y > 10){
                $('.zy_indexGd').empty();
                pIndexWbQq17();
            }
        });
    }
    return {
        pIndexWbCont,
        indexWebScroll,
    }
});