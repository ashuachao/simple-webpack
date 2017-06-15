/**
 * 通过依赖🌲生成chunk代码
 */
// { modules:
//    { '/Users/cc/Documents/FEDevelop/chaochao_project/simple-webpack/example/index.js':
//       { id: 0,
//         fileName: '/Users/cc/Documents/FEDevelop/chaochao_project/simple-webpack/example/index.js',
//         name: './index.js',
//         requires: [Object] },
//      '/Users/cc/Documents/FEDevelop/chaochao_project/simple-webpack/example/a.js':
//       { id: 1,
//         fileName: '/Users/cc/Documents/FEDevelop/chaochao_project/simple-webpack/example/a.js',
//         name: './a',
//         requires: undefined } },
//   moduleNameMapToId: { './index.js': 0, './a': 1 } }
const writeSource = require('./writeSource');
module.exports = function(depTree) {
    let buffer = [];
    let modules = depTree.modules;
    for (let module in modules) {
        buffer.push('/**************/');
        buffer.push('function (module, exports, require) {\n\n');
        buffer.push(writeSource(modules[module], depTree));
        buffer.push('\n\n/**************/},\n/************/\n')
    }
    return buffer.join('')
}