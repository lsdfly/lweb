const childProcess = require('child_process');
const fs = require('fs');


// export  function getIPAdress(all) {
//     var address = [];
//     var interfaces = require('os').networkInterfaces();
//     for (var devName in interfaces) {
//         var iface = interfaces[devName];
//         for (var i = 0; i < iface.length; i++) {
//             var alias = iface[i];
//             if (all) {
//                 address.push(alias.address);
//             } else {
//                 if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//                     return alias.address;
//                 }
//             }
//         }
//     }
//     return address;
// }

// export  function isWin() {
//     return process.platform == 'win32'
// }

// export  function open(url) {
//     console.log(process.platform)
//     if (isWin()) {
//         childProcess.spawn('cmd.exe', ['/c', 'start', 'chrome', url])
//     } else {
//         childProcess.spawn('start', ['chrome', url]);
//     }

//     // cmd.exe /c start chrome http://www.baidu.com
// }
// export function isFile(path){  
//     return exists(path) && fs.statSync(path).isFile();  
// }  
class utils{
    getIPAdress(all){
        var address = [];
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (all) {
                    address.push(alias.address);
                } else {
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
        }
        return address;
    }
    isWin(){
        return process.platform == 'win32'
    }
    open(url){
        // console.log(process.platform)
        // if (this.isWin()) {
        //     childProcess.spawn('cmd.exe', ['/c', 'start', 'chrome', url])
        // } else {
        //     childProcess.spawn('start', ['chrome', url]);
        // }
    
    }
    exists(_path){  
        return fs.existsSync(_path) || path.existsSync(_path);  
    }  
    isFile(_path){
        return this.exists(_path) && fs.statSync(_path).isFile();  
    }
    isDir(_path){
        return this.exists(_path) && fs.statSync(_path).isDirectory();  
    }
}
module.exports =new utils();
