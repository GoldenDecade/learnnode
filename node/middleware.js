const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
    console.log('url: %s', req.url);
    next();
}
// app.use(myLogger)
app.get('/', (req, res) => {
    res.send('If myLogger is loaded after the route to the root path, the request never reaches it and the app doesn’t print “LOGGED”, because the route handler of the root path terminates the request-response cycle.')
})

// app.use('/middleware/:mwname', myLogger)

app.get('/middleware/:mwname', (req, res) => {
    res.send('this is after middleware')
})

let httpListen = app.listen(3000, () => {
    const httpInfo = httpListen.address();
    console.log(`app listening at port ${httpInfo.port}`);
})

//------------------------------

app.use('/user/:id', (req, res, next) => {
    console.log('Request originalUrl : %s', req.originalUrl);
    if(req.params.id === '23') {
        next('route');
    }else {
        next();
    }
}, (req, res, next) => {
    console.log('Request Type : %s', req.method);
    // next();
    res.send('提前end')
})

app.get('/user/:id', (req, res)=> {
    res.send(`/user/:id  req.params: ${JSON.stringify(req.params)}`)
})
//-----next('route') 只能再app.get app.post 等方法中使用--------------------------
app.get('/mon/:id', (req, res, next) => {
    req.params.id === '23' ? next('route') : next();
}, (req, res, next) => {
    console.log('req.url, %s', req.url);
    next();
}, (req, res) => {
    res.send(`next('route') 只能再app.get app.post 等方法中使用`)
})

app.get('/mon/:id', (req, res) => {
    res.send(`next('route') 之后，不会再调用当前app.get('/mon/:id'),会跳出去调用另一个匹配的app.get('/mon/:id'`)
})


var router = express.Router()
router.use((req, res, next) => {
    console.log('router');
    if(!req.headers['x-auth']) {
        console.log(`next('router')`);
        return next('router')
    }else {
        return next()
    }
}, (req, res, next) => {
    console.log('url : %s', req.url);
    next();
})

router.get('/', (req, res) => {
    res.send('hello bird')
})
router.get('/name', (req, res) => {
    res.send('bird name')
})
// 如果跳出router的中间件，直接会来到这里的回调函数
app.use('/bird', router, (req, res) => {
    res.sendStatus(401)
});

// Error-handling middleware 必须是4个参数
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke')
})


app.use('/static', express.static('./staticdir', {
    dotfiles: 'allow',// 对于以.开头的文件  如何处理  allow  deny(403) ignore(404)
    // fallthrough: true,// true 可以允许多个文件夹指向同一个地址
    extensions: ['htm', 'html'], // 暂时没有起到作用
    immutable: false,
    // index: false,

}));
app.use('/static', express.static('./staticdir1', {
    dotfiles: 'ignore',
    // fallthrough: true,
    extensions: ['htm', 'html']
}));
