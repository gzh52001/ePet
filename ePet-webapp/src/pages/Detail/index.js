import React, { Component } from 'react';
import { NavBar, Icon, Carousel, Stepper, Toast } from 'antd-mobile'
import "./index.scss"
import { RedditOutlined, UserOutlined, ShoppingCartOutlined, AppstoreOutlined } from '@ant-design/icons'
import DatailTwo from '@/components/detailTwo'
import { Statistic, message } from 'antd';
const { Countdown } = Statistic
import one from '@/api/getsort'
import store from "../../store"
import { connect } from "react-redux"
import goodApi from "../../api/index"
import textApi from "../../api/test"

//购物车商品列表初始化
let goodsd = []
let uid = localStorage.getItem("ep-uid")
let p = goodApi.getshoplist(uid).then(res => {
    let list = []
    if (res.data.flag) {
        for (let i = 0; i < res.data.data.p.length; i++) {
            list.push(res.data.data.p[i])
        }
        for (let i = 0; i < list.length; i++) {
            goodsd = list[i]
            store.dispatch({
                type: 'addshop',
                goods: {
                    gid: goodsd.gid,
                    goodname: goodsd.goodname,
                    goodprice: goodsd.goodprice,
                    goodimgurl: goodsd.goodimgurl,
                    goodqty: goodsd.goodqty,
                    goodtitle: goodsd.goodtitle,
                    uid: localStorage.getItem("ep-uid"),
                    goodcheck: goodsd.goodcheck
                }
            });
        }
    }
})

