const path = require('path');
module.exports = {
    entry: {
        'page1': "./app/static/script/index.js",
        'page2': "./app/static/script/index2.js"
    },
    output: {
        filename: 'js/[name].[hash:5].js', //打包后的文件名称
        path:path.resolve(__dirname, 'dist')
    }
};