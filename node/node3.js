
const EventEmitter = require('events');

module.exports = new EventEmitter();

// Do some work, and after some time emit
// the 'ready' event from the module itself.
setTimeout(() => {
    console.log('emit ready');
    module.exports.emit('ready');
}, 1000);

console.log('node3');
let node2 = module.require('./node2')
console.log(node2.a);// xian
console.log(node2);// xian