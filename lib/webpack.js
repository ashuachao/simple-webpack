/**
 * 程序入口,主要工作,读取入口文件,获得依赖关系,根据依赖关系生成bundle函数
 */
const path = require('path');
const fs = require('fs');
const getDeps = require('./getDeps');
// 根据依赖🌲生成块
const writeChunks = require('./writeChunks');
const config = require('../config');
const entry = config.entry;
const output = config.output;
const templateString = fs.readFileSync(path.join(__dirname, './templateString.js'), {
    encoding: 'utf-8'
})
// 根据入口文件获取依赖,得到依赖🌲
const depTree = getDeps(entry);
// 通过依赖🌲生成bundle
const outputJs = generateOutputJs(depTree);
fs.writeFileSync(path.resolve(__dirname, '../', output), outputJs);
/**
 * 通过依赖🌲生成bundle
 * 
 * @param {any} depTree
 */
function generateOutputJs(depTree) {
    let buffer = [];
    buffer.push(templateString);
    buffer.push('/************/([\n');
    // 拼接module
    const chunk = writeChunks(depTree);
    buffer.push(chunk);
    buffer.push('/************/])');
    buffer = buffer.join('');
    return buffer;
}

