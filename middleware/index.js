const express = require('express')
const app = express();
let r1 = express.Router()
r1.get('/cat', (req, res, next)=> {
    console.log('cat');
    setTimeout(()=> {
        console.log(132);
    })
    next()
})
r1.get('/cat', (req, res) => {
    res.send('cat cat')
})

let r2 = express.Router()
r2.get('/dog', (req, res, next) => {
    console.log('pig-dog');
    next();
})
r2.get('/dog', (req, res, next) => {
    console.log('dog');
    res.send('dog dog')
})
app.use(r1, r2);// 相当于 app.use('/', r1); app.use('/', r2)

let httpListen = app.listen(3001, () => {
    const httpInfo = httpListen.address();
    console.log(`app listening at port ${httpInfo.port}`);
})

