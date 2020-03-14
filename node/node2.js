exports = module.exports = function () {

}
exports.a = 1 //  为输出增加 key value;
//------------
// 必须是这样写
// exports = module.exports = ...
// exports.a = 1
// 只有这样 require 之后才能拿到这个 a; 还是对象赋值的原理
//--------------