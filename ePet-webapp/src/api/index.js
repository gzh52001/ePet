import requests from "../utils/requestLocal"

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
    //购物车修改商品
    shoplistput(uid, gid, goodqty){
        return requests.put(`/shopcar/shoplists/put`,{
            data:{
                uid,goodqty,gid
            }
        })
    },
    //详细页修改商品
    shoplistputs(uid, gid, goodqty){
        return requests.put(`/shopcar/shoplists/puts`,{
            data:{
                uid,goodqty,gid
            }
        })
    },
    //购物车删除商品
    shoplistremove(uid,gid){
        return requests.delete(`/shopcar/shoplists/remove`,{
            data:{
                uid,gid
            }
        })
    },
    //购物车清空商品
    shoplisrclear(uid){
        return requests.delete(`/shopcar/shoplists/clear`,{
            data:{
                uid
            }
        })
    },
    //详细页添加商品
    addshoplist(data){
        return requests.post(`/shopcar/shoplists`,{
            data:{
                data
            }
        })
    }
}