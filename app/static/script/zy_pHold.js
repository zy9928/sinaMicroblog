define([
    'zepto',
    'mock'
], function($, Mock) {
    // 主页微博内容
    function mockIndexWb(){
        Mock.mock('10.20.152.6/pIndexWb', {
            "pIndexWb|100": [
                {
                    "userImg": "@image",
                    "userRz|1": ["zy_pWbRzRv", "zy_pWbRzYv", "zy_pWbRzBv", ""],
                    "userId": "@ctitle",
                    "userVip|1": [`<i class="iconfont icon-weibo"></i>`, ``],
                    "wbTime": "@datetime",
                    "wbFrom|1": ["微博 weibo.com", "手机客户端", "IOS客户端", "安卓客户端"],
                    "wbP": "@csentence( 0, 40)",
                    "wbImg|0-9": ["@image"],
                    "dz": "@natural(0,100000000)",
                    "pl": "@natural(0,100000000)",
                    "zf": "@natural(0,100000000)"
                }
            ]
        })
    }

    return {
        mockIndexWb,
    }
});