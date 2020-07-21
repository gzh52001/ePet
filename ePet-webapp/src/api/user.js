import request from '@/utils/requestLocal';
export default {
    checkname(name){
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
    },
    userLogin(name,psw,keep){
        return request({
            method: "post",
            url:'user/login',
            data:{
                name,
                psw,
                keep
            }
        });
    },
    checkToken(token){
        return request({
            method: "get",
            url:'user/verify?token='+token,
        });
    },
    getUserInfo(uid){
        return request({
            method: "get",
            url:'user/info?uid='+uid,
        });
    },
    changeInfo(uid,obj){
        return request({
            method: "put",
            url:'user/edit/' + uid,
            data:{
                obj
            }
        });
    }
}