import request from "../utils/request"

export default {
    //查询数据
    getorder(){
        return request.get("/order/orderlist")
    },
    //删除订单
    orderremove(uid,gid){
        return request.delete("/order/orderlist/remove",{
            data:{
                uid,gid
            }
        })
    },
    //查询个别用户订单
    orderlistid(uid,gid){
        return request.get("/order/orderlists",{
            params:{
                uid,gid
            }
        })
    },
    //修改订单
    orderlistput(values,gid,ordertime){
        return request.put("/order/orderlists/"+gid,{
            data:{
                values,
                ordertime
            }
        })
    },
    //新增订单
    addorderlist(values,ordertime){
        return request.post("order/orderlist/add",{
            data:{
                values,
                ordertime
            }
        })
    }
}