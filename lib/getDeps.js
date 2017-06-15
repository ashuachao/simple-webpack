const fs = require('fs');
const parse = require('./parse');
const resolve = require('./resolve');
// moduleID
let mid = 0;
// chunkID
let cid = 0;
let depTree = {
    // 存储各个模块
    modules: {},
    // 存储模块名字和ID的对应关系
    moduleNameMapToId: {}
}
module.exports = function getDeps(entry) {
    depTree = parseModule(depTree, entry);
    // console.log(depTree.modules)
    return depTree;
}
/**
 * 分析module的依赖关系
 * 
 * @param {any} depTree 依赖🌲
 * @param {any} moduleName 模块名称
 */
function parseModule(depTree, moduleName) {
    let module;
    let absoluteName;
    absoluteName = resolve(moduleName);
    module = depTree.modules[absoluteName] = {
        id: mid,
        fileName: absoluteName,
        name: moduleName,
        source: ''
    }
    // 通过loader解析模块
    let source = fs.readFileSync(absoluteName, { encoding: 'utf-8' }).toString();
    let parsedModule = parse(source);
    module.requires = module.requires || [];
    // 获得依赖的数组
    module.requires = parsedModule.requires;
    module.source = parsedModule.source;
    // 映射关系
    depTree.moduleNameMapToId[moduleName] = mid;
    mid = mid + 1;
    // 如果模块有依赖的模块,采取深度bianli
    if (module.requires && module.requires.length > 0) {
        for(let require of module.requires) {
            depTree = parseModule(depTree, require);
        }
    }
    return depTree;
}