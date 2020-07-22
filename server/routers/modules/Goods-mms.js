const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const { request } = require('express');
const router = express.Router();//router==app

/* 获取数据 */
router.get('/goodlist', async (req, res) => {
    let { page } = req.query;
    page = page || 1;
    //SELECT * FROM userinf LIMIT 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * 10;
    try {
        let sql = `SELECT * FROM mms_goods LIMIT ${index},10`;
        let p = await query(sql);//[{},{}]
        let sql2 = `SELECT * FROM mms_goods`;
        let arr = await query(sql2);//所有的数据 []
        let inf = {};
        if (p.length) {
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: arr.length,
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
/* 添加数据 */
router.post('/addGoods',async (req,res)=>{
    let{name,price,images}=req.body
    try{
        let sql=`INSERT INTO mms_goods (name,price,images) VALUES('${name}','${price}','${images}')`;
        let sidarr= await query(sql)
        let inf ={}
       if (sidarr.affectedRows) {
            inf = {
                code: 2000,
                flag: true,
                message: '添加成功'
            };
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '添加失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
})
/* 修改数据 */
router.put('/edit/:id', async (req, res) => {
    let{name,price,images}=req.body
    let id = req.params.id;//获取商品id
    console.log('asdasd');
    try {
        let sql = `UPDATE mms_goods SET name='${name}' , price='${price}', images='${images}' WHERE id=${id}`;
        let p = await query(sql);//[{},{}]
        let inf = {};
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
/* 删除数据 */
router.delete('/del/:id', async (req, res) => {
    let id = req.params.id;//获取id
    try {
        let sql = `DELETE FROM mms_goods WHERE id=${id}`;
        let p = await query(sql);//[{},{}]
        let inf = {};
        if (p.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        } else {
            //删除失败
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
});
/* 查询数据 */
router.get('/search', async (req, res) => {
    let {id,name}=req.query
    try {
        let sql = `SELECT * FROM mms_goods WHERE id='${id}' or name='${name}'`;
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
});



module.exports = router;