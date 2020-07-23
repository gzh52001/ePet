import React, { Component } from 'react';
import { LeftOutlined, MessageOutlined, HomeOutlined, CopyOutlined, ShoppingCartOutlined, GithubOutlined } from "@ant-design/icons"
import "./index.scss"
import { Checkbox, InputNumber, Button, Modal } from 'antd'
import { connect } from "react-redux"
import store from "../../store"
import goodApi from "../../api/index"


class Cart extends Component {
    constructor() {
        super()
        this.state = {
            isclose: false,
            useridclose: false,
            visible: false,
            allcheck: false,
            ischeck: false,
            pirce:0,
            qty:0,
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        console.log(localStorage.getItem("ep-username"))
        let username = localStorage.getItem("ep-username")
        if (username) {
            this.setState({
                useridclose: true
            })
        }
        console.log(this.state.useridclose)
    }
    //全选反选
    allchecked = () => {
        if (this.state.allcheck) {
            this.setState({
                allcheck: false,
            })
            this.props.cardlist.map(item =>{
                let goodcheck = 0
                let gid = item.gid
                store.dispatch({
                    type:"checks",
                    gid,
                    goodcheck
                })
            })
            this.allprice()
        } else {
            this.setState({
                allcheck: true,
            })
            this.props.cardlist.map(item =>{
                let goodcheck = 1
                let gid = item.gid
                store.dispatch({
                    type:"checks",
                    gid,
                    goodcheck
                })
            })
            this.allprice()
        }

    }
    //复选
    ischecked = (item, e) => {
        this.props.cardlist.map(itm => {
            if (itm.gid == item.gid) {
                let gid = itm.gid
                if (itm.goodcheck === 0) {
                    let goodcheck = 1
                    store.dispatch({
                        type: "checks",
                        gid,
                        goodcheck
                    })
                    let allchecklength = this.props.cardlist.filter(i =>{
                        return i.goodcheck == 1
                    })
                    if(allchecklength.length === this.props.cardlist.length){
                        this.setState({
                            allcheck : true
                        })
                    }else{
                        this.setState({
                            allcheck : false
                        })
                    }
                    this.allprice()
                }else{
                    let goodcheck = 0
                    store.dispatch({
                        type: "checks",
                        gid,
                        goodcheck
                    })
                    let allchecklength = this.props.cardlist.filter(i =>{
                        return i.goodcheck == 1
                    })
                    if(allchecklength.length === this.props.cardlist.length){
                        this.setState({
                            allcheck : true
                        })
                    }else{
                        this.setState({
                            allcheck : false
                        })
                    }
                    this.allprice()
                }
            }
        })
    }
    //清空购物车时候触发的提示框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //确认删除全部商品
    handleOk = e => {
        let uid = localStorage.getItem("ep-uid")
        let p = goodApi.shoplisrclear(uid).then(res => {
            console.log(res)
        })
        store.dispatch({
            type: "clear"
        })
        this.setState({
            visible: false,
        });
        this.allprice()
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    
    //修改数量
    onChange(value, gid) {
        let uid = localStorage.getItem("ep-uid")
        let goodqty = value
        let p = goodApi.shoplistput(uid, goodqty, gid).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        store.dispatch({
            type: "changqty",
            gid,
            goodqty
        })
        this.allprice()
        // console.log(value,uid,gid)
    }
    //删除指定商品
    removegoods = (gid) => {
        let uid = localStorage.getItem("ep-uid")
        let p = goodApi.shoplistremove(uid, gid).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        store.dispatch({
            type: "removeshop",
            gid,
        })
        this.allprice()
    }
    //隐藏nav开关
    openbox = () => {
        if (this.state.isclose) {
            this.setState({
                isclose: false
            })
        } else {
            this.setState({
                isclose: true
            })
        }
    }
    //路由跳转
    gohome = () => {
        this.props.history.push("/home")
    }
    // gohome2 = () =>{
    //     this.props.history.push("/home")
    // }
    //计算价格数量
    allprice = ()=>{
        let length = this.props.cardlist.filter(i =>{
            return i.goodcheck == 1
        })
        let pirces = length.reduce((prev, item, idx, arr) => prev + item.goodprice * item.goodqty, 0)
        let qtys = length.reduce((prev, i, idx, arr) => prev +  i.goodqty, 0)
        this.setState({
            pirce : pirces,
            qty : qtys
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <div className="shophead">
                    <div className="shophead-left" onClick={()=>{
                        this.props.history.go(-1)
                    }}><LeftOutlined /></div>
                    <div className="shophead-text">购物车</div>
                    <div className="shophead-right" onClick={this.openbox}><MessageOutlined /></div>
                </div>
                <div className="shopnav" style={this.state.isclose ? { display: "block" } : { display: "none" }}>
                    <a href="#home">
                        <HomeOutlined />
                        <h3>首页</h3>
                    </a>
                    <a href="#sort">
                        <CopyOutlined />
                        <h3>商品分类</h3>
                    </a>
                    <a href="#cart">
                        <ShoppingCartOutlined />
                        <h3>购物车</h3>
                    </a>
                    <a href="#mine">
                        <GithubOutlined />
                        <h3>我的e宠</h3>
                    </a>
                </div>
                <div className="shopnull" style={this.state.useridclose ? { display: "none" } : { display: "block" }}>
                    <div className="shoptext">
                        <img src="http://static.epetbar.com/mini_images/emall/cart_bitmap.png" />
                        <h3>您的购物车空空如也</h3>
                        <button className="shopbtn" onClick={this.gohome}>去逛一逛</button>
                    </div>
                </div>
                <div className="shopmain">
                    <div className="shopnull2" style={this.state.useridclose && this.props.cardlist.length == 0  ? { display: "block" } : { display: "none" }} >
                        <div className="shoptext">
                            <img src="http://static.epetbar.com/mini_images/emall/cart_bitmap.png" />
                            <h3>您的购物车空空如也</h3>
                            <button className="shopbtn" onClick={this.gohome}>去逛一逛</button>
                        </div>
                    </div>
                    <div className="cardlist" style={this.props.cardlist.length != 0 ? { display: "block" } : { display: "none" }}>
                        <Checkbox className="allcheck" onClick={this.allchecked} checked={this.state.allcheck}>E宠大仓库</Checkbox>
                        {
                            this.props.cardlist.map(item => (<div className="cardgoods" key={item.gid}>
                                <Checkbox onClick={this.ischecked.bind(this, item)} checked={item.goodcheck === 0 ? false : true}></Checkbox>
                                <img src={item.goodimgurl} />
                                <div className="cardtext">
                                    <h3>{item.goodtitle}</h3>
                                    <h4> ¥{item.goodprice}</h4>
                                    <InputNumber min={1} max={10} defaultValue={item.goodqty} onChange={this.onChange.bind(null, item.gid)} />
                                    <Button onClick={this.removegoods.bind(null, item.gid)}>删除</Button>
                                </div>
                            </div>))
                        }
                    </div>
                    <div className="allprice" style={this.props.cardlist.length != 0 ? { display: "flex" } : { display: "none" }}>
                        <div className="money">
                            <span className="moneytext">合计:</span>
                            <span className="moneyfuhao">¥</span>
                            <span className="moneys">{this.state.pirce}</span>
                        </div>
                        <button type="danger" className="clearall" onClick={this.showModal}>清空购物车</button>
                        <button className="moneybtn" type="primary">合计({this.state.qty})</button>

                        <Modal
                            title="请仔细确认操作"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>亲爱的确定要清空购物车吗</p>
                        </Modal>
                    </div>
                </div>
                <div className="bottom"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cardlist: state.goodslist,
        allprice: state.totalPrice
    }
}
Cart = connect(mapStateToProps)(Cart)
export default Cart