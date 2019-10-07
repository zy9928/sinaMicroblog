define([
    'jquery',
    'mock'
], function($, Mock) {
    // 热门话题栏数据拦截
    function mockHt(){
        Mock.mock( '10.20.152.6/ht', {
            'ht|5': [
                {
                    "title": "#@ctitle#",
                    "img": "@image",
                    "read": "@natural(0,100000000)",
                    "talk": "@natural(0,100000000)",
                }
            ]
        });
    }
    // 实时热点栏数据拦截
    function mockNew(){
        Mock.mock( '10.20.152.6/New', {
            'New|5': [
                {
                    "title": "#@ctitle#",
                    "img": "@image",
                    "cont": "@csentence( 20, 40)",
                }
            ]
        });
    }
    // 微博拦截
    function mockMainCont(){
        Mock.mock( '10.20.152.6/mainCont', {
            'mainCont|100': [
                {
                    "title": "@csentence( 0, 40)",
                    "img|1-9": ["@image"],
                    "userImg": "@image",
                    "userId": "@ctitle",
                    "time": "@datetime",
                    "dz": "@natural(0,100000000)",
                    "pl": "@natural(0,100000000)",
                    "zf": "@natural(0,100000000)",
                }
            ]
        });
    }
    // 热搜
    function mockHotSearch(){
        Mock.mock("10.20.152.6/hotSearch", {
            "hotSearch|10": [
                {
                    "top|+1": 1,
                    "title": "@ctitle",
                    "bj|1": [`<i class="zy_headerSearchBj zy_headerHotBj">热</i>`, `<i class="zy_headerSearchBj zy_headerNewBj">新</i>`, ``]
                }
            ]
        });
    }
    // 联想输入
    function mockTjSear(){
        Mock.mock("10.20.152.6/TjSear", {
            "tjSearWb|1000": ["@ctitle"],
            "tjSearUser|1000": [
                {
                    "userImg": "@image",
                    "userId": "@ctitle",
                    "userRz|1": [`<i class="zy_headerSearchUserRz zy_headerSearchUserBv"></i>`, `<i class="zy_headerSearchUserRz zy_headerSearchUserRv"></i>`, `<i class="zy_headerSearchUserRz zy_headerSearchUserYv"></i>`, ``],
                    "sex|1": [`<i class="zy_headerSearchUserSex zy_headerSearchUserMan"></i>`, `<i class="zy_headerSearchUserSex zy_headerSearchUserWoman"></i>`],
                    "num": "@natural(0,100000000)"
                }
            ]
        });
    };
    // banner
    function mockBanner(){
        Mock.mock("10.20.152.6/banner", {
            "banner|8": [
                {
                    "bigBanner": "@image",
                    "bigTitle": "#@ctitle#",
                    "bigTalk": "@natural(0,100000000)",
                    "bigRead": "@natural(0,100000000)",
                    "smallBanner1": "@image",
                    "smallTitle1": "@ctitle",
                    "smallBanner2": "@image",
                    "smallTitle2": "@ctitle"
                }
            ]
        });
    };
    return {
        mockHt,
        mockNew,
        mockMainCont,
        mockHotSearch,
        mockTjSear,
        mockBanner,
    }
});