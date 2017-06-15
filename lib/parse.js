// 使用esprima分析js语法
const esprima = require('esprima');
// 使用escodegen生成js语法字符串
const escodegen = require('escodegen');
/**
 * 解析source
 * 1. 经过不同的loader转换
 * 2. 返回经过转换的source和依赖的模块的列表
 */
module.exports = function(source) {
    let astTree = esprima.parse(source, { sourceType: 'module' });
    let module = {};
    walkStatements(module, astTree.body);
    module.source = source;
    return module;
}
/**
 * 遍历模块语句
 * 
 * @param {any} module
 * @param {any} statements
 */
function walkStatements(module, statements) {
    statements.forEach((statement) => {
        walkStatement(module, statement)
    })
}
/**
 * 遍历每一句语句
 * 
 * @param {any} module
 * @param {any} statement
 */
function walkStatement(module, statement) {
    switch (statement.type) {
        case 'ImportDeclaration':
            // statement.source.value指的是import xxx
            module.requires = module.requires || [];
            module.requires.push(statement.source.value);
            break;
        default:
            break;
    }
}