const express = require('express');
const compression = require('compression')
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express();

app.use(compression());
app.use(express.static('./',{maxAge:60*60*24*1000}))

app.use('/api',createProxyMiddleware({
    target: "https://mall.api.epet.com",
    changeOrigin: true,
    pathRewrite: {"^/api" : "/"}
}))

app.use('/local',createProxyMiddleware({
    target: "http://localhost:6677",
    changeOrigin: true,
    pathRewrite: {"^/local" : "/"}
}))

app.use((req,res)=>{
    const content = fs.readFileSync('./index.html')
    res.set('Content-Type','text/html;charset=utf-8')
    res.send(content.toString())
})

app.listen(6767,()=>{
    console.log("localhost:6767已开启");
})