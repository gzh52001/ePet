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
    },
    indexlist(){
        return request({
            method:"get",
            url:"/v3/index/home.html?pet_type=dog&version=515&is_single=0&isWeb=1&system=wap&distinct_id=17345ad092a5b5-0d80483e030eb6-f7d123e-2073600-17345ad092b64c"
        })
    },
    //详细页
    getgoodslist(gid){
        return request({
            method : "get",
            url:"v3/goods/detail/main.html?do=GetDynamic&gid="+gid+"&extend_pam=buytype%3Adiscount%7Catid%3A27192&version=410&system=wap&isWeb=1&distinct_id=17345ad092a5b5-0d80483e030eb6-f7d123e-2073600-17345ad092b64c&_=1595244386718"
        })
    },
}