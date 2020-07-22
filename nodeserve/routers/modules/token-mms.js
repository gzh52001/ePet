let jwt = require('jsonwebtoken');//引入插件

/*
    功能：
        * 生成token : 秘钥、失效时间
        * 校验token ：token
*/

//秘钥：秘钥如果想更加安全，可以再加密一次
let secret = 'K5';

//创建token
function create(data, expiresIn) {
    //data:加密的数据
    //expiresIn：失效时间，s为单位 
    let token = jwt.sign({ data }, secret, { expiresIn });
    return token;
}

// 校验token
function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}

module.exports = {
    create,
    verify
}
