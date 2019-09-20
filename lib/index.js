#!/usr/bin/env node
 // console.log(process.execPath) node路径
// console.log(__dirname)  当前目录
// console.log(process.cwd())  运行程序的路径
const fs = require('fs')
const path = require('path')
const log = require('../utils/log')
// const http = require('http');
const Koa = require('koa');
const app = new Koa();
const utils = require("../utils/index");
const static = require("koa-static");
const send = require("koa-send");
const liveload = require('./liveload');

utils.portIsOccupied(35729, function (err, port) {
    console.log('port', port);
    if (err) {
        log.error('错误' + err);
        return
    }
    app.use(liveload(process.cwd(), {
        port
        // includes: ['jade'],
        // excludes: ['components']
    }))

})


var argv = require('yargs')
    .alias('p', 'port')
    .alias('n', 'name')
    .argv;
utils.portIsOccupied(argv.p || 3000, function (err, port) {

    if (err) {
        log.error('错误' + err)
        return;
    }
    app.listen(port, function (err) {

        if (err) {
            log.error('错误' + err);
            return;
        }
        log.info('http://127.0.0.1:' + port)
    });
    app.use(async (ctx, next) => {
        // let done = false
        console.log(ctx.url)
        if (ctx.url.includes('.admin')) {
            // console.log('***', ctx.path);
            // console.log(ctx.url);
            // console.log(path.resolve(__dirname, '../www/'))
            // ctx.url =''
            ctx.url = ctx.url.replace('/.admin/', '')
            ctx.path = ctx.url
            console.log('**=',ctx.path);
            let _path = path.resolve(__dirname, '../www/', ctx.path)
            console.log('**=',_path);
            
             ctx.body = fs.readFileSync(_path).toString()
            // done = await send(ctx, ctx.path, {
            //     root: 
            // })
        }else{
            next()
        }
        // if (!done) {
        //     await 
        // }
        // ctx.body = 'aa'

        // console.log(3)
    })
    app.use(static(process.cwd(), {
        extensions: []
    }));
})