import request from '@/utils/requestLocal';
export default {
    /* checkname(name){
        return request({
            method: "get",
            url:'user/checkname?name='+name,
        });
    },
    userReg(name,psw){
        return request({
            method: "post",
            url:'user/reg',
            data:{
                name,
                psw
            }
        });
    }, */
    userLogin(username,userpass,keep){//登录
        return request({
            method: "post",
            url:'loginMms/login',
            data:{
                username,
                userpass,
                keep
            }
        });
    },
    checkToken(token){//验证token
        return request({
            method: "get",
            url:'loginMms/verify?token='+token,
        });
    }
}