const express = require('express');
const fs = require('fs')
const assert = require('assert')
const app = express();

// 同步抛出错误，express这样就可以捕获到错误
app.get('/', (req, res) => {
    throw new Error('broken');
    // 但是将 throw new Error 放到try catch 中就Express就捕获不到错误了
    /*try{
        throw new Error('broken')
    }catch(err){
        console.log(err);
    }*/
})
// 异步的  必须将错误用try catch 包起来，否则Express捕获不到这个错误
app.get('/makeerr/:id', function (req, res, next) {
    if(req.params.id === '1') {
        setTimeout(function () {
            try {
                throw new Error('BROKEN')
            } catch (err) {
                next(err)
            }
        }, 100)
    }else {
        res.send('makeerr')
    }

})
app.get('/error/:id', (req, res, next) => {
    console.log(req.params);
    if(req.params.id === '1') {
        setTimeout(function () {
            try {
                throw new Error('BROKEN')
            } catch (err) {
                next(err)
            }
        }, 100)
        /*Promise.resolve().then(() => {
            console.log('promise error');
        }).catch(next)*/
    }else if(req.params.id === '2') {
        fs.readFile('./package.json', (err, data) => {
            if(err){
                res.status(500).send('read file error')
            }
            fs.writeFile('./fake-package.json', data, (err) => {
                if(err) {
                    res.status(500).send('write file error')
                }
                console.log('write file success');
                next('write file success--for test Async Error Handler')
            })
        })
    }if(req.params.id === '3') {
        const mp4_path = 'G:/谷歌浏览器的下载/囧妈.mp4';
        const writePath = 'E:/BaiduNetdiskDownload/尚/1.mp4'
        const rs = fs.createReadStream(mp4_path);
        const ws = fs.createWriteStream(writePath);
        rs.pipe(ws);
        ws.once('drain', (src) => {
            console.log('有数据正通过管道写入');
            // assert.strictEqual(src, rs)
        })
        next('not error 3')
    }else {
        console.log('res send');
        res.send('error')
    }
})


app.get('/readfile', [
    function (req, res, next) {
        fs.readFile('./test.txt', 'utf-8', function (err, data) {
            res.locals.data = data
            next(err)
        })
    },
    function (req, res) {
        res.locals.data = res.locals.data.split(',')[1]
        res.send(res.locals.data)
    }
])

app.listen(3002, ()=> {
    console.log('app is listening at port 3002');
})