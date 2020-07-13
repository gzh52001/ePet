import request from '@/utils/request'
export default {
    getList(){
        return request({
            method: "get",
            url:'/v3/content/opgc/IndexV3.html?do=GetList&param=0&page=1&pet_type=dog&system=wap&isWeb=1&version=517&distinct_id=1733c96c864869-0f34bc2e8b7e54-f7d123e-921600-1733c96c86560d',
        });
    },
    getSort(){
        return request({
            method:'get',
            url:'/v3/goods/category/main.html?do=getChildren&owner=88888&pet_type=dog&issite=true&version=358&system=wap&isWeb=1&distinct_id=1733c96c864869-0f34bc2e8b7e54-f7d123e-921600-1733c96c86560d&_=1594456516972'
        })
    }
}