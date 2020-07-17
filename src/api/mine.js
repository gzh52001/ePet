
import request from '@/utils/request';
export default {
    getService(){
        return request({
            method: "get",
            url:'/v3/user/UserCenter.html?version=420&system=wap&isWeb=1&distinct_id=1733d43adca48c-0577d2de3a8dff-2076244f-174720-1733d43adcb396',
        });
    }
}