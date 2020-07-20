import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import './layoutbox.scss';
import Headbar from './Headbar';
import Sidebar from './Sidebar';
import Home from '@/pages/Home';
import Custom from '@/pages/Custom';
import Goods from '@/pages/Goods';
import Order from '@/pages/Order';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Layoutbox(){
    return (
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
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
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
                    <Redirect from='/app' to='/app/home' exact></Redirect>
                    </Content>
                </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default Layoutbox