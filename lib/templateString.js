(function (modules) {
    var moduleInstalls = [];
    function require(moduleId) {
        if (moduleInstalls[moduleId]) {
            return moduleInstalls[moduleId].exports.default;
        } else {
            var module = moduleInstalls[moduleId] = {
                exports: {}
            };
            modules[moduleId](module, module.exports, require);
            return moduleInstalls[moduleId].exports.default;
        }
    }
    return require(0);
})