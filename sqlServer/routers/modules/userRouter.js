const express = require('express');
// 引入mysql方法，做数据库的查询
const query = require('../../db/mysql');
const { create,verify } = require('./token');

const router = express.Router();

/*
    * 用户管理 usersRouter.js
        * 验证用户名是否存在 *
        * 注册 * 
        * 登陆 *
        * 验证token *
        * 获取用户信息
        * 修改信息
        * 删除用户 * 后台
        * 删除多个用户
        * 查询用户列表(分页)
        * 查询uid为xx的用户信息
        * 上传用户头像 * 
*/

// 验证用户名是否存在  /user/checkname
router.get('/checkname', async (req, res) => {
    let { name } = req.query
    try{
        let sql = `SELECT * FROM user WHERE username='${name}'`;
        let p = await query(sql);
        // console.log('p',p);
        let info = {}
        if(p.length){
            info = {
                code:300,
                flag:false,
                message: '该用户名已存在' 
            }
        } else{
            info = {
                code:200,
                flag:true,
                message: '可以注册'
            }
        }
        res.send(info);
    }catch(err){
        // console.log(err);
        let info = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(info)
    }
})

// 注册  /user/reg
router.post('/reg', async (req,res)=>{
    let { name, psw } = req.body;
    try{
        let sql = `INSERT INTO user(username, userpass) VALUES('${name}','${psw}')`;
        let p = await query(sql);
        let info = {}
        if(p.affectedRows){
            info = {
                code: 200,
                flag: true,
                message: '注册成功'
            }
        } else{
            info = {
                code: 300,
                flag: false,
                message:'注册失败'
            }
        }
        res.send(info)
    } catch(err){
        let info = info = {
            code: 500,
            flag: false,
            message:'服务器出错'
        }
        res.send(info)
    }
})

// 登录 /user/login
router.post('/login', async (req, res) => {
    let { name, psw, keep } = req.body;
    try{
        let sql = `SELECT *FROM user WHERE username='${name}' and userpass='${psw}'`;
        let p = await query(sql);
        // console.log(p[0].uid);
        let info = {}
        if(p.length){
            let token = '';
            if(keep == 'true'){
                // 保留七天
                token = create(psw, 60 * 60 * 24 * 7)
            }else{
                token = create(psw)
            }
            info = {
                code: 200,
                flag: true,
                message: '登录成功',
                data: {
                    uid:p[0].uid,
                    username:p[0].username,
                    token
                }
            }
        }else{
            info = {
                code: 300,
                flag: false,
                message: '登录失败'
            }
        }
        res.send(info)
    }catch(err){
        let info =  {
            code: 500,
            flag: false,
            message: '服务器出错'
        }
        res.send(info)
    }
})

// 验证token
router.get('/verify', (req, res) => {
    let { token } = req.query;
    let result = verify(token);
    let info = {};
    if(result) {
        info = {
            code: 200,
            flag: true,
            message: '校验成功'
        }
    } else{
        info = {
            code: 300,
            flag: false,
            message: '校验失败'
        }
    }
    res.send(info)
})

// 获取用户信息
router.get('/info', async (req, res) =>{
    let { uid } = req.query
    let info = {}
    try{
        let sql = `SELECT * FROM user WHERE uid='${uid}'`
        let p = await query(sql);
        // console.log(p);
        if(p.length){
            info={
                code: 200,
                flag: true,
                message: '查询成功',
                data:{
                    uid:p[0].uid,
                    username:p[0].username,
                    gender: p[0].gender,
                    age: p[0].age,
                    feedtime: p[0].feedtime,
                    avatar: p[0].avatar
                }
            }
        }else{
            info={
                code: 300,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(info)
    }catch(err){
        let info = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(info)
    }

})

// 修改信息
router.put('/edit/:uid', async (req, res) => {
    let {obj} = req.body;
    let str = '';
    for(let key in obj){
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0, -1);
    let id = req.params.uid;

    try{
        let sql = `UPDATE user SET ${str} WHERE uid=${id}`;
        let p = await query(sql);
        let info = {};
        console.log(p);
        if(p.affectedRows){
            info = {
                code: 200,
                flag: true,
                message: '修改成功'
            }
        }else{
            info = {
                code: 300,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(info)
    }catch(err){
        // console.log(err);
        let info = {
            code: 500,
            flag: false,
            message: '查询失败'
        }
        res.send(info);
    }
})

// 后台管理系统：查询用户列表
router.get('/userlist', async (req, res)=>{
    let { page, size } = req.query;
    page = page || 1;
    size = size || 5;
    //SELECT * FROM userinf LIMIT 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * size;

    try{
        let sql = `SELECT uid, username, gender, age, feedtime, avatar FROM user LIMIT ${index},${size}`;
        let p = await query(sql);
        let sql2 = `SELECT uid, username, gender, age, feedtime, avatar FROM user`;
        let arr = await query(sql2);
        let info = {};
        if(p.length){
            info = {
                code: 200,
                flag: true,
                message: '查询成功',
                total: arr.length,
                page,
                size,
                data: arr
            }
        }else{
            info = {
                code: 300,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(info)
    }catch(err){
        let info = {
            code: 500,
            flag: false,
            message: '服务器出错'
        }
        res.send(info)
    }
})

// 后台管理系统：查询某一或某些条件用户列表
router.get('/search', async (req, res)=>{
    let obj = req.query;
    console.log(obj);
    let str = '';
    for(let key in obj){
        str += key + '=' + `'${obj[key]}'` + 'and '
    }
    str = str.slice(0, -4);
    try{
        let sql = `SELECT uid, username, gender, age, feedtime, avatar FROM user WHERE ${str}`
        let p = await query(sql);
        console.log(p);
        let info ={}
        if(p.length){
            info = {
                code: 200,
                flag: true,
                message: '查询成功',
                data:p
            }
        }else{
            info = {
                code: 300,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(info);
    }catch(err){
        console.log(err);
        let info = {
            code: 500,
            flag: false,
            message: '服务器出错'
        }
        res.send(info);
    }
})

// 后台管理系统：删除用户
router.delete('/del/:uid', async (req, res) => {
    console.log(req.params);
    let id = req.params.uid;
    try{
        let sql = `DELETE FROM user WHERE uid=${id}`
        let p = await query(sql);
        console.log(p);
        let info = {}
        if(p.affectedRows){
            info = {
                code: 200,
                flag: true,
                message: '删除成功'
            }
        }else{
            info = {
                code: 300,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(info)
    }catch(err){
        let info = {
            code: 500,
            flag: false,
            message: '服务器出错'
        }
        res.send(info)
    }
})
module.exports = router;