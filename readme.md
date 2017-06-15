### realize a simple webpack include 
1. create output(bundle) througth input
2. change source to module througth loader
3. seperate code(code splitting) througth require.ensure 

### 思考
1. webpack是一个模块化打包工具。
2. 实际上是通过运行编译脚本把入口文件和所有的依赖打包成一个整体的文件。所以可以通过COMMONJS的方式编写代码。  
    具体实现是通过把依赖的模块当成参数,因此在各个模块可以通过require引用依赖的模块:
```
(function (modules) {
    var moduleInstalls = [];
    function require(moduleId) {
        // 如果已经install过,不需要重复执行,导出exports即可
        if (moduleInstalls[moduleId]) {
            return moduleInstalls[moduleId].exports;
        } else {
            var module = moduleInstalls[moduleId] = {
                exports: {}
            };
            modules[moduleId](module, module.exports, require);
            return moduleInstalls[moduleId].exports;
        }
    }
})([entry, module1, module2])
```
3. 如何生成上述代码  
    1. 检测entry代码的require的依赖和依赖模块里面的依赖
    2. 通过fs模块读取依赖(对文件后缀校验和补全)
    3. 把读取到的依赖作为参数传入自适应闭包函数,作为闭包变量

### 实现步骤
1. 使用fs的readFileSync读取entry文件(文件需要经过补全后缀)后得到字符串
2. 通过esprima(指定sourceType为module可以支持`export const a = 1`这种模块格式)把字符串解析成AST树,遍历其中的import declaration并生成module ID