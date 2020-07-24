const express = require('express');
//引入query连接数据库用
const query = require("../../db/mysql");
// 挂载路由
const router = express.Router();//router==appW

//查询所有订单
router.get("/orderlist", async (req, res) => {
    try {
        let sql = `SELECT * FROM orderlist`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        console.log(p)
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: p
                
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '没有数据查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//删除订单 uid gid
router.delete("/orderlist/remove", async (req, res) => {
    let { uid, gid } = req.body;
    console.log(req.body)
    try {
        let sql = `DELETE FROM orderlist WHERE gid = ${gid} and uid = ${uid}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.affectedRows) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//按用户 商品id 查询订单
router.get("/orderlists", async (req, res) => {
    let { uid, gid } = req.query
    try {
        let sql = `SELECT * FROM orderlist WHERE uid=${uid} and gid=${gid}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: p
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '没有数据查询失败'
            }
        }
        res.send(inf);
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
//根据用户id 商品id更改订单规格
router.put("/orderlists/:id", async (req, res) => {
    let obj = req.body.data.values
    let ordertime = req.body.data.ordertime
    let { uid, gid, goodname, goodprice, goodqty, goodtitle } = obj
    try {
        let sql = `UPDATE orderlist SET goodname="${goodname}",goodprice="${goodprice}",goodqty="${goodqty}",goodtitle="${goodtitle}",ordertime="${ordertime}" WHERE gid="${gid}" and uid="${uid}"`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            flag: false,
            code: err.errno,
            message: "查询失败或超时"
        }
        res.send(inf)
    }
})
//按用户id插入数据数据库 添加订单
router.post("/orderlist/add", async (req, res) => {
    // 数据解构
    let {uid, gid, goodname, goodprice, goodqty, goodtitle} = req.body.data.values;
    let ordertime = req.body.data.ordertime
    // 处理数据库数据
    try {
        let sql = `INSERT INTO orderlist (uid, gid, goodname, goodprice, goodqty, goodtitle,ordertime) VALUES ("${uid}","${gid}",'${goodname}',"${goodqty}",'${goodtitle}',"${goodprice}",'${ordertime}');`;
        // 连接数据库
        let p = await query(sql);
        let inf = {}
        // console.log(p)
        // 连接数据库返回的信息
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "新增成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "新增失败"
            }
        }
        // console.log(p)
        // 输出信息
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})

module.exports = router