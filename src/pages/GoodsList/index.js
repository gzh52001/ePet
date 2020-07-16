import React, { Component } from 'react';
import { Input, BackTop } from 'antd';
import { NavBar, Icon,Toast } from 'antd-mobile'
import { RedditOutlined, UserOutlined, ShoppingCartOutlined, AppstoreOutlined, SearchOutlined, ArrowUpOutlined } from '@ant-design/icons'
import "./index.scss"
import one from '@/api/getsort'
class GoodsList extends Component {
    constructor() {
        super()
        this.state = {
            shopList: [],//商品列表
            type: 'def_desc',//排序的状态
            typeval: '升序',//排序的内容
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
            pet: 'dog',//什么宠物
            tabNum: 0,//控制Tab的开关
            styleNum: 0,//排序号码
            shopid: '',//当前页面id
            page: 1,//页码
            orderNum: 0,//升序降序控制码
            isBottom: false,//是否到底
            check:true//防止懒加载短时间多次触发

        }
    }
    componentDidMount() {
        let { match } = this.props
        this.setState({
            shopid: match.params.id
        })
        this.getShopList()//获取商品
        this.checkScroll()//懒加载
    }
    getShopList = async () => {//获取列表
        let { type, shopid, pet, page ,check} = this.state
        if(check){
            try {
                let p = await one.getShopList(pet, type, page, shopid)
                if(p.data.list){
                   p.data.list.map((item)=>{
                    let {shopList:list}=this.state
                   list.push(item)
                    this.setState({
                        shopList:list,
                        isBottom:false
                    })
                   })
                   
                }else{
                    Toast.fail('到底了', 1)
                    this.setState({
                        isBottom:true
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    renderContent = (path) => {//跳转去首页等页面
        this.props.history.push(path)
    }
    openTab = () => {//控制Tab的开关
        const { tabNum: Num } = this.state
        this.setState({
            tabNum: Num + 1
        })
    }
    routerBack = () => {
        this.props.history.go(-1)
    }
    changeRoute = (num) => {//排序
        let { orderNum: changeNum } = this.state
        this.setState({
            styleNum: num,
        })
        if (num == 0) {//默认
            this.setState({
                type: "def_desc"
            })
            this.getShopList()
        } else if (num == 1) {//销量
            this.setState({
                type: "sold_desc"
            })
            this.getShopList()
        } else if (num == 2) {//升序降序
            this.setState({
                orderNum: changeNum + 1
            })
            if (changeNum == 0) {
                this.setState({
                    type: "price_asc"
                })
                this.getShopList()
            } else if (changeNum % 2 == 1) {
                this.setState({
                    type: 'price_desc',
                    typeval: '降序'
                })
                this.getShopList()
            } else if (changeNum % 2 == 0) {
                this.setState({
                    type: 'price_asc',
                    typeval: '升序'
                })
                this.getShopList()
            }
        }
    }
    // 监听滚动条
    checkScroll = () => {
        let { page:yema, isBottom} = this.state
        window.onscroll = () => {
            // 变量 scrollTop 是滚动条滚动时, 距离顶部的距离
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 变量 windowHeight 是可视区的高度
            var windowHeight =
                document.documentElement.clientHeight || document.body.clientHeight;
            // 变量 scrollHeight 是滚动条的总高度
            var scrollHeight =
                document.documentElement.scrollHeight || document.body.scrollHeight;
            // 滚动条到底部的条件 (距底部 30px 时触发加载)

            if (scrollTop + windowHeight >= scrollHeight - 30 && !isBottom) {
                this.getShopList()
                this.setState({
                    page:yema+1,
                    isBottom:true,
                    check:false
                })
                setTimeout( ()=> {     
                    this.setState({ check: true })   
                    }, 1000)
            }
        };
    }
    //添加商品
    addGoods=(item,e)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }
    goGoods=()=>{
        console.log(1);
    }
    render() {
        const { tablist, tabNum, typeval, shopList } = this.state
        return (
            <div>
                {/* 头部 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.routerBack}
                    rightContent={[
                        <Icon key="0" type="ellipsis" onClick={this.openTab} />,
                    ]}
                >商品列表
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
                {/* 搜素框 */}
                <Input size="large" placeholder="点击搜素商品" prefix={<SearchOutlined />} className='search' onClick={() => { console.log(1); }} />
                {/* 排序栏 */}
                <div className='order'>
                    <button className={this.state.styleNum == 0 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 0)}>默认</button>
                    <button className={this.state.styleNum == 1 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 1)}>销量</button>
                    <button className={this.state.styleNum == 2 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 2)}>{typeval}</button>
                </div>
                {/* 列表 */}
                <div className='shopList'>
                    <ul>
                        {
                            shopList.map((item,index) => {
                                return (
                                    <li key={item.gid+index} onClick={this.goGoods.bind(this,item)}>
                                        {
                                            item.country_photo ? <img src={item.country_photo} className='country_photo'></img> : ''
                                        }
                                        <img src={item.photo} className='photo'></img>
                                        <p>{item.subject}</p>
                                        <span className='price'>价格:￥{item.sale_price}&nbsp;&nbsp;<del>{item.sale_price}</del></span>
                                        <i>{item.comments}&nbsp;&nbsp;{item.sold}</i>
                                        <b onClick={this.addGoods.bind(this,item)}><ShoppingCartOutlined style={{ fontSize: 22 }} /></b>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* 回到顶部 */}
                <BackTop className='up'>
                    <div ><ArrowUpOutlined /></div>
                </BackTop>
            </div>
        )
    }
}
export default GoodsList