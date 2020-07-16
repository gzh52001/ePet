import request from '@/utils/request';
export default {
    getData(id,page){
        return request({
            method: "get",
            url:'v3/content/opgc/IndexV3.html?do=GetList&param='+id+'&page='+page+'&pet_type=dog&system=wap&isWeb=1&version=517&distinct_id=1733d43adca48c-0577d2de3a8dff-2076244f-174720-1733d43adcb396',
        });
    }
}