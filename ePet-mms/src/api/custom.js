import request from '@/utils/requestLocal';
export default {
    getUserList(){
        return request({
            method: "get",
            url:'user/userlist',
        });
    },
    searchUser(obj){
        let str = '';
        for(let key in obj){
            str += key + '=' + `${obj[key]}` + '&'
        }
        str = str.slice(0, -1);
        return request({
            method: "get",
            url:'user/search?'+ str,
        });
    },
    removeUser(id){
        return request({
            method: "delete",
            url:'user/del/'+id,
        });
    }
}