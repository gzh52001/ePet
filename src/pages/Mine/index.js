import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import Tabbar from '@/components/Tabbar';
import { SettingOutlined,MessageOutlined,CheckCircleFilled,PayCircleFilled,SketchOutlined,WalletOutlined,FileTextOutlined,WhatsAppOutlined,DribbbleOutlined,CarOutlined,HomeOutlined,AppstoreOutlined,ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import mine from '@/api/mine';
import './mine.scss'
class Mine extends Component{
    constructor(){
        super();
        this.state={
            myorders:[
                {
                    title:'待付款',
                    icon: <WalletOutlined style={{fontSize:22}}/>
                },
                {
                    title:'待收货',
                    icon:<CarOutlined style={{fontSize:22}}/>
                },
                {
                    title:'评价有礼',
                    icon:<FileTextOutlined style={{fontSize:22}}/>
                },
                {
                    title:'客服中心',
                    icon:<WhatsAppOutlined style={{fontSize:22}}/>
                },
                {
                    title:'国际订单',
                    icon:<DribbbleOutlined style={{fontSize:22}}/>
                },
            ],
            myService:[],
            isShow:false
        },
        this.getService = this.getService.bind(this)
        this.show = this.show.bind(this)
        this.toPage = this.toPage.bind(this)
    }
    show(){
        this.setState({
            isShow: !this.state.isShow
        })
    }
    toPage(path){
        this.props.history.push(path)
    }
    async getService(){
        try{
            let p = await mine.getService();
            console.log(p.data.list[3].data.items);
            // this.state.myService = p.data.list[3].data.items
            this.setState({
                myService : p.data.list[3].data.items
            })
        }catch(err){
            console.log(err);
        }
    }
    componentDidMount(){
        this.getService()
    }
    
    render(){
        const {myorders,myService,isShow} = this.state
        return(
            <div className="mine">
                {/* 头部 */}
                <NavBar
                    style={{height:50}}
                    mode="light"
                    icon={<Icon type="left" style={{color:'#333'}}/>}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        <Icon key="0" type="ellipsis" style={{color:'#333'}} onClick={this.show}/>,
                    ]}
                    >我的E宠
                </NavBar>
                {/* 点击出现新导航 */}
                <nav style={{display:`${isShow?'block':'none'}`}}>
                    <li className="navlist" onClick={this.toPage.bind(null,'/home')}>
                        <HomeOutlined />
                        <span>首页</span>
                    </li>
                    <li className="navlist" onClick={this.toPage.bind(null,'/sort')}>
                        <AppstoreOutlined />
                        <span>分类</span>
                    </li>
                    <li className="navlist" onClick={this.toPage.bind(null,'/cart')}>
                        <ShoppingCartOutlined />
                        <span>购物车</span>
                    </li>
                    <li className="navlist">
                        <UserOutlined />
                        <span>我的e宠</span>
                    </li>
                </nav>
                {/* 用户信息 */}
                <div className="userInfo">
                    <p className="setting">
                        <SettingOutlined />
                        <MessageOutlined />
                    </p>
                    <div className="uploadImg">
                        <img src="https://static.epetbar.com/static_wap/appmall/avatar/dog.png" />
                        <p className="login_mine">
                            <span>登录</span>
                            <span>|</span>
                            <span>注册</span>
                        </p>
                    </div>
                    <div className="more">
                        <span><CheckCircleFilled /><i>每日签到</i></span>
                        <span><PayCircleFilled /><i>0元兑礼</i></span>
                        <span><SketchOutlined /><i>俱乐部</i></span>
                    </div>
                </div>
                {/* 订单 */}
                <div className="myOrders">
                    <h3>我的订单</h3>
                    <ul className="orders">
                        {
                            myorders.map(item=>{
                                return <li className="orderItem" key={item.title}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </li>
                            })
                        }
                        
                    </ul>
                </div>
                {/* 广告 */}
                <div className="adv">
                    <img src="https://img2.epetbar.com/nowater/2020-05/26/16/1b3ec88ae720478931b6808084e97055.jpg"/>
                </div>
                {/* 服务 */}
                <div className="service">
                    <h3>我的服务</h3>
                    <ul className="serviceList">
                        {
                            myService.map(item=>{
                                return (<li className="serviceItem" key={item.id}>
                                    <img src={item.above_image.img_url}/>
                                    <span>{item.below_text}</span>
                                </li>)
                            })
                        }
                    </ul>
                </div>
                <Tabbar/>
            </div>
            
        )
    }
}

export default Mine