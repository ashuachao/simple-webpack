/**
 * 路径解析规则
 * 通过读取moduleName,得到完整的路径
 * 如import xxx from './a'
 * ./a 首先查找
 */
const fs = require('fs');
const path = require('path');
/**
 * @param moduleName 模块名字,可能是'./a', 'a', '/static/a';
 */
module.exports = function(moduleName) {
    let result;
    let ext;
    ext = path.extname(moduleName)? '' : '.js';
    // 绝对路径
    if (path.isAbsolute(moduleName)) {
        result = `${moduleName}${ext}`;
    // 相对路径
    } else if (/^\.\//.test(moduleName) || /^\.\/\//.test(moduleName)) {
        result = path.resolve(__dirname, '../example', `${moduleName}${ext}`);
    // 模块
    } else {
        
        result = path.resolve(__dirname, '../node_modules', `${moduleName}${ext}`);
    }
    return result;
}