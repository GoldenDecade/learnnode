const net = require('net')

const server = net.createServer((socket) => {
    console.log('socket bye');
    socket.end('bye')
})

// 会自动使用一个 未被占用的端口
server.listen(() => {
    console.log('opened server on '+ JSON.stringify(server.address()));
})

server.on('listening', ()=> {
    console.log('listening');
})

server.on('close', () => {
    console.log('server close handler');
})
setTimeout(() => {
    server.close(() => {
        // close 结束之后 这里才会被触发
        console.log('close callback');
    })
}, 3000)
