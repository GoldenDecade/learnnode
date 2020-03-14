let myEmitter = require('./event')
let eventHandler = () => {
    console.log('eventHandler ');
}
myEmitter.on('event', eventHandler)

myEmitter.emit('event')