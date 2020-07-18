import request from '@/utils/requestLocal';
import Reg from '../pages/Reg';
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
    }
}