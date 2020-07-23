const express = require('express');
const AllRouter = require('./routers/index')
const app = express();

app.use(express.static('./'));//静态服务器
app.use(AllRouter)

app.listen(6677,function(){
    console.log('6677端口已开启，请访问http://localhost:6677');
})