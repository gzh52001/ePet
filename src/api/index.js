import requests from "../utils/requests.js"

export default{
    goodslist(page){
        return requests.get(`/good/goodslist?page=${page}`,{
            parmas:page
        })
    }
}