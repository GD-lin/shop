var express = require('express');
var proxy = require('http-proxy-middleware');

//http://vue.studyit.io/api/getlunbo
var options = {
         target: 'http://vue.studyit.io', // 目标服务器 host
         changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
         ws: true,                         // 是否代理websockets
         pathRewrite: {
             '^/api/old-path' : '/api/new-path'     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
         },
         router: {
            // 如果请求主机 == 'dev.localhost:3000',
             // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
             'dev.localhost:3000' : 'http://localhost:8000'
         }
    };
 
 // 创建代理
var exampleProxy = proxy(options);
 
 // 使用代理
 var app = express();
     app.use('/api', exampleProxy);
     app.listen(3000);