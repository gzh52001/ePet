import { createStore } from "redux"
// import goodApi from "../api/index"
let initState = {
    goodslist: [],
    totalPrice: 0,
    isShow: false
}


 //购物车商品列表初始化
//  let goodsd = []
//  let uid = localStorage.getItem("ep-uid")
//  let n = goodApi.getshoplist(uid).then(resa => {
//      let list = []
//      console.log(resa)
//      if (resa.data.flag) {
//          for (let i = 0; i < resa.data.data.p.length; i++) {
//              list.push(resa.data.data.p[i])
//          }
//          for (let i = 0; i < list.length; i++) {
//              goodsd = list[i]
//              store.dispatch({
//                  type: 'addshop',
//                  goods: {
//                      gid: goodsd.gid,
//                      goodname: goodsd.goodname,
//                      goodprice: goodsd.goodprice,
//                      goodimgurl: goodsd.goodimgurl,
//                      goodqty: goodsd.goodqty,
//                      goodtitle: goodsd.goodtitle,
//                      uid: localStorage.getItem("ep-uid"),
//                      goodcheck: goodsd.goodcheck
//                  }
//              });
//          }
//      }
//  })

function reducer(state = initState, action) {
    switch (action.type) {
        case "addshop":
            return {
                ...state,
                goodslist: [action.goods, ...state.goodslist]
            }
        case "removeshop": {
            console.log(action)
            return {
                ...state,
                goodslist: state.goodslist.filter(item => item.gid != action.gid)
            }
        }
        case "clear": {
            return {
                ...state,
                goodslist: []
            }
        }
        case "changqty": {
            let qty = action.gid
            action.gid = action.goodqty
            action.goodqty = qty
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.gid === action.gid) {
                        item.goodqty = action.goodqty
                    }
                    return item
                })
            }
        }
        case "changqtys":{
            // console.log(action)
            return {
                ...state,
                goodslist: state.goodslist.map(item => {
                    if (item.gid === action.gid) {
                        item.goodqty = item.goodqty + action.goodqty
                    }
                    return item
                })
            }
        }
        case "checks" :{
            // let check = action.gid
            // action.gid = action.goodcheck
            // action.goodcheck = check
            return{
                ...state,
                goodslist : state.goodslist.map(item =>{
                    if(item.gid === action.gid){
                        item.goodcheck = action.goodcheck
                    }
                    return item
                })
            }
        }
        case 'SHOW':
            return{
                ...state,
                isShow:true
            }
        case 'HIDE':
            return{
                ...state,
                isShow:false
            }
        default: {
            return state
        }
    }
}

let store = createStore(reducer)

export default store