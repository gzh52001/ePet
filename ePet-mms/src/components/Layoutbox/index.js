import React,{Component} from 'react';
import { Route,Redirect} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import './layoutbox.scss';
import Headbar from './Headbar';
import Sidebar from './Sidebar';
import Home from '@/pages/Home';
import Custom from '@/pages/Custom';
import Goods from '@/pages/Goods';
import Order from '@/pages/Order';
import withLogin from '@/withLogin.js'

const { Content} = Layout;
class Layoutbox extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        let urlPath = this.props.location.pathname.split('/')
        if(urlPath.length == 2){
            this.props.history.push('/app/home')
        }
    }
    render(){
       return(
        <div className="layout">
        <Layout 
        style={{
            height:'100vh'
        }}>
            <Headbar />
            <Layout>
                <Sidebar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>{(()=>{
                        let url = window.location.href
                        let text = url.split("/");
                        return text[5]
                    })()}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 460,
                    }}
                    >
                    <Route path='/app/home' component={Home} ></Route>
                    <Route path='/app/custom' component={Custom} ></Route>
                    <Route path='/app/goods' component={Goods} ></Route>
                    <Route path='/app/order' component={Order} ></Route>
                   {/*  <Redirect from='/app' to='/app/home' exact></Redirect> */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
       )
    }
}

// Layoutbox= withLogin(Layoutbox)
export default Layoutbox