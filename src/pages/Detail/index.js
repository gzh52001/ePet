import React, { Component } from 'react';
import { NavBar, Icon, Carousel } from 'antd-mobile'
import "./index.scss"
import { RedditOutlined, UserOutlined, ShoppingCartOutlined, AppstoreOutlined } from '@ant-design/icons'
import one from '@/api/getsort'
class Detail extends Component {
    constructor() {
        super()
        this.state = {
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
            imgindex:1,//轮播图当前index
            detailedData: [],//商品其他数据
            format: []//格式数据
        }
    }
    componentDidMount() {
        let { match } = this.props
        this.getdetail(match.params.id)//进来获取数据
    }
    getdetail = async (id) => {//获取商品详情
        try {
            let p = await one.getShop(id)
            p.data.datas.forEach((item) => {
                if (item.type == 20) {//图片
                    console.log(item.photos);
                    this.setState({
                        imgList: item.photos
                    })
                } else if (item.type == 21) {
                    console.log(item);
                    this.setState({
                        detailedData: item
                    })
                } else if (item.type == 5) {
                    console.log(item);
                    this.setState({
                        format: item
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    changeRoute = (styleNum) => {//点击分类和品牌时跳转
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
    render() {
        let { tabNum, tablist,imgList,imgindex} = this.state
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
                    <button className={this.state.styleNum == 1 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 1)}>商品</button>
                    <button className={this.state.styleNum == 0 ? 'first' : 'second'} onClick={this.changeRoute.bind(this, 0)}>品牌</button>
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
                {/* 轮播图 */}
                <Carousel
                    autoplay={false}
                    dots={false}
                    afterChange={index => this.setState({
                        imgindex:index+1
                    })} 
                >
                    {imgList.map((item,index) => (
                            <img
                                key={index}
                                src={item.image}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />       
                    ))}
                </Carousel>
                    <div className='box'>{imgindex}/{imgList.length}</div>
            </div>
        )
    }
}
export default Detail