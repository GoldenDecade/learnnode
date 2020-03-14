const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('asyncEvent', () => {
    setImmediate(() => {
        console.log('this happens async');
    })
})
myEmitter.emit('asyncEvent')

let firstEventListener = () => {
    console.log('event firstEventListener occurred');
}
let secondEventListener = () => {
    console.log('event secondEventListener occurred');
}
let onceEventListener = () => {
    console.log('event onceEventListener occurred');
}
// 同一个事件 可以被多次注册；如果要移除，也需要多次移除
myEmitter.on('event', firstEventListener)
myEmitter.on('event', firstEventListener)
myEmitter.on('event', secondEventListener)
myEmitter.once('event', onceEventListener)
myEmitter.on('event', secondEventListener)
// myEmitter.emit('event');


// once
console.log(myEmitter.once);
myEmitter.once('onceEvent', () => {
    console.log('only once');
})
myEmitter.emit('onceEvent')
myEmitter.emit('onceEvent')
// error
myEmitter.on('error', () => {
    console.log('there was an error');
})
myEmitter.emit('error', new Error('whoops!'))

console.log(myEmitter.listenerCount('event'));
console.log(myEmitter.listeners('event'));

myEmitter.off('event', firstEventListener)// 解绑某个处理函数

let prependEventListener = () => {
    console.log('event prependEventListener');
}
// 在下次触发event事件时，将这个处理程序放到最前面执行
myEmitter.prependListener('event', prependEventListener)
// myEmitter.emit('event')

let rawHandler = () => {
    console.log('rawHandler');
}
myEmitter.once('raw', rawHandler)

const rawListeners = myEmitter.rawListeners('raw')
let rawFnWrapper = rawListeners[0]
rawFnWrapper.listener()
rawFnWrapper()


console.log(myEmitter.getMaxListeners());
module.exports = myEmitter

