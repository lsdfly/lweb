#!/usr/bin/env node
 // console.log(process.execPath) node路径
// console.log(__dirname)  当前目录
// console.log(process.cwd())  运行程序的路径
const fs = require('fs')
const log = require('../utils/log')
// const http = require('http');
const Koa = require('koa');
const app = new Koa();
const utils = require("../utils/index");
const serve = require("koa-static");
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
    app.use(serve(process.cwd(), {
        extensions: []
    }));
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
        log.info('http://127.0.0.1:'+port)
    });
})
