/**
 * 替换模块依赖为ID
 */
const esprima = require('esprima');
const escodegen = require('escodegen');
module.exports = function(module, depTree) {
    let moduleNameToId = depTree.moduleNameMapToId;
    const astTreeArr = esprima.parse(module.source, { sourceType: 'module' }).body;
    let parsedSource = '';
    for (let astTree of astTreeArr) {
        let type = astTree.type;
        if (type == 'ImportDeclaration') {
            parsedSource += `var ${astTree.specifiers[0].local.name} = require(${moduleNameToId[astTree.source.value]});\n`;
        } else if (type == 'ExportDefaultDeclaration') {
            parsedSource += `exports.default = ${astTree.declaration.value}`
        } else {
            parsedSource += `${escodegen.generate(astTree)};\n`
        }
    }
    return parsedSource;
}