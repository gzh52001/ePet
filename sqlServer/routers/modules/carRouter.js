const express = require('express');
//引入query连接数据库用
const query = require("../../db/mysql");
// 挂载路由
const router = express.Router();//router==app

//kaola购物车
// 按用户id添加商品进购物车
router.post("/shoplist", async (req, res) => {
    // 数据解构
    let { id, shop_show, shop_id, shop_name, shop_ok, shop_price, shop_discount, good_id,
        good_name, good_size, good_price, good_ok, good_img, good_num, good_stock, good_discount } = req.body.data.list;

    console.log(req.body.data.list)
    // 处理数据库数据
    try {
        console.log(123)
        let sql = `INSERT INTO shopcarinfo (uid,shop_show,shop_id,shop_name,shop_ok,shop_price,shop_discount,
        good_id,good_name,good_size,good_price,good_ok,good_img,good_num,good_stock,good_discount) VALUES
        ("${id}",${shop_show},"${shop_id}","${shop_name}",${shop_ok},"${shop_price}",${shop_discount}, "${good_id}",
        "${good_name}","${good_size}",${good_price},${good_ok},"${good_img}",${good_num},${good_stock},${good_discount});`;
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
//购物车查询用户购物车订单
router.get("/shoplist/:uid", async (req, res) => {
    let uid = req.params.uid
    console.log(uid)
    try {
        let sql = `SELECT * FROM shopcarinfo WHERE uid=${uid}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '查询成功'
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
// 删除指定的商品    
router.delete("/shoplist", async (req, res) => {
    console.log(req.body);

    let { uid, shop_id, good_id } = req.body;
    try {
        let sql = `DELETE FROM shopcarinfo WHERE good_id = ${good_id} and uid = ${uid} and shop_id = '${shop_id}'`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '查询成功'
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
// 修改商品数量 (完成)
router.put("/shoplist", async (req, res) => {
    let { uid, shop_show, shop_id, shop_ok, shop_price, shop_discount, good_id,
        good_size, good_ok, good_num } = req.body.data;
    console.log(req.body.data)
    console.log(uid);

    try {
        let sql = `UPDATE shopcarinfo SET 
            shop_show = ${shop_show},shop_ok = ${shop_ok},
            shop_price = ${shop_price},shop_discount = ${shop_discount}, 
            good_size = "${good_size}",good_ok = ${good_ok},good_num = ${good_num}
            WHERE good_id = ${good_id} and uid = ${uid} and shop_id = ${shop_id};`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '查询成功'
            }
        }
        console.log(inf);

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

//echong购物车
//按用户id插入数据数据库 添加购物车
router.post("/shoplists", async (req, res) => {
    // 数据解构
    let {uid ,gid ,goodname, goodqty, goodtitle,goodprice,goodimgurl} = req.body.data.data;
    let goodcheck = 0
    // 处理数据库数据
    try {
        let sql = `INSERT INTO shoplist (uid,gid,goodname,goodqty,goodtitle,goodprice,goodimgurl,goodcheck) VALUES (${uid},${gid},'${goodname}',${goodqty},'${goodtitle}',${goodprice},'${goodimgurl}','${goodcheck}');`;
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
//按用户id查询购物车数据
router.get("/shoplists/:uid", async (req, res) => {
    let uid = req.params.uid
    try {
        let sql = `SELECT * FROM shoplist WHERE uid=${uid}`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.length) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
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
// 删除指定的商品  uid gid  
router.delete("/shoplists/remove", async (req, res) => {
    let { uid, gid } = req.body;
    console.log(req.body)
    try {
        let sql = `DELETE FROM shoplist WHERE gid = ${gid} and uid = ${uid}`;
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
// 清空购物车所有商品  uid  
router.delete("/shoplists/clear", async (req, res) => {
    let { uid } = req.body;
    console.log(req.body)
    try {
        let sql = `DELETE FROM shoplist WHERE uid = ${uid}`;
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
// 购物车修改商品数量 uid gid goodqty
router.put("/shoplists/put", async (req, res) => {
    let { uid, gid, goodqty} = req.body.data;
    console.log(req.body.data)
    try {
        let sql = `UPDATE shoplist SET goodqty=${goodqty} WHERE gid = ${gid} and uid = ${uid};`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.affectedRows) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功',
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
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
// 详细页修改商品数量 uid gid goodqty
router.put("/shoplists/puts", async (req, res) => {
    let { uid, gid, goodqty} = req.body.data;
    console.log(req.body.data)
    try {
        let sql = `UPDATE shoplist SET goodqty=goodqty+${goodqty} WHERE gid = ${gid} and uid = ${uid};`;
        let p = await query(sql);//[{},{}]
        let inf = {}
        if (p.affectedRows) {
            //查到数据：查询成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功',
            }
        } else {
            //查不到数据:不能登录
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
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
//详细页查询商品 id
router.post("/detail", async (req, res) => {
        let {gid} = req.body.data
        console.log(gid)
        try {
            let sql = `select * from goodslist where gid='${gid}'`;
            let p = await query(sql);//[{},{}]
            let inf = {}
            if (p.length) {
                //查到数据：查询成功
                inf = {
                    code: 2000,
                    flag: true,
                    message: '查询成功',
                    data: {
                        p
                    }
                }
            } else {
                //查不到数据:不能登录
                inf = {
                    code: 3000,
                    flag: false,
                    message: '没有数据查询失败'
                }
            }
            res.send(inf);
        } catch (err) {
            let inf = {
                code: err.errno,
                flag: false,
                message: '查询失败'
            }
            res.send(inf);
        }
})
module.exports = router;