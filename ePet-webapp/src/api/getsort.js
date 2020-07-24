import request from '@/utils/request'
export default {
    //获取分类列表
    getSort(pet='dog') {
        return request({
            method: 'get',
            url: `/v3/goods/category/main.html?pet_type=${pet}&version=358&system=wap&isWeb=1&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5&_=1594717224343`,
            
        })
    },
    //获取列表内容
    getGoods(pet='dog',id=88888,isok){
        // if(isok){
        //     return request({
        //         method: 'get',
        //         url: `/v3/goods/category/main.html?do=getChildren&owner=${id}&pet_type=${pet}&issite=true&version=358&system=wap&isWeb=1&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5&_=1594717224612&ishk=${isok}`,
              
        //     })
        // }else{
            return request({
                method: 'get',
                url: `/v3/goods/category/main.html?do=getChildren&owner=${id}&pet_type=${pet}&issite=true&version=358&system=wap&isWeb=1&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5&_=1594717224612`,
              
            })
        // }
               
    },
    //获取商品列表
    getShopList(pet,type,page,id=0,pam){
        return request({
            method: 'get',
            url: `/v3/goods/list/main.html?version=358&brandid=0&page=${page}&orderby=${type}&cateid=${id}&pet_type=${pet}&extend_pam=${pam}&real_wid=&region=&system=wap&isWeb=1&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5&_=1594798554572`,
          
        })
    },
    //获取详情页
    getShop(id){
        return request({
            method: 'get',
            url: `/v3/goods/detail/main.html?gid=${id}&extend_pam=buytype%3A%7Ctid%3A0&version=410&system=wap&isWeb=1&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5&_=1594817003767`,
          
        })
    },
    getDetail(id){//获取详细信息
        return request({
            method: 'get',
            url: `/v3/goods.html?do=getContent&gid=${id}&id=1&system=wap&isWeb=1&version=517&distinct_id=1733cf1c35a315-07fe26a02d6361-5437971-250125-1733cf1c35b4a5`
        })
    },
    getBrand(){//获取品牌
        return request({
            method: 'get',
            url: `/v3/brand/list/main.html?pet_type=dog&system=wap&isWeb=1&version=303&distinct_id=1737bbb6b7c13e-0f0a6df50e04f8-f7d123e-921600-1737bbb6b7e339&_=1595508759653`
        })
    }
}