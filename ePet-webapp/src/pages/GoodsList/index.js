import React, { Component } from 'react';
import { Input, BackTop } from 'antd';
import { NavBar, Icon, Toast,} from 'antd-mobile'
import { RedditOutlined, UserOutlined, ShoppingCartOutlined, AppstoreOutlined, SearchOutlined, ArrowUpOutlined } from '@ant-design/icons'
import "./index.scss"
import one from '@/api/getsort'
class GoodsList extends Component {
    constructor() {
        super()
        this.state = {
            uid:"",//用户id
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
            check: true//防止懒加载短时间多次触发

        }
    }
    componentDidMount() {
        let { match,location} = this.props
        this.setState({
            shopid: match.params.id
        })
        let a=''
        if(location.search.split('?')[1]){
            a="keyword:"+location.search.split('?')[1]
        }
        this.getShopList(match.params.id,"def_desc",1,a)//获取商品
        this.checkScroll()//懒加载
    }
    getShopList = async (id,type,Num,a) => {//获取列表
        let { pet, page, check } = this.state
        if (check) {
            try {
                let p = await one.getShopList(pet, type, page, id,a)
                if (p.data.list.length) {
                    if (Num == 1) {
                        this.setState({
                            shopList:p.data.list,
                            isBottom: false
                        })
                    } else { 
                        p.data.list.map((item) => {
                            let { shopList: list } = this.state
                            list.push(item)
                            this.setState({
                                shopList: list,
                                isBottom: false
                            })
                        })
                    }
                } else {
                    Toast.fail('到底了', 1)
                    this.setState({
                        isBottom: true
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
    routerBack = () => {//返回一格
        this.props.history.go(-1)
    }
    changeRoute = (num) => {//排序
        let { orderNum: changeNum,shopid } = this.state
        this.setState({
            styleNum: num,
        })
        document.body.scrollTop = document.documentElement.scrollTop = 0
        if (num == 0) {//默认
            this.setState({
                type: 'def_desc',
                page: 1
            })
            this.getShopList(shopid,"def_desc",1)
        } else if (num == 1) {//销量
            this.setState({
                type: 'sold_desc',
                page: 1
            })
            this.getShopList(shopid,"sold_desc",1)
        } else if (num == 2) {//升序降序
            this.setState({
                orderNum: changeNum + 1
            })
            if (changeNum == 0) {
                this.setState({
                    type: 'price_asc',
                    page: 1
                })
                this.getShopList(shopid,"price_asc",1)
            } else if (changeNum % 2 == 1) {
                this.setState({
                    type: 'price_desc',
                    typeval: '降序',
                    page: 1
                })
                this.getShopList(shopid,'price_desc',1)
            } else if (changeNum % 2 == 0) {
                this.setState({
                    type: 'price_asc',
                    typeval: '升序',
                    page: 1
                })
                this.getShopList(shopid,"price_asc",1)
            }
        }
    }
    // 监听滚动条
    checkScroll = () => {
        let { page: yema, isBottom ,shopid,type} = this.state
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
                this.getShopList(shopid,type,0)
                this.setState({
                    page: yema + 1,
                    isBottom: true,
                    check: false
                })
                setTimeout(() => {
                    this.setState({ check: true })
                }, 1000)
            }
        };
    }
    //添加商品
    addGoods = (gid, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
        let {uid} = this.state
        if(!uid){
            Toast.info('请登录',2)
        }else{
            
        }
    }
    goGoods = (gid,price) => {//去详情页
        this.props.history.push({ 
            pathname:'/detail/'+gid,
            search:'?'+price,
    })
    }
    goSearch=()=>{//去搜索页面
        this.props.history.push('/search')
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
                <Input size="large" placeholder="点击搜素商品" prefix={<SearchOutlined />} className='search' onClick={this.goSearch} />
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
                                    <li key={item.photo+index} onClick={this.goGoods.bind(this, item.gid,item.sale_price)}>
                                        {
                                            item.country_photo ? <img src={item.country_photo} className='country_photo'></img> : ''
                                        }
                                        <img src={item.photo} className='photo'></img>
                                        <p>{item.subject}</p>
                                        <span className='price'>价格:￥{item.sale_price}&nbsp;&nbsp;<del>{item.sale_price}</del></span>
                                        <i>{item.comments}&nbsp;&nbsp;{item.sold}</i>
                                        <b onClick={this.addGoods.bind(this, item.gid)}><ShoppingCartOutlined style={{ fontSize: 22 }} /></b>
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