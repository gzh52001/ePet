const express = require('express');
//引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const { create, verify } = require('./token-mms');

const router = express.Router();//router==app
//登录
router.post('/login',async (req,res)=>{
    let{username,userpass,keep}=req.body
    try{
        let sql=`SELECT * FROM mms_user WHERE username='${username}' and password='${userpass}'`
        let p=await query(sql)
        let info={}
        if(p.length){
            if(keep){
                token=create(userpass,60*60*12)
            }else{
                token=create(userpass,60*60)
            }
            info={
                code:2000,
                flag:true,
                message:'登录成功',
                data:{
                    username,
                    token
                }
            }
        }else{
            info={
                code:3000,
                flag:false,
                message:'登录失败'
            }
        }
        res.send(info)
    }catch(error){
        let info = {
            code: err.errno,
            flag: false,
            message: '查询失败'
        }
        res.send(info);;
    }
})
//需求:验证token
router.get('/verify', (req, res) => {
    let { token } = req.query;
    let result = verify(token);
    let inf = {};
    if (result) {
        //校验成功
        inf = {
            code: 2000,
            flag: true,
            message: '校验成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '校验失败'
        }
    }
    res.send(inf);
});











module.exports = router;