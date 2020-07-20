import requests from "../utils/requests.js"

export default{
    //主页下拉更新
    goodslist(page){
        return requests.get(`/good/goodslist?page=${page}`,{
            parmas:page
        })
    },
    //购物车查询数据
    getshoplist(uid){
        return requests.get(`/shopcar/shoplists/`+uid,{
            parmas:uid
        })
    },
    shoplistput(uid, gid, goodqty){
        return requests.put(`/shopcar/shoplists/put`,{
            data:{
                uid,goodqty,gid
            }
        })
    },
    shoplistremove(uid,gid){
        return requests.delete(`/shopcar/shoplists/remove`,{
            data:{
                uid,gid
            }
        })
    },
    shoplisrclear(uid){
        return requests.delete(`/shopcar/shoplists/clear`,{
            data:{
                uid
            }
        })
    }
}