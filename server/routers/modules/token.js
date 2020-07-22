let jwt = require('jsonwebtoken'); //引入插件

/*
    功能：
        * 生成token：秘钥，失效时间
        * 校验token：token
*/

// 秘钥
let secret = 'siaa';

function create(data, expiresIn = 60 * 60 * 7){
    //data:就是你要加密的数据
    //expiresIn：失效时间，s为单位  60 * 60 * 7==7小时
    let token = jwt.sign({data}, secret, {expiresIn});
    return token;
}

function verify(token){
    let res;
    try{
        let result = jwt.verify(token,secret);
        res = true;
    } catch (err){
        res = false;
    }
    return res;
}

module.exports = {
    create,
    verify
}