//引入express开启静态资源服务器
const express = require('express');
const router = express.Router();//router==app
// 引入json解析中间件
var bodyParser = require('body-parser');

// 添加json解析
router.use(bodyParser.json());//转json数据的 {"key":"value","key":"value"}
router.use(bodyParser.urlencoded({ extended: false }));//转键值对数据 key=value&key=value

//导入子路由
/* const usersRouter = require('./modules/usersRouter');//用户管理的接口
const goodsRouter = require('./modules/goodsRouter');//商品管理的接口
const uploadRouter = require('./modules/upload');//上传图片的接口
 */
const userRouterMms = require('./modules/userRouter-mms.js')
const goodsRouterMms = require('./modules/Goods-mms.js')
//CORS跨域：方便和小伙伴共享接口：加上这段话，再设置防火墙，别人就可以访问你的接口了(记得保证服务器开启)
//把这个路由配置放在所有路由的前面，方便调用next操作
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") { //特殊请求：发送了请求头的那些请求
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
})
router.use('/loginMms', userRouterMms);
router.use('/goodsMms', goodsRouterMms);
/* //use无论是什么请求都可以进入
router.use('/user', usersRouter);//启用子路由:use里面的函数是中间件
//中间件本质上是函数，但是函数不一定是中间件 (req, res, next)
router.use('/good', goodsRouter);//启用子路由
router.use('/upload', uploadRouter);//启用子路由 */
module.exports = router