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
})/************/([
/**************/function (module, exports, require) {

var a = require(1);
const b = 2;;
if (b == 1) {
    console.log('wrong');
};
console.log(a);;


/**************/},
/************/
/**************/function (module, exports, require) {

exports.default = 111

/**************/},
/************/
/************/])