class Detail extends Component {
    constructor() {
        super()
        this.state = {
            uid: localStorage.getItem("ep-uid"),//用户id
            id: '',//商品ID
            styleNum: 1,//router的控制
            tabNum: 0,//控制Tab的开关
            tablist: [//导航栏
                {
                    title: '首页',
                    name: 'home',
                    path: '/home',
                    icon: <RedditOutlined style={{ fontSize: 22 }} />,
                },
                {
                    title: '商品分类',
                    name: 'sort',
                    path: '/sort',
                    icon: <AppstoreOutlined style={{ fontSize: 22 }} />,
                },
                {
                    title: '购物车',
                    name: 'cart',
                    path: '/cart',
                    icon: <ShoppingCartOutlined style={{ fontSize: 22 }} />,
                },
                {
                    title: '我的e宠',
                    name: 'mine',
                    path: '/mine',
                    icon: <UserOutlined style={{ fontSize: 22 }} />,
                },
            ],
            imgList: [],//轮播图
            imgindex: 1,//轮播图当前index
            detailedData: [],//商品其他数据
            format: [],//格式数据
            time: 1595761786687,//倒计时
            price: '',//价格
            ishave: false,//是否有规格等数据
            count: 1,//商品数量
            openWin: false,//遮罩层
            goodname: "",
            goodtitle: ""
        }
    }
    componentDidMount() {
        let url = window.location.href;
        let text = url.split("/");
        let gid = text[4];
        let p = goodApi.getgoodslist(gid).then(res => {
            this.setState({
                price: res.data.data.p[0].price
            })
        })
        let { match, location } = this.props
        this.setState({
            price: location.search.split('?')[1],
            id: match.params.id
        })
        this.getdetail(match.params.id)//进来获取数据

    }
    getdetail = async (id) => {//获取商品详情
        try {
            let p = await one.getShop(id)
            let goodnames = p.data.datas[1].subject
            let goodtitles = goodnames
            this.setState({
                goodname: goodnames,
                goodtitle: goodtitles
            })
            p.data.datas.forEach((item) => {
                if (item.type == 20) {//图片
                    this.setState({
                        imgList: item.photos
                    })
                } else if (item.type == 21) {//内容
                    this.setState({
                        detailedData: item,
                    })

                } else if (item.type == 5) {//规格
                    this.setState({
                        format: item,
                        ishave: true
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    changeRoute = (styleNum) => {//点击商品和详情时跳转
        this.setState({
            styleNum,
        })
    }
    openTab = () => {//控制Tab的开关
        const { tabNum: Num } = this.state
        this.setState({
            tabNum: Num + 1
        })
    }
    routerBack = () => {//返回一格
        this.props.history.go(-1)
    }
    renderContent = (path) => {//跳转去首页等页面
        this.props.history.push(path)
    }
    changeFormat = (id) => {//换规格
        this.props.history.push('/detail/' + id)
        this.getdetail(id)
    }
    onChange = (val) => {//改变数量
        this.setState({
            count: val
        })
    }
    OpenWin = (num) => {//保证书打开
        if (num) {
            this.setState({
                openWin: true
            })
        } else {
            this.setState({
                openWin: false
            })
        }
    }
    addCart = () => {//加入购物车
        let { id } = this.state
        let gid = id * 1
        let uid = this.state.uid * 1
        let goodqty = this.state.count
        let goodprice = this.state.price * 1
        let goodimgurl = this.state.imgList[0].image
        let goodname = this.state.goodname
        let goodtitle = this.state.goodtitle
        let data = {
            uid: uid,
            gid: gid,
            goodname: goodname,
            goodqty: goodqty,
            goodtitle: goodtitle,
            goodprice: goodprice,
            goodimgurl: goodimgurl,
        }
        console.log(typeof (uid))
        if (!uid) {
            Toast.info('请登录', 2)
        } else {
            let currentGoods = this.props.carlist.filter(item => item.gid === gid)[0]
            console.log(currentGoods)
            if (currentGoods) {
                let p = goodApi.shoplistputs(uid, gid, goodqty).then(res => {
                    console.log(res)
                    if (res.data.flag) {
                        message.success("添加成功")
                        store.dispatch({
                            type: "changqtys",
                            gid,
                            goodqty
                        })
                    }
                })
            } else {
                let p = goodApi.addshoplist(data).then(res => {
                    console.log(res)
                    if (res.data.flag) {
                        message.success("添加成功")
                        store.dispatch({
                            type: "addshop",
                            goods: {
                                uid: uid,
                                gid: gid,
                                goodname: goodname,
                                goodqty: goodqty,
                                goodtitle: goodtitle,
                                goodprice: goodprice,
                                goodimgurl: goodimgurl,
                                goodcheck: 0
                            }
                        })
                    }
                })
            }

        }
    }
    render() {
        let { tabNum, tablist, imgList, imgindex, detailedData, price, time, format, ishave, openWin, styleNum, id } = this.state
        return (
            <div className='fater'>
                {/* 头部 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.routerBack}
                    rightContent={[
                        <Icon key="0" type="ellipsis" onClick={this.openTab} />,
                    ]}
                >
                    <button className={styleNum == 1 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 1)}>商品</button>
                    <button className={styleNum == 0 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 0)}>详情</button>
                </NavBar>
                {/* 导航栏 */}
                <div style={{ display: `${tabNum % 2 == 0 ? 'none' : 'block'}` }} className="Tab">
                    <ul className="tabbar">
                        {
                            tablist.map(item => {
                                return <li key={item.name} onClick={this.renderContent.bind(null, item.path)} className={`tabs`}>
                                    {item.icon}
                                    <span className="title">{item.title}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {
                    styleNum ?
                        <>
                            <Carousel /*  轮播图  */
                                autoplay={false}
                                dots={false}
                                afterChange={index => this.setState({
                                    imgindex: index + 1
                                })}
                            >
                                {imgList.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.image}
                                        alt=""
                                        style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
                                    />
                                ))}
                            </Carousel>
                            {/* 轮播图index */}
                            <div className='box'>{imgindex}/{imgList.length}</div>
                            {/* 详情说明 */}
                            <div className="detail">
                                {/* 价格 */}
                                <div className='price'>
                                    <h2>
                                        <span>
                                            ￥{price}&nbsp;&nbsp;
                        </span>
                        清凉节
                    </h2>
                                    <p>价格<del>{price}</del></p>
                                    <div className="zcx">
                                        <Countdown title="活动结束" value={time} format="D 天:HH:mm:ss" />
                                    </div>
                                </div>
                                {/* 介绍 */}
                                <div className="name">
                                    <h2>
                                        {detailedData.subject}
                                    </h2>
                                    <p>
                                        {detailedData.presubject}
                                    </p>
                                </div>
                                {/* 规格 */}
                                {ishave ?
                                    <div className="format">
                                        <p>已选： <span>'{format.def_format}'</span></p>
                                        {format.formats ?
                                            format.formats.map((item) => (
                                                <div key={item.name} className='choice'>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                    <div>
                                                        {
                                                            item.option.map(it => (
                                                                <button onClick={this.changeFormat.bind(this, it.gid)} key={it.gid} className={`${it.checked ? 'select' : ''}`}>{it.name}</button>
                                                            ))
                                                        }
                                                    </div>
                                                </div>)) : ''
                                        }
                                    </div> : ''
                                }
                                {/* 数量 */}
                                <div className='count'>
                                    <b>购买数量</b>
                                    <div>
                                        <Stepper
                                            showNumber
                                            max={10}
                                            min={1}
                                            value={this.state.count}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                {/* 保证 */}
                                <div className='ensure' onClick={this.OpenWin.bind(this, 1)}>
                                    <span>
                                        <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/qualityassurance.png" alt="" />
                                        <b>正品保证</b>
                                    </span>
                                    <span>
                                        <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/freeshipping.png" alt="" />
                                        <b>99元包邮</b>
                                    </span>
                                    <span>
                                        <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/thirtydays.png" alt="" />
                                        <b>30天退货</b>
                                    </span>
                                </div>
                            </div>
                            {/* 弹窗 */}

                            {openWin ? <div className='window'>
                                <div className='contx'>
                                    <h2>
                                        服务说明
                </h2>
                                    <div>
                                        <p>
                                            <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/qualityassurance.png" alt="" />
                                            <b>正品保证</b>
                                        </p>
                                        <p>正规授权，所有商品可100%追溯来源。</p>

                                    </div>
                                    <div>
                                        <p>
                                            <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/freeshipping.png" alt="" />
                                            <b>99元包邮</b>
                                        </p>
                                        <p>单个仓库单笔订单满99包邮（西部大仓覆盖的川渝地区满58元包邮），E宠自营快递覆盖区域满58包邮；不包邮地区：西藏、新疆；不包邮快递：顺丰、EMS；</p>
                                    </div>
                                    <div>
                                        <p>
                                            <img src="https://static.epetbar.com/static_wap/appmall/lib/goods/thirtydays.png" alt="" />
                                            <b>30天退货</b>
                                        </p>
                                        <p>在不影响该商品二次销售的情况下，自收到商品30天内，可申请退换货服务（定制狗牌、蛋糕等特殊商品除外）。</p>
                                    </div>
                                    <button onClick={this.OpenWin.bind(this, 0)}>确定</button>
                                </div>
                            </div> : ''}
                            {/* 底部tab */}
                            <footer>
                                <div onClick={() => {
                                    this.props.history.push('/cart')
                                }}>
                                    <ShoppingCartOutlined style={{ fontSize: 22 }} /><br />
                    购物车
            </div>
                                <button onClick={this.addCart}>加入购物车</button>
                            </footer>
                        </> : <DatailTwo id={id}></DatailTwo>}
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        carlist: state.goodslist
    }
}
Detail = connect(mapStateToProps)(Detail)
export default Detail