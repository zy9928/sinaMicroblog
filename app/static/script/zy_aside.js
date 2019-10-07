define([
    'hold',
    'jquery'
], function(hold, $) {
    // 热门话题
    hold.mockHt();
    function hotHt(){
        $.ajax({
            url: "10.20.152.6/ht",
            success: function(date){
                date = JSON.parse(date);
                for(var i = 0; i < 5; i++){
                    $('.zy_mAsdHotAjax').after(`
                        <a href="" class="zy_mAsdHotContBox">
                            <img src="${date.ht[i].img}" alt="话题图标" class="zy_mAsdHotImg">
                            <h6 class="zy_mAsdHotContTitle">${date.ht[i].title}</h6>
                            <p class="zy_mAsdHotContCont"><span>${date.ht[i].read}阅读</span><span>${date.ht[i].talk}万讨论</span></p>
                        </a>
                    `);
                }
            },
            fail: function(error){
                console.log(error);
            }
        });
    }
    // 实时热点
    hold.mockNew();
    function newCont(){
        $.ajax({
            url: "10.20.152.6/New",
            success: function(date){
                date = JSON.parse(date);
                for(var i = 0; i < 5; i++){
                    $('.zy_mAsdNewAjax').after(`
                        <a href="" class="zy_mAsdHotContBox">
                            <img src="${date.New[i].img}" alt="话题图标" class="zy_mAsdHotImg">
                            <h6 class="zy_mAsdHotContTitle">${date.New[i].title}</h6>
                            <p class="zy_mAsdHotContCont zy_mAsdNewContCont">${date.New[i].cont}</p>
                        </a>
                    `);
                }
            },
            fail: function(error){
                console.log(error);
            }
        });
    }
    return {
        hotHt,
        newCont,
    }
});