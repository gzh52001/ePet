import request from '@/utils/requestLocal';
export default {
    //获取数据
    getgood(page){
        return request({
            method:'get',
            url:'goodsMms/goodlist?page='+page,
        })
    },
    //添加数据
    addgood(obj){
        let{name,price,images}=obj
        return request({
            method:'post',
            url:'goodsMms/addGoods',
            data:{
                name,
                price,
                images,
            }
        })
    },
    //修改数据
    changegood(id,obj){
        let{name,price,images}=obj
        return request({
            method:'put',
            url:'goodsMms/edit/'+id,
            data:{
                name,
                price,
                images,
            }
        })
    },
    //删除数据
    delgood(id){
        return request({
            method:'delete',
            url:`goodsMms/del/${id}`,
        })
    },
    //查询数据
    search(id,name){
        return request({
            method:'get',
            url:`goodsMms/search?id=${id}&name=${name}`,
        })
    }
}