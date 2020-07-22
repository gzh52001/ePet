const express = require('express');
//引入mysql方法，做数据库的查询
const query = require("../../db/mysql");
const router = express.Router();//router==app

// * 商品管理 goodsRouter.js
//             * 商品信息列表
//             * 查询gid为xx的商品
//             * 修改gid为xx的商品信息
//             * 删除gid的商品
//             * 删除多个商品
//             * 新增商品
//             * 
//     * 三个表
//         * 商品信息表：存商品信息 包含商铺信息;爬虫准备的数据
//         * 用户信息表：注册
//         * 订单表:加入购物车

//查询商品信息分类的 goodslist e宠
router.get("/goodslist", async (req, res) => {
    let { page } = req.query;
    page = page || 1;
    let size = 10;
    let index = (page - 1) * size;
    try {
        let sql = `SELECT * FROM goodslist LIMIT ${index},${size}`;
        let p = await query(sql);//[{},{}]
        let sql2 = `SELECT * FROM goodslist`;
        let arr = await query(sql2);//所有的数据 []
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
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
});







//查询ha数据库的数据
router.get("/goodslists", async (req, res) => {
    let { page } = req.query;
    page = page || 1;
    let size = 643;
    let index = (page - 1) * size;
    try {
        let sql = `SELECT * FROM nextha LIMIT ${index},${size}`;
        let p = await query(sql);//[{},{}]
        let sql2 = `SELECT * FROM nextha`;
        let arr = await query(sql2);//所有的数据 []
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
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
});
//查询goods数据库分页
router.get("/goodslistss", async (req, res) => {
    let { page } = req.query;
    page = page || 1;
    let size = 10;
    let index = (page - 1) * size;
    try {
        let sql = `SELECT * FROM goods LIMIT ${index},${size}`;
        let p = await query(sql);//[{},{}]
        let sql2 = `SELECT * FROM goods`;
        let arr = await query(sql2);//所有的数据 []
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: p
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
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
//用id查询商品信息
router.get("/goodlist/", async (req, res) => {
    let {code,name,spec} = req.query
    console.log(req.query.searchMap)
    try {
        let sql = `SELECT * FROM goods WHERE CODE="${code}" AND NAME="${name}" AND spec="${spec}"`;
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
//删除指定goodsid的数据
router.delete("/goodsdel/:id", async (req, res) => {
    let id = req.params.id
    try {
        let sql = `DELETE FROM goods WHERE goodsid=${id}`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "删除成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "删除失败"
            }
        }
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
//删除多个商品
router.delete("/goodsdelall/", async (req, res) => {
    let idstr = req.body.ids
    try {
        let sql = `DELETE FROM goods WHERE goodsid in(${idstr})`
        let p = await query(sql)
        let inf = {}
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "删除成功"
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "删除失败"
            }
        }
        res.send(inf)
    } catch (err) {
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf)
    }
})
//修改商品信息
router.put("/goodsedit/:id", async (req, res) => {
    let obj = req.body.data.form
    console.log(obj)
    let str = ""
    for (let key in obj) {
        str += key + "=" + `"${obj[key]}"` + ","
    }
    str = str.slice(0, -1)
    console.log(str)
    let id = req.params.id
    try {
        let sql = `UPDATE goods SET ${str} WHERE goodsid=${id}`
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
// 新增商品
router.post("/goodsadd", async (req, res) => {
    let { code, name, purchasePrice, retailPrice, spec, storageNum, supplierName } = req.body.data;
    try {
        let sql = `INSERT INTO goods (name,code,spec,retailPrice,purchasePrice,storageNum,supplierName) VALUES('${name}','${code}','${spec}','${retailPrice}','${purchasePrice}','${storageNum}','${supplierName}');`;
        let p = await query(sql);
        let inf = {}
        // console.log(p)
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
//查询goodslist
router.get("/goodslist/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    try {
        let sql = `SELECT * FROM goodlist WHERE goodsid=${id}`;
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
// 添加进购物车
router.post("/shoplist", async (req, res) => {
    let { goodsid, shopid, shopname, goodname, goodpirce, goodimg, goodnum, goodstock, uid } = req.body.data.list;
    console.log(req.body.data.list)
    try {
        let sql = `INSERT INTO shopcar (goodsid,shopid,shopname,goodname,goodpirce,goodimg,goodnum,goodstock,uid) VALUES('${goodsid}','${shopid}','${shopname}','${goodname}','${goodpirce}','${goodnum}','${goodimg}','${goodstock}','${uid}');`;
        let p = await query(sql);
        let inf = {}
        // console.log(p)
        if (p.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: "新增成功",
                data:{
                    p
                }
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: "新增失败"
            }
        }
        console.log(p)
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
//查询购物车 用id查
router.get("/shoplist/:id", async (req, res) => {
    let id = req.params.id
    // console.log(id)
    try {
        let sql = `SELECT * FROM shopcar WHERE uid=${id}`;
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
module.exports = router;