const http = require('http')

const PORT = 3000, HOST = '127.0.0.1';
const server = http.createServer((req, res) => {
    if(req.url === '/abc') {
        res.end('abc')
    }else if(req.url === '/timeout') {
        console.log('test timeout');
        setTimeout(() => {
            res.end('test timeout');
        }, 2000)
    }else if(req.url === '/close') {
        server.close(() => {// 关闭服务
            console.log('have closed server');
        })
        console.log('close server');
        res.end('close server');
    } else{
        res.statusMessage = 'this is success'
        res.statusCode = 201
        res.setHeader('myname', 'wer')
        res.setHeader('hername', 'wer')
        // res.writeHead 必须放在 res.end 或者 res.write 之前，不能换位置，否则就会报错； 而且定义的header 会覆盖其他的同名header
        res.writeHead(202, '202 success', {'myname': 'wq'})
        res.write('999', 'utf-8');
        res.end();// res.end([data],[encoding], [callback])
    }
})
let NETserver = server.listen(PORT, HOST, ()=> {
    console.log(NETserver.address());
})

console.log('server.listening : %s',server.listening);// 此时就是true

server.setTimeout(1000);// 设置的响应超时时间

console.log('server.keepAliveTimeout : %s', server.keepAliveTimeout);

server.on('error', (e) => {
    console.log('一直没有触发');
    console.log('on error');
    console.log(e.code);
    setTimeout(() => {
        server.close();
        server.listen(PORT, HOST)
    }, 1000)
})


server.on('request', () => {
    console.log('on request');
})
server.on('close', () => {
    console.log('on close');
})

server.on('connect', (req, clientSocket, head) => {
    console.log('server connect');
})


console.log('cache : %s' ,require.cache);

console.log(require.resolve('./node2'));// F:\2020\express\node2.js
console.log(module.require('./node2'));// 相当于 require('./node2')

const a = require('./node3');
a.on('ready', () => {
    console.log('module "a" is ready');
});

const builtin = require('module').builtinModules
console.log('builtin(返回一个 内置模块的list): %s' ,builtin);
