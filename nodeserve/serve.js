const express = require('express');
const AllRouter = require('./routers/index');

const app = express();

app.use(express.static('./'));//静态资源服务器
app.use(AllRouter);//启用主路由

app.listen(6767, () => {
    console.log('服务器已开启，请访问6767的端口');
});