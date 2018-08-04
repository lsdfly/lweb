#!/usr/bin/env node
 // console.log(process.execPath) node路径
// console.log(__dirname)  当前目录
// console.log(process.cwd())  运行程序的路径
const fs = require('fs')
const path = require('path')
// const http = require('http');
const Koa = require('koa');
const app = new Koa();
const  serve = require("koa-static");
const liveload = require('./liveload');
app.use(liveload(process.cwd(), {
  // includes: ['jade'],
  // excludes: ['components']
}))
app.use(serve(process.cwd(),{ extensions: []}));


const utils = require('../utils')
console.log(utils.getIPAdress())
var argv = require('yargs')
    .alias('p', 'port')
    .alias('n', 'name')
    .argv;
let port = argv.p || 3000;
app.listen(port);

/*
const server = http.createServer((req, res) => {
    let _path;
    let url = req.url;
    console.log(req.url.startsWith('/config'))
    if(req.url.startsWith('/config')){
        _path = path.join(__dirname, '../www/'+url.replace('/config',''));
        console.log(_path)
    //   return;
    }else{
        _path = path.join(process.cwd(), url);
    }

    _path = _path.split('?')[0];
    // url = url=='/'?'index.html':url
    console.log('请求文件:', url)
    // let _path = path.join(process.cwd(), url);
    // console.log(utils.isDir(_path))
    // console.log(utils.isFile(_path))
    if (fs.existsSync(_path)) {
      
        let body = '';
        if (utils.isFile(_path)) {
            console.log('文件');
            body = fs.readFileSync(_path);
        } else {
            let list = fs.readdirSync(_path, { encoding: 'utf8' });
            for (let i = 0; i < list.length; i++) {
                if (utils.isFile(path.join(_path, list[i]))) {
                    body += `<div><a href="${url}${list[i]}">${list[i]}</a></div>`
                } else {
                    body += `<div><a href="${url}${list[i]}/">${list[i]}</a></div>`
                }

            }
        }
        res.write(body);
    } else {
        console.log('404', req.url)
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write('404');
    }
    res.end();
}).listen(port);
server.on("listening", (a) => {
    console.log('成功启动', port)
    console.log('http://' + utils.getIPAdress() + ':' + port)
    console.log('http://127.0.0.1:' + port)
    console.log('http://localhost:' + port)
    utils.open('http://' + utils.getIPAdress() + ':' + port)
})
server.on('error', (err) => {
    if (err.code == 'EADDRINUSE') {
        console.log(`端口${port}被占用`);
    } else {
        console.log(err);
    }
})*/