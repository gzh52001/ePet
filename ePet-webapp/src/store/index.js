import { createStore } from "redux"

let initState = {
    goodslist: [],
    totalPrice: 0,
    isShow: false
}


